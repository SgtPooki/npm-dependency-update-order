/* eslint-disable no-console */
import fs from 'fs'
import path from 'path'

import { Package, packageWalker } from 'npm-package-walker'
import batchingToposort from 'batching-toposort'
import createGraph from 'ngraph.graph'
import argv from './cli.js'

const ngraph = createGraph()

const baseToPackageIdentifierMap: Map<string, string> = new Map()
const processedBases: Set<string> = new Set()

const getPackageIdentifier = (pkg: Package, base: string, modulePath: string[]) => {
  const name = pkg.name

  if (name == null) {
    // if (modulePath.length === 0) {
    //   name = base.split('/').pop()
    // } else {
    //   name = modulePath.pop()
    // }
    throw new Error('No name found for package: ' + JSON.stringify(pkg))
  }
  let packageIdentifier = `${name}@${pkg.version ?? '??'}`
  if (argv.nameOnly === true) {
    packageIdentifier = name
  }
  if (!baseToPackageIdentifierMap.has(base)) {
    baseToPackageIdentifierMap.set(base, packageIdentifier)
  }

  return packageIdentifier
}

const getDependentId = (pkg: Package, base: string, modulePath: string[]) => {
  let dependentId
  if (modulePath.length <= 1) {
    dependentId = rootPkgIdentifier
  } else {
    const dependentBase = base.slice(0, base.length - `/node_modules/${modulePath[modulePath.length - 1]}`.length)
    const dependentName = modulePath[modulePath.length - 2]
    dependentId = baseToPackageIdentifierMap.get(dependentBase)
    if (dependentId == null) {
      throw new Error(`No dependentId found for ${dependentName}`)
    }
  }

  return dependentId
}

const walkFn = (dependencyMap: DependencyMap) => async (pkg: Package, base: string, modulePath: string[]): Promise<boolean> => {
  try {
    const dependentId = getDependentId(pkg, base, modulePath)
    const packageIdentifier = getPackageIdentifier(pkg, base, modulePath)

    let dependents: Set<string> = new Set()

    if (dependencyMap.has(packageIdentifier)) {
      dependents = dependencyMap.get(packageIdentifier) as Set<string>
    }
    if (dependentId !== packageIdentifier) {
      dependents.add(dependentId)
    }

    dependents.forEach((dependentId) => {
      ngraph.addLink(dependentId, packageIdentifier, {
        pkg: {
          name: pkg.name,
          version: pkg.version
        },
        base,
        modulePath
      })
    })

    dependencyMap.set(packageIdentifier, dependents)

    // const response = await fetch(`https://registry.npmjs.org/${pkg.name}`);
    // const registryJSON = await response.json();
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

async function collectPackageNames (workingDirectory = process.cwd(), dependencyMap: DependencyMap = new Map()) {
  if (argv.verbose >= 2) {
    console.log(`Processing working directory '${workingDirectory}'...`)
  }

  await packageWalker(
    walkFn(dependencyMap),
    workingDirectory,
    [
      'dependencies',
      'devDependencies',
      'peerDependencies'
    ]
  )

  return dependencyMap
}

// Map :: { [string]: string[] }
// DAG :: { DependencyId : [DependentId] }
const converMapToDAG = (map: DependencyMap): Record<string, string[]> => {
  const DAG: Record<string, string[]> = {}
  const obj = Object.fromEntries(map)
  Object.keys(obj).forEach((key) => {
    DAG[key] = [...obj[key]]
  })
  return DAG
}

// function getCycle (graph) {
//   // Copy the graph, converting all node references to String
//   graph = Object.assign(...Object.keys(graph).map(node =>
//     ({ [node]: graph[node].map(String) })
//   ))

//   let queue = Object.keys(graph).map(node => [node])
//   while (queue.length) {
//     const batch = []
//     for (const path of queue) {
//       const parents = graph[path[0]] || []
//       for (const node of parents) {
//         if (node === path[path.length - 1]) return [node, ...path]
//         batch.push([node, ...path])
//       }
//     }
//     queue = batch
//   }
// }

const getPackageNameFromIdentifier = (pkgIdentifier: string) => {
  const pkgParts = pkgIdentifier.split('@')
  let pkgName = pkgParts[0]
  if (pkgParts.length > 2) {
    pkgName = `@${pkgParts[1]}`
  }
  return pkgName
}

let rootPkgIdentifier = 'root'
export default async (workingDirectory = process.cwd()) => {
  const pkgJsonRaw = await fs.promises.readFile(path.resolve(workingDirectory, 'package.json'), 'utf8')
  const pkgJson = JSON.parse(pkgJsonRaw)

  rootPkgIdentifier = getPackageIdentifier(pkgJson, workingDirectory, [])

  let dependencyMap = await collectPackageNames(workingDirectory)
  processedBases.add(workingDirectory)

  // now loop over all baseToPackageIdentifierMap entries and add them to the DAG
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  for (const [base, _packageIdentifier] of baseToPackageIdentifierMap.entries()) {
    if (!processedBases.has(base)) {
      dependencyMap = await collectPackageNames(base, dependencyMap)
      processedBases.add(base)
    } else {
      if (argv.verbose >= 2) {
        console.log(`Skipping already processed directory '${base}'`)
      }
    }
  }

  const dependencyObj = converMapToDAG(dependencyMap)
  if (argv.write === true) {
    try {
      void fs.promises.writeFile('dependencies.json', JSON.stringify(dependencyObj, null, 2))
    } catch (err) {
      console.error(err)
    }
  }

  const dependencyUpdateOrder = batchingToposort(dependencyObj)
  if (argv.write === true) {
    try {
      void fs.promises.writeFile('dependencyUpdateOrder.json', JSON.stringify(dependencyUpdateOrder, null, 2))
    } catch (err) {
      console.error(err)
    }
  }
  const dependencyUpdateOrder2: string[][] = []
  const npmInstallCommands: string[] = []
  dependencyUpdateOrder.forEach((pkgList) => {
    const newPkgList: string[] = []
    const devDeps: string[] = []
    const deps: string[] = []
    pkgList.sort().forEach((pkg) => {
      let isDirectDependency = false
      const pkgName = getPackageNameFromIdentifier(pkg)
      if (pkgJson.dependencies[pkgName] != null) {
        deps.push(pkg)
        isDirectDependency = true
      } else if (pkgJson.devDependencies[pkgName] != null) {
        devDeps.push(pkg)
        isDirectDependency = true
      }
      if (isDirectDependency) {
        newPkgList.push(pkg)
      }
    })
    if (devDeps.length > 0 && argv.displayInstallCommands === true) {
      npmInstallCommands.push(`npm install -D ${devDeps.map((pkg) => getPackageNameFromIdentifier(pkg) + '@latest').join(' ')}`)
    }
    if (deps.length > 0 && argv.displayInstallCommands === true) {
      npmInstallCommands.push(`npm install -S ${deps.map((pkg) => getPackageNameFromIdentifier(pkg) + '@latest').join(' ')}`)
    }
    if (newPkgList.length > 0) {
      dependencyUpdateOrder2.push(newPkgList)
    }
  })

  npmInstallCommands.forEach((cmd) => {
    console.log(cmd)
  })

  displaySummary(dependencyUpdateOrder2)
}

const displaySummary = (dependencyUpdateOrder: string[][]) => {
  console.log(`Total number of direct dependencies: ${dependencyUpdateOrder.flat().length}`)
  // if (argv.verbose >= 1) {
  console.log('Dependency update order should be: ')
  dependencyUpdateOrder.forEach((pkgList, i) => {
    console.log(`\tStep ${i + 1}: ${pkgList.join(', ')}`)
  })
  // }
  argv.targets.forEach((target: string) => {
    let targetBlockingDepsCount = 0
    // const i = 0
    for (const depList of dependencyUpdateOrder) {
      // console.log('depList: ', depList)
      // let depList = dependencyUpdateOrder[i]
      // while (!depList.includes(target)) {
      if (!depList.includes(target)) {
        targetBlockingDepsCount += depList.length
      } else {
        break
      }
      // depList = dependencyUpdateOrder[i]
    }
    console.log(`Target '${target}' is blocked by ${targetBlockingDepsCount} dependencies`)
  })
}

// const getPaths = () => {
//   ngraph.forEachNode((node) => {
//     const paths = getNodePaths(node)
//     if (paths.length > 0) {
//       console.log(
//       `Node '${node.id}' has paths: \n\t${paths.join('\n\t')}`
//       )
//     } else {
//       console.log(
//       `Node '${node.id}' has no shared dependencies`
//       )
//     }
//   })
// }
// const getNodePaths = (node: Node<any>, path?: string): string[] => {
//   const paths: string[] = []
//   if (path != null) {
//     paths.push(path)
//   }
//   node.links?.forEach((link) => {
//     if (link.fromId === node.id) {
//       const nodePaths = getNodePaths(ngraph.getNode(link.toId) as Node<any>, `${link.id}`)
//       // console.log('nodePaths: ', nodePaths)
//       paths.push(...nodePaths)
//       // console.log('nextPath: ', nextPath)
//       // console.log('node: ', node)
//       // console.log('link: ', link)
//     }
//   })
//   return paths
//   // console.log(node.id, node.data);
// }

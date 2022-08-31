declare module 'npm-package-walker' {
  export interface Package {
    name: string
    version: string

  }
  type DefaultDependencyTypes = 'dependencies' | 'devDependencies' | 'optionalDependencies' | 'peerDependencies' // | 'bundledDependencies'
  export function packageWalker (callback: (pkg: Package, base: string, modulePath: string[]) => Promise<boolean>, workingDirectory?: string, dependencyTypes: DefaultDependencyTypes[]): Promise<void>
}

declare module 'batching-toposort' {
  export default function toposort (edges: Record<string, string[]>): string[][]
}

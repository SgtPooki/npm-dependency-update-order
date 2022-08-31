/* eslint-disable no-console */
import depcheck from 'depcheck'

/**
 * Run this script to figure out which packages to remove.
 *
 * @example
 *  node depcheck.mjs | jq -r '.devDependencies[]' | xargs -n1 -I% sh -c 'rg --hidden --ignore-file .rgignore % &> /dev/null || echo npm uninstall -D %'
 *  node depcheck.mjs | jq -r '.dependencies[]' | xargs -n1 -I% sh -c 'rg --hidden --ignore-file .rgignore % &> /dev/null || echo npm uninstall -S %'
 */

const options = {
  ignoreBinPackage: false, // ignore the packages with bin entry
  skipMissing: false, // skip calculation of missing dependencies
  ignorePatterns: [
    // files matching these patterns will be ignored
    'docs',
    'dist',
    'bower_components',
    '.cache',
    '.github',
    '.nyc_output',
    '.tx',
    '.vscode',
    'coverage',
    'docs',
    'nyc_output',
    'node_modules',
    // 'public',
    // 'src',
    'storybook-static'
    // 'test',

  ],
  ignoreMatches: [
    // ignore dependencies that matches these globs
    'grunt-*',
    '@semantic-release/*',
    'semantic-release',
    '@semantic-release',
    '*@semantic-release*',
    'storybook/addons',

    // types for dependencies
    '@types/node',
    '@types/path-browserify',

    // storybook stuff
    '@storybook/addons',

    // package.json scripts
    'shx',
    'npm-run-all',
    'run-script-os',
    'webpack-bundle-analyzer',
    'cross-env',
    'bundlesize',
    'react-app-rewired'
  ],
  // parsers: {
  //   // the target parsers
  //   '**/*.js': depcheck.parser.jsx,
  //   '**/*.jsx': depcheck.parser.jsx
  // },
  detectors: [
    // the target detectors
    depcheck.detector.requireCallExpression,
    depcheck.detector.importDeclaration,
    depcheck.detector.importCallExpression,
    depcheck.detector.requireResolveCallExpression,
    depcheck.detector.exportDeclaration
  ],
  specials: [
    // the target special parsers
    depcheck.special.eslint,
    depcheck.special.webpack,
    depcheck.special.jest,
    depcheck.special.babel
  ]
  // package: {
  //   // may specify dependencies instead of parsing package.json
  //   dependencies: {
  //     lodash: '^4.17.15'
  //   },
  //   devDependencies: {
  //     eslint: '^6.6.0'
  //   },
  //   peerDependencies: {},
  //   optionalDependencies: {}
  // }
}

depcheck(process.cwd(), options).then((unused) => {
  // const { dependencies, devDependencies, missing, using, invalidFiles, invalidDirs } = unused
  const { dependencies, devDependencies, missing } = unused
  console.log(JSON.stringify({ dependencies, devDependencies, missing }, null, 2))
  // console.log('\n\nunused.dependencies\n', unused.dependencies.join('\n')) // an array containing the unused dependencies
  // console.log('\n\nunused.devDependencies\n', unused.devDependencies.join('\n')) // an array containing the unused devDependencies
  // console.log('\n\nunused.missing\n', unused.missing) // a lookup containing the dependencies missing in `package.json` and where they are used
  // console.log('unused.using', unused.using) // a lookup indicating each dependency is used by which files
  // console.log('unused.invalidFiles', unused.invalidFiles.join('\n')) // files that cannot access or parse
  // console.log('unused.invalidDirs', unused.invalidDirs.join('\n')) // directories that cannot access
})

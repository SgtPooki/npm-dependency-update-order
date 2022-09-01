# @sgtpooki/npm-dependency-update-order <!-- omit in toc -->

[![codecov](https://img.shields.io/codecov/c/github/SgtPooki/npm-dependency-update-order.svg?style=flat-square)](https://codecov.io/gh/SgtPooki/npm-dependency-update-order)
[![CI](https://img.shields.io/github/workflow/status/SgtPooki/npm-dependency-update-order/test%20&%20maybe%20release/main?style=flat-square)](https://github.com/SgtPooki/npm-dependency-update-order/actions/workflows/js-test-and-release.yml)

> Figure out the best order to update your dependencies

## Table of contents <!-- omit in toc -->

- [Install](#install)
- [License](#license)
- [Contribute](#contribute)

## Install

```bash
npm i -g @sgtpooki/npm-dependency-update-order
```

## Run


```bash
# In the cwd of a package you want to check the dependency update order for
npm-dependency-update-order

# With verbose output
npm-dependency-update-order --verbose=1

# Using a different (absolute) directory
npm-dependency-update-order ~/code/work/protocol.ai/

# Using a different (relative) directory
npm-dependency-update-order ~/code/work/protocol.ai/
```

You can set VERBOSE to numeric values where:
  0 = not verbose
  1 = slightly verbose
  2 = more verbose

### Example

```bash
> node dist/index.js /Users/sgtpooki/code/work/protocol.ai/ipfs/webui --verbose=1

Dependency update order should be:  [
  [
    'big.js',
    'brace',
    'change-case',
    'chart.js',
    'classnames',
    'conventional-changelog-conventionalcommits',
    'countly-sdk-web',
    'd3',
    'datatransfer-files-promise',
    'details-polyfill',
    'dnslink-dnsimple',
    'enzyme',
    'enzyme-adapter-react-16',
    'eslint-config-react-app',
    'eslint-config-standard',
    'eslint-plugin-promise',
    'file-extension',
    'filesize',
    'get-port',
    'hashlru',
    'http-proxy',
    'i18next',
    'i18next-browser-languagedetector',
    'i18next-chained-backend',
    'i18next-http-backend',
    'i18next-icu',
    'i18next-localstorage-backend',
    'internal-nav-helper',
    'ip',
    'ipfs-css',
    'istextorbinary',
    'it-all',
    'it-first',
    'it-last',
    'it-map',
    'milliseconds',
    'money-clip',
    'multiaddr-to-uri',
    'npm-run-all',
    'os-browserify',
    'p-memoize',
    'p-queue',
    'path-browserify',
    'prop-types',
    'react',
    'react-ace',
    'react-app-rewired',
    'react-chartjs-2',
    'react-copy-to-clipboard',
    'react-country-flag',
    'react-debounce-render',
    'react-dnd',
    'react-dnd-html5-backend',
    'react-dom',
    'react-faux-dom',
    'react-helmet',
    'react-hook-form',
    'react-i18next',
    'react-identicons',
    'react-joyride',
    'react-overlays',
    'react-virtualized',
    'redux-bundler',
    'redux-bundler-react',
    'run-script-os',
    'shx',
    'stream-browserify',
    'tachyons',
    'typescript',
    'window-or-global'
  ],
  [
    'assert',
    'basic-auth',
    'bundlesize',
    'cross-env',
    'eslint-plugin-import',
    'intl-messageformat',
    'ipfs-geoip',
    'ipfs-provider',
    'topojson',
    'webpack-bundle-analyzer'
  ],
  [
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-node',
    'go-ipfs',
    'http-server',
    'ipfs',
    'ipfsd-ctl',
    'uint8arrays'
  ],
  [ 'multiaddr' ],
  [ 'cids', 'is-ipfs', 'multihashing-async', 'semantic-release' ],
  [ 'ipfs-http-client', 'ipld-explorer-components' ],
  [ 'jest' ],
  [ 'react-scripts' ]
]
npm install -D big.js@latest conventional-changelog-conventionalcommits@latest dnslink-dnsimple@latest enzyme@latest enzyme-adapter-react-16@latest eslint-config-react-app@latest eslint-config-standard@latest eslint-plugin-promise@latest get-port@latest http-proxy@latest npm-run-all@latest os-browserify@latest path-browserify@latest react-app-rewired@latest run-script-os@latest shx@latest stream-browserify@latest typescript@latest
npm install -S brace@latest change-case@latest chart.js@latest classnames@latest countly-sdk-web@latest d3@latest datatransfer-files-promise@latest details-polyfill@latest file-extension@latest filesize@latest hashlru@latest i18next@latest i18next-browser-languagedetector@latest i18next-chained-backend@latest i18next-http-backend@latest i18next-icu@latest i18next-localstorage-backend@latest internal-nav-helper@latest ip@latest ipfs-css@latest istextorbinary@latest it-all@latest it-first@latest it-last@latest it-map@latest milliseconds@latest money-clip@latest multiaddr-to-uri@latest p-memoize@latest p-queue@latest prop-types@latest react@latest react-ace@latest react-chartjs-2@latest react-copy-to-clipboard@latest react-country-flag@latest react-debounce-render@latest react-dnd@latest react-dnd-html5-backend@latest react-dom@latest react-faux-dom@latest react-helmet@latest react-hook-form@latest react-i18next@latest react-identicons@latest react-joyride@latest react-overlays@latest react-virtualized@latest redux-bundler@latest redux-bundler-react@latest tachyons@latest window-or-global@latest
npm install -D assert@latest basic-auth@latest bundlesize@latest cross-env@latest eslint-plugin-import@latest webpack-bundle-analyzer@latest
npm install -S intl-messageformat@latest ipfs-geoip@latest ipfs-provider@latest topojson@latest
npm install -D eslint-plugin-jsx-a11y@latest eslint-plugin-node@latest go-ipfs@latest http-server@latest ipfs@latest ipfsd-ctl@latest
npm install -S uint8arrays@latest
npm install -S multiaddr@latest
npm install -D multihashing-async@latest semantic-release@latest
npm install -S cids@latest is-ipfs@latest
npm install -S ipfs-http-client@latest ipld-explorer-components@latest
npm install -D jest@latest
npm install -S react-scripts@latest
```

**NOTE:** Packages that appear twice in the output ("Dependency update order should be") `string[][]` are packages that both the root and some other dependency depends upon.

## Next Steps

The goal of this package is to make a better story for getting out of npm-dependency-hell. The ideal use-case for this package would work like so:

1. You need to update dependencies
1. You run `npm-dependency-update-order --targets ipfs-http-client@^59.0.0`
1. You're given a list of packages to update, in a specific order, that causes the least amount of pain.
  1. Major semver updates (or other known breaking changes) are called out explicitly via an explicit 'migrate src for breaking change from pkgName@oldVersion to pkgName@newVersion' step.

I think the following features would help us get there:

* Add depcheck support
  * Recommend removal of unused dependencies
* Add in yargs for CLI support
  * Users should be able to filter out dependency updates that aren't related to specific target dependencies. (`--targets`)
  * Users should be able to stop `dependencies.json` and `dependencyUpdateOrder.json` from being written
* Use npm outdated (or similar) output to determine whether a package even needs updated.
* Query the npm registry for details about available versions for each package
  * walk available (updated) versions for each package and determine if that version is a valid update
    * If the version is not a valid update, queue up another walk

## License

Licensed under either of

- Apache 2.0, ([LICENSE-APACHE](LICENSE-APACHE) / <http://www.apache.org/licenses/LICENSE-2.0>)
- MIT ([LICENSE-MIT](LICENSE-MIT) / <http://opensource.org/licenses/MIT>)

## Contribute

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.

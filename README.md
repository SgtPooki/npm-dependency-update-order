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
VERBOSE=1 npm-dependency-update-order

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
> VERBOSE=1 npm-dependency-update-order
Dependency update order should be:  [
  [
    'assert@2.0.0',
    'basic-auth@1.1.0',
    'big.js@5.2.2',
    'brace@0.11.1',
    'change-case@3.1.0',
    'change-case@4.1.2',
    'chart.js@2.9.4',
    'classnames@2.3.1',
    'conventional-changelog-conventionalcommits@5.0.0',
    'countly-sdk-web@19.8.0',
    'd3@5.16.0',
    'datatransfer-files-promise@1.3.1',
    'details-polyfill@1.1.0',
    'dnslink-dnsimple@1.0.1',
    'enzyme-adapter-react-16@1.15.5',
    'enzyme@3.11.0',
    'eslint-config-react-app@7.0.1',
    'eslint-config-standard@17.0.0',
    'eslint-plugin-promise@6.0.0',
    'file-extension@4.0.5',
    'filesize@3.6.1',
    'filesize@6.3.0',
    'filesize@8.0.7',
    'get-port@5.1.1',
    'hashlru@2.3.0',
    'http-proxy@1.18.1',
    'i18next-browser-languagedetector@6.1.3',
    'i18next-chained-backend@3.0.2',
    'i18next-http-backend@1.3.2',
    'i18next-icu@2.0.3',
    'i18next-localstorage-backend@3.1.3',
    'i18next@21.8.8',
    'internal-nav-helper@3.1.0',
    'ip@1.1.5',
    'ip@1.1.8',
    'ipfs-css@1.3.0',
    'ipfs-http-client@52.0.5',
    'is-ipfs@6.0.2',
    'istextorbinary@6.0.0',
    'it-all@1.0.5',
    'it-first@1.0.6',
    'it-last@1.0.5',
    'it-map@1.0.5',
    'jest@27.5.1',
    'milliseconds@1.0.3',
    'money-clip@3.0.5',
    'multiaddr-to-uri@6.0.0',
    'multiaddr-to-uri@8.0.0',
    'multiaddr@10.0.1',
    'multihashing-async@2.1.4',
    'npm-run-all@4.1.5',
    'os-browserify@0.3.0',
    'p-memoize@4.0.1',
    'p-queue@6.6.2',
    'path-browserify@0.0.1',
    'path-browserify@1.0.1',
    'prop-types@15.8.1',
    'react-ace@8.1.0',
    'react-app-rewired@2.2.1',
    'react-chartjs-2@2.11.1',
    'react-copy-to-clipboard@5.0.3',
    'react-country-flag@1.1.0',
    'react-debounce-render@5.0.0',
    'react-dnd-html5-backend@11.1.3',
    'react-dnd@11.1.3',
    'react-dom@16.14.0',
    'react-faux-dom@4.5.0',
    'react-helmet@5.2.1',
    'react-hook-form@6.14.2',
    'react-i18next@11.15.3',
    'react-identicons@1.2.4',
    'react-joyride@2.3.0',
    'react-overlays@2.1.1',
    'react-virtualized@9.22.3',
    'react@16.14.0',
    'redux-bundler-react@1.2.0',
    'redux-bundler@26.1.0',
    'run-script-os@1.1.6',
    'shx@0.3.3',
    'stream-browserify@2.0.2',
    'stream-browserify@3.0.0',
    'tachyons@4.12.0',
    'typescript@4.1.3',
    'uint8arrays@1.1.0',
    'uint8arrays@2.1.3',
    'uint8arrays@2.1.4',
    'uint8arrays@3.0.0',
    'window-or-global@1.0.1'
  ],
  [
    'assert@1.5.0',
    'basic-auth@2.0.1',
    'bundlesize@0.18.1',
    'cross-env@6.0.3',
    'eslint-plugin-import@2.26.0',
    'eslint-plugin-jsx-a11y@6.6.0',
    'eslint-plugin-node@11.1.0',
    'go-ipfs@0.14.0',
    'http-server@0.12.3',
    'intl-messageformat@9.13.0',
    'ipfs-geoip@8.0.0',
    'ipfs-provider@2.1.0',
    'ipfs@0.58.3',
    'is-ipfs@3.0.0',
    'jest@28.1.3',
    'multiaddr@8.1.2',
    'multihashing-async@1.0.0',
    'topojson@3.0.2',
    'uint8arrays@2.1.2',
    'webpack-bundle-analyzer@3.9.0'
  ],
  [
    'cids@1.1.6',
    'ipfsd-ctl@7.2.0',
    'multihashing-async@2.1.2',
    'semantic-release@19.0.3'
  ],
  [
    'ipfs-http-client@49.0.2',
    'ipld-explorer-components@2.4.1',
    'react-scripts@5.0.1'
  ],
  []
]
npm install -D assert@latest basic-auth@latest big.js@latest conventional-changelog-conventionalcommits@latest dnslink-dnsimple@latest enzyme-adapter-react-16@latest enzyme@latest eslint-config-react-app@latest eslint-config-standard@latest eslint-plugin-promise@latest get-port@latest http-proxy@latest jest@latest multihashing-async@latest npm-run-all@latest os-browserify@latest path-browserify@latest path-browserify@latest react-app-rewired@latest run-script-os@latest shx@latest stream-browserify@latest stream-browserify@latest typescript@latest
npm install -S brace@latest change-case@latest change-case@latest chart.js@latest classnames@latest countly-sdk-web@latest d3@latest datatransfer-files-promise@latest details-polyfill@latest file-extension@latest filesize@latest filesize@latest filesize@latest hashlru@latest i18next-browser-languagedetector@latest i18next-chained-backend@latest i18next-http-backend@latest i18next-icu@latest i18next-localstorage-backend@latest i18next@latest internal-nav-helper@latest ip@latest ip@latest ipfs-css@latest ipfs-http-client@latest is-ipfs@latest istextorbinary@latest it-all@latest it-first@latest it-last@latest it-map@latest milliseconds@latest money-clip@latest multiaddr-to-uri@latest multiaddr-to-uri@latest multiaddr@latest p-memoize@latest p-queue@latest prop-types@latest react-ace@latest react-chartjs-2@latest react-copy-to-clipboard@latest react-country-flag@latest react-debounce-render@latest react-dnd-html5-backend@latest react-dnd@latest react-dom@latest react-faux-dom@latest react-helmet@latest react-hook-form@latest react-i18next@latest react-identicons@latest react-joyride@latest react-overlays@latest react-virtualized@latest react@latest redux-bundler-react@latest redux-bundler@latest tachyons@latest uint8arrays@latest uint8arrays@latest uint8arrays@latest uint8arrays@latest window-or-global@latest
npm install -D assert@latest basic-auth@latest bundlesize@latest cross-env@latest eslint-plugin-import@latest eslint-plugin-jsx-a11y@latest eslint-plugin-node@latest go-ipfs@latest http-server@latest ipfs@latest jest@latest multihashing-async@latest webpack-bundle-analyzer@latest
npm install -S intl-messageformat@latest ipfs-geoip@latest ipfs-provider@latest is-ipfs@latest multiaddr@latest topojson@latest uint8arrays@latest
npm install -D ipfsd-ctl@latest multihashing-async@latest semantic-release@latest
npm install -S cids@latest
npm install -S ipfs-http-client@latest ipld-explorer-components@latest react-scripts@latest
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

# webpack-compile-loop

Integrated package for front-end development.

```shell
npm install --save-dev webpack-compile-loop
```

- `dll` build dll bundle
- `dev` build dev assets
- `prod` build prod assets
- `umd` build umd module
- `lint` eslint
- `test` run unit test
- `cov` run coverage test

## Usage

```shell
$ loop dll
$ loop dev
$ loop prod
$ loop umd --name yourModuleName
$ loop lint <dir-or-file>
$ loop test
$ loop cov
```

### TypeScript

Compile by Babel in default.

Add `--compiler typescript` parameter to use typescript compiler.

```shell
$ loop dev --compiler typescript
$ loop prod --compiler ts
```

## Modules

- Webpack
  - css-loader, less-loader, postcss-loader
  - url-loader, file-loader
  - assets-webpack-plugin
  - extract-text-webpack-plugin
- Babel
  - babel-loader, babel-core
  - plugins: import, transform-runtime, transform-decorators-legacy
  - presets: es2015, react, stage-0
- TypeScript
  - awesome-typescript-loader
  - @types of node, react, react-router, react-dom
- Test
  - unit: mocha, co-mocha, power-assert
  - coverage: nyc
- ESLint
  - babel-eslint
  - config: standard
  - plugin: import, node, promise, react, standard

# webpack-compile-loop

Integrated package for front-end development.

```shell
npm install --save-dev webpack-compile-loop
```

## Usage

```shell
# build dll library
$ loop dll

# build dev assets
$ loop dev

# build prod assets
$ loop prod

# run unit test
$ loop test

# build umd module
$ loop umd --name yourModule
```

### TypeScript

Compile by Babel in default.

Add `--compiler typescript` parameter to use typescript compiler.

```shell
$ loop dev --compiler typescript
$ loop prod --compiler ts
```

## Compose

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
  - mocha, power-assert

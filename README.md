# webpack-build-config

Ready to start developing ?

- Nothing else executing following commands.
- No complicated devDependencies which has been integrated.

## Start

```shell
# build library
$ ak lib

# build dev assets
$ ak dev

# build prod assets
$ ak prod
```

### TypeScript

Compile by babel in default.

Add `--parser typescript` parameter to use typescript compiler.

```shell
$ ak dev --parser typescript
$ ak prod --parser ts
```

## Compose

- Webpack
  - css-loader
  - less-loader
  - postcss-loader
  - assets-webpack-plugin
  - extract-text-webpack-plugin
- Babel
  - babel-loader, babel-core
  - plugins: import, transform-runtime, transform-decorators-legacy
  - presets: es2015, react, stage-0
- TypeScript
  - awesome-typescript-loader
  - @types of node, react, react-router, react-dom

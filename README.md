# webpack-compile-loop

- Nothing else except following commands.
- No complicated devDependencies.

## Start

```shell
# build library
$ loop lib

# build dev assets
$ loop dev

# build prod assets
$ loop prod
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

# webpack-hash-manifest-plugin

`webpack-hash-manifest-plugin` 是一个用于 Webpack 4 的插件，可以在构建时为所有输出资源生成包含 MD5 哈希值的 JSON manifest 文件。该插件有助于文件完整性校验、缓存管理或静态资源追踪。

## 功能特点

- 自动为每个输出文件生成 MD5 哈希
- 输出一个 manifest JSON 文件，记录所有资源及其哈希
- 支持自定义 manifest 文件名
- 适用于 Webpack 4

## 安装

```bash
npm install --save-dev webpack-hash-manifest-plugin
```

## 使用方法

1. 将插件引入到你的 `webpack.config.js` 中。
2. 在 `plugins` 配置项中实例化并添加该插件。

### 示例

```js
const path = require('path');
const webpackHashManifestPlugin = require('./index.js');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js'
  },
  plugins: [
    new webpackHashManifestPlugin({
      filename: 'file-md5-manifest.json' // 可选，默认 'webpack-hash-manifest.json'
    })
  ]
};
```

构建完成后，`dist` 目录下会生成类似如下的 manifest 文件：

```json
{
  "bundle.abcdef123456.js": "e99a18c428cb38d5f260853678922e03"
}
```

## 配置项

| 选项名    | 类型     | 默认值                       | 说明                 |
| --------- | -------- | ---------------------------- | -------------------- |
| filename  | `string` | `webpack-hash-manifest.json` | manifest 文件名      |

## 典型应用场景

- 静态资源完整性校验
- CDN 缓存失效控制
- 资源变更追踪

## 许可证

MIT

---

如需更多信息，请查阅 [index.js](index.js)。
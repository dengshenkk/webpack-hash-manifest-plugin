const crypto = require("crypto");

class webpackHashManifestPlugin {
  constructor(options) {
    // 默认选项
    this.options = Object.assign(
      {
        outputSymbol: "[hash]: ",
        filename: "webpack-hash-manifest.json",
      },
      options,
    );
  }

  apply(compiler) {
    let hash = null;
    let startTime = 0;
    let endTime = 0;
    // 使用 'emit' 钩子，它在资源输出到 output 目录之前执行
    compiler.hooks.emit.tap("webpackHashManifestPlugin", (compilation) => {
      startTime = process.hrtime();
      const manifest = {};

      // 遍历所有即将输出的资源
      for (const filename in compilation.assets) {
        // 获取文件内容
        const source = compilation.assets[filename].source();
        // 计算 MD5 哈希
        const hash = crypto.createHash("md5").update(source).digest("hex");
        // 存入 manifest 对象
        manifest[filename] = hash;
      }

      function sortObjectKeysES2019(obj) {
        return Object.fromEntries(
          Object.entries(obj).sort(), // 将对象转换为 [key, value] 数组，排序，再转换回对象
        );
      }

      // 将 manifest 对象转换为 JSON 字符串
      const jsonContent = JSON.stringify(
        sortObjectKeysES2019(manifest),
        null,
        2,
      );
      // 计算 MD5 哈希
      hash = crypto.createHash("md5").update(jsonContent).digest("hex");
      // 将这个 JSON 文件作为一个新的资源添加到 compilation 中
      // Webpack 会自动把它写入到输出目录
      compilation.assets[this.options.filename] = {
        source: () => jsonContent,
        size: () => jsonContent.length,
      };
      endTime = process.hrtime(startTime);
    });

    compiler.hooks.done.tap("outputHash", (stats) => {
      if (stats.hasErrors()) {
        return;
      }

      setTimeout(() => {
        process.nextTick(() => {
          console.log(`${this.options.outputSymbol}`, hash);
        });
      }, 16);
    });
  }
}

module.exports = webpackHashManifestPlugin;

const path = require("path");

module.exports = {
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        additionalData(content, loaderContext) {
          const { resourcePath, rootContext } = loaderContext;
          const relativePath = path.relative(rootContext, resourcePath);
          if (
            relativePath.replace(/\\/g, "/") !==
            "src/uni/styles/variables/variables.scss"
          )
            return (
              '@import "~@/uni/styles/variables/variables.scss";' + content
            );
          return content;
        },
      },
    },
  },
};

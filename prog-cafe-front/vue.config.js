module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
      title: 'PROG.CAFÉ',
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "./src/styles/index.scss";',
      },
    },
  },
};

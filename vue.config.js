module.exports = {
	publicPath:'./',
    configureWebpack: {
      externals: {
        'AMap': 'AMap',
        'AMapUI': 'AMapUI'
         }
    }
  };
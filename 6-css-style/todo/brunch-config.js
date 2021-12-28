// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/, // Files that are not in `app` dir.
      'app.js': /^app/
    }
  },
  stylesheets: {
    joinTo: {
      'app.css': /^app/,
      'vendor.css': /^node_modules/
    }
  },
};

exports.npm = {
  styles: {
    tachyons: ['css/tachyons.css'],
  }
};

exports.plugins = {
  babel: {
    presets: [
      '@babel/preset-react'
    ]
  },
  sass: {
    options: {
      includePaths: [
        'app/styles', 'node_modules'
      ]
    }
  }
};

// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/, // Files that are not in `app` dir.
      'app.js': /^app/
    }
  },
  stylesheets: {joinTo: 'app.css'}
};

// strangely in my brunch-with-express package I did not need to add preset-env
// but here esmodules were not transpiled
exports.plugins = {
  babel: {
    presets: [
      ['@babel/preset-env',
        {
          "targets": "defaults",
          "modules": "auto",
        }
      ],
      '@babel/preset-react'
    ]
  },
  sass: {
    options: {
      includePaths: [
        'app/styles', 'node_modules/'
      ]
    }
  }
};

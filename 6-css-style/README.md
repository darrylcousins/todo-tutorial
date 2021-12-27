# CSS and styling the client app with tachyons

Style the app using tachyons.

Install tachyons

```bash
$ npm install --save tachyons
```

Add lines to brunch-config:

```javascript
exports.npm = {
  styles: {
    tachyons: ['css/tachyons.css']
  }
};

```

Also update `files.stylesheets` section in brunch-config:

```javascript
  stylesheets: {
    joinTo: {
      'app.css': /^app/,
      'vendor.css': /^node_modules/
    }
  },
```

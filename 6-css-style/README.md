# CSS and styling the client app with tachyons

## Sass

Get sass running with brunch:

```bash
$ npm install --save-dev sass-brunch
```

Remove (or copy old app.css) and create sass file:

```bash
$ rm app/assets/app.css
$ mkdir app/styles
$ touch app/styles/app.scss
```

Add sass to plugins with filepath.

```javascript
  sass: {
    options: {
      includePaths: [
        'app/styles', 'node_modules/'
      ]
    }
  }
```

##Tachyons

Style the app using tachyons.

Install tachyons

```bash
$ npm install --save tachyons
```

Add lines to brunch-config:

```javascript
exports.files = {
  ...
  stylesheets: {
    joinTo: {
      'vendor.css': /^node_modules/
    }
  },
};
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

## Icons

Tricky this, fontawesome not easy to work with brunch, webfonts etc.

The easiest way to set up icon fonts for use in any web page is through Google
Fonts. All you need to do is include a single line of HTML:


```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
```

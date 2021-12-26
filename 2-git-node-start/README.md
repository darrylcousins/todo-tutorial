# Tutorial Two

Start using github - more command line practice and networking.

Get directly into basic programming with javascript.

## Git

Set up github account and create first project.

Create ssh key

```bash
  $ ssh-keygen -t ed25519 -C "adam@example.com"
```

Start ssh agent and add key

```bash
$ eval "$(ssh-agent -s)"
$ ssh-add .ssh/id_file
```

Copy public key to clipboard

```bash
$ cat .ssh/id_file.pub
```

Go to github settings -> ssh keys and add key.

Now create a `todo` project using website and clone the repository using ssh.

## NodeJS

Check versions first but basically:

```
  $ su -
  root$ curl -sL https://deb.nodesource.com/setup_14.x | bash - # yes, that is letter x and hypen to finish
  root$ apt install -y nodejs
```

Check versions

```
  $ node -v
  $ npm -v
```

## Clone repository and init

```bash
$ git clone git@github.com:adam/todo.git
$ npm init -y
```

Create `index.js` and introduce programming.

```bash
  $ touch index.js
  $ echo '
    "use-strict";
    console.log("Hello World");
     ' > index.js
  $ node index.js
```

Give run down of basic git commands: status, add, push, etc.


```bash
$ git status
$ git add --all
$ git commit -m 'initialized npm package'

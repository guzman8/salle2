# tasksListVueApp

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

# Bootstrap
This project uses Bootstrap 5.2 classes. The steps followed to include Bootstrap with VueJS 3.0 are:

Install these two packages with npm:

```sh
npm install --save @popperjs/core bootstrap@next
```

Import Bootstrap to src/main.js:

```js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
```

## Bootstrap icons
Also Bootstrap's icons has been installed executing this:

```sh
npm i bootstrap-icons
```

# Pinia
Install Pinia to have a stateful system:
```sh
npm install pinia
```
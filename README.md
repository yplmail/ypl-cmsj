This repo is a springrass for React-Babel-Webpack project. You could use it as a base to build your own web app.

## Features

- Equip with React 0.14, ES6 & Babel 6
- Lint with ESlint and Airbnb's .eslintrc
- Build with Webpack
- Support [hot module replacement](https://webpack.github.io/docs/hot-module-replacement.html)
- Auto Open a new browser tab when Webpack loads, and reload the page when you modified the code
- Use [Commitizen](https://github.com/commitizen/cz-cli) to produce commit message according to [AngularJS convention](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines)
- Support git hook `pre-commit` used to lint and test your code
- Support git hook `commit-msg` used to lint your [commit message](https://github.com/kentcdodds/validate-commit-msg)
- Use [conventional-changelog](https://github.com/ajoslin/conventional-changelog) to generate `CHANGELOG.md`

## How to use

First, you should clone the repo and install the dependencies. 

npm install -g cnpm --registry=https://registry.npm.taobao.org

```bash
$ git clone git@github.com:yplmail/ypl-react.git <yourAppName>
$ cd <yourAppName>
$ cnpm install
```

Then, launch the springrass app.

```bash
$ npm run start
```

## License

MIT

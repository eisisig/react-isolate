WIP

# React Component Isolate

All-in-one development, documentation, testing environment for React components

## Requirements

Until relative plugins work in babel we need few dependancies in the users project

- babel-core
- babel-plugin-react-transform
- react-transform
- react-transform-hmr

~~~sh
npm install babel-plugin-react-transform react-transform react-transform-hmr
~~~

## .babelrc

To use the most out of babel the users project needs to have stage 0 enabled. So in `.babelrc`

~~~json
{
  "stage": 0
}
~~~

## Getting started

### Install 

```bash
npm install -g react-isolate
```

## Configuring

There are 2 ways to configure the runner. From the command-line or with a config file

### CLI

```bash
$ react-isolate --componentsPath=demo/components --fixturesPath=demo/fixtures
```

### isolate.config.js

Create a file in your project root directory named `isolate.config.js` and export the needed variables

```js
module.exports = {
	fixturesPath: 'demo/fixtures',
	componentsPath: 'demo/components'
};

```

## Todo / Ideas

[https://github.com/eisisig/react-isolate/issues]()

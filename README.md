WIP

# React Component Isolate

All-in-one development, documentation, testing environment for React components

## Requirements

Until relative plugins work in babel we need few dependancies in the users project

- babel-core
- babel-plugin-react-transform
- jsx-control-statements
- react-transform
- react-transform-hmr
- react-transform-catch-errors

~~~sh
npm install jsx-control-statements babel-plugin-react-transform react-transform react-transform-catch-errors react-transform-hmr
~~~

## .babelrc

To use the most out of babel the users project needs to have stage 0 enabled. So in `.babelrc`

~~~json
{
  "stage": 0
}
~~~

## Getting started

## Config

### CLI
### isolate.config.js

## Todo / Ideas

- [ ] Make the props docs generator work within webpack context. It is now dependent on node module
- [ ] Allow manually selecting Component for Demo OR manually select Component for the documentation while looking at Demo
- [ ] Make demo's better. Have the main props and demo markup at the same time
- [ ] Make the first fixture be selected by default when navigating to components

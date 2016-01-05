WIP

> ### v2.*.* requires babel v6+

[![wercker status](https://app.wercker.com/status/755b7ad314c8f91c3bed20c8ec2c4bd6/s "wercker status")](https://app.wercker.com/project/bykey/755b7ad314c8f91c3bed20c8ec2c4bd6)

# React Component Isolate

All-in-one development, documentation, testing environment for React components

## Getting started

### Install

``` bash
npm install -g react-isolate
```

## Configuring

There are 2 ways to configure the runner. From the command-line or with a config file

### CLI

``` bash
$ react-isolate --componentsPath=demo/components --fixturesPath=demo/fixtures
```

### isolate.config.js

Create a file in your project root directory named `isolate.config.js` and export the needed variables

``` js
module.exports = {
	fixturesPath: 'demo/fixtures',
	componentsPath: 'demo/components'
};

```

## Folder structure

If components have their own folder I suggest having the fixture for that in the same manner

```
/components
	/MyList
    	MyList.js
/fixtures
	/MyList
    	simple.js
    	alternative.js
```

The system will pick up and match if the component is in a top-level folder but the fixture need to have a folder with the same name

```
/components
	/MyList.js
    /Menu.js
/fixtures
	/MyList
    	simple.js
        alternative.js
    /Menu
    	vertical.js
```



## Todo / Ideas

[https://github.com/eisisig/react-isolate/issues]()

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ramda = require('ramda');
var WeakMap = _interopDefault(require('es6-weak-map'));
var reactRedux = require('react-redux');
var axios = require('axios');
var reactDom = require('react-dom');

var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

babelHelpers.defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

babelHelpers.extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

/**
 * @class ShadowDOM
 * @extends Component
 */

var ShadowDOM = function (_Component) {
    babelHelpers.inherits(ShadowDOM, _Component);


    /**
     * @constructor
     */

    function ShadowDOM() {
        babelHelpers.classCallCheck(this, ShadowDOM);

        var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ShadowDOM).call(this));

        _this.state = { resolving: false };
        return _this;
    }

    /**
     * @method getContainer
     * @return {Object}
     */


    /**
     * @constant propTypes
     * @type {Object}
     */


    babelHelpers.createClass(ShadowDOM, [{
        key: 'getContainer',
        value: function getContainer() {

            // Wrap children in a container if it's an array of children, otherwise
            // simply render the single child which is a valid `ReactElement` instance.
            var children = this.props.component.props.children;
            return children.length ? React__default.createElement(
                'span',
                null,
                children
            ) : children;
        }

        /**
         * @method componentDidMount
         * @return {void}
         */

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {

            // Create the shadow root and take the CSS documents from props.
            // todo: Prefer `attachShadow` if supported by the current browser.
            var root = reactDom.findDOMNode(this).createShadowRoot({ mode: 'open' });
            var cssDocuments = this.props.cssDocuments;
            var container = this.getContainer();

            // Render the passed in component to the shadow root, and then `setState` if there
            // are no CSS documents to be resolved.
            reactDom.render(container, root);
            !cssDocuments && this.setState({ root: root });

            if (cssDocuments.length) {

                // Otherwise we'll fetch and attach the passed in stylesheets which need to be
                // resolved before `state.resolved` becomes `true` again.
                this.setState({ resolving: true, root: root });
                this.attachStylesheets(this.props.cssDocuments);
            }
        }

        /**
         * @method componentDidUpdate
         * @return {void}
         */

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {

            // Updates consist of simply rendering the container element into the shadow root
            // again, as the `this.getContainer()` element contains the passed in component's
            // children.
            reactDom.render(this.getContainer(), this.state.root);
        }

        /**
         * @method attachStylesheets
         * @param cssDocuments {Array|String}
         * @return {void}
         */

    }, {
        key: 'attachStylesheets',
        value: function attachStylesheets(cssDocuments) {
            var _this2 = this;

            var styleElement = document.createElement('style');
            styleElement.setAttribute('type', 'text/css');
            var documents = Array.isArray(cssDocuments) ? cssDocuments : [cssDocuments];

            /**
             * @method fetchStylesheet
             * @param {String} document
             * @return {Promise}
             */
            var fetchStylesheet = function fetchStylesheet(document) {
                return axios.get(document).then(function (response) {
                    return response.data;
                });
            };

            /**
             * @method insertStyleElement
             * @param {Array} cssDocuments
             * @return {void}
             */
            var insertStyleElement = function insertStyleElement(cssDocuments) {

                styleElement.innerHTML = cssDocuments.reduce(function (accumulator, document) {
                    return accumulator + ' ' + document;
                });

                _this2.state.root.appendChild(styleElement);
            };

            Promise.all(documents.map(fetchStylesheet)).then(function (cssDocuments) {
                console.log(cssDocuments);
                insertStyleElement(cssDocuments);
                _this2.setState({ resolving: false });
            });
        }

        /**
         * @method render
         * @return {XML}
         */

    }, {
        key: 'render',
        value: function render() {

            // Take all of the props from the passed in component, minus the `children` props
            // as that's handled by `componentDidMount`.
            var props = ramda.dissoc('children', this.props.component.props);
            var className = this.state.resolving ? 'resolving' : 'resolved';

            // Determine whether to use `class` or `className`, as custom elements do not allow
            // for `className`. See: https://github.com/facebook/react/issues/4933
            var classNames = ((props.className ? props.className : '') + ' ' + className).trim();
            var isSupportedElement = this.props.component.type in React.DOM;
            var propName = isSupportedElement ? 'className' : 'class';

            return React__default.createElement(this.props.component.type, babelHelpers.extends({}, ramda.dissoc('className', props), babelHelpers.defineProperty({}, propName, classNames)));
        }
    }]);
    return ShadowDOM;
}(React.Component);

ShadowDOM.propTypes = {
    component: React.PropTypes.node.isRequired,
    cssDocuments: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array])
};

// Will be used in the future for benchmarking purposes when in dev mode.
// import Perf from 'react-addons-perf';

/**
 * @constant propertyBlacklist
 * @type {String[]}
 */
var propertyBlacklist = ['getInitialState', 'mixins'];

/**
 * @constant propertyWhitelist
 * @type {String[]}
 */
var propertyWhitelist = ['id', 'props', 'context', 'nextProps', 'prevProps', 'dispatch'];

/**
 * @constant identityStore
 * @type {WeakMap}
 */
var identityStore = new WeakMap();

/**
 * @method identityFor
 * @param {Object} context
 * @return {Object}
 */
var identityFor = function identityFor(context) {

  return identityStore.get(context) || function () {
    var id = Symbol('keo/component');
    identityStore.set(context, id);
    return id;
  }();
};

/**
 * @method isFunction
 * @param {Object} x
 * @return {Boolean}
 */
var isFunction = function isFunction(x) {
  return typeof x === 'function';
};

/**
 * When an object is passed then it's simply returned. However if a function is passed
 * it is assumed to be the `render` function, and will therefore return an object with
 * the `render` function as the only key.
 *
 * @method ensureRenderMethod
 * @param {Object|Function} x
 * @return {Object}
 */
var ensureRenderMethod = function ensureRenderMethod(x) {
  return isFunction(x) ? { render: x } : x;
};

/**
 * Takes the developer-defined component and wraps the React life-cycle methods in Keo-defined
 * functions to pass in arguments and remove context (`this`).
 *
 * @method passArguments
 * @param {Object} x
 * @return {Object}
 */
var passArguments = function passArguments(x) {

  var filterArgs = ramda.compose(ramda.pickBy(ramda.complement(ramda.isNil)), ramda.pick(propertyWhitelist));

  // Wrap each developer-defined function in the Keo-defined wrapper, and pass in the
  // arguments for destructuring.
  return ramda.keys(x).reduce(function (accumulator, key) {

    return babelHelpers.extends({}, accumulator, babelHelpers.defineProperty({}, key, function (prop) {
      var _babelHelpers$extends;

      // When an argument has been passed in, `prevProps` is only used in `componentDidUpdate`
      // whereas other lifecycle methods take `nextProps` instead.
      var name = key === 'componentDidUpdate' ? 'prevProps' : 'nextProps';

      // We then gather all of the arguments used for this function, taking the properties from
      // `this` and the first argument, which will be used as either `nextProps` or `prevProps`
      // depending on which function scope we're currently in.
      var props = this.props || {};
      var dispatch = props.dispatch || ramda.identity;
      var args = filterArgs(babelHelpers.extends({}, this, (_babelHelpers$extends = {}, babelHelpers.defineProperty(_babelHelpers$extends, name, prop), babelHelpers.defineProperty(_babelHelpers$extends, 'dispatch', dispatch), babelHelpers.defineProperty(_babelHelpers$extends, 'id', identityFor(this)), _babelHelpers$extends)));

      // Finally filter the arguments against our whitelist; removing arguments which evaluate
      // to "undefined".
      return x[key].call(undefined, babelHelpers.extends({}, args, { args: args }));
    }));
  }, {});
};

/**
 * Takes the component defined as an object blueprint and removes functions that have
 * been forbade by Keo, such as `getInitialState`.
 *
 * @method rejectProps
 * @param {Array} blacklist
 * @param {Object} x
 * @return {Function}
 */
var rejectProps = ramda.curry(function (blacklist, x) {

  return blacklist.reduce(function (accumulator, property) {
    return babelHelpers.extends({}, ramda.dissoc(property, accumulator));
  }, x);
});

/**
 * Yields only the functions when given an array of varying types.
 *
 * @method onlyFunctions
 * @param {Object} x
 * @return {Object}
 */
var onlyFunctions = function onlyFunctions(x) {
  return ramda.pickBy(isFunction, x);
};

/**
 * Determines whether a component should be updated depending on whether its immutable
 * properties have changed as defined in the component's `propTypes`.
 * @see: https://facebook.github.io/react/docs/pure-render-mixin.html
 *
 * @method propsModified
 * @param {Object} propTypes
 * @param {Object} nextProps
 * @return {Function}
 */
var propsModified = ramda.curry(function (propTypes, args) {

  return ramda.keys(propTypes).some(function (key) {
    return args.props[key] !== args.nextProps[key];
  });
});

/**
 * @method applyShouldUpdate
 * @param {Object} definition
 * @param {Object} args
 * @return {Boolean}
 */
var applyShouldUpdate = ramda.curry(function (definition, _ref) {
  var args = _ref.args;
  var _definition$shouldCom = definition.shouldComponentUpdate;
  var shouldComponentUpdate = _definition$shouldCom === undefined ? function () {
    return true;
  } : _definition$shouldCom;

  return propsModified(definition.propTypes, args) && shouldComponentUpdate(args);
});

/**
 * @method shadow
 * @param {Array|String} [cssDocuments = []]
 * @return {Function}
 */
var shadow = function shadow() {
  var cssDocuments = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];


  /**
   * @param {Object} component
   * @return {XML}
   */
  return function (component) {
    return React__default.createElement(ShadowDOM, { cssDocuments: cssDocuments, component: component });
  };
};

/**
 * @method custom
 * @param {Object} component
 * @return {Object}
 */
var custom = function custom(component) {

  /**
   * @method isValid
   * @param {String} name
   * @return {Boolean}
   */
  var isValid = function isValid(name) {
    return (/[a-z]\-[a-z]/i.test(name)
    );
  };

  /**
   * @method register
   * @param {Object} childComponent
   * @return {Object}
   */
  var register = function register(childComponent) {

    // Attempt to register the custom element if it's considered a valid tag.
    var isRegistered = document.createElement(childComponent.type).constructor !== HTMLElement;
    isValid(component.type) && !isRegistered && document.registerElement(component.type);

    if (!childComponent.props.children || !Array.isArray(childComponent.props.children)) {
      return component;
    }

    // Register each child of the current component.
    childComponent.props.children.forEach(register);
  };

  return register(component);
};

/**
 * @method unwrap
 * @param {Object} smartComponent
 */
var unwrap = function unwrap(smartComponent) {
  return smartComponent.WrappedComponent;
};

/**
 * @method stitch
 * @param {Object|Function} definition
 * @param {Object} [mapStateToProps]
 * @return {createClass}
 */
var stitch = function stitch(definition, mapStateToProps) {

  // Create the component by removing forbidden or non-related functions and properties.
  var prepareComponent = ramda.compose(rejectProps(propertyBlacklist), ensureRenderMethod);
  var component = babelHelpers.extends({}, prepareComponent(definition), { shouldComponentUpdate: applyShouldUpdate(definition) });

  // Wrap the methods in Keo-specific functions for applying properties as arguments.
  var encompassMethods = ramda.compose(passArguments, onlyFunctions);

  // Determine whether or not to wrap in React Redux's `connect` and then construct
  // the React component from the prepared blueprint.
  var reduxConnect = mapStateToProps ? reactRedux.connect : function (_) {
    return function (x) {
      return x;
    };
  };
  return reduxConnect(mapStateToProps)(React.createClass(babelHelpers.extends({}, component, encompassMethods(component))));
};

exports.shadow = shadow;
exports.custom = custom;
exports.unwrap = unwrap;
exports.stitch = stitch;
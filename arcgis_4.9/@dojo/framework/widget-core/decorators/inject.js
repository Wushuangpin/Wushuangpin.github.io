//>>built
(function(a){"object"===typeof module&&"object"===typeof module.exports?(a=a(require,exports),void 0!==a&&(module.exports=a)):"function"===typeof define&&define.amd&&define(["require","exports","../../shim/WeakMap","./handleDecorator","./beforeProperties"],a)})(function(a,b){function d(a){var b=a.name,d=a.getProperties;return e.handleDecorator(function(a,e){g.beforeProperties(function(a){var e=this,c=this.registry.getInjector(b);if(c){var g=c.injector,h=c.invalidator,f=k.get(this)||[];0===f.length&&
k.set(this,f);-1===f.indexOf(c)&&(this.own(h.on("invalidate",function(){e.invalidate()})),f.push(c));return d(g(),a)}})(a)})}Object.defineProperty(b,"__esModule",{value:!0});var h=a("../../shim/WeakMap"),e=a("./handleDecorator"),g=a("./beforeProperties"),k=new h.default;b.inject=d;b.default=d});
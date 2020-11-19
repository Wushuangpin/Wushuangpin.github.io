// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../core/tsSupport/extendsHelper","../../../core/PooledArray","./Evented"],function(h,k,e,f,g){return function(c){function b(){var a=null!==c&&c.apply(this,arguments)||this;a.array=new f;return a}e(b,c);b.prototype.clear=function(){0<this.array.length&&this.emit("change",{added:[],removed:this.toArray()});this.array.clear()};Object.defineProperty(b.prototype,"length",{get:function(){return this.array.length},enumerable:!0,configurable:!0});b.prototype.getItemAt=function(a){return this.array.data[a]};
b.prototype.push=function(a){var b=this.array.push(a);this.emit("change",{added:[a],removed:[]});return b};b.prototype.addMany=function(a){var b=this.array.pushArray(a);this.emit("change",{added:a,removed:[]});return b};b.prototype.pushNew=function(){var a=this.array.pushNew();this.emit("change",{added:[a],removed:[]});return a};b.prototype.pop=function(){var a=this.array.pop();void 0!==a&&this.emit("change",{added:[],removed:[a]});return a};b.prototype.removeMany=function(a){a=this.array.removeMany(a);
0<a.length&&this.emit("change",{added:[],removed:a});return a};b.prototype.removeUnordered=function(a){a=this.array.removeUnordered(a);void 0!==a&&this.emit("change",{added:[],removed:[a]});return a};b.prototype.removeUnorderedMany=function(a){a=this.array.removeUnorderedMany(a);0<a.length&&this.emit("change",{added:[],removed:a});return a};b.prototype.toArray=function(){return this.array.toArray()};b.prototype.some=function(a,b){return this.array.some(a,b)};b.prototype.find=function(a,b){return this.array.find(a,
b)};b.prototype.filter=function(a,c,d){d=d||new b;this.array.filter(a,c,d.array);return d};b.prototype.forEach=function(a,b){this.array.forEach(a,b)};return b}(g.Evented)});
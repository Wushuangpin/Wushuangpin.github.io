//>>built
(function(a){"object"===typeof module&&"object"===typeof module.exports?(a=a(require,exports),void 0!==a&&(module.exports=a)):"function"===typeof define&&define.amd&&define(["require","exports","../shim/global","../has/has"],a)})(function(a,b){Object.defineProperty(b,"__esModule",{value:!0});var c=a("../shim/global");a=a("../has/has");a.add("btoa","btoa"in c.default,!0);a.add("atob","atob"in c.default,!0);b.decode=a.default("atob")?function(a){return decodeURIComponent(Array.prototype.map.call(atob(a),
function(a){return"%"+("00"+a.charCodeAt(0).toString(16)).slice(-2)}).join(""))}:function(a){return(new Buffer(a.toString(),"base64")).toString("utf8")};b.encode=a.default("btoa")?function(a){return btoa(encodeURIComponent(a).replace(/%([0-9A-F]{2})/g,function(a,b){return String.fromCharCode(Number("0x"+b))}))}:function(a){return(new Buffer(a.toString(),"utf8")).toString("base64")}});
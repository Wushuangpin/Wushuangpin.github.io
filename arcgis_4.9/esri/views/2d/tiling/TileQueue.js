// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/Accessor ../../../core/QueueProcessor ../../../core/accessorSupport/decorators ../libs/gl-matrix/vec2".split(" "),function(A,B,w,f,x,t,e,y){function z(e,b){e.length=0;b.forEach(function(a){return e.push(a)});return e}var r=new Set,m=[],l=new Map,v=[0,0];return function(u){function b(a){a=u.call(this,a)||this;a._keysToRequests=new Map;a.concurrency=6;a.process=null;a.strategy="scale-first";
a.tileInfoView=null;a.tileServers=null;return a}w(b,u);b.prototype.initialize=function(){var a=this,c="scale-first"===this.strategy?this._peekByScaleFirst.bind(this):this._peekByCenterFirst.bind(this),b=this.tileServers,d=this.concurrency,g=this.process;this._queues=b&&0<b.length?b.map(function(b){return new t({concurrency:d,process:function(c){c=a._keysToRequests.get(c);return g(c,b)},peeker:c})}):[new t({concurrency:d,process:function(c){c=a._keysToRequests.get(c);return g(c)},peeker:c})]};Object.defineProperty(b.prototype,
"length",{get:function(){return this._queues.reduce(function(a,c){return a+c.length},0)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"onGoingCount",{get:function(){return this._keysToRequests.size},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"updating",{get:function(){return 0<this.length||0<this.onGoingCount},enumerable:!0,configurable:!0});b.prototype.clear=function(){for(var a=0,c=this._queues;a<c.length;a++)c[a].clear();this._keysToRequests.clear();
this.notifyChange("updating")};b.prototype.find=function(a,c){var b=this;c=0;for(var d=this._queues;c<d.length;c++){var g=d[c].find(function(c){return a(b._keysToRequests.get(c).key)});if(g)return g}};b.prototype.getPromise=function(a){a="string"===typeof a?a:a.id;for(var c=0,b=this._queues;c<b.length;c++){var d=b[c].get(a);if(d)return d}};b.prototype.getRequest=function(a){return this._keysToRequests.get("string"===typeof a?a:a.id)};b.prototype.has=function(a){return"string"===typeof a?this._keysToRequests.has(a):
this._keysToRequests.has(a.id)};b.prototype.isOngoing=function(a){var c="string"===typeof a?a:a.id;return this.has(c)&&this._queues.some(function(a){return a.isOngoing(c)})};b.prototype.pause=function(){for(var a=0,c=this._queues;a<c.length;a++)c[a].pause()};b.prototype.push=function(a){var c=this,b=a.key.id;if(this.has(b))return this.getPromise(b);var d=this._queues[a.key.row%this._queues.length].push(b),g=function(){c._keysToRequests.delete(b);c.notifyChange("updating")};this._keysToRequests.set(b,
a);d.then(g,g);this.notifyChange("updating");return d};b.prototype.reset=function(){for(var a=0,b=this._queues;a<b.length;a++)b[a].reset();this.notifyChange("updating")};b.prototype.resume=function(){for(var a=0,b=this._queues;a<b.length;a++)b[a].resume()};b.prototype._peekByScaleFirst=function(a){if(!this.state)return a[0];for(var b=this.tileInfoView,e=Number.NEGATIVE_INFINITY,d=Number.POSITIVE_INFINITY,g=0;g<a.length;g++){var f=this._keysToRequests.get(a[g]),k=this.tileInfoView.getTileScale(f.key);
l.has(k)||(l.set(k,[]),e=Math.max(k,e),d=Math.min(k,d));l.get(k).push(f.key);r.add(k)}var h=this.state.scale;l.has(h)||(z(m,r),m.sort(),h=m.reduce(function(a,b,c,d){return Math.abs(b-h)<Math.abs(a-h)?b:a},m[0]));h=Math.min(h,e);h=Math.max(h,d);a=l.get(h);var n=b.getClosestInfoForScale(h),p=n.getColumnForX(this.state.center[0]),q=n.getRowForY(this.state.center[1]);a.sort(function(a,b){var c=n.denormalizeCol(a.col,a.world),d=n.denormalizeCol(b.col,b.world);return Math.sqrt((p-c)*(p-c)+(q-a.row)*(q-
a.row))-Math.sqrt((p-d)*(p-d)+(q-b.row)*(q-b.row))});r.clear();l.clear();return a[0].id};b.prototype._peekByCenterFirst=function(a){if(!this.state)return a[0];for(var b=this.tileInfoView,e=this.state.center,d=Number.POSITIVE_INFINITY,g=null,f=0;f<a.length;f++){var k=this._keysToRequests.get(a[f]);b.getTileCoords(v,k.key);var h=y.distance(v,e);h<d&&(d=h,g=k.key)}return g.id};f([e.property({constructOnly:!0})],b.prototype,"concurrency",void 0);f([e.property({constructOnly:!0})],b.prototype,"process",
void 0);f([e.property()],b.prototype,"state",void 0);f([e.property({constructOnly:!0})],b.prototype,"strategy",void 0);f([e.property({constructOnly:!0})],b.prototype,"tileInfoView",void 0);f([e.property({constructOnly:!0})],b.prototype,"tileServers",void 0);f([e.property({readOnly:!0})],b.prototype,"updating",null);return b=f([e.subclass()],b)}(e.declared(x))});
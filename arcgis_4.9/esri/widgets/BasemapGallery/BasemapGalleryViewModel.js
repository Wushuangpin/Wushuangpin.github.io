// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/Accessor ../../core/Collection ../../core/Handles ../../core/Loadable ../../core/promiseUtils ../../core/watchUtils ../../core/accessorSupport/decorators ../../support/basemapUtils ./support/basemapCompatibilityUtils ./support/BasemapGalleryItem ./support/LocalBasemapsSource ./support/PortalBasemapsSource".split(" "),function(w,x,n,d,p,f,q,r,t,g,c,u,h,k,v,e){var l=f.ofType(k);return function(m){function b(a){a=
m.call(this)||this;a._handles=new q;a.activeBasemap=null;a.items=new l;a.source=new e;a.view=null;return a}n(b,m);b.prototype.initialize=function(){var a=this;this._handles.add([g.init(this,["compatibilityFunction","state"],function(){return a._updateItems()}),g.on(this,"source.basemaps","change",function(){return a._updateItems()})])};b.prototype.destroy=function(){this._handles.destroy();this._handles=null};Object.defineProperty(b.prototype,"compatibilityFunction",{get:function(){return void 0===
this._get("compatibilityFunction")?"3d"===this.get("view.type")?h.default3DCompatibility:h.default2DCompatibility:this._get("compatibilityFunction")},set:function(a){this._set("compatibilityFunction",a)},enumerable:!0,configurable:!0});b.prototype.castSource=function(a){return Array.isArray(a)||f.isCollection(a)?new v({basemaps:a}):a&&"esri.portal.Portal"===a.declaredClass?new e({portal:a}):!a||a instanceof e||!a.portal&&!a.query?a&&"basemaps"in a&&"state"in a&&"refresh"in a?a:null:new e(a)};Object.defineProperty(b.prototype,
"state",{get:function(){return this.get("view.ready")&&this.source?"ready":"disabled"},enumerable:!0,configurable:!0});b.prototype.load=function(){this.addResolvingPromise("function"===typeof this.source.load?this.source.load():t.resolve());return this.when()};b.prototype.basemapEquals=function(a,b){return u.contentEquals(a,b)};b.prototype.refresh=function(){this._updateItems()};b.prototype._updateItems=function(){if("disabled"!==this.state){var a=this.get("source.basemaps"),b=this.view,c=this.compatibilityFunction;
this.items.removeAll().forEach(function(a){return a.destroy()});this.items.addMany(a.map(function(a){return new k({basemap:a,compatibilityFunction:c,view:b})}))}};d([c.property({aliasOf:"view.map.basemap"})],b.prototype,"activeBasemap",void 0);d([c.property({dependsOn:["view.type"]})],b.prototype,"compatibilityFunction",null);d([c.property({readOnly:!0,type:l})],b.prototype,"items",void 0);d([c.property()],b.prototype,"source",void 0);d([c.cast("source")],b.prototype,"castSource",null);d([c.property({readOnly:!0,
dependsOn:["view.ready"]})],b.prototype,"state",null);d([c.property()],b.prototype,"view",void 0);return b=d([c.subclass("esri.widgets.BasemapGallery.BasemapGalleryViewModel")],b)}(c.declared(p,r))});
// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../geometry ../../../Graphic ../../../core/Accessor ../../../core/Collection ../../../core/Error ../../../core/has ../../../core/kebabDictionary ../../../core/Loadable ../../../core/Logger ../../../core/requireUtils ../../../core/workers ../../../core/accessorSupport/decorators ../../../core/accessorSupport/ensureType ../../../core/accessorSupport/typescript ../../../tasks/support/FeatureSet module".split(" "),
function(t,m,u,f,v,p,h,w,q,x,y,z,A,B,C,l,D,E,F,G){function n(d){var b=d.geometry;d=d.attributes;return{geometry:b&&"mesh"!==b.type?b&&b.toJSON():null,attributes:d}}Object.defineProperty(m,"__esModule",{value:!0});var H=y({esriGeometryPoint:"point",esriGeometryMultipoint:"multipoint",esriGeometryPolyline:"polyline",esriGeometryPolygon:"polygon",esriGeometryMultiPatch:"multipatch"}),I=A.getLogger("esri.layers.graphics.sources.MemorySource");h=function(d){function b(){return null!==d&&d.apply(this,arguments)||
this}u(b,d);b.prototype.load=function(){var a=this;this.addResolvingPromise(C.open(B.getAbsMid("./support/MemorySourceWorker",t,G),{client:this,strategy:x("esri-workers-for-memory-layers")?"dedicated":"local"}).then(function(b){a._connection=b;var c=a.layer,d=c.fields,r=c.spatialReference,f=c.geometryType,g=c.objectIdField,e=c.hasM,c=c.hasZ;return b.invoke("load",{features:a.items.map(n),fields:d&&d.map(function(a){return a.toJSON()}),geometryType:H.toJSON(f),hasM:e,hasZ:c,objectIdField:g,spatialReference:r&&
r.toJSON()}).then(function(c){c.featureErrors.length&&I.warn("Encountered "+c.featureErrors.length+" validation errors while loading features",c.featureErrors);a.layerDefinition=c.layerDefinition})}));return this.when()};b.prototype.applyEdits=function(a){var c=this;return this.load().then(function(){return c._applyEdits(a)})};b.prototype.openPorts=function(){var a=this;return this.load().then(function(){return a._connection.openPorts()})};b.prototype.queryFeatures=function(a){return this.queryFeaturesJSON(a).then(function(a){return F.fromJSON(a)})};
b.prototype.queryFeaturesJSON=function(a){var c=this;return this.load().then(function(){return c._connection.invoke("queryFeatures",a?a.toJSON():null)})};b.prototype.queryFeatureCount=function(a){var c=this;return this.load().then(function(){return c._connection.invoke("queryFeatureCount",a?a.toJSON():null)})};b.prototype.queryObjectIds=function(a){var c=this;return this.load().then(function(){return c._connection.invoke("queryObjectIds",a?a.toJSON():null)})};b.prototype.queryExtent=function(a){var c=
this;return this.load().then(function(){return c._connection.invoke("queryExtent",a?a.toJSON():null)}).then(function(a){return{count:a.count,extent:v.Extent.fromJSON(a.extent)}})};b.prototype._applyEdits=function(a){var c=this;if(!this._connection)throw new q("feature-layer-source:edit-failure","Memory source not loaded");var b=this.layer.objectIdField,d=[],f=[],h=[];if(a.addFeatures)for(var g=0,e=a.addFeatures;g<e.length;g++){var k=e[g];d.push(n(k))}if(a.deleteFeatures)for(k=0,g=a.deleteFeatures;k<
g.length;k++)e=g[k],"objectId"in e&&null!=e.objectId?f.push(e.objectId):"attributes"in e&&null!=e.attributes[b]&&f.push(e.attributes[b]);if(a.updateFeatures)for(b=0,a=a.updateFeatures;b<a.length;b++)k=a[b],h.push(n(k));return this._connection.invoke("applyEdits",{adds:d,updates:h,deletes:f}).then(function(a){var b=a.featureEditResults;c.fullExtent=a.fullExtent;return c._createEditsResult(b)})};b.prototype._createEditsResult=function(a){return{addFeatureResults:a.addResults?a.addResults.map(this._createFeatureEditResult,
this):[],updateFeatureResults:a.updateResults?a.updateResults.map(this._createFeatureEditResult,this):[],deleteFeatureResults:a.deleteResults?a.deleteResults.map(this._createFeatureEditResult,this):[]}};b.prototype._createFeatureEditResult=function(a){var b=!0===a.success?null:a.error||{code:void 0,description:void 0};return{objectId:a.objectId,globalId:a.globalId,error:b?new q("feature-layer-source:edit-failure",b.description,{code:b.code}):null}};f([E.shared({Type:p,ensureType:D.ensureType(p)})],
b.prototype,"itemType",void 0);f([l.property({constructOnly:!0})],b.prototype,"layer",void 0);f([l.property()],b.prototype,"layerDefinition",void 0);return b=f([l.subclass("esri.layers.graphics.sources.MemorySource")],b)}(l.declared(h,w,z));m.MemorySource=h;m.default=h});
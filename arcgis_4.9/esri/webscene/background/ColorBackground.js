// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/tsSupport/assignHelper ../../Color ../../core/accessorSupport/decorators ../../symbols/support/materialUtils ./Background".split(" "),function(n,p,f,c,g,h,b,k,l){var m=g({},k.colorAndTransparencyProperty,{nonNullable:!0});return function(e){function a(a){a=e.call(this)||this;a.type="color";a.color=new h([0,0,0,1]);return a}f(a,e);d=a;a.prototype.clone=function(){return new d(this.cloneProperties())};
a.prototype.cloneProperties=function(){return{color:this.color.clone()}};var d;c([b.enumeration.serializable()({color:"color"})],a.prototype,"type",void 0);c([b.property(m)],a.prototype,"color",void 0);return a=d=c([b.subclass("esri.webscene.background.ColorBackground")],a)}(b.declared(l))});
// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/Accessor ../core/accessorSupport/decorators".split(" "),function(k,l,g,d,h,b){return function(f){function a(){for(var c=[],a=0;a<arguments.length;a++)c[a]=arguments[a];c=f.apply(this,c)||this;c.x=0;c.y=0;c.z=void 0;return c}g(a,f);e=a;a.prototype.normalizeCtorArgs=function(a,b){return"number"===typeof a?{x:a,y:b}:Array.isArray(a)?{x:a[0],y:a[1]}:a};a.prototype.clone=function(){return new e({x:this.x,
y:this.y,z:this.z})};a.prototype.toArray=function(){return null==this.z?[this.x,this.y]:[this.x,this.y,this.z]};var e;d([b.property({type:Number})],a.prototype,"x",void 0);d([b.property({type:Number})],a.prototype,"y",void 0);d([b.property({type:Number})],a.prototype,"z",void 0);return a=e=d([b.subclass("esri.geometry.ScreenPoint")],a)}(b.declared(h))});
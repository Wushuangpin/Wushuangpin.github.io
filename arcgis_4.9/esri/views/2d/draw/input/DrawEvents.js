// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/tsSupport/declareExtendsHelper"],function(b,e,f){Object.defineProperty(e,"__esModule",{value:!0});b=function(){function a(a,b,c,d){this.view=a;this.native=b;this.vertexIndex=c;this.vertices=d;this.defaultPrevented=!1;this.type="vertex-add"}a.prototype.preventDefault=function(){this.defaultPrevented=!0};return a}();e.VertexAddEvent=b;b=function(){function a(a,b,c,d){this.view=a;this.native=b;this.vertexIndex=c;this.vertices=d;this.defaultPrevented=!1;this.type=
"vertex-update"}a.prototype.preventDefault=function(){this.defaultPrevented=!0};return a}();e.VertexUpdateEvent=b;b=function(){function a(a,b,c,d){this.view=a;this.native=b;this.vertexIndex=c;this.vertices=d;this.defaultPrevented=!1;this.type="vertex-remove"}a.prototype.preventDefault=function(){this.defaultPrevented=!0};return a}();e.VertexRemoveEvent=b;b=function(){function a(a,b,c,d){this.view=a;this.native=b;this.vertexIndex=c;this.vertices=d;this.defaultPrevented=!1;this.type="cursor-update"}
a.prototype.preventDefault=function(){this.defaultPrevented=!0};return a}();e.CursorUpdateEvent=b;b=function(){function a(a,b){this.native=a;this.vertices=b;this.defaultPrevented=!1;this.type="draw-complete"}a.prototype.preventDefault=function(){this.defaultPrevented=!0};return a}();e.DrawCompleteEvent=b});
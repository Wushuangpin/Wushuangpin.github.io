// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper ../../support/buffer/InterleavedLayout ../lib/GLMaterial ../lib/Material ../lib/RenderSlot ../lib/Util ./internal/bufferWriters ./internal/MaterialUtil ./internal/MaterialUtil ../shaders/CheckerBoardPrograms".split(" "),function(f,x,h,n,p,q,k,e,l,g,r,t){f=function(b){function a(c,a){a=b.call(this,a)||this;a.canBeMerged=!1;a.bufferWriter=new u;a.params=g.copyParameters(c,v);return a}h(a,b);a.prototype.dispose=function(){};a.prototype.getParameterValues=
function(){var c=this.params;return{size:c.size,color1:c.color1,color2:c.color2,transparent:c.transparent,polygonOffset:c.polygonOffset}};a.prototype.setParameterValues=function(c){g.updateParameters(this.params,c)&&this.notifyDirty("matChanged")};a.prototype.getParams=function(){return this.params};a.prototype.intersect=function(c,a,d,b,e,g,f,h){return r.intersectTriangleGeometry(c,a,d,b,e,g,f)};a.prototype.getGLMaterials=function(){return{color:w,depthShadowMap:void 0,normal:void 0,depth:void 0,
highlight:void 0}};a.prototype.getAllTextureIds=function(){return[]};return a}(q);var w=function(b){function a(c,a,d){d=b.call(this,c,a)||this;d.programRep=a;d.params=g.copyParameters(c.getParams());d.selectProgram();return d}h(a,b);a.prototype.selectProgram=function(){this.program=this.programRep.getProgram(t.colorPass)};a.prototype.updateParameters=function(){this.params=this.material.getParameterValues();this.selectProgram()};a.prototype.beginSlot=function(a){return a===(this.params.transparent?
k.TRANSPARENT_MATERIAL:k.OPAQUE_MATERIAL)};a.prototype.getProgram=function(){return this.program};a.prototype.getDrawMode=function(a){return 4};a.prototype.bind=function(a,b){b=this.program;a.setDepthTestEnabled(!0);a.setDepthWriteEnabled(!1);a.setFaceCullingEnabled(!1);this.params.transparent&&(a.setBlendingEnabled(!0),a.setBlendFunctionSeparate(770,771,1,771));this.params.polygonOffset&&(a.setPolygonOffsetFillEnabled(!0),a.setPolygonOffset(0,-25));a.bindProgram(b);b.setUniform2fv("size",this.params.size);
b.setUniform4fv("color1",this.params.color1);b.setUniform4fv("color2",this.params.color2)};a.prototype.bindView=function(a,b){a=b.origin;var c=this.getProgram();g.bindView(a,b.view,c)};a.prototype.bindInstance=function(a,b){this.getProgram().setUniformMatrix4fv("model",b.transformation)};a.prototype.release=function(a){a.setDepthWriteEnabled(!0);this.params.transparent&&a.setBlendingEnabled(!1);this.params.polygonOffset&&a.setPolygonOffsetFillEnabled(!1)};return a}(p),v={size:[1,1],color1:[.75,.75,
.75,1],color2:[.5,.5,.5,1],transparent:!1,polygonOffset:!1},m=n.newLayout().vec3f(e.VertexAttrConstants.POSITION).vec2f(e.VertexAttrConstants.UV0),u=function(){function b(){this.vertexBufferLayout=m}b.prototype.allocate=function(a){return m.createBuffer(a)};b.prototype.elementCount=function(a){return a.indices[e.VertexAttrConstants.POSITION].length};b.prototype.write=function(a,b,g,d,f){l.writePosition(b.indices[e.VertexAttrConstants.POSITION],b.vertexAttr[e.VertexAttrConstants.POSITION].data,a.transformation,
d.position,f);l.writeBufferVec2(b.indices[e.VertexAttrConstants.UV0],b.vertexAttr[e.VertexAttrConstants.UV0].data,d.uv0,f)};return b}();return f});
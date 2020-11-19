// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../../../geometry ../../../../geometry/support/aaBoundingBox ../../../../geometry/support/aaBoundingRect ../../../../geometry/support/centroid ../../../../geometry/support/coordsUtils ../../../../geometry/support/webMercatorUtils ../../../../layers/graphics/dehydratedFeatures ../../lib/gl-matrix ../../support/mathUtils".split(" "),function(A,e,n,q,w,x,r,t,m,l,y){function u(a){var b=a.paths[0];if(!b||0===b.length)return null;b=r.getPointOnPath(b,r.getPathLength(b)/2);return m.makeDehydratedPoint(b[0],
b[1],b[2],a.spatialReference)}function v(a){if(Array.isArray(a)){for(var b=0;b<a.length;b++)if(!v(a[b]))return!1;return!0}return null==a||0<=a}Object.defineProperty(e,"__esModule",{value:!0});var z=[1,1,1];e.computeCentroid=function(a){if("point"===a.type)return a;if(m.isHydratedGeometry(a))switch(a.type){case "extent":return a.center;case "polygon":return a.centroid;case "polyline":return u(a);case "mesh":return a.extent.center}else switch(a.type){case "extent":var b=y.isFinite(a.zmin);return m.makeDehydratedPoint(.5*
(a.xmax+a.xmin),.5*(a.ymax+a.ymin),b?.5*(a.zmax+a.zmin):void 0,a.spatialReference);case "polygon":return(b=a.rings[0])&&0!==b.length?(b=x.ringsCentroid(a.rings,a.hasZ),a=m.makeDehydratedPoint(b[0],b[1],b[2],a.spatialReference)):a=null,a;case "polyline":return u(a)}};e.convertPointSR=function(a,b){var c=a.spatialReference;c.isWebMercator&&b.isWGS84?(t.xyToLngLat(a.x,a.y,g),a.x=g[0],a.y=g[1],a.spatialReference=n.SpatialReference.WGS84):b.isWebMercator&&c.isWGS84&&(t.lngLatToXY(a.x,a.y,g),a.x=g[0],a.y=
g[1],a.spatialReference=n.SpatialReference.WebMercator)};e.enlargeExtent=function(a,b,c){if(a){b||(b=w.create());var d=.5*a.width*(c-1);c=.5*a.height*(c-1);a.width<1E-7*a.height?d+=c/20:a.height<1E-7*a.width&&(c+=d/20);l.vec4d.set4(a.xmin-d,a.ymin-c,a.xmax+d,a.ymax+c,b);return b}return null};e.updateVertexAttributeAuxpos1w=function(a,b){for(var c=0;c<a.geometries.length;++c){var d=a.geometries[c].data.vertexAttributes.auxpos1;d&&d.data[3]!==b&&(d.data[3]=b,a.geometryVertexAttrsUpdated(c))}};e.mixinColorAndOpacity=
function(a,b){var c=[1,1,1,1];null!=a&&(c[0]=a[0],c[1]=a[1],c[2]=a[2]);null!==b&&void 0!==b?c[3]=b:null!=a&&3<a.length&&(c[3]=a[3]);return c};e.overrideColor=function(a,b,c,d,h,e){void 0===e&&(e=[0,0,0,0]);for(var k=0;3>k;++k)e[k]=a&&null!=a[k]?a[k]:c&&null!=c[k]?c[k]:h[k];e[3]=null!=b?b:null!=d?d:h[3];return e};e.computeObjectScale=function(a,b,c,d){void 0===a&&(a=z);void 0===d&&(d=1);var h=Array(3);if(null==b||null==c)h[0]=1,h[1]=1,h[2]=1;else{for(var e=void 0,k=0,f=2;0<=f;f--){var g=a[f],l=void 0,
m=null!=g,n=0===f&&!e&&!m,p=c[f];"symbolValue"===g||n?l=0!==p?b[f]/p:1:m&&"proportional"!==g&&isFinite(g)&&(l=0!==p?g/p:1);null!=l&&(e=h[f]=l,k=Math.max(k,Math.abs(l)))}for(f=2;0<=f;f--)null==h[f]?h[f]=e:0===h[f]&&(h[f]=.001*k)}for(f=2;0<=f;f--)h[f]/=d;return h};e.computeSizeWithResourceSize=function(a,b){var c=b.width,d=b.depth,e=b.height;b=b.isPrimitive?10:1;if(null==c&&null==e&&null==d)return[b*a[0],b*a[1],b*a[2]];for(var c=[c,d,e],g,d=0;3>d;d++)if(e=c[d],null!=e){g=e/a[d];break}for(d=0;3>d;d++)null==
c[d]&&(c[d]=a[d]*g);return c};e.validateSymbolLayerSize=function(a){null!=a.isPrimitive&&(a=[a.width,a.depth,a.height]);return v(a)?null:"Symbol sizes may not be negative values"};e.computeObjectRotation=function(a,b,c,d){void 0===d&&(d=l.mat4d.identity());a=a||0;b=b||0;c=c||0;0!==a&&l.mat4d.rotateZ(d,-a/180*Math.PI,d);0!==b&&l.mat4d.rotateX(d,b/180*Math.PI,d);0!==c&&l.mat4d.rotateY(d,c/180*Math.PI,d);return d};e.demResolutionForBoundingBox=function(a,b){return null!=b.minDemResolution?b.minDemResolution:
q.isPoint(a)?b.minDemResolutionForPoints:.01*q.maximumDimension(a)};var g=[0,0]});
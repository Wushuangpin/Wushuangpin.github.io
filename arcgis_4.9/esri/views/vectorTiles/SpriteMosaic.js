// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ./GeometryUtils ./Rect ./RectangleBinPack ../webgl/Texture".split(" "),function(u,v,q,r,l,t){return function(){function d(a,c,b){void 0===b&&(b=0);this._size=[];this._mosaicsData=[];this._textures=[];this._dirties=[];this._pageHeight=this._pageWidth=this._currentPage=this._maxItemSize=0;this._mosaicRects={};this.pixelRatio=1;(0>=a||0>=c)&&console.error("Sprites mosaic defaultWidth and defaultHeight must be greater than zero!");this._pageWidth=a;this._pageHeight=c;0<b&&(this._maxItemSize=
b);this._binPack=new l(a-4,c-4)}d.prototype.getWidth=function(a){return a>=this._size.length?-1:this._size[a][0]};d.prototype.getHeight=function(a){return a>=this._size.length?-1:this._size[a][1]};d.prototype.setSpriteSource=function(a){this.dispose();this.pixelRatio=a.devicePixelRatio;if(0===this._mosaicsData.length){this._binPack=new l(this._pageWidth-4,this._pageHeight-4);var c=new Uint32Array(Math.floor(this._pageWidth)*Math.floor(this._pageHeight));this._mosaicsData[0]=c;this._dirties.push(!0);
this._size.push([this._pageWidth,this._pageHeight]);this._textures.push(void 0)}this._sprites=a};d.prototype.getSpriteItem=function(a,c){void 0===c&&(c=!1);var b=this._mosaicRects[a];if(b)return b;if(!this._sprites||"loaded"!==this._sprites.loadStatus)return null;b=this._sprites.getSpriteInfo(a);if(!b||!b.width||!b.height||0>b.width||0>b.height)return null;var f=b.width,d=b.height,h=this._allocateImage(f,d),g=h[0],e=h[1];if(0>=g.width)return null;this._copy(g,b,e,h[2],c);b={rect:g,width:f,height:d,
anchorX:0,anchorY:0,sdf:b.sdf,pixelRatio:b.pixelRatio,page:e};return this._mosaicRects[a]=b};d.prototype.preloadSpriteItems=function(){for(var a=0,c=this._sprites.spriteNames;a<c.length;a++)this.getSpriteItem(c[a],!0)};d.prototype.getSpriteItems=function(a){for(var c={},b=0;b<a.length;b++){var f=a[b];c[f]=this.getSpriteItem(f)}return c};d.prototype.getMosaicItemPosition=function(a,c){c=(a=this.getSpriteItem(a,c))&&a.rect;if(!c)return null;c.width=a.width;c.height=a.height;return{size:[a.width,a.height],
tl:[(c.x+2)/this._size[a.page][0],(c.y+2)/this._size[a.page][1]],br:[(c.x+2+a.width)/this._size[a.page][0],(c.y+2+a.height)/this._size[a.page][1]],page:a.page}};d.prototype.bind=function(a,c,b,f){void 0===b&&(b=0);void 0===f&&(f=0);this._textures[b]||(this._textures[b]=new t(a,{pixelFormat:6408,dataType:5121,width:this._size[b][0],height:this._size[b][1]},new Uint8Array(this._mosaicsData[b].buffer)));var d=this._textures[b];d.setSamplingMode(c);this._dirties[b]&&d.setData(new Uint8Array(this._mosaicsData[b].buffer));
a.bindTexture(d,f);this._dirties[b]=!1};d._copyBits=function(a,c,b,f,d,h,g,e,m,n,k){var p=f*c+b;g=e*h+g;if(k)for(g-=h,k=-1;k<=n;k++,p=((k+n)%n+f)*c+b,g+=h)for(e=-1;e<=m;e++)d[g+e]=a[p+(e+m)%m];else for(k=0;k<n;k++){for(e=0;e<m;e++)d[g+e]=a[p+e];p+=c;g+=h}};d.prototype._copy=function(a,c,b,f,l,h){if(this._sprites&&"loaded"===this._sprites.loadStatus&&!(b>=this._mosaicsData.length)){var g=new Uint32Array(h?h.buffer:this._sprites.image.buffer),e=this._mosaicsData[b];e&&g||console.error("Source or target images are uninitialized!");
d._copyBits(g,h?c.width:this._sprites.width,c.x,c.y,e,f[0],a.x+2,a.y+2,c.width,c.height,l);this._dirties[b]=!0}};d.prototype._allocateImage=function(a,c){a+=2;c+=2;var b=Math.max(a,c);if(this._maxItemSize&&this._maxItemSize<b){var b=Math.pow(2,Math.ceil(q.log2(a))),d=Math.pow(2,Math.ceil(q.log2(c)));a=new r(0,0,a,c);this._mosaicsData.push(new Uint32Array(b*d));this._dirties.push(!0);this._size.push([b,d]);this._textures.push(void 0);return[a,this._mosaicsData.length-1,[b,d]]}b=a%4?4-a%4:4;d=c%4?4-
c%4:4;1===b&&(b=5);1===d&&(d=5);b=this._binPack.allocate(a+b,c+d);return 0>=b.width?(this._dirties[this._currentPage]||(this._mosaicsData[this._currentPage]=null),this._currentPage=this._mosaicsData.length,this._mosaicsData.push(new Uint32Array(this._pageWidth*this._pageHeight)),this._dirties.push(!0),this._size.push([this._pageWidth,this._pageHeight]),this._textures.push(void 0),this._binPack=new l(this._pageWidth-4,this._pageHeight-4),this._allocateImage(a,c)):[b,this._currentPage,[this._pageWidth,
this._pageHeight]]};d.prototype.dispose=function(){this._binPack=null;this._mosaicRects={};for(var a=0,c=this._textures;a<c.length;a++){var b=c[a];b&&b.dispose()}this._textures.length=0};return d}()});
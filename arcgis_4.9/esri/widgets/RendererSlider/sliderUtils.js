// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require ../../core/numberUtils dojo/i18n!./nls/RendererSlider dojo/dom-style dojo/string dijit/Tooltip dojox/gfx".split(" "),function(z,u,v,d,w,x,y){return{histogramXAvgPadding:18,labelTopOffset:3,generateTransparentBackground:function(a,b,c,g){a=a.createRect({width:b,height:c}).setFill(g?this.getTransparentFill():null);a.moveToBack();return a},getTransparentFill:function(){return{type:"pattern",x:0,y:0,width:16,height:16,src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgaGVpZ2h0PSIxNiIgd2lkdGg9IjE2Ij48cGF0aCBkPSJNMCAwIEw4IDAgTDggOCBMMCA4IFoiIGZpbGw9IiNjY2MiIC8+PHBhdGggZD0iTTAgMCBMOCAwIEw4IDggTDAgOCBaIiBmaWxsPSIjZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDgpIiAvPjxwYXRoIGQ9Ik0wIDAgTDggMCBMOCA4IEwwIDggWiIgZmlsbD0iI2NjYyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOCw4KSIgLz48cGF0aCBkPSJNMCAwIEw4IDAgTDggOCBMMCA4IFoiIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgsMCkiIC8+PC9zdmc+"}},
generateHistogramSurface:function(a,b,c,g){a=y.createSurface(a,b,c);d.set(a.rawNode,{overflow:"visible",display:"inline-block",left:g+"px"});a.rawNode.setAttribute("class","esri-histogram-surface");return a},generateCountTooltips:function(a,b){var c=[];a=(a.bins||[]).map(function(a){return"object"===typeof a?a.count:a});a.reverse();a.forEach(function(a,d){c.push(new x({connectId:[b.children[d].rawNode],label:w.substitute(v.count,{count:a})}))},this);return c},generateHistogram:function(a,b,c,g,k){var h=
a.createGroup(),l,m,f,e;h.rawNode.setAttribute("class","esri-histogram-group");l=(b.bins||[]).map(function(a){return"object"===typeof a?a.count:a});l.reverse();m=a.getDimensions().height/l.length;l.forEach(function(a,b){f=0<a?(c-this.histogramXAvgPadding)*(a/Math.max.apply(Math,l)):0;e=h.createRect({width:f,height:m}).setFill("#aaa").setTransform(y.matrix.translate(0,m*b));e.rawNode.setAttribute("class","esri-histogram-bar");e.rawNode.setAttribute("shape-rendering","crispEdges")},this);d.set(a.rawNode,
{display:"inline-block",left:g+"px"});k||h.setTransform({dx:c,dy:0,xx:-1,xy:0,yx:0,yy:1});return h},generateAvgLine:function(a,b,c,g,k,h,l){var m=a.rawNode.getAttribute("width"),f=a.rawNode.getAttribute("height");c=Math.round(c);var e;e=a.createLine({x1:k?0:14,y1:c,x2:k?m-this.histogramXAvgPadding+4:m,y2:c}).setStroke({color:"#667"}).moveToBack();e.rawNode.setAttribute("shape-rendering","crispEdges");a=a.createImage({x:k?m-this.histogramXAvgPadding+6:0,y:c-8,width:14,height:18,src:z.toUrl("./xAvg.svg")});
h||(b=l?u.format(parseFloat(b.toFixed(2))).toString()+"%":u.format(parseFloat(b.toFixed(2>g?2:g))).toString());b=new x({connectId:[a.rawNode],label:w.substitute(v.statsAvg,{avg:b})});c>f||0>c?(d.set(e.rawNode,"display","none"),d.set(a.rawNode,"display","none")):(d.set(e.rawNode,"display","block"),d.set(a.rawNode,"display","block"));return{avgHandleLine:e,avgHandleImage:a,avgHandleTooltip:b}},getCombinedPrecision:function(a,b){var c=this.getPrecision(a),d=this.getPrecision(b);return-10<a&&10>a&&-10<
b&&10>b&&2>c&&2>d?2:c>d?c:d},getPrecision:function(a){if(isNaN(a))return 0;for(var b=1;Math.round(a*b)/b!==a;)b*=10;a=Math.round(Math.log(b)/Math.LN10);return 20<a?20:a},_resetLabelPositions:function(a){(a||[]).forEach(function(a){a&&a.labelNode&&(d.set(a.labelNode,"top","3px"),a.labelNode._autoPositioned=!1)})},_autoPositionHandleLabels:function(a){var b=[];if(0!==a.length&&(this._resetLabelPositions(a),(a||[]).forEach(function(a,d){a&&a.labelNode&&b.push({index:d,handle:a,label:a.labelNode,rect:a.labelNode.getBoundingClientRect()})}),
0!==b.length))switch(b.length){case 1:break;case 2:this._autoPositionTwoHandles(a,b);break;case 3:this._autoPositionThreeHandles(a,b);break;default:this._autoPositionManyHandles(a,b)}},_autoPositionTwoHandles:function(a,b){var c;this.collisionCheck(b[0].rect,b[1].rect)&&(a=b[0].rect.top-b[1].rect.top,c=(b[0].rect.height-a)/2,a=this.labelTopOffset+c,c=this.labelTopOffset-c,d.set(b[0].label,"top",a+"px"),d.set(b[1].label,"top",c+"px"),b[0].label._autoPositioned=!0,b[1].label._autoPositioned=!0)},_autoPositionThreeHandles:function(a,
b){var c,g,k,h,l,m,f;b.forEach(function(a,e){(f=b[e-1])&&f.rect&&this.collisionCheck(a.rect,f.rect)&&(a.label._autoPositioned&&!f.label._autoPositioned?(c=f.rect.top-a.rect.top,k=a.rect.height,h=k-c+this.labelTopOffset,d.set(f.label,"top",h+"px"),f.label._autoPositioned=!0):(!a.label._autoPositioned&&f.label._autoPositioned?(c=f.rect.top-a.rect.top,k=a.rect.height,h=-1*(k-c)+Number(f.label.style.top.replace("px","")),d.set(a.label,"top",h+"px")):(c=f.rect.top-a.rect.top,g=(a.rect.height-c)/2,l=this.labelTopOffset-
g,m=this.labelTopOffset+g,d.set(f.label,"top",m+"px"),d.set(a.label,"top",l+"px"),f.label._autoPositioned=!0),a.label._autoPositioned=!0))},this);if(b[2].handle&&10>b[2].handle.style.top.replace("px","")){a=b[2].label;var e=b[1].label,n=b[0].label,t=a.getBoundingClientRect(),q=e.getBoundingClientRect(),r=n.getBoundingClientRect(),p;a._autoPositioned&&e._autoPositioned&&n._autoPositioned?(t=Number(a.style.top.replace("px",""))+8,q=Number(e.style.top.replace("px",""))+8,r=Number(n.style.top.replace("px",
""))+8,d.set(a,"top",t+"px"),d.set(e,"top",q+"px"),d.set(n,"top",r+"px")):(a._autoPositioned&&(p=Number(a.style.top.replace("px",""))+4,d.set(a,"top",p+"px")),e._autoPositioned&&q.top-t.top<q.height&&(p=Number(e.style.top.replace("px",""))+4,d.set(e,"top",p+"px")),r.top-q.top<r.height&&(p=Number(n.style.top.replace("px",""))+4,d.set(n,"top",p+"px")))}},_autoPositionManyHandles:function(){},collisionCheck:function(a,b){return!(a.right<b.left||a.left>b.right||a.bottom<b.top||a.top>b.bottom)}}});
//>>built
define(["dojo/_base/declare","dojo/_base/window","dojo/dom-style","./PortletSettings","dijit/Dialog"],function(b,c,a,d,e){return b("dojox.widget.PortletDialogSettings",[d],{dimensions:null,constructor:function(a,b){this.dimensions=a.dimensions||[300,100]},toggle:function(){this.dialog||(this.dialog=new e({title:this.title}),c.body().appendChild(this.dialog.domNode),this.dialog.containerNode.appendChild(this.domNode),a.set(this.dialog.domNode,{width:this.dimensions[0]+"px",height:this.dimensions[1]+
"px"}),a.set(this.domNode,"display",""));this.dialog.open?this.dialog.hide():this.dialog.show(this.domNode)}})});
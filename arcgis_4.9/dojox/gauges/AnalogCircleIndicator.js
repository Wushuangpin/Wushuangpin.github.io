//>>built
define(["dojo/_base/declare","./AnalogIndicatorBase"],function(a,d){return a("dojox.gauges.AnalogCircleIndicator",[d],{_getShapes:function(a){var b=this.color?this.color:"black",c={color:this.strokeColor?this.strokeColor:b,width:1};this.color.type&&!this.strokeColor&&(c.color=this.color.colors[0].color);return[a.createCircle({cx:0,cy:-this.offset,r:this.length}).setFill(b).setStroke(c)]}})});
//>>built
define(["dojo/_base/declare","dojo/_base/connect","dojo/_base/lang","dojo/_base/array"],function(e,a,d,f){return e("dojox.grid._SelectionPreserver",null,{constructor:function(c){this.selection=c;var b=this.grid=c.grid;this.reset();this._connects=[a.connect(b,"_setStore",this,"reset"),a.connect(b,"_addItem",this,"_reSelectById"),a.connect(c,"onSelected",d.hitch(this,"_selectById",!0)),a.connect(c,"onDeselected",d.hitch(this,"_selectById",!1)),a.connect(c,"deselectAll",this,"reset")]},destroy:function(){this.reset();
f.forEach(this._connects,a.disconnect);delete this._connects},reset:function(){this._selectedById={}},_reSelectById:function(c,b){c&&this.grid._hasIdentity&&(this.selection.selected[b]=this._selectedById[this.grid.store.getIdentity(c)])},_selectById:function(c,b){if("none"!=this.selection.mode&&this.grid._hasIdentity){var a=b,d=this.grid;if("number"==typeof b||"string"==typeof b)a=(b=d._by_idx[b])&&b.item;a&&(this._selectedById[d.store.getIdentity(a)]=!!c);return a}}})});
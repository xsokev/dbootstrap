//>>built
define("dojox/data/CssRuleStore","dojo/_base/lang,dojo/_base/declare,dojo/_base/array,dojo/_base/json,dojo/_base/kernel,dojo/_base/sniff,dojo/data/util/sorter,dojo/data/util/filter,./css".split(","),function(f,o,l,p,m,q,r,n,j){return o("dojox.data.CssRuleStore",null,{_storeRef:"_S",_labelAttribute:"selector",_cache:null,_browserMap:null,_cName:"dojox.data.CssRuleStore",constructor:function(a){a&&f.mixin(this,a);this._cache={};this._allItems=null;this._waiting=[];this.gatherHandle=null;var c=this;
this.gatherHandle=setInterval(function(){try{c.context=j.determineContext(c.context);if(c.gatherHandle)clearInterval(c.gatherHandle),c.gatherHandle=null;for(;c._waiting.length;){var a=c._waiting.pop();j.rules.forEach(a.forFunc,null,c.context);a.finishFunc()}}catch(e){}},250)},setContext:function(a){if(a)this.close(),this.context=j.determineContext(a)},getFeatures:function(){return{"dojo.data.api.Read":!0}},isItem:function(a){return a&&a[this._storeRef]==this?!0:!1},hasAttribute:function(a,c){this._assertIsItem(a);
this._assertIsAttribute(c);var b=this.getAttributes(a);return-1!=l.indexOf(b,c)?!0:!1},getAttributes:function(a){this._assertIsItem(a);var c="selector,classes,rule,style,cssText,styleSheet,parentStyleSheet,parentStyleSheetHref".split(",");if(a=a.rule.style)for(var b in a)c.push("style."+b);return c},getValue:function(a,c,b){return(a=this.getValues(a,c))&&0<a.length?a[0]:b},getValues:function(a,c){this._assertIsItem(a);this._assertIsAttribute(c);var b=null;if("selector"===c)(b=a.rule.selectorText)&&
f.isString(b)&&(b=b.split(","));else if("classes"===c)b=a.classes;else if("rule"===c)b=a.rule.rule;else if("style"===c)b=a.rule.style;else if("cssText"===c)if(q("ie")){if(a.rule.style)(b=a.rule.style.cssText)&&(b="{ "+b.toLowerCase()+" }")}else(b=a.rule.cssText)&&(b=b.substring(b.indexOf("{"),b.length));else if("styleSheet"===c)b=a.rule.styleSheet;else if("parentStyleSheet"===c)b=a.rule.parentStyleSheet;else if("parentStyleSheetHref"===c){if(a.href)b=a.href}else 0===c.indexOf("style.")?(b=c.substring(c.indexOf("."),
c.length),b=a.rule.style[b]):b=[];void 0!==b&&(f.isArray(b)||(b=[b]));return b},getLabel:function(a){this._assertIsItem(a);return this.getValue(a,this._labelAttribute)},getLabelAttributes:function(){return[this._labelAttribute]},containsValue:function(a,c,b){var e=void 0;"string"===typeof b&&(e=n.patternToRegExp(b,!1));return this._containsValue(a,c,b,e)},isItemLoaded:function(a){return this.isItem(a)},loadItem:function(a){this._assertIsItem(a.item)},fetch:function(a){a=a||{};if(!a.store)a.store=
this;this._pending&&0<this._pending.length?this._pending.push({request:a,fetch:!0}):(this._pending=[{request:a,fetch:!0}],this._fetch(a));return a},_fetch:function(a){var c=a.scope||m.global;if(null===this._allItems){this._allItems={};try{this.gatherHandle?this._waiting.push({forFunc:f.hitch(this,this._handleRule),finishFunc:f.hitch(this,this._handleReturn)}):(j.rules.forEach(f.hitch(this,this._handleRule),null,this.context),this._handleReturn())}catch(b){a.onError&&a.onError.call(c,b,a)}}else this._handleReturn()},
_handleRule:function(a,c,b){for(var e=a.selectorText,d=e.split(" "),g=[],f=0;f<d.length;f++){var h=d[f],i=h.indexOf(".");if(h&&0<h.length&&-1!==i){var k=h.indexOf(",")||h.indexOf("["),h=h.substring(i,-1!==k&&k>i?k:h.length);g.push(h)}}d={};d.rule=a;d.styleSheet=c;d.href=b;d.classes=g;d[this._storeRef]=this;this._allItems[e]||(this._allItems[e]=[]);this._allItems[e].push(d)},_handleReturn:function(){var a=[],c=[],b=null,e;for(e in this._allItems){var b=this._allItems[e],d;for(d in b)c.push(b[d])}for(;this._pending.length;)b=
this._pending.pop(),b.request._items=c,a.push(b);for(;a.length;)b=a.pop(),this._handleFetchReturn(b.request)},_handleFetchReturn:function(a){var c=a.scope||m.global,b=[],e="all",d;a.query&&(e=p.toJson(a.query));if(this._cache[e])b=this._cache[e];else if(a.query){for(d in a._items){var g=a._items[d],j=a.queryOptions?a.queryOptions.ignoreCase:!1,h={},i,k;for(i in a.query)k=a.query[i],"string"===typeof k&&(h[i]=n.patternToRegExp(k,j));j=!0;for(i in a.query)k=a.query[i],this._containsValue(g,i,k,h[i])||
(j=!1);j&&b.push(g)}this._cache[e]=b}else for(d in a._items)b.push(a._items[d]);e=b.length;a.sort&&b.sort(r.createSortFunction(a.sort,this));d=0;g=b.length;if(0<a.start&&a.start<b.length)d=a.start;if(a.count&&a.count)g=a.count;g=d+g;if(g>b.length)g=b.length;b=b.slice(d,g);a.onBegin&&a.onBegin.call(c,e,a);if(a.onItem){if(f.isArray(b)){for(d=0;d<b.length;d++)a.onItem.call(c,b[d],a);a.onComplete&&a.onComplete.call(c,null,a)}}else a.onComplete&&a.onComplete.call(c,b,a);return a},close:function(){this._cache=
{};this._allItems=null},_assertIsItem:function(a){if(!this.isItem(a))throw Error(this._cName+": Invalid item argument.");},_assertIsAttribute:function(a){if("string"!==typeof a)throw Error(this._cName+": Invalid attribute argument.");},_containsValue:function(a,c,b,e){return l.some(this.getValues(a,c),function(a){if(null!==a&&!f.isObject(a)&&e){if(a.toString().match(e))return!0}else if(b===a)return!0;return!1})}})});
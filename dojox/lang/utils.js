//>>built
define("dojox/lang/utils",["..","dojo/_base/lang"],function(l,g){var f=g.getObject("lang.utils",!0,l),j={},h=Object.prototype.toString,k=function(b){if(b)switch(h.call(b)){case "[object Array]":return b.slice(0);case "[object Object]":return g.delegate(b)}return b};g.mixin(f,{coerceType:function(b,a){switch(typeof b){case "number":return Number(eval("("+a+")"));case "string":return""+a;case "boolean":return Boolean(eval("("+a+")"))}return eval("("+a+")")},updateWithObject:function(b,a,e){if(!a)return b;
for(var d in b)if(d in a&&!(d in j)){var c=b[d];c&&"object"==typeof c?f.updateWithObject(c,a[d],e):b[d]=e?f.coerceType(c,a[d]):k(a[d])}return b},updateWithPattern:function(b,a,e,d){if(!a||!e)return b;for(var c in e)c in a&&!(c in j)&&(b[c]=d?f.coerceType(e[c],a[c]):k(a[c]));return b},merge:function(b,a){if(a){var e=h.call(b),d=h.call(a),c,i;switch(d){case "[object Array]":if(d==e){e=Array(Math.max(b.length,a.length));for(c=0,d=e.length;c<d;++c)e[c]=f.merge(b[c],a[c]);return e}return a.slice(0);case "[object Object]":if(d==
e&&b){e=g.delegate(b);for(c in a)c in b?(d=b[c],i=a[c],i!==d&&(e[c]=f.merge(d,i))):e[c]=g.clone(a[c]);return e}return g.clone(a)}}return a}});return f});
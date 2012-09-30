//>>built
define("dojo/request/script","module,./watch,./util,../_base/array,../_base/lang,../on,../dom,../dom-construct,../has,../_base/window".split(","),function(l,m,h,n,o,p,q,r,i,s){function t(a,b){a.canDelete&&f._remove(a.id,b.options.frameDoc,!0)}function u(a){g&&g.length&&(n.forEach(g,function(a){f._remove(a.id,a.frameDoc);a.frameDoc=null}),g=[]);return a.options.jsonp?!a.data:!0}function v(){return!!this.scriptLoaded}function w(a){return(a=a.options.checkString)&&eval("typeof("+a+') !== "undefined"')}
function x(a,b){if(this.canDelete){var e=this.response;g.push({id:this.id,frameDoc:e.options.frameDoc});e.options.frameDoc=null}b?this.reject(b):this.resolve(a)}function f(a,b,e){var c=h.parseArgs(a,h.deepCopy({},b)),a=c.url,b=c.options,d=h.deferred(c,t,u,b.jsonp?null:b.checkString?w:v,x);o.mixin(d,{id:k+y++,canDelete:!1});if(b.jsonp){var g=(~a.indexOf("?")?"&":"?")+b.jsonp+"=";-1===a.indexOf(g)&&(a+=g+(b.frameDoc?"parent.":"")+k+"_callbacks."+d.id);d.canDelete=!0;j[d.id]=function(a){c.data=a;d.handleResponse(c)}}h.notify&&
h.notify.emit("send",c,d.promise.cancel);if(!b.canAttach||b.canAttach(d)){var i=f._attach(d.id,a,b.frameDoc);if(!b.jsonp&&!b.checkString)var l=p(i,z,function(a){if("load"===a.type||A.test(i.readyState))l.remove(),d.scriptLoaded=a})}m(d);return e?d:d.promise}i.add("script-readystatechange",function(a,b){return"undefined"!==typeof b.createElement("script").onreadystatechange&&("undefined"===typeof a.opera||"[object Opera]"!==a.opera.toString())});var k=l.id.replace(/[\/\.\-]/g,"_"),y=0,z=i("script-readystatechange")?
"readystatechange":"load",A=/complete|loaded/,j=this[k+"_callbacks"]={},g=[];f.get=f;f._attach=function(a,b,e){var e=e||s.doc,c=e.createElement("script");c.type="text/javascript";c.src=b;c.id=a;c.async=!0;c.charset="utf-8";return e.getElementsByTagName("head")[0].appendChild(c)};f._remove=function(a,b,e){r.destroy(q.byId(a,b));j[a]&&(e?j[a]=function(){delete j[a]}:delete j[a])};f._callbacksProperty=k+"_callbacks";return f});
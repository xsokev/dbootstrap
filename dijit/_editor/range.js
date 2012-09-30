//>>built
define("dijit/_editor/range",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/window","../main"],function(m,n,o,p,e){e.range={};e.range.getIndex=function(a,b){for(var c=[],d=[],f=a,e,g;a!=b;){var i=0;for(e=a.parentNode;g=e.childNodes[i++];)if(g===a){--i;break}c.unshift(i);d.unshift(i-e.childNodes.length);a=e}if(0<c.length&&3==f.nodeType){for(g=f.previousSibling;g&&3==g.nodeType;)c[c.length-1]--,g=g.previousSibling;for(g=f.nextSibling;g&&3==g.nodeType;)d[d.length-1]++,g=g.nextSibling}return{o:c,
r:d}};e.range.getNode=function(a,b){if(!o.isArray(a)||0==a.length)return b;var c=b;m.every(a,function(a){if(0<=a&&a<c.childNodes.length)c=c.childNodes[a];else return c=null,!1;return!0});return c};e.range.getCommonAncestor=function(a,b,c){for(var c=c||a.ownerDocument.body,d=function(a){for(var b=[];a;)if(b.unshift(a),a!==c)a=a.parentNode;else break;return b},a=d(a),b=d(b),d=Math.min(a.length,b.length),f=a[0],e=1;e<d;e++)if(a[e]===b[e])f=a[e];else break;return f};e.range.getAncestor=function(a,b,c){for(c=
c||a.ownerDocument.body;a&&a!==c;){var d=a.nodeName.toUpperCase();if(b.test(d))return a;a=a.parentNode}return null};e.range.BlockTagNames=/^(?:P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DT|DE)$/;e.range.getBlockAncestor=function(a,b,c){for(var c=c||a.ownerDocument.body,b=b||e.range.BlockTagNames,d=null,f;a&&a!==c;){var h=a.nodeName.toUpperCase();!d&&b.test(h)&&(d=a);!f&&/^(?:BODY|TD|TH|CAPTION)$/.test(h)&&(f=a);a=a.parentNode}return{blockNode:d,blockContainer:f||a.ownerDocument.body}};e.range.atBeginningOfContainer=
function(a,b,c){var d=!1,e=0==c;!e&&3==b.nodeType&&/^[\s\xA0]+$/.test(b.nodeValue.substr(0,c))&&(e=!0);if(e)for(d=!0;b&&b!==a;){if(b.previousSibling){d=!1;break}b=b.parentNode}return d};e.range.atEndOfContainer=function(a,b,c){var d=!1,e=c==(b.length||b.childNodes.length);!e&&3==b.nodeType&&/^[\s\xA0]+$/.test(b.nodeValue.substr(c))&&(e=!0);if(e)for(d=!0;b&&b!==a;){if(b.nextSibling){d=!1;break}b=b.parentNode}return d};e.range.adjacentNoneTextNode=function(a,b){for(var c=a,d=0-a.length||0,e=b?"nextSibling":
"previousSibling";c&&!(3!=c.nodeType);){d+=c.length;c=c[e]}return[c,d]};e.range.create=function(a){a=a||window;return a.getSelection?a.document.createRange():new e.range.W3CRange};e.range.getSelection=function(a,b){if(a.getSelection)return a.getSelection();var c=new e.range.ie.selection(a);b||c._getCurrentSelection();return c};if(!window.getSelection)e.range.ie={cachedSelection:{},selection:function(a){this._ranges=[];this.addRange=function(a,c){this._ranges.push(a);c||a._select();this.rangeCount=
this._ranges.length};this.removeAllRanges=function(){this._ranges=[];this.rangeCount=0};this.getRangeAt=function(a){return this._ranges[a]};this._getCurrentSelection=function(){this.removeAllRanges();var b;b=a.document.selection.createRange();(b="CONTROL"==a.document.selection.type.toUpperCase()?new e.range.W3CRange(e.range.ie.decomposeControlRange(b)):new e.range.W3CRange(e.range.ie.decomposeTextRange(b)))?(this.addRange(b,!0),this.isCollapsed=b.collapsed):this.isCollapsed=!0}},decomposeControlRange:function(a){var b=
a.item(0),c=a.item(a.length-1),a=b.parentNode,d=c.parentNode,b=e.range.getIndex(b,a).o[0],c=e.range.getIndex(c,d).o[0]+1;return[a,b,d,c]},getEndPoint:function(a,b){var c=a.duplicate();c.collapse(!b);var d="EndTo"+(b?"End":"Start"),f=c.parentElement(),h,g,i;0<f.childNodes.length?m.every(f.childNodes,function(b,k){var j;if(3!=b.nodeType)if(c.moveToElementText(b),0<c.compareEndPoints(d,a))if(i&&3==i.nodeType)h=i,j=!0;else return h=f,g=k,!1;else{if(k==f.childNodes.length-1)return h=f,g=f.childNodes.length,
!1}else k==f.childNodes.length-1&&(h=b,j=!0);if(j&&h){h=(j=e.range.adjacentNoneTextNode(h)[0])?j.nextSibling:f.firstChild;var l=e.range.adjacentNoneTextNode(h);j=l[0];l=l[1];j?(c.moveToElementText(j),c.collapse(!1)):c.moveToElementText(f);c.setEndPoint(d,a);g=c.text.length-l;return!1}i=b;return!0}):(h=f,g=0);if(!b&&1==h.nodeType&&g==h.childNodes.length){var k=h.nextSibling;k&&3==k.nodeType&&(h=k,g=0)}return[h,g]},setEndPoint:function(a,b,c){var a=a.duplicate(),d;if(3!=b.nodeType)if(0<c){if(d=b.childNodes[c-
1])if(3==d.nodeType)b=d,c=d.length;else if(d.nextSibling&&3==d.nextSibling.nodeType)b=d.nextSibling,c=0;else{a.moveToElementText(d.nextSibling?d:b);var f=d.parentNode;d=f.insertBefore(d.ownerDocument.createTextNode(" "),d.nextSibling);a.collapse(!1);f.removeChild(d)}}else a.moveToElementText(b),a.collapse(!0);3==b.nodeType&&(d=e.range.adjacentNoneTextNode(b),f=d[0],d=d[1],f?(a.moveToElementText(f),a.collapse(!1),"inherit"!=f.contentEditable&&d++):(a.moveToElementText(b.parentNode),a.collapse(!0),
a.move("character",1),a.move("character",-1)),c+=d,0<c&&a.move("character",c));return a},decomposeTextRange:function(a){var b=e.range.ie.getEndPoint(a),c=b[0],d=b[1],f=b[0],b=b[1];a.htmlText.length&&(a.htmlText==a.text?b=d+a.text.length:(b=e.range.ie.getEndPoint(a,!0),f=b[0],b=b[1]));return[c,d,f,b]},setRange:function(a,b,c,d,f,h){b=e.range.ie.setEndPoint(a,b,c);a.setEndPoint("StartToStart",b);if(!h)var g=e.range.ie.setEndPoint(a,d,f);a.setEndPoint("EndToEnd",g||b);return a}},n("dijit.range.W3CRange",
null,{constructor:function(){0<arguments.length?(this.setStart(arguments[0][0],arguments[0][1]),this.setEnd(arguments[0][2],arguments[0][3])):(this.startContainer=this.commonAncestorContainer=null,this.startOffset=0,this.endContainer=null,this.endOffset=0,this.collapsed=!0)},_updateInternal:function(){this.commonAncestorContainer=this.startContainer!==this.endContainer?e.range.getCommonAncestor(this.startContainer,this.endContainer):this.startContainer;this.collapsed=this.startContainer===this.endContainer&&
this.startOffset==this.endOffset},setStart:function(a,b){b=parseInt(b);if(!(this.startContainer===a&&this.startOffset==b))delete this._cachedBookmark,this.startContainer=a,this.startOffset=b,this.endContainer?this._updateInternal():this.setEnd(a,b)},setEnd:function(a,b){b=parseInt(b);if(!(this.endContainer===a&&this.endOffset==b))delete this._cachedBookmark,this.endContainer=a,this.endOffset=b,this.startContainer?this._updateInternal():this.setStart(a,b)},setStartAfter:function(a,b){this._setPoint("setStart",
a,b,1)},setStartBefore:function(a,b){this._setPoint("setStart",a,b,0)},setEndAfter:function(a,b){this._setPoint("setEnd",a,b,1)},setEndBefore:function(a,b){this._setPoint("setEnd",a,b,0)},_setPoint:function(a,b,c,d){c=e.range.getIndex(b,b.parentNode).o;this[a](b.parentNode,c.pop()+d)},_getIERange:function(){var a=(this._body||this.endContainer.ownerDocument.body).createTextRange();e.range.ie.setRange(a,this.startContainer,this.startOffset,this.endContainer,this.endOffset,this.collapsed);return a},
getBookmark:function(){this._getIERange();return this._cachedBookmark},_select:function(){this._getIERange().select()},deleteContents:function(){var a=this.startContainer,b=this._getIERange();3===a.nodeType&&!this.startOffset&&this.setStartBefore(a);b.pasteHTML("");this.endContainer=this.startContainer;this.endOffset=this.startOffset;this.collapsed=!0},cloneRange:function(){var a=new e.range.W3CRange([this.startContainer,this.startOffset,this.endContainer,this.endOffset]);a._body=this._body;return a},
detach:function(){this.startContainer=this.commonAncestorContainer=this._body=null;this.startOffset=0;this.endContainer=null;this.endOffset=0;this.collapsed=!0}});return e.range});
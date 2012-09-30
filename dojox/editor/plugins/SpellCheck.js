//>>built
define("dojox/editor/plugins/SpellCheck",["dojo","dijit","dojox","dojo/i18n!dojox/editor/plugins/nls/SpellCheck","dojo/require!dijit/_base/popup,dijit/_Widget,dijit/_Templated,dijit/form/TextBox,dijit/form/DropDownButton,dijit/TooltipDialog,dijit/form/MultiSelect,dojo/io/script,dijit/Menu"],function(c,i,m){c.provide("dojox.editor.plugins.SpellCheck");c.require("dijit._base.popup");c.require("dijit._Widget");c.require("dijit._Templated");c.require("dijit.form.TextBox");c.require("dijit.form.DropDownButton");
c.require("dijit.TooltipDialog");c.require("dijit.form.MultiSelect");c.require("dojo.io.script");c.require("dijit.Menu");c.requireLocalization("dojox.editor.plugins","SpellCheck");c.experimental("dojox.editor.plugins.SpellCheck");c.declare("dojox.editor.plugins._spellCheckControl",[i._Widget,i._Templated],{widgetsInTemplate:!0,templateString:"<table role='presentation' class='dijitEditorSpellCheckTable'><tr><td colspan='3' class='alignBottom'><label for='${textId}' id='${textId}_label'>${unfound}</label><div class='dijitEditorSpellCheckBusyIcon' id='${id}_progressIcon'></div></td></tr><tr><td class='dijitEditorSpellCheckBox'><input dojoType='dijit.form.TextBox' required='false' intermediateChanges='true' class='dijitEditorSpellCheckBox' dojoAttachPoint='unfoundTextBox' id='${textId}'/></td><td><button dojoType='dijit.form.Button' class='blockButton' dojoAttachPoint='skipButton'>${skip}</button></td><td><button dojoType='dijit.form.Button' class='blockButton' dojoAttachPoint='skipAllButton'>${skipAll}</button></td></tr><tr><td class='alignBottom'><label for='${selectId}'>${suggestions}</td></label><td colspan='2'><button dojoType='dijit.form.Button' class='blockButton' dojoAttachPoint='toDicButton'>${toDic}</button></td></tr><tr><td><select dojoType='dijit.form.MultiSelect' id='${selectId}' class='dijitEditorSpellCheckBox listHeight' dojoAttachPoint='suggestionSelect'></select></td><td colspan='2'><button dojoType='dijit.form.Button' class='blockButton' dojoAttachPoint='replaceButton'>${replace}</button><div class='topMargin'><button dojoType='dijit.form.Button' class='blockButton' dojoAttachPoint='replaceAllButton'>${replaceAll}</button><div></td></tr><tr><td><div class='topMargin'><button dojoType='dijit.form.Button' dojoAttachPoint='cancelButton'>${cancel}</button></div></td><td></td><td></td></tr></table>",
constructor:function(){this.isOpen=this.isChanged=this.ignoreChange=!1;this.closable=!0},postMixInProperties:function(){this.id=i.getUniqueId(this.declaredClass.replace(/\./g,"_"));this.textId=this.id+"_textBox";this.selectId=this.id+"_select"},postCreate:function(){var a=this.suggestionSelect;c.removeAttr(a.domNode,"multiple");a.addItems=function(a){var d=this,h=null;a&&0<a.length&&c.forEach(a,function(a,b){h=c.create("option",{innerHTML:a,value:a},d.domNode);if(0==b)h.selected=!0})};a.removeItems=
function(){c.empty(this.domNode)};a.deselectAll=function(){this.containerNode.selectedIndex=-1};this.connect(this,"onKeyPress","_cancel");this.connect(this.unfoundTextBox,"onKeyPress","_enter");this.connect(this.unfoundTextBox,"onChange","_unfoundTextBoxChange");this.connect(this.suggestionSelect,"onKeyPress","_enter");this.connect(this.skipButton,"onClick","onSkip");this.connect(this.skipAllButton,"onClick","onSkipAll");this.connect(this.toDicButton,"onClick","onAddToDic");this.connect(this.replaceButton,
"onClick","onReplace");this.connect(this.replaceAllButton,"onClick","onReplaceAll");this.connect(this.cancelButton,"onClick","onCancel")},onSkip:function(){},onSkipAll:function(){},onAddToDic:function(){},onReplace:function(){},onReplaceAll:function(){},onCancel:function(){},onEnter:function(){},focus:function(){this.unfoundTextBox.focus()},_cancel:function(a){a.keyCode==c.keys.ESCAPE&&(this.onCancel(),c.stopEvent(a))},_enter:function(a){a.keyCode==c.keys.ENTER&&(this.onEnter(),c.stopEvent(a))},_unfoundTextBoxChange:function(){var a=
this.textId+"_label";this.ignoreChange?c.byId(a).innerHTML=this.unfound:(c.byId(a).innerHTML=this.replaceWith,this.isChanged=!0,this.suggestionSelect.deselectAll())},_setUnfoundWordAttr:function(a){this.unfoundTextBox.set("value",a||"")},_getUnfoundWordAttr:function(){return this.unfoundTextBox.get("value")},_setSuggestionListAttr:function(a){var b=this.suggestionSelect,a=a||[];b.removeItems();b.addItems(a)},_getSelectedWordAttr:function(){var a=this.suggestionSelect.getSelected();return a&&0<a.length?
a[0].value:this.unfoundTextBox.get("value")},_setDisabledAttr:function(a){this.skipButton.set("disabled",a);this.skipAllButton.set("disabled",a);this.toDicButton.set("disabled",a);this.replaceButton.set("disabled",a);this.replaceAllButton.set("disabled",a)},_setInProgressAttr:function(a){c[a?"removeClass":"addClass"](this.id+"_progressIcon","hidden")}});c.declare("dojox.editor.plugins._SpellCheckScriptMultiPart",null,{ACTION_QUERY:"query",ACTION_UPDATE:"update",callbackHandle:"callback",maxBufferLength:100,
delimiter:" ",label:"response",_timeout:3E4,SEC:1E3,constructor:function(){this.serviceEndPoint="";this._queue=[];this.isWorking=!1;this.exArgs=null;this._counter=0},send:function(a,b){var d=this,h=this.delimiter,e=this.maxBufferLength,f=this.label,i=this.serviceEndPoint,p=this.callbackHandle,o=this.exArgs,q=this._timeout,n=0,g=0;if(!this._result)this._result=[];var b=b||this.ACTION_QUERY,j=function(){var l=[],k=0;if(a&&0<a.length){d.isWorking=!0;var j=a.length;do{n=g+1;if((g+=e)>j)g=j;else for(;h&&
a.charAt(g)!=h&&g<=j;)g++;l.push({l:n,r:g});k++}while(g<j);c.forEach(l,function(e,h){var g={url:i,action:b,timeout:q,callbackParamName:p,handle:function(a){if(++d._counter<=this.size&&!(a instanceof Error)&&a[f]&&c.isArray(a[f])){var b=this.offset;c.forEach(a[f],function(a){a.offset+=b});d._result[this.number]=a[f]}if(d._counter==this.size)d._finalizeCollection(this.action),d.isWorking=!1,0<d._queue.length&&d._queue.shift()()}};g.content=o?c.mixin(o,{action:b,content:a.substring(e.l-1,e.r)}):{action:b,
content:a.substring(e.l-1,e.r)};g.size=k;g.number=h;g.offset=e.l-1;c.io.script.get(g)})}};d.isWorking?d._queue.push(j):j()},_finalizeCollection:function(a){for(var b=this._result,d=b.length,c=0;c<d;c++)var e=b.shift(),b=b.concat(e);if(a==this.ACTION_QUERY)this.onLoad(b);this._counter=0;this._result=[]},onLoad:function(){},setWaitingTime:function(a){this._timeout=a*this.SEC}});c.declare("dojox.editor.plugins.SpellCheck",[i._editor._Plugin],{url:"",bufferLength:100,interactive:!1,timeout:30,button:null,
_editor:null,exArgs:null,_cursorSpan:'<span class="cursorPlaceHolder"></span>',_cursorSelector:"cursorPlaceHolder",_incorrectWordsSpan:"<span class='incorrectWordPlaceHolder'>${text}</span>",_ignoredIncorrectStyle:{cursor:"inherit",borderBottom:"none",backgroundColor:"transparent"},_normalIncorrectStyle:{cursor:"pointer",borderBottom:"1px dotted red",backgroundColor:"yellow"},_highlightedIncorrectStyle:{borderBottom:"1px dotted red",backgroundColor:"#b3b3ff"},_selector:"incorrectWordPlaceHolder",
_maxItemNumber:3,constructor:function(){this._spanList=[];this._cache={};this._enabled=!0;this._iterator=0},setEditor:function(a){this._editor=a;this._initButton();this._setNetwork();this._connectUp()},_initButton:function(){var a=this,b=this._strings=c.i18n.getLocalization("dojox.editor.plugins","SpellCheck"),d=this._dialog=new i.TooltipDialog;d.set("content",this._dialogContent=new m.editor.plugins._spellCheckControl({unfound:b.unfound,skip:b.skip,skipAll:b.skipAll,toDic:b.toDic,suggestions:b.suggestions,
replaceWith:b.replaceWith,replace:b.replace,replaceAll:b.replaceAll,cancel:b.cancel}));this.button=new i.form.DropDownButton({label:b.widgetLabel,showLabel:!1,iconClass:"dijitEditorSpellCheckIcon",dropDown:d,id:i.getUniqueId(this.declaredClass.replace(/\./g,"_"))+"_dialogPane",closeDropDown:function(b){if(a._dialogContent.closable){a._dialogContent.isOpen=!1;if(c.isIE){var d=a._iterator,f=a._spanList;d<f.length&&0<=d&&c.style(f[d],a._normalIncorrectStyle)}if(this._opened)i.popup.close(this.dropDown),
b&&this.focus(),this._opened=!1,this.state=""}}});a._dialogContent.isOpen=!1;d.domNode.setAttribute("aria-label",this._strings.widgetLabel)},_setNetwork:function(){var a=this.exArgs;if(!this._service){var b=this._service=new m.editor.plugins._SpellCheckScriptMultiPart;b.serviceEndPoint=this.url;b.maxBufferLength=this.bufferLength;b.setWaitingTime(this.timeout);if(a)delete a.name,delete a.url,delete a.interactive,delete a.timeout,b.exArgs=a}},_connectUp:function(){var a=this._editor,b=this._dialogContent;
this.connect(this.button,"set","_disabled");this.connect(this._service,"onLoad","_loadData");this.connect(this._dialog,"onOpen","_openDialog");this.connect(a,"onKeyPress","_keyPress");this.connect(a,"onLoad","_submitContent");this.connect(b,"onSkip","_skip");this.connect(b,"onSkipAll","_skipAll");this.connect(b,"onAddToDic","_add");this.connect(b,"onReplace","_replace");this.connect(b,"onReplaceAll","_replaceAll");this.connect(b,"onCancel","_cancel");this.connect(b,"onEnter","_enter");a.contentPostFilters.push(this._spellCheckFilter);
c.publish(i._scopeName+".Editor.plugin.SpellCheck.getParser",[this])},_disabled:function(a,b){if("disabled"==a)b?(this._iterator=0,this._spanList=[]):this.interactive&&!b&&this._service&&this._submitContent(!0),this._enabled=!b},_keyPress:function(a){if(this.interactive){var b=a.charCode;!a.altKey&&b==c.keys.SPACE?this._submitContent():(a.ctrlKey&&(118==b||86==b)||!a.ctrlKey&&a.charCode)&&this._submitContent(!0)}},_loadData:function(a){var b=this._cache,d=this._editor.get("value"),h=this._dialogContent;
this._iterator=0;c.forEach(a,function(a){b[a.text]=a.suggestion;b[a.text].correct=!1});if(this._enabled&&(h.closable=!1,this._markIncorrectWords(d,b),h.closable=!0,this._dialogContent.isOpen))this._iterator=-1,this._skip()},_openDialog:function(){var a=this._dialogContent;a.ignoreChange=!0;a.set("unfoundWord","");a.set("suggestionList",null);a.set("disabled",!0);a.set("inProgress",!0);a.isOpen=!0;a.closable=!1;this._submitContent();a.closable=!0},_skip:function(a,b){var d=this._dialogContent,h=this._spanList||
[],e=h.length,f=this._iterator;d.closable=!1;d.isChanged=!1;d.ignoreChange=!0;for(!b&&0<=f&&f<e&&this._skipWord(f);++f<e&&!0==h[f].edited;);f<e?(this._iterator=f,this._populateDialog(f),this._selectWord(f)):(this._iterator=-1,d.set("unfoundWord",this._strings.msg),d.set("suggestionList",null),d.set("disabled",!0),d.set("inProgress",!1));setTimeout(function(){c.isWebKit&&d.skipButton.focus();d.focus();d.ignoreChange=!1;d.closable=!0},0)},_skipAll:function(){this._dialogContent.closable=!1;this._skipWordAll(this._iterator);
this._skip()},_add:function(){var a=this._dialogContent;a.closable=!1;a.isOpen=!0;this._addWord(this._iterator,a.get("unfoundWord"));this._skip()},_replace:function(){var a=this._dialogContent,b=this._iterator,d=a.get("selectedWord");a.closable=!1;this._replaceWord(b,d);this._skip(null,!0)},_replaceAll:function(){var a=this._dialogContent,b=this._spanList,d=b.length,c=b[this._iterator].innerHTML.toLowerCase(),e=a.get("selectedWord");a.closable=!1;for(a=0;a<d;a++)b[a].innerHTML.toLowerCase()==c&&this._replaceWord(a,
e);this._skip(null,!0)},_cancel:function(){this._dialogContent.closable=!0;this._editor.focus()},_enter:function(){this._dialogContent.isChanged?this._replace():this._skip()},_query:function(a){var b=this._service,d=this._cache,a=this.parser.parseIntoWords(this._html2Text(a))||[],h=[];c.forEach(a,function(a){a=a.toLowerCase();if(!d[a])d[a]=[],d[a].correct=!0,h.push(a)});0<h.length?b.send(h.join(" ")):b.isWorking||this._loadData([])},_html2Text:function(a){for(var b=[],d=!1,c=a?a.length:0,e=0;e<c;e++)"<"==
a.charAt(e)&&(d=!0),!0==d?b.push(" "):b.push(a.charAt(e)),">"==a.charAt(e)&&(d=!1);return b.join("")},_getBookmark:function(a){var b=this._editor,d=this._cursorSpan;b.execCommand("inserthtml",d);for(var b=b.get("value"),d=b.indexOf(d),c=-1;++c<d&&a.charAt(c)==b.charAt(c););return c},_moveToBookmark:function(){var a=this._editor,b=c.query("."+this._cursorSelector,a.document);if(b=b&&b[0])a._sCall("selectElement",[b]),a._sCall("collapse",[!0]),(a=b.parentNode)&&a.removeChild(b)},_submitContent:function(a){if(a){var b=
this;if(this._delayHandler)clearTimeout(this._delayHandler),this._delayHandler=null;setTimeout(function(){b._query(b._editor.get("value"))},3E3)}else this._query(this._editor.get("value"))},_populateDialog:function(a){var b=this._spanList,d=this._cache,c=this._dialogContent;c.set("disabled",!1);if(a<b.length&&0<b.length)a=b[a].innerHTML,c.set("unfoundWord",a),c.set("suggestionList",d[a.toLowerCase()]),c.set("inProgress",!1)},_markIncorrectWords:function(a,b){for(var d=this,h=this.parser,e=this._editor,
f=this._incorrectWordsSpan,m=this._normalIncorrectStyle,p=this._selector,o=h.parseIntoWords(this._html2Text(a).toLowerCase()),h=h.getIndices(),q=this._cursorSpan,n=this._getBookmark(a),g=!1,j=a.split(""),l=null,l=o.length-1;0<=l;l--){var k=o[l];if(b[k]&&!b[k].correct){var k=h[l],s=o[l].length,r=k+s;r<=n&&!g&&(j.splice(n,0,q),g=!0);j.splice(k,s,c.string.substitute(f,{text:a.substring(k,r)}));k<n&&n<r&&!g&&(g=j[k].split(""),g.splice(39+n-k,0,q),j[k]=g.join(""),g=!0)}}g||(j.splice(n,0,q),g=!0);e.set("value",
j.join(""));e._cursorToStart=!1;this._moveToBookmark();l=this._spanList=c.query("."+this._selector,e.document);l.forEach(function(a,b){a.id=p+b});this.interactive||delete m.cursor;l.style(m);if(this.interactive){if(d._contextMenu)d._contextMenu.uninitialize(),d._contextMenu=null;d._contextMenu=new i.Menu({targetNodeIds:[e.iframe],bindDomNode:function(a){var a=c.byId(a),h,f;"iframe"==a.tagName.toLowerCase()?(f=a,this._iframeContentWindow(f),h=c.body(ed.document)):h=a==c.body()?c.doc.documentElement:
a;var g={node:a,iframe:f};c.attr(a,"_dijitMenu"+this.id,this._bindings.push(g));var j=c.hitch(this,function(a){return[c.connect(a,this.leftClickToOpen?"onclick":"oncontextmenu",this,function(a){var h=a.target,g=d._strings;if(c.hasClass(h,p)&&!h.edited){c.stopEvent(a);var j=d._maxItemNumber,k=h.id.substring(p.length),l=b[h.innerHTML.toLowerCase()],n=l.length;this.destroyDescendants();if(0==n)this.addChild(new i.MenuItem({label:g.iMsg,disabled:!0}));else for(var m=0;m<j&&m<n;m++)this.addChild(new i.MenuItem({label:l[m],
onClick:function(){var a=l[m];return function(){d._replaceWord(k,a);e.focus()}}()}));this.addChild(new i.MenuSeparator);this.addChild(new i.MenuItem({label:g.iSkip,onClick:function(){d._skipWord(k);e.focus()}}));this.addChild(new i.MenuItem({label:g.iSkipAll,onClick:function(){d._skipWordAll(k);e.focus()}}));this.addChild(new i.MenuSeparator);this.addChild(new i.MenuItem({label:g.toDic,onClick:function(){d._addWord(k);e.focus()}}));this._scheduleOpen(h,f,{x:a.pageX,y:a.pageY})}}),c.connect(a,"onkeydown",
this,function(a){a.shiftKey&&a.keyCode==c.keys.F10&&(c.stopEvent(a),this._scheduleOpen(a.target,f))})]});g.connects=h?j(h):[];if(f)g.onloadHandler=c.hitch(this,function(){this._iframeContentWindow(f);h=c.body(ed.document);g.connects=j(h)}),f.addEventListener?f.addEventListener("load",g.onloadHandler,!1):f.attachEvent("onload",g.onloadHandler)}})}},_selectWord:function(a){var b=this._spanList;a<b.length&&0<b.length&&(ed._sCall("selectElement",[b[a]]),ed._sCall("collapse",[!0]),this._findText(b[a].innerHTML,
!1,!1),c.isIE&&c.style(b[a],this._highlightedIncorrectStyle))},_replaceWord:function(a,b){var d=this._spanList;d[a].innerHTML=b;c.style(d[a],this._ignoredIncorrectStyle);d[a].edited=!0},_skipWord:function(a){var b=this._spanList;c.style(b[a],this._ignoredIncorrectStyle);this._cache[b[a].innerHTML.toLowerCase()].correct=!0;b[a].edited=!0},_skipWordAll:function(a,b){for(var d=this._spanList,c=d.length,b=b||d[a].innerHTML.toLowerCase(),e=0;e<c;e++)!d[e].edited&&d[e].innerHTML.toLowerCase()==b&&this._skipWord(e)},
_addWord:function(a,b){var d=this._service;d.send(b||this._spanList[a].innerHTML.toLowerCase(),d.ACTION_UPDATE);this._skipWordAll(a,b)},_findText:function(a,b,d){var c=this._editor,e=c.window,f=!1;if(a)e.find?f=e.find(a,b,d,!1,!1,!1,!1):(e=c.document,e.selection&&(this._editor.focus(),c=e.body.createTextRange(),(f=e.selection?e.selection.createRange():null)&&(d?c.setEndPoint("EndToStart",f):c.setEndPoint("StartToEnd",f)),b=b?4:0,d&&(b|=1),(f=c.findText(a,c.text.length,b))&&c.select()));return f},
_spellCheckFilter:function(a){return a.replace(/<span class=["']incorrectWordPlaceHolder["'].*?>(.*?)<\/span>/g,"$1")}});c.subscribe(i._scopeName+".Editor.getPlugin",null,function(a){if(!a.plugin&&"spellcheck"===a.args.name.toLowerCase())a.plugin=new m.editor.plugins.SpellCheck({url:"url"in a.args?a.args.url:"",interactive:"interactive"in a.args?a.args.interactive:!1,bufferLength:"bufferLength"in a.args?a.args.bufferLength:100,timeout:"timeout"in a.args?a.args.timeout:30,exArgs:a.args})})});
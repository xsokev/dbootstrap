//>>built
define("dojox/editor/plugins/FindReplace","dojo,dijit,dojox,dijit/_base/manager,dijit/_base/popup,dijit/_Widget,dijit/_TemplatedMixin,dijit/_KeyNavContainer,dijit/_WidgetsInTemplateMixin,dijit/TooltipDialog,dijit/Toolbar,dijit/form/CheckBox,dijit/form/_TextBoxMixin,dijit/form/TextBox,dijit/_editor/_Plugin,dijit/form/Button,dijit/form/DropDownButton,dijit/form/ToggleButton,dojox/editor/plugins/ToolbarLineBreak,dojo/_base/connect,dojo/_base/declare,dojo/i18n,dojo/string,dojo/i18n!dojox/editor/plugins/nls/FindReplace".split(","),
function(b,d,e,o,p,h,j,q,k,r,m,s,t,u,n){b.experimental("dojox.editor.plugins.FindReplace");b.declare("dojox.editor.plugins._FindReplaceCloseBox",[h,j,k],{btnId:"",widget:null,widgetsInTemplate:!0,templateString:"<span style='float: right' class='dijitInline' tabindex='-1'><button class='dijit dijitReset dijitInline' id='${btnId}' dojoAttachPoint='button' dojoType='dijit.form.Button' tabindex='-1' iconClass='dijitEditorIconsFindReplaceClose' showLabel='false'>X</button></span>",postMixInProperties:function(){this.id=
d.getUniqueId(this.declaredClass.replace(/\./g,"_"));this.btnId=this.id+"_close";this.inherited(arguments)},startup:function(){this.connect(this.button,"onClick","onClick")},onClick:function(){}});b.declare("dojox.editor.plugins._FindReplaceTextBox",[h,j,k],{textId:"",label:"",toolTip:"",widget:null,widgetsInTemplate:!0,templateString:"<span style='white-space: nowrap' class='dijit dijitReset dijitInline dijitEditorFindReplaceTextBox' title='${tooltip}' tabindex='-1'><label class='dijitLeft dijitInline' for='${textId}' tabindex='-1'>${label}</label><input dojoType='dijit.form.TextBox' intermediateChanges='true' class='focusTextBox' tabIndex='0' id='${textId}' dojoAttachPoint='textBox, focusNode' value='' dojoAttachEvent='onKeyPress: _onKeyPress'/></span>",
postMixInProperties:function(){this.id=d.getUniqueId(this.declaredClass.replace(/\./g,"_"));this.textId=this.id+"_text";this.inherited(arguments)},postCreate:function(){this.textBox.set("value","");this.disabled=this.textBox.get("disabled");this.connect(this.textBox,"onChange","onChange");b.attr(this.textBox.textbox,"formnovalidate","true")},_setValueAttr:function(a){this.value=a;this.textBox.set("value",a)},focus:function(){this.textBox.focus()},_setDisabledAttr:function(a){this.disabled=a;this.textBox.set("disabled",
a)},onChange:function(a){this.value=a},_onKeyPress:function(a){var c=0,g=0;if(a.target&&!a.ctrlKey&&!a.altKey&&!a.shiftKey)if(a.keyCode==b.keys.LEFT_ARROW)c=a.target.selectionStart,g=a.target.selectionEnd,c<g&&(d.selectInputText(a.target,c,c),b.stopEvent(a));else if(a.keyCode==b.keys.RIGHT_ARROW)c=a.target.selectionStart,g=a.target.selectionEnd,c<g&&(d.selectInputText(a.target,g,g),b.stopEvent(a))}});b.declare("dojox.editor.plugins._FindReplaceCheckBox",[h,j,k],{checkId:"",label:"",tooltip:"",widget:null,
widgetsInTemplate:!0,templateString:"<span style='white-space: nowrap' tabindex='-1' class='dijit dijitReset dijitInline dijitEditorFindReplaceCheckBox' title='${tooltip}' ><input dojoType='dijit.form.CheckBox' tabIndex='0' id='${checkId}' dojoAttachPoint='checkBox, focusNode' value=''/><label tabindex='-1' class='dijitLeft dijitInline' for='${checkId}'>${label}</label></span>",postMixInProperties:function(){this.id=d.getUniqueId(this.declaredClass.replace(/\./g,"_"));this.checkId=this.id+"_check";
this.inherited(arguments)},postCreate:function(){this.checkBox.set("checked",!1);this.disabled=this.checkBox.get("disabled");this.checkBox.isFocusable=function(){return!1}},_setValueAttr:function(a){this.checkBox.set("value",a)},_getValueAttr:function(){return this.checkBox.get("value")},focus:function(){this.checkBox.focus()},_setDisabledAttr:function(a){this.disabled=a;this.checkBox.set("disabled",a)}});b.declare("dojox.editor.plugins._FindReplaceToolbar",m,{postCreate:function(){this.connectKeyNavHandlers([],
[]);this.connect(this.containerNode,"onclick","_onToolbarEvent");this.connect(this.containerNode,"onkeydown","_onToolbarEvent");b.addClass(this.domNode,"dijitToolbar")},addChild:function(a,c){d._KeyNavContainer.superclass.addChild.apply(this,arguments)},_onToolbarEvent:function(a){a.stopPropagation()}});b.declare("dojox.editor.plugins.FindReplace",[n],{buttonClass:d.form.ToggleButton,iconClassPrefix:"dijitEditorIconsFindReplace",editor:null,button:null,_frToolbar:null,_closeBox:null,_findField:null,
_replaceField:null,_findButton:null,_replaceButton:null,_replaceAllButton:null,_caseSensitive:null,_backwards:null,_promDialog:null,_promDialogTimeout:null,_strings:null,_initButton:function(){this._strings=b.i18n.getLocalization("dojox.editor.plugins","FindReplace");this.button=new d.form.ToggleButton({label:this._strings.findReplace,showLabel:!1,iconClass:this.iconClassPrefix+" dijitEditorIconFindString",tabIndex:"-1",onChange:b.hitch(this,"_toggleFindReplace")});b.isOpera&&this.button.set("disabled",
!0);this.connect(this.button,"set",b.hitch(this,function(a,c){"disabled"===a&&this._toggleFindReplace(!c&&this._displayed,!0,!0)}))},setEditor:function(a){this.editor=a;this._initButton()},toggle:function(){this.button.set("checked",!this.button.get("checked"))},_toggleFindReplace:function(a,c,g){var f=b.marginBox(this.editor.domNode);if(a&&!b.isOpera){if(b.style(this._frToolbar.domNode,"display","block"),this._populateFindField(),!c)this._displayed=!0}else{b.style(this._frToolbar.domNode,"display",
"none");if(!c)this._displayed=!1;g||this.editor.focus()}this.editor.resize({h:f.h})},_populateFindField:function(){var a=this.editor._sCall("getSelectedText",[null]);this._findField&&this._findField.textBox&&(a&&this._findField.textBox.set("value",a),this._findField.textBox.focus(),d.selectInputText(this._findField.textBox.focusNode))},setToolbar:function(a){this.inherited(arguments);if(!b.isOpera){var c=this._frToolbar=new e.editor.plugins._FindReplaceToolbar;b.style(c.domNode,"display","none");
b.place(c.domNode,a.domNode,"after");c.startup();this._closeBox=new e.editor.plugins._FindReplaceCloseBox;c.addChild(this._closeBox);this._findField=new e.editor.plugins._FindReplaceTextBox({label:this._strings.findLabel,tooltip:this._strings.findTooltip});c.addChild(this._findField);this._replaceField=new e.editor.plugins._FindReplaceTextBox({label:this._strings.replaceLabel,tooltip:this._strings.replaceTooltip});c.addChild(this._replaceField);c.addChild(new e.editor.plugins.ToolbarLineBreak);this._findButton=
new d.form.Button({label:this._strings.findButton,showLabel:!0,iconClass:this.iconClassPrefix+" dijitEditorIconFind"});this._findButton.titleNode.title=this._strings.findButtonTooltip;c.addChild(this._findButton);this._replaceButton=new d.form.Button({label:this._strings.replaceButton,showLabel:!0,iconClass:this.iconClassPrefix+" dijitEditorIconReplace"});this._replaceButton.titleNode.title=this._strings.replaceButtonTooltip;c.addChild(this._replaceButton);this._replaceAllButton=new d.form.Button({label:this._strings.replaceAllButton,
showLabel:!0,iconClass:this.iconClassPrefix+" dijitEditorIconReplaceAll"});this._replaceAllButton.titleNode.title=this._strings.replaceAllButtonTooltip;c.addChild(this._replaceAllButton);this._caseSensitive=new e.editor.plugins._FindReplaceCheckBox({label:this._strings.matchCase,tooltip:this._strings.matchCaseTooltip});c.addChild(this._caseSensitive);this._backwards=new e.editor.plugins._FindReplaceCheckBox({label:this._strings.backwards,tooltip:this._strings.backwardsTooltip});c.addChild(this._backwards);
this._findButton.set("disabled",!0);this._replaceButton.set("disabled",!0);this._replaceAllButton.set("disabled",!0);this.connect(this._findField,"onChange","_checkButtons");this.connect(this._findField,"onKeyDown","_onFindKeyDown");this.connect(this._replaceField,"onKeyDown","_onReplaceKeyDown");this.connect(this._findButton,"onClick","_find");this.connect(this._replaceButton,"onClick","_replace");this.connect(this._replaceAllButton,"onClick","_replaceAll");this.connect(this._closeBox,"onClick",
"toggle");this._promDialog=new d.TooltipDialog;this._promDialog.startup();this._promDialog.set("content","")}},_checkButtons:function(){this._findField.get("value")?(this._findButton.set("disabled",!1),this._replaceButton.set("disabled",!1),this._replaceAllButton.set("disabled",!1)):(this._findButton.set("disabled",!0),this._replaceButton.set("disabled",!0),this._replaceAllButton.set("disabled",!0))},_onFindKeyDown:function(a){a.keyCode==b.keys.ENTER&&(this._find(),b.stopEvent(a))},_onReplaceKeyDown:function(a){a.keyCode==
b.keys.ENTER&&(this._replace()||this._replace(),b.stopEvent(a))},_find:function(a){var c=this._findField.get("value")||"";if(c){var g=this._caseSensitive.get("value"),f=this._backwards.get("value"),c=this._findText(c,g,f);if(!c&&a)this._promDialog.set("content",b.string.substitute(this._strings.eofDialogText,{"0":this._strings.eofDialogTextFind})),d.popup.open({popup:this._promDialog,around:this._findButton.domNode}),this._promDialogTimeout=setTimeout(b.hitch(this,function(){clearTimeout(this._promDialogTimeout);
this._promDialogTimeout=null;d.popup.close(this._promDialog)}),3E3),setTimeout(b.hitch(this,function(){this.editor.focus()}),0);return c}return!1},_replace:function(a){var c=!1,g=this.editor;g.focus();var f=this._findField.get("value")||"",l=this._replaceField.get("value")||"";if(f){var e=this._caseSensitive.get("value"),h=this._backwards.get("value"),i=g._sCall("getSelectedText",[null]);b.isMoz&&(f=b.trim(f),i=b.trim(i));f=this._filterRegexp(f,!e);i&&f.test(i)&&(g.execCommand("inserthtml",l),c=!0,
h&&(this._findText(l,e,h),g._sCall("collapse",[!0])));if(!this._find(!1)&&a)this._promDialog.set("content",b.string.substitute(this._strings.eofDialogText,{"0":this._strings.eofDialogTextReplace})),d.popup.open({popup:this._promDialog,around:this._replaceButton.domNode}),this._promDialogTimeout=setTimeout(b.hitch(this,function(){clearTimeout(this._promDialogTimeout);this._promDialogTimeout=null;d.popup.close(this._promDialog)}),3E3),setTimeout(b.hitch(this,function(){this.editor.focus()}),0);return c}return null},
_replaceAll:function(a){var c=0;this._backwards.get("value")?this.editor.placeCursorAtEnd():this.editor.placeCursorAtStart();this._replace(!1)&&c++;var g=b.hitch(this,function(){if(this._replace(!1))c++,setTimeout(g,10);else if(a)this._promDialog.set("content",b.string.substitute(this._strings.replaceDialogText,{"0":""+c})),d.popup.open({popup:this._promDialog,around:this._replaceAllButton.domNode}),this._promDialogTimeout=setTimeout(b.hitch(this,function(){clearTimeout(this._promDialogTimeout);this._promDialogTimeout=
null;d.popup.close(this._promDialog)}),3E3),setTimeout(b.hitch(this,function(){this._findField.focus();this._findField.textBox.focusNode.select()}),0)});g()},_findText:function(a,c,b){var f=this.editor,d=f.window,e=!1;if(a)d.find?e=d.find(a,c,b,!1,!1,!1,!1):(d=f.document,d.selection&&(this.editor.focus(),f=d.body.createTextRange(),(e=d.selection?d.selection.createRange():null)&&(b?f.setEndPoint("EndToStart",e):f.setEndPoint("StartToEnd",e)),c=c?4:0,b&&(c|=1),(e=f.findText(a,f.text.length,c))&&f.select()));
return e},_filterRegexp:function(a,c){for(var b="",d=null,e=0;e<a.length;e++)switch(d=a.charAt(e),d){case "\\":b+=d;e++;b+=a.charAt(e);break;case "$":case "^":case "/":case "+":case ".":case "|":case "(":case ")":case "{":case "}":case "[":case "]":b+="\\";default:b+=d}b="^"+b+"$";return c?RegExp(b,"mi"):RegExp(b,"m")},updateState:function(){this.button.set("disabled",this.get("disabled"))},destroy:function(){this.inherited(arguments);if(this._promDialogTimeout)clearTimeout(this._promDialogTimeout),
this._promDialogTimeout=null,d.popup.close(this._promDialog);if(this._frToolbar)this._frToolbar.destroyRecursive(),this._frToolbar=null;if(this._promDialog)this._promDialog.destroyRecursive(),this._promDialog=null}});b.subscribe(d._scopeName+".Editor.getPlugin",null,function(a){if(!a.plugin&&"findreplace"===a.args.name.toLowerCase())a.plugin=new e.editor.plugins.FindReplace({})});return e.editor.plugins.FindReplace});
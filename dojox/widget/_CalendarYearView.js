//>>built
require({cache:{"url:dojox/widget/Calendar/CalendarYear.html":'<div class="dojoxCalendarYearLabels" style="left: 0px;" dojoAttachPoint="yearContainer">\n    <table cellspacing="0" cellpadding="0" border="0" style="margin: auto;" dojoAttachEvent="onclick: onClick">\n        <tbody>\n            <tr class="dojoxCalendarYearGroupTemplate">\n                <td class="dojoxCalendarNextMonth dojoxCalendarYearTemplate">\n                    <div class="dojoxCalendarYearLabel">\n                    </div>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n'}});
define("dojox/widget/_CalendarYearView","dojo/_base/declare,./_CalendarView,dijit/_TemplatedMixin,dojo/date,dojo/dom-class,dojo/_base/event,dojo/text!./Calendar/CalendarYear.html,./_CalendarMonthYearView".split(","),function(c,d,e,f,g,h,i,j){return c("dojox.widget._CalendarYearView",[d,e],{templateString:i,displayedYears:6,postCreate:function(){this.cloneClass(".dojoxCalendarYearTemplate",3);this.cloneClass(".dojoxCalendarYearGroupTemplate",2);this._populateYears();this.addFx(".dojoxCalendarYearLabel",
this.domNode)},_setValueAttr:function(a){this._populateYears(a.getFullYear())},_populateYears:j.prototype._populateYears,adjustDate:function(a,b){return f.add(a,"year",12*b)},onClick:function(a){if(g.contains(a.target,"dojoxCalendarYearLabel")){var a=Number(a.target.innerHTML),b=this.get("value");b.setYear(a);this.onValueSelected(b,a)}else h.stop(a)}})});
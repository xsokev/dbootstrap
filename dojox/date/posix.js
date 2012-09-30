//>>built
define("dojox/date/posix",["dojo/_base/kernel","dojo/date","dojo/date/locale","dojo/string","dojo/cldr/supplemental"],function(q,o,h,r,l){q.getObject("date.posix",!0,dojox);dojox.date.posix.strftime=function(a,b,e){for(var c=null,d=function(a,b){return r.pad(a,b||2,c||"0")},l=h._getGregorianBundle(e),f=function(b){switch(b){case "a":return h.getNames("days","abbr","format",e)[a.getDay()];case "A":return h.getNames("days","wide","format",e)[a.getDay()];case "b":case "h":return h.getNames("months",
"abbr","format",e)[a.getMonth()];case "B":return h.getNames("months","wide","format",e)[a.getMonth()];case "c":return h.format(a,{formatLength:"full",locale:e});case "C":return d(Math.floor(a.getFullYear()/100));case "d":return d(a.getDate());case "D":return f("m")+"/"+f("d")+"/"+f("y");case "e":return null==c&&(c=" "),d(a.getDate());case "f":return null==c&&(c=" "),d(a.getMonth()+1);case "F":return f("Y")+"-"+f("m")+"-"+f("d");case "H":return d(a.getHours());case "I":return d(a.getHours()%12||12);
case "j":return d(h._getDayOfYear(a),3);case "k":return null==c&&(c=" "),d(a.getHours());case "l":return null==c&&(c=" "),d(a.getHours()%12||12);case "m":return d(a.getMonth()+1);case "M":return d(a.getMinutes());case "n":return"\n";case "p":return l["dayPeriods-format-wide-"+(12>a.getHours()?"am":"pm")];case "r":return f("I")+":"+f("M")+":"+f("S")+" "+f("p");case "R":return f("H")+":"+f("M");case "S":return d(a.getSeconds());case "t":return"\t";case "T":return f("H")+":"+f("M")+":"+f("S");case "u":return""+
(a.getDay()||7);case "U":return d(h._getWeekOfYear(a));case "V":return d(dojox.date.posix.getIsoWeekOfYear(a));case "W":return d(h._getWeekOfYear(a,1));case "w":return""+a.getDay();case "x":return h.format(a,{selector:"date",formatLength:"full",locale:e});case "X":return h.format(a,{selector:"time",formatLength:"full",locale:e});case "y":return d(a.getFullYear()%100);case "Y":return""+a.getFullYear();case "z":return b=a.getTimezoneOffset(),(0<b?"-":"+")+d(Math.floor(Math.abs(b)/60))+":"+d(Math.abs(b)%
60);case "Z":return o.getTimezoneName(a);case "%":return"%"}},j="",g=0,k=0,i=null;-1!=(k=b.indexOf("%",g));){j+=b.substring(g,k++);switch(b.charAt(k++)){case "_":c=" ";break;case "-":c="";break;case "0":c="0";break;case "^":i="upper";break;case "*":i="lower";break;case "#":i="swap";break;default:c=null,k--}g=f(b.charAt(k++));switch(i){case "upper":g=g.toUpperCase();break;case "lower":g=g.toLowerCase();break;case "swap":for(var i=g.toLowerCase(),p="",m="",n=0;n<g.length;n++)m=g.charAt(n),p+=m==i.charAt(n)?
m.toUpperCase():m.toLowerCase();g=p}i=null;j+=g;g=k}return j+=b.substring(g)};dojox.date.posix.getStartOfWeek=function(a,b){isNaN(b)&&(b=l.getFirstDayOfWeek?l.getFirstDayOfWeek():0);var e=b,e=a.getDay()>=b?e-a.getDay():e-(7-a.getDay()),c=new Date(a);c.setHours(0,0,0,0);return o.add(c,"day",e)};dojox.date.posix.setIsoWeekOfYear=function(a,b){if(!b)return a;var e=dojox.date.posix.getIsoWeekOfYear(a),c=b-e;0>b&&(c=dojox.date.posix.getIsoWeeksInYear(a)+b+1-e);return o.add(a,"week",c)};dojox.date.posix.getIsoWeekOfYear=
function(a){var b=dojox.date.posix.getStartOfWeek(a,1),a=new Date(a.getFullYear(),0,4),a=dojox.date.posix.getStartOfWeek(a,1),a=b.getTime()-a.getTime();return 0>a?dojox.date.posix.getIsoWeeksInYear(b):Math.ceil(a/6048E5)+1};dojox.date.posix.getIsoWeeksInYear=function(a){function b(a){return a+Math.floor(a/4)-Math.floor(a/100)+Math.floor(a/400)}a=a.getFullYear();return 4==b(a)%7||3==b(a-1)%7?53:52};return dojox.date.posix});
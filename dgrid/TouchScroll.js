//>>built
define("dgrid/TouchScroll",["dojo/_base/declare","dojo/on"],function(p,c){function q(a){i=a.touches.length}function r(a){var d;if(!(1<i)&&b)d=a.touches[0],a.preventDefault(),a.stopPropagation(),this.scrollLeft=b.startX-d.pageX,this.scrollTop=b.startY-d.pageY}function s(){1==i&&b&&(b.timer&&clearTimeout(b.timer),t(b),b=null)}function l(){var a,d;if(b){a=b.node;d=a.scrollLeft;a=a.scrollTop;if("prevX"in b)b.velX=d-b.prevX,b.velY=a-b.prevY;b.prevX=d;b.prevY=a;b.timer=setTimeout(l,j)}}function t(a){var b=
a.widget.id;if(a.velX||a.velY)a=k[b]=a,a.calcFunc=function(){var a=k[b],e,m,f,g,h,c;if(a&&(f=a.node,g=a.widget,e=f.scrollLeft,m=f.scrollTop,h=a.velX,c=a.velY,h=g.glideDecel(h),g=g.glideDecel(c),Math.abs(h)>=n||Math.abs(g)>=n))if(f.scrollLeft+=h,f.scrollTop+=g,f.scrollLeft!=e||f.scrollTop!=m)a.velX=h,a.velY=g,a.timer=setTimeout(a.calcFunc,j)},a.timer=setTimeout(a.calcFunc,j)}var o,j=15,i=0,b={},k={},n=1;return p([],{startup:function(){var a=this.touchNode||this.containerNode||this.domNode,d=this;c(a,
"touchstart",function(a){a.widget=d;var e;e=a.widget.id;var c=k[e];c&&(clearTimeout(c.timer),delete k[e]);0<i||(e=a.touches[0],b={widget:a.widget,node:this,startX:this.scrollLeft+e.pageX,startY:this.scrollTop+e.pageY,timer:setTimeout(l,j)})});c(a,"touchmove",r);c(a,"touchend,touchcancel",s);o||(o=c(document.body,"touchstart,touchend,touchcancel",q))},glideDecel:function(a){return 0.9*a}})});
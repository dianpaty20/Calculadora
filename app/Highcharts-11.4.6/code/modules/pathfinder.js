!/**
 * Highcharts Gantt JS v11.4.6 (2024-07-08)
 *
 * Pathfinder
 *
 * (c) 2016-2024 Øystein Moseng
 *
 * License: www.highcharts.com/license
 */function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/modules/pathfinder",["highcharts"],function(n){return t(n),t.Highcharts=n,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var n=t?t._modules:{};function e(n,e,i,r){n.hasOwnProperty(e)||(n[e]=r.apply(null,i),"function"==typeof CustomEvent&&t.win.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:n[e]}})))}e(n,"Gantt/Connection.js",[n["Core/Globals.js"],n["Core/Utilities.js"]],function(t,n){let{defined:e,error:i,merge:r,objectEach:a}=n,o=t.deg2rad,s=Math.max,h=Math.min;return class{constructor(t,n,e){this.init(t,n,e)}init(t,n,e){this.fromPoint=t,this.toPoint=n,this.options=e,this.chart=t.series.chart,this.pathfinder=this.chart.pathfinder}renderPath(t,n){let e=this.chart,i=e.styledMode,r=this.pathfinder,a={},o=this.graphics&&this.graphics.path;r.group||(r.group=e.renderer.g().addClass("highcharts-pathfinder-group").attr({zIndex:-1}).add(e.seriesGroup)),r.group.translate(e.plotLeft,e.plotTop),o&&o.renderer||(o=e.renderer.path().add(r.group),i||o.attr({opacity:0})),o.attr(n),a.d=t,i||(a.opacity=1),o.animate(a),this.graphics=this.graphics||{},this.graphics.path=o}addMarker(t,n,e){let i,r,a,s,h,c,l,x;let M=this.fromPoint.series.chart,d=M.pathfinder,y=M.renderer,f="start"===t?this.fromPoint:this.toPoint,u=f.getPathfinderAnchorPoint(n);n.enabled&&((x="start"===t?e[1]:e[e.length-2])&&"M"===x[0]||"L"===x[0])&&(l={x:x[1],y:x[2]},r=f.getRadiansToVector(l,u),i=f.getMarkerVector(r,n.radius,u),a=-r/o,n.width&&n.height?(h=n.width,c=n.height):h=c=2*n.radius,this.graphics=this.graphics||{},s={x:i.x-h/2,y:i.y-c/2,width:h,height:c,rotation:a,rotationOriginX:i.x,rotationOriginY:i.y},this.graphics[t]?this.graphics[t].animate(s):(this.graphics[t]=y.symbol(n.symbol).addClass("highcharts-point-connecting-path-"+t+"-marker highcharts-color-"+this.fromPoint.colorIndex).attr(s).add(d.group),y.styledMode||this.graphics[t].attr({fill:n.color||this.fromPoint.color,stroke:n.lineColor,"stroke-width":n.lineWidth,opacity:0}).animate({opacity:1},f.series.options.animation)))}getPath(t){let n=this.pathfinder,e=this.chart,a=n.algorithms[t.type],o=n.chartObstacles;return"function"!=typeof a?(i('"'+t.type+'" is not a Pathfinder algorithm.'),{path:[],obstacles:[]}):(a.requiresObstacles&&!o&&(o=n.chartObstacles=n.getChartObstacles(t),e.options.connectors.algorithmMargin=t.algorithmMargin,n.chartObstacleMetrics=n.getObstacleMetrics(o)),a(this.fromPoint.getPathfinderAnchorPoint(t.startMarker),this.toPoint.getPathfinderAnchorPoint(t.endMarker),r({chartObstacles:o,lineObstacles:n.lineObstacles||[],obstacleMetrics:n.chartObstacleMetrics,hardBounds:{xMin:0,xMax:e.plotWidth,yMin:0,yMax:e.plotHeight},obstacleOptions:{margin:t.algorithmMargin},startDirectionX:n.getAlgorithmStartDirection(t.startMarker)},t)))}render(){let t=this.fromPoint,n=t.series,i=n.chart,a=i.pathfinder,o={},c=r(i.options.connectors,n.options.connectors,t.options.connectors,this.options);!i.styledMode&&(o.stroke=c.lineColor||t.color,o["stroke-width"]=c.lineWidth,c.dashStyle&&(o.dashstyle=c.dashStyle)),o.class="highcharts-point-connecting-path highcharts-color-"+t.colorIndex,e((c=r(o,c)).marker.radius)||(c.marker.radius=h(s(Math.ceil((c.algorithmMargin||8)/2)-1,1),5));let l=this.getPath(c),x=l.path;l.obstacles&&(a.lineObstacles=a.lineObstacles||[],a.lineObstacles=a.lineObstacles.concat(l.obstacles)),this.renderPath(x,o),this.addMarker("start",r(c.marker,c.startMarker),x),this.addMarker("end",r(c.marker,c.endMarker),x)}destroy(){this.graphics&&(a(this.graphics,function(t){t.destroy()}),delete this.graphics)}}}),e(n,"Series/PathUtilities.js",[],function(){function t(t,n){let e=[];for(let i=0;i<t.length;i++){let r=t[i][1],a=t[i][2];if("number"==typeof r&&"number"==typeof a){if(0===i)e.push(["M",r,a]);else if(i===t.length-1)e.push(["L",r,a]);else if(n){let o=t[i-1],s=t[i+1];if(o&&s){let t=o[1],i=o[2],h=s[1],c=s[2];if("number"==typeof t&&"number"==typeof h&&"number"==typeof i&&"number"==typeof c&&t!==h&&i!==c){let o=t<h?1:-1,s=i<c?1:-1;e.push(["L",r-o*Math.min(Math.abs(r-t),n),a-s*Math.min(Math.abs(a-i),n)],["C",r,a,r,a,r+o*Math.min(Math.abs(r-h),n),a+s*Math.min(Math.abs(a-c),n)])}}}else e.push(["L",r,a])}}return e}return{applyRadius:t,getLinkPath:{default:function(n){let{x1:e,y1:i,x2:r,y2:a,width:o=0,inverted:s=!1,radius:h,parentVisible:c}=n,l=[["M",e,i],["L",e,i],["C",e,i,e,a,e,a],["L",e,a],["C",e,i,e,a,e,a],["L",e,a]];return c?t([["M",e,i],["L",e+o*(s?-.5:.5),i],["L",e+o*(s?-.5:.5),a],["L",r,a]],h):l},straight:function(t){let{x1:n,y1:e,x2:i,y2:r,width:a=0,inverted:o=!1,parentVisible:s}=t;return s?[["M",n,e],["L",n+a*(o?-1:1),r],["L",i,r]]:[["M",n,e],["L",n,r],["L",n,r]]},curved:function(t){let{x1:n,y1:e,x2:i,y2:r,offset:a=0,width:o=0,inverted:s=!1,parentVisible:h}=t;return h?[["M",n,e],["C",n+a,e,n-a+o*(s?-1:1),r,n+o*(s?-1:1),r],["L",i,r]]:[["M",n,e],["C",n,e,n,r,n,r],["L",i,r]]}}}}),e(n,"Gantt/PathfinderAlgorithms.js",[n["Series/PathUtilities.js"],n["Core/Utilities.js"]],function(t,n){let{pick:e}=n,{min:i,max:r,abs:a}=Math;function o(t,n,e){let i=n-1e-7,r=e||0,a=t.length-1,o,s;for(;r<=a;)if((s=i-t[o=a+r>>1].xMin)>0)r=o+1;else{if(!(s<0))return o;a=o-1}return r>0?r-1:0}function s(t,n){let e=o(t,n.x+1)+1;for(;e--;){var i;if(t[e].xMax>=n.x&&(i=t[e],n.x<=i.xMax&&n.x>=i.xMin&&n.y<=i.yMax&&n.y>=i.yMin))return e}return -1}function h(t){let n=[];if(t.length){n.push(["M",t[0].start.x,t[0].start.y]);for(let e=0;e<t.length;++e)n.push(["L",t[e].end.x,t[e].end.y])}return n}function c(t,n){t.yMin=r(t.yMin,n.yMin),t.yMax=i(t.yMax,n.yMax),t.xMin=r(t.xMin,n.xMin),t.xMax=i(t.xMax,n.xMax)}let l=function(n,i,r){let o=[],c=r.chartObstacles,l=s(c,n),x=s(c,i),M,d=e(r.startDirectionX,a(i.x-n.x)>a(i.y-n.y))?"x":"y",y,f,u,p;function g(t,n,e,i,r){let a={x:t.x,y:t.y};return a[n]=e[i||n]+(r||0),a}function m(t,n,e){let i=a(n[e]-t[e+"Min"])>a(n[e]-t[e+"Max"]);return g(n,e,t,e+(i?"Max":"Min"),i?1:-1)}x>-1?(M={start:f=m(c[x],i,d),end:i},p=f):p=i,l>-1&&(f=m(y=c[l],n,d),o.push({start:n,end:f}),f[d]>=n[d]==f[d]>=p[d]&&(u=n[d="y"===d?"x":"y"]<i[d],o.push({start:f,end:g(f,d,y,d+(u?"Max":"Min"),u?1:-1)}),d="y"===d?"x":"y"));let b=o.length?o[o.length-1].end:n;f=g(b,d,p),o.push({start:b,end:f});let P=g(f,d="y"===d?"x":"y",p);return o.push({start:f,end:P}),o.push(M),{path:t.applyRadius(h(o),r.radius),obstacles:o}};function x(t,n,l){let x=e(l.startDirectionX,a(n.x-t.x)>a(n.y-t.y)),M=x?"x":"y",d=[],y=l.obstacleMetrics,f=i(t.x,n.x)-y.maxWidth-10,u=r(t.x,n.x)+y.maxWidth+10,p=i(t.y,n.y)-y.maxHeight-10,g=r(t.y,n.y)+y.maxHeight+10,m,b,P,v=!1,C=l.chartObstacles,k=o(C,u),O=o(C,f);function w(t,n,e){let r,a,s,h;let c=t.x<n.x?1:-1;t.x<n.x?(r=t,a=n):(r=n,a=t),t.y<n.y?(h=t,s=n):(h=n,s=t);let l=c<0?i(o(C,a.x),C.length-1):0;for(;C[l]&&(c>0&&C[l].xMin<=a.x||c<0&&C[l].xMax>=r.x);){if(C[l].xMin<=a.x&&C[l].xMax>=r.x&&C[l].yMin<=s.y&&C[l].yMax>=h.y){if(e)return{y:t.y,x:t.x<n.x?C[l].xMin-1:C[l].xMax+1,obstacle:C[l]};return{x:t.x,y:t.y<n.y?C[l].yMin-1:C[l].yMax+1,obstacle:C[l]}}l+=c}return n}function L(t,n,e,i,r){let o=r.soft,s=r.hard,h=i?"x":"y",c={x:n.x,y:n.y},l={x:n.x,y:n.y},x=t[h+"Max"]>=o[h+"Max"],M=t[h+"Min"]<=o[h+"Min"],d=t[h+"Max"]>=s[h+"Max"],y=t[h+"Min"]<=s[h+"Min"],f=a(t[h+"Min"]-n[h]),u=a(t[h+"Max"]-n[h]),p=10>a(f-u)?n[h]<e[h]:u<f;l[h]=t[h+"Min"],c[h]=t[h+"Max"];let g=w(n,l,i)[h]!==l[h],m=w(n,c,i)[h]!==c[h];return p=g?!m||p:!m&&p,p=M?!x||p:!x&&p,p=y?!d||p:!d&&p}for((k=s(C=C.slice(O,k+1),n))>-1&&(P=function(t,n,e){let r=i(t.xMax-n.x,n.x-t.xMin)<i(t.yMax-n.y,n.y-t.yMin),a=L(t,n,e,r,{soft:l.hardBounds,hard:l.hardBounds});return r?{y:n.y,x:t[a?"xMax":"xMin"]+(a?1:-1)}:{x:n.x,y:t[a?"yMax":"yMin"]+(a?1:-1)}}(C[k],n,t),d.push({end:n,start:P}),n=P);(k=s(C,n))>-1;)b=n[M]-t[M]<0,(P={x:n.x,y:n.y})[M]=C[k][b?M+"Max":M+"Min"]+(b?1:-1),d.push({end:n,start:P}),n=P;return{path:h(m=(m=function t(n,e,a){let o,h,x,M,d,y,m;if(n.x===e.x&&n.y===e.y)return[];let b=a?"x":"y",P=l.obstacleOptions.margin,k={soft:{xMin:f,xMax:u,yMin:p,yMax:g},hard:l.hardBounds};return(d=s(C,n))>-1?(M=L(d=C[d],n,e,a,k),c(d,l.hardBounds),m=a?{y:n.y,x:d[M?"xMax":"xMin"]+(M?1:-1)}:{x:n.x,y:d[M?"yMax":"yMin"]+(M?1:-1)},(y=s(C,m))>-1&&(c(y=C[y],l.hardBounds),m[b]=M?r(d[b+"Max"]-P+1,(y[b+"Min"]+d[b+"Max"])/2):i(d[b+"Min"]+P-1,(y[b+"Max"]+d[b+"Min"])/2),n.x===m.x&&n.y===m.y?(v&&(m[b]=M?r(d[b+"Max"],y[b+"Max"])+1:i(d[b+"Min"],y[b+"Min"])-1),v=!v):v=!1),h=[{start:n,end:m}]):(o=w(n,{x:a?e.x:n.x,y:a?n.y:e.y},a),h=[{start:n,end:{x:o.x,y:o.y}}],o[a?"x":"y"]!==e[a?"x":"y"]&&(M=L(o.obstacle,o,e,!a,k),c(o.obstacle,l.hardBounds),x={x:a?o.x:o.obstacle[M?"xMax":"xMin"]+(M?1:-1),y:a?o.obstacle[M?"yMax":"yMin"]+(M?1:-1):o.y},a=!a,h=h.concat(t({x:o.x,y:o.y},x,a)))),h=h.concat(t(h[h.length-1].end,e,!a))}(t,n,x)).concat(d.reverse())),obstacles:m}}return l.requiresObstacles=!0,x.requiresObstacles=!0,{fastAvoid:x,straight:function(t,n){return{path:[["M",t.x,t.y],["L",n.x,n.y]],obstacles:[{start:t,end:n}]}},simpleConnect:l}}),e(n,"Gantt/ConnectorsDefaults.js",[],function(){return{connectors:{type:"straight",radius:0,lineWidth:1,marker:{enabled:!1,align:"center",verticalAlign:"middle",inside:!1,lineWidth:1},startMarker:{symbol:"diamond"},endMarker:{symbol:"arrow-filled"}}}}),e(n,"Gantt/PathfinderComposition.js",[n["Gantt/ConnectorsDefaults.js"],n["Core/Defaults.js"],n["Core/Utilities.js"]],function(t,n,e){var i;let{setOptions:r}=n,{defined:a,error:o,merge:s}=e;function h(t){let n=t.shapeArgs;if(n)return{xMin:n.x||0,xMax:(n.x||0)+(n.width||0),yMin:n.y||0,yMax:(n.y||0)+(n.height||0)};let e=t.graphic&&t.graphic.getBBox();return e?{xMin:t.plotX-e.width/2,xMax:t.plotX+e.width/2,yMin:t.plotY-e.height/2,yMax:t.plotY+e.height/2}:null}return function(n){function e(t){let n,e;let i=h(this);switch(t.align){case"right":n="xMax";break;case"left":n="xMin"}switch(t.verticalAlign){case"top":e="yMin";break;case"bottom":e="yMax"}return{x:n?i[n]:(i.xMin+i.xMax)/2,y:e?i[e]:(i.yMin+i.yMax)/2}}function i(t,n){let e;return!a(n)&&(e=h(this))&&(n={x:(e.xMin+e.xMax)/2,y:(e.yMin+e.yMax)/2}),Math.atan2(n.y-t.y,t.x-n.x)}function c(t,n,e){let i=2*Math.PI,r=h(this),a=r.xMax-r.xMin,o=r.yMax-r.yMin,s=Math.atan2(o,a),c=a/2,l=o/2,x=r.xMin+c,M=r.yMin+l,d={x:x,y:M},y=t,f=1,u=!1,p=1,g=1;for(;y<-Math.PI;)y+=i;for(;y>Math.PI;)y-=i;return f=Math.tan(y),y>-s&&y<=s?(g=-1,u=!0):y>s&&y<=Math.PI-s?g=-1:y>Math.PI-s||y<=-(Math.PI-s)?(p=-1,u=!0):p=-1,u?(d.x+=p*c,d.y+=g*c*f):(d.x+=o/(2*f)*p,d.y+=g*l),e.x!==x&&(d.x=e.x),e.y!==M&&(d.y=e.y),{x:d.x+n*Math.cos(y),y:d.y-n*Math.sin(y)}}n.compose=function(n,a,h){let l=h.prototype;l.getPathfinderAnchorPoint||(n.prototype.callbacks.push(function(t){!1!==t.options.connectors.enabled&&((t.options.pathfinder||t.series.reduce(function(t,n){return n.options&&s(!0,n.options.connectors=n.options.connectors||{},n.options.pathfinder),t||n.options&&n.options.pathfinder},!1))&&(s(!0,t.options.connectors=t.options.connectors||{},t.options.pathfinder),o('WARNING: Pathfinder options have been renamed. Use "chart.connectors" or "series.connectors" instead.')),this.pathfinder=new a(this),this.pathfinder.update(!0))}),l.getMarkerVector=c,l.getPathfinderAnchorPoint=e,l.getRadiansToVector=i,r(t))}}(i||(i={})),i}),e(n,"Gantt/Pathfinder.js",[n["Gantt/Connection.js"],n["Gantt/PathfinderAlgorithms.js"],n["Gantt/PathfinderComposition.js"],n["Core/Series/Point.js"],n["Core/Utilities.js"]],function(t,n,e,i,r){let{addEvent:a,defined:o,pick:s,splat:h}=r,c=Math.max,l=Math.min;class x{static compose(t,n){e.compose(t,x,n)}constructor(t){this.init(t)}init(t){this.chart=t,this.connections=[],a(t,"redraw",function(){this.pathfinder.update()})}update(n){let e=this.chart,r=this,a=r.connections;r.connections=[],e.series.forEach(function(n){n.visible&&!n.options.isInternal&&n.points.forEach(function(n){let a;let o=n.options;o&&o.dependency&&(o.connect=o.dependency);let s=n.options?.connect&&h(n.options.connect);n.visible&&!1!==n.isInside&&s&&s.forEach(function(o){(a=e.get("string"==typeof o?o:o.to))instanceof i&&a.series.visible&&a.visible&&!1!==a.isInside&&r.connections.push(new t(n,a,"string"==typeof o?{}:o))})})});for(let t=0,n,e,i=a.length,o=r.connections.length;t<i;++t){e=!1;let i=a[t];for(n=0;n<o;++n){let t=r.connections[n];if((i.options&&i.options.type)===(t.options&&t.options.type)&&i.fromPoint===t.fromPoint&&i.toPoint===t.toPoint){t.graphics=i.graphics,e=!0;break}}e||i.destroy()}delete this.chartObstacles,delete this.lineObstacles,r.renderConnections(n)}renderConnections(t){t?this.chart.series.forEach(function(t){let n=function(){let n=t.chart.pathfinder;(n&&n.connections||[]).forEach(function(n){n.fromPoint&&n.fromPoint.series===t&&n.render()}),t.pathfinderRemoveRenderEvent&&(t.pathfinderRemoveRenderEvent(),delete t.pathfinderRemoveRenderEvent)};!1===t.options.animation?n():t.pathfinderRemoveRenderEvent=a(t,"afterAnimate",n)}):this.connections.forEach(function(t){t.render()})}getChartObstacles(t){let n=this.chart.series,e=s(t.algorithmMargin,0),i=[],r;for(let t=0,r=n.length;t<r;++t)if(n[t].visible&&!n[t].options.isInternal)for(let r=0,a=n[t].points.length,o,s;r<a;++r)(s=n[t].points[r]).visible&&(o=function(t){let n=t.shapeArgs;if(n)return{xMin:n.x||0,xMax:(n.x||0)+(n.width||0),yMin:n.y||0,yMax:(n.y||0)+(n.height||0)};let e=t.graphic&&t.graphic.getBBox();return e?{xMin:t.plotX-e.width/2,xMax:t.plotX+e.width/2,yMin:t.plotY-e.height/2,yMax:t.plotY+e.height/2}:null}(s))&&i.push({xMin:o.xMin-e,xMax:o.xMax+e,yMin:o.yMin-e,yMax:o.yMax+e});return i=i.sort(function(t,n){return t.xMin-n.xMin}),o(t.algorithmMargin)||(r=t.algorithmMargin=function(t){let n;let e=t.length,i=[];for(let r=0;r<e;++r)for(let a=r+1;a<e;++a)(n=function t(n,e,i){let r=s(i,10),a=n.yMax+r>e.yMin-r&&n.yMin-r<e.yMax+r,o=n.xMax+r>e.xMin-r&&n.xMin-r<e.xMax+r,h=a?n.xMin>e.xMax?n.xMin-e.xMax:e.xMin-n.xMax:1/0,c=o?n.yMin>e.yMax?n.yMin-e.yMax:e.yMin-n.yMax:1/0;return o&&a?r?t(n,e,Math.floor(r/2)):1/0:l(h,c)}(t[r],t[a]))<80&&i.push(n);return i.push(80),c(Math.floor(i.sort(function(t,n){return t-n})[Math.floor(i.length/10)]/2-1),1)}(i),i.forEach(function(t){t.xMin-=r,t.xMax+=r,t.yMin-=r,t.yMax+=r})),i}getObstacleMetrics(t){let n=0,e=0,i,r,a=t.length;for(;a--;)i=t[a].xMax-t[a].xMin,r=t[a].yMax-t[a].yMin,n<i&&(n=i),e<r&&(e=r);return{maxHeight:e,maxWidth:n}}getAlgorithmStartDirection(t){let n="left"!==t.align&&"right"!==t.align,e="top"!==t.verticalAlign&&"bottom"!==t.verticalAlign;return n?!!e&&void 0:!!e||void 0}}return x.prototype.algorithms=n,x}),e(n,"Extensions/ArrowSymbols.js",[],function(){function t(t,n,e,i){return[["M",t,n+i/2],["L",t+e,n],["L",t,n+i/2],["L",t+e,n+i]]}function n(n,e,i,r){return t(n,e,i/2,r)}function e(t,n,e,i){return[["M",t+e,n],["L",t,n+i/2],["L",t+e,n+i],["Z"]]}function i(t,n,i,r){return e(t,n,i/2,r)}return{compose:function(r){let a=r.prototype.symbols;a.arrow=t,a["arrow-filled"]=e,a["arrow-filled-half"]=i,a["arrow-half"]=n,a["triangle-left"]=e,a["triangle-left-half"]=i}}}),e(n,"masters/modules/pathfinder.src.js",[n["Core/Globals.js"],n["Gantt/Pathfinder.js"],n["Extensions/ArrowSymbols.js"]],function(t,n,e){return t.Pathfinder=t.Pathfinder||n,e.compose(t.SVGRenderer),t.Pathfinder.compose(t.Chart,t.Point),t})});
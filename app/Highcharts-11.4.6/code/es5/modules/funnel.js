!/**
 * Highcharts JS v11.4.6 (2024-07-08)
 *
 * Highcharts funnel module
 *
 * (c) 2010-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/modules/funnel",["highcharts"],function(e){return t(e),t.Highcharts=e,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var e=t?t._modules:{};function n(e,n,i,o){e.hasOwnProperty(n)||(e[n]=o.apply(null,i),"function"==typeof CustomEvent&&t.win.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:n,module:e[n]}})))}n(e,"Series/Funnel/FunnelSeriesDefaults.js",[],function(){return{animation:!1,borderRadius:0,center:["50%","50%"],width:"90%",neckWidth:"30%",height:"100%",neckHeight:"25%",reversed:!1,size:!0,dataLabels:{connectorWidth:1,verticalAlign:"middle"},states:{select:{color:"#cccccc",borderColor:"#000000"}}}}),n(e,"Series/Funnel/FunnelSeries.js",[e["Series/Funnel/FunnelSeriesDefaults.js"],e["Core/Globals.js"],e["Extensions/BorderRadius.js"],e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e,n,i,o){var r,s=this&&this.__extends||(r=function(t,e){return(r=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),a=e.composed,d=e.noop,l=i.seriesTypes,u=l.column,h=l.pie,c=o.addEvent,p=o.correctFloat,f=o.extend,y=o.fireEvent,g=o.isArray,x=o.merge,v=o.pick,b=o.pushUnique,m=o.relativeLength,L=o.splat,S=i.series.prototype.alignDataLabel;function j(t,e){return/%$/.test(t)?e*parseInt(t,10)/100:parseInt(t,10)}var C=function(e){function i(){return null!==e&&e.apply(this,arguments)||this}return s(i,e),i.prototype.alignDataLabel=function(t,e,n,i,o){var r,s=t.series,a=s.options.reversed,d=t.dlBox||t.shapeArgs,l=n.align,u=n.padding,h=void 0===u?0:u,c=n.verticalAlign,p=((s.options||{}).dataLabels||{}).inside,f=s.center[1],y=t.plotY||0,g=null!==(r=e.height)&&void 0!==r?r:e.getBBox().height,x=s.getWidthAt((a?2*f-y:y)-d.height/2+g),v="middle"===c?(d.topWidth-d.bottomWidth)/4:(x-d.bottomWidth)/2,b=d.y,m=d.x;"middle"===c?b=d.y-d.height/2+g/2:"top"===c&&(b=d.y-d.height+g+h),("top"===c&&!a||"bottom"===c&&a||"middle"===c)&&("right"===l?m=d.x-h+v:"left"===l&&(m=d.x+h-v)),i={x:m,y:a?b-d.height:b,width:d.bottomWidth,height:d.height},n.verticalAlign="bottom",p&&(n.distance=void 0),p&&t.visible&&S.call(s,t,e,n,i,o),p&&(!t.visible&&t.dataLabel&&(t.dataLabel.placed=!1),t.contrastColor&&e.css({color:t.contrastColor}))},i.prototype.drawDataLabels=function(){(L(this.options.dataLabels)[0].inside?u:h).prototype.drawDataLabels.call(this)},i.prototype.getDataLabelPosition=function(t,e){var n=t.plotY||0,i=t.half?1:-1,o=this.getX(n,!!t.half,t);return{distance:e,natural:{x:0,y:n},computed:{},alignment:t.half?"right":"left",connectorPosition:{breakAt:{x:o+(e-5)*i,y:n},touchingSliceAt:{x:o+e*i,y:n}}}},i.prototype.translate=function(){var t,e,i,o,r,s,a,l,u,h,c,f,g=this,x=g.chart,b=g.options,L=b.reversed,S=b.ignoreHiddenPoint,C=n.optionsToObject(b.borderRadius),P=x.plotWidth,_=x.plotHeight,M=b.center,A=j(M[0],P),O=j(M[1],_),W=j(b.width,P),w=j(b.height,_),F=j(b.neckWidth,P),k=j(b.neckHeight,_),D=O-w/2+w-k,H=g.points,E=m(C.radius,W),T=C.scope,I="left"===b.dataLabels.position?1:0,B=function(t){var e=Math.tan(t/2),n=Math.cos(o),i=Math.sin(o),s=E,a=s/e,d=Math.tan((Math.PI-t)/3.2104);return a>r&&(s=(a=r)*e),{dx:[a*n,(a-(d*=s))*n,a-d,a],dy:[a*i,(a-d)*i,a-d,a].map(function(t){return L?-t:t})}},Y=0,R=0;g.getWidthAt=function(t){var e=O-w/2;return t>D||w===k?F:F+(W-F)*(1-(t-e)/(w-k))},g.getX=function(t,e,n){var i,o,r,s;return A+(e?-1:1)*(g.getWidthAt(L?2*O-t:t)/2+(null!==(r=null===(o=null===(i=n.dataLabel)||void 0===i?void 0:i.dataLabelPosition)||void 0===o?void 0:o.distance)&&void 0!==r?r:m((null===(s=this.options.dataLabels)||void 0===s?void 0:s.distance)||0,W)))},g.center=[A,O,w],g.centerX=A;for(var X=0;X<H.length;X++){var U=H[X];U.y&&U.isValid()&&(!S||!1!==U.visible)&&(Y+=U.y)}for(var q=0;q<H.length;q++){var U=H[q];if(f=null,i=Y?U.y/Y:0,h=(a=O-w/2+R*w)+i*w,l=(s=A-(t=g.getWidthAt(a))/2)+t,c=(u=A-(t=g.getWidthAt(h))/2)+t,p(a)>=D?(s=u=A-F/2,l=c=A+F/2):h>D&&(f=h,c=(u=A-(t=g.getWidthAt(D))/2)+t,h=D),L&&(a=2*O-a,h=2*O-h,null!==f&&(f=2*O-f)),E&&("point"===T||0===U.index||U.index===H.length-1||null!==f)){var G=Math.abs(h-a),N=l-c,V=c-u,z=Math.sqrt(N*N+G*G);o=Math.atan(0!==N?G/N:1/0),r=z/2,null!==f&&(r=Math.min(r,Math.abs(f-h)/2)),V>=1&&(r=Math.min(r,V/2));var Z=B(o);if(e="stack"===T&&0!==U.index?[["M",s,a],["L",l,a]]:[["M",s+Z.dx[0],a+Z.dy[0]],["C",s+Z.dx[1],a+Z.dy[1],s+Z.dx[2],a,s+Z.dx[3],a],["L",l-Z.dx[3],a],["C",l-Z.dx[2],a,l-Z.dx[1],a+Z.dy[1],l-Z.dx[0],a+Z.dy[0]]],null!==f){var $=B(Math.PI/2);Z=B(Math.PI/2+o),e.push(["L",c+Z.dx[0],h-Z.dy[0]],["C",c+Z.dx[1],h-Z.dy[1],c,h+Z.dy[2],c,h+Z.dy[3]]),"stack"===T&&U.index!==H.length-1?e.push(["L",c,f],["L",u,f]):e.push(["L",c,f-$.dy[3]],["C",c,f-$.dy[2],c-$.dx[2],f,c-$.dx[3],f],["L",u+$.dx[3],f],["C",u+$.dx[2],f,u,f-$.dy[2],u,f-$.dy[3]]),e.push(["L",u,h+Z.dy[3]],["C",u,h+Z.dy[2],u-Z.dx[1],h-Z.dy[1],u-Z.dx[0],h-Z.dy[0]])}else V>=1?(Z=B(Math.PI-o),"stack"===T&&0===U.index?e.push(["L",c,h],["L",u,h]):e.push(["L",c+Z.dx[0],h-Z.dy[0]],["C",c+Z.dx[1],h-Z.dy[1],c-Z.dx[2],h,c-Z.dx[3],h],["L",u+Z.dx[3],h],["C",u+Z.dx[2],h,u-Z.dx[1],h-Z.dy[1],u-Z.dx[0],h-Z.dy[0]])):(Z=B(Math.PI-2*o),e.push(["L",u+Z.dx[0],h-Z.dy[0]],["C",u+Z.dx[1],h-Z.dy[1],u-Z.dx[1],h-Z.dy[1],u-Z.dx[0],h-Z.dy[0]]))}else e=[["M",s,a],["L",l,a],["L",c,h]],null!==f&&e.push(["L",c,f],["L",u,f]),e.push(["L",u,h]);e.push(["Z"]),U.shapeType="path",U.shapeArgs={d:e},U.percentage=100*i,U.plotX=A,U.plotY=(a+(f||h))/2,U.tooltipPos=[A,U.plotY],U.dlBox={x:u,y:a,topWidth:l-s,bottomWidth:c-u,height:Math.abs(v(f,h)-a),width:NaN},U.slice=d,U.half=I,U.isValid()&&(!S||!1!==U.visible)&&(R+=i)}y(g,"afterTranslate")},i.prototype.sortByAngle=function(t){t.sort(function(t,e){return t.plotY-e.plotY})},i.defaultOptions=x(h.defaultOptions,t),i}(h);return f(C.prototype,{animate:d}),function(t){function e(){for(var t=0,e=this.series;t<e.length;t++){var n=e[t],i=n.options&&n.options.dataLabels;g(i)&&(i=i[0]),n.is("pie")&&n.placeDataLabels&&i&&!i.inside&&n.placeDataLabels()}}t.compose=function(t){b(a,"FunnelSeries")&&c(t,"afterHideAllOverlappingLabels",e)}}(C||(C={})),i.registerSeriesType("funnel",C),C}),n(e,"Series/Pyramid/PyramidSeriesDefaults.js",[],function(){return{neckHeight:"0%",neckWidth:"0%",reversed:!0}}),n(e,"Series/Pyramid/PyramidSeries.js",[e["Series/Funnel/FunnelSeries.js"],e["Series/Pyramid/PyramidSeriesDefaults.js"],e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e,n,i){var o,r=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),s=i.merge,a=function(n){function i(){return null!==n&&n.apply(this,arguments)||this}return r(i,n),i.defaultOptions=s(t.defaultOptions,e),i}(t);return n.registerSeriesType("pyramid",a),a}),n(e,"masters/modules/funnel.src.js",[e["Core/Globals.js"],e["Series/Funnel/FunnelSeries.js"]],function(t,e){return e.compose(t.Chart),t})});
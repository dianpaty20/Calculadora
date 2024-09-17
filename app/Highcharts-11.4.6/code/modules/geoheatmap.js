!/**
 * Highcharts JS v11.4.6 (2024-07-08)
 *
 * (c) 2009-2024
 *
 * License: www.highcharts.com/license
 */function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/modules/geoheatmap",["highcharts"],function(e){return t(e),t.Highcharts=e,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var e=t?t._modules:{};function i(e,i,o,a){e.hasOwnProperty(i)||(e[i]=a.apply(null,o),"function"==typeof CustomEvent&&t.win.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:i,module:e[i]}})))}i(e,"Series/GeoHeatmap/GeoHeatmapPoint.js",[e["Core/Utilities.js"],e["Core/Series/SeriesRegistry.js"]],function(t,e){let{map:{prototype:{pointClass:i}}}=e.seriesTypes,{isNumber:o}=t;return class extends i{applyOptions(t,e){let i=super.applyOptions.call(this,t,e),{lat:a,lon:s}=i.options;if(o(s)&&o(a)){let{colsize:t=1,rowsize:e=1}=this.series.options,o=s-t/2,n=a-e/2;i.geometry=i.options.geometry={type:"Polygon",coordinates:[[[o,n],[o+t,n],[o+t,n+e],[o,n+e],[o,n]]]}}return i}}}),i(e,"Series/InterpolationUtilities.js",[e["Core/Globals.js"],e["Core/Utilities.js"]],function(t,e){let{doc:i}=t,{defined:o,pick:a}=e;return{colorFromPoint:function(t,e){let i=e.series.colorAxis;if(i){let s=i.toColor(t||0,e).split(")")[0].split("(")[1].split(",").map(t=>a(parseFloat(t),parseInt(t,10)));return s[3]=255*a(s[3],1),o(t)&&e.visible||(s[3]=0),s}return[0,0,0,0]},getContext:function(t){let{canvas:e,context:o}=t;return e&&o?(o.clearRect(0,0,e.width,e.height),o):(t.canvas=i.createElement("canvas"),t.context=t.canvas.getContext("2d",{willReadFrequently:!0})||void 0,t.context)}}}),i(e,"Series/GeoHeatmap/GeoHeatmapSeries.js",[e["Core/Animation/AnimationUtilities.js"],e["Series/GeoHeatmap/GeoHeatmapPoint.js"],e["Core/Globals.js"],e["Series/InterpolationUtilities.js"],e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e,i,o,a,s){let{animObject:n,stop:r}=t,{noop:l}=i,{colorFromPoint:h,getContext:p}=o,{seriesTypes:{map:d}}=a,{addEvent:u,extend:g,isNumber:c,isObject:m,merge:y,pick:f}=s;function x(t){return t-360*Math.floor((t+180)/360)}class b extends d{constructor(){super(...arguments),this.isDirtyCanvas=!0}update(){this.options=y(this.options,arguments[0]),this.getInterpolation().enabled&&(this.isDirtyCanvas=!0,this.points.forEach(t=>{t.graphic&&(t.graphic.destroy(),delete t.graphic)})),super.update.apply(this,arguments)}translate(){(!this.getInterpolation().enabled||!this.image||this.isDirty||this.isDirtyData)&&super.translate.apply(this,arguments)}getInterpolation(){return m(this.options.interpolation)?this.options.interpolation:{blur:1,enabled:this.options.interpolation}}drawPoints(){let t=this.chart.mapView,e=this.options;if(this.getInterpolation().enabled&&t&&this.bounds){let i=this.context||p(this),{canvas:o,colorAxis:a,image:s,chart:l,points:d}=this,[u,g]=[f(e.colsize,1),f(e.rowsize,1)],m=t.projectedUnitsToPixels({x:this.bounds.x1,y:this.bounds.y2}),x=t.projectedUnitsToPixels({x:this.bounds.x2,y:this.bounds.y1});if(o&&i&&a&&m&&x){let e={x:m.x,y:m.y,width:x.x-m.x,height:x.y-m.y};if(this.isDirtyCanvas||this.isDirtyData||"Orthographic"===t.projection.options.name){this.isDirtyCanvas=!0;let a=o.width=~~(360/u)+1,s=o.height=~~(180/g)+1,n=new Uint8ClampedArray(a*s*4);this.directTouch=!1;for(let t=0;t<d.length;t++){let e=d[t],i=new Uint8ClampedArray(h(e.value,e)),{lon:o,lat:r}=e.options;c(o)&&c(r)&&n.set(i,4*Math.ceil(a*(s-1-(r+90)/g)+(o+180)/u))}let r=this.getInterpolation().blur,l=0===r?1:11*r,p=~~e.width,m=~~e.height,y=new ImageData(n,a,s);o.width=~~(a*l),o.height=~~(s*l),i.putImageData(y,0,0),i.globalCompositeOperation="copy",i.drawImage(o,0,0,y.width,y.height,0,0,o.width,o.height);let f=i.getImageData(0,0,o.width,o.height),x=new ImageData(this.getProjectedImageData(t,p,m,f,o,e.x,e.y),p,m);i.globalCompositeOperation="copy",o.width=p,o.height=m,i.putImageData(x,0,0)}if(s){if(l.renderer.globalAnimation&&l.hasRendered){let t=Number(s.attr("x")),i=Number(s.attr("y")),a=Number(s.attr("width")),r=Number(s.attr("height")),h=(o,n)=>{s.attr({x:t+(e.x-t)*n.pos,y:i+(e.y-i)*n.pos,width:a+(e.width-a)*n.pos,height:r+(e.height-r)*n.pos})},p=y(n(l.renderer.globalAnimation)),d=p.step;p.step=function(){d&&d.apply(this,arguments),h.apply(this,arguments)},s.attr(y({animator:0},this.isDirtyCanvas?{href:o.toDataURL("image/png",1)}:void 0)).animate({animator:1},p)}else r(s),s.attr(y(e,this.isDirtyCanvas?{href:o.toDataURL("image/png",1)}:void 0))}else this.image=l.renderer.image(o.toDataURL("image/png",1)).attr(e).add(this.group);this.isDirtyCanvas=!1}}else super.drawPoints.apply(this,arguments)}getProjectedImageData(t,e,i,o,a,s,n){let r=new Uint8ClampedArray(e*i*4),l=f(t.projection.options.rotation?.[0],0),h=a.width/360,p=-1*a.height/180,d=-1;for(let i=0;i<r.length;i+=4){let u=i/4%e;0===u&&d++;let g=t.pixelsToLonLat({x:s+u,y:n+d});if(g){g.lon>-180-l&&g.lon<180-l&&(g.lon=x(g.lon));let t=[g.lon,g.lat],e=t[0]*h+a.width/2,s=t[1]*p+a.height/2;if(e>=0&&e<=a.width&&s>=0&&s<=a.height){let t=Math.floor(s)*a.width*4+4*Math.round(e);r[i]=o.data[t],r[i+1]=o.data[t+1],r[i+2]=o.data[t+2],r[i+3]=o.data[t+3]}}}return r}searchPoint(t,e){let i=this.chart,o=i.mapView;if(o&&this.bounds&&this.image&&i.tooltip&&i.tooltip.options.enabled){if(!i.pointer.hasDragged&&(.01>=+this.image.attr("animator")||+this.image.attr("animator")>=.99)){let a=o.projectedUnitsToPixels({x:this.bounds.x1,y:this.bounds.y2}),s=o.projectedUnitsToPixels({x:this.bounds.x2,y:this.bounds.y1});if(i.pointer.normalize(t),t.lon&&t.lat&&a&&s&&t.chartX-i.plotLeft>a.x&&t.chartX-i.plotLeft<s.x&&t.chartY-i.plotTop>a.y&&t.chartY-i.plotTop<s.y)return this.searchKDTree({clientX:t.chartX,lon:x(t.lon),lat:t.lat},e,t)}else i.tooltip.destroy()}}}return b.defaultOptions=y(d.defaultOptions,{nullColor:"transparent",tooltip:{pointFormat:"Lat: {point.lat}, Lon: {point.lon}, Value: {point.value}<br/>"},borderWidth:0,colsize:1,rowsize:1,stickyTracking:!0,interpolation:{enabled:!1,blur:1}}),u(b,"afterDataClassLegendClick",function(){this.isDirtyCanvas=!0,this.drawPoints()}),g(b.prototype,{type:"geoheatmap",applyJitter:l,pointClass:e,pointArrayMap:["lon","lat","value"],kdAxisArray:["lon","lat"]}),a.registerSeriesType("geoheatmap",b),b}),i(e,"masters/modules/geoheatmap.src.js",[e["Core/Globals.js"]],function(t){return t})});
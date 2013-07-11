/**
 * @license RequireJS text 2.0.7 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

/*!
Copyright 2013 @greweb
http://github.com/gre/glsl.js

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

define("text",["module"],function(e){var t,n,r,i,s=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],o=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,u=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,a=typeof location!="undefined"&&location.href,f=a&&location.protocol&&location.protocol.replace(/\:/,""),l=a&&location.hostname,c=a&&(location.port||undefined),h={},p=e.config&&e.config()||{};t={version:"2.0.7",strip:function(e){if(e){e=e.replace(o,"");var t=e.match(u);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:p.createXhr||function(){var e,t,n;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;if(typeof ActiveXObject!="undefined")for(t=0;t<3;t+=1){n=s[t];try{e=new ActiveXObject(n)}catch(r){}if(e){s=[n];break}}return e},parseName:function(e){var t,n,r,i=!1,s=e.indexOf("."),o=e.indexOf("./")===0||e.indexOf("../")===0;return s!==-1&&(!o||s>1)?(t=e.substring(0,s),n=e.substring(s+1,e.length)):t=e,r=n||t,s=r.indexOf("!"),s!==-1&&(i=r.substring(s+1)==="strip",r=r.substring(0,s),n?n=r:t=r),{moduleName:t,ext:n,strip:i}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,r,i){var s,o,u,a=t.xdRegExp.exec(e);return a?(s=a[2],o=a[3],o=o.split(":"),u=o[1],o=o[0],(!s||s===n)&&(!o||o.toLowerCase()===r.toLowerCase())&&(!u&&!o||u===i)):!0},finishLoad:function(e,n,r,i){r=n?t.strip(r):r,p.isBuild&&(h[e]=r),i(r)},load:function(e,n,r,i){if(i.isBuild&&!i.inlineText){r();return}p.isBuild=i.isBuild;var s=t.parseName(e),o=s.moduleName+(s.ext?"."+s.ext:""),u=n.toUrl(o),h=p.useXhr||t.useXhr;!a||h(u,f,l,c)?t.get(u,function(n){t.finishLoad(e,s.strip,n,r)},function(e){r.error&&r.error(e)}):n([o],function(e){t.finishLoad(s.moduleName+"."+s.ext,s.strip,e,r)})},write:function(e,n,r,i){if(h.hasOwnProperty(n)){var s=t.jsEscape(h[n]);r.asModule(e+"!"+n,"define(function () { return '"+s+"';});\n")}},writeFile:function(e,n,r,i,s){var o=t.parseName(n),u=o.ext?"."+o.ext:"",a=o.moduleName+u,f=r.toUrl(o.moduleName+u)+".js";t.load(a,r,function(n){var r=function(e){return i(f,e)};r.asModule=function(e,t){return i.asModule(e,f,t)},t.write(e,a,r,s)},s)}};if(p.env==="node"||!p.env&&typeof process!="undefined"&&process.versions&&!!process.versions.node)n=require.nodeRequire("fs"),t.get=function(e,t,r){try{var i=n.readFileSync(e,"utf8");i.indexOf("﻿")===0&&(i=i.substring(1)),t(i)}catch(s){r(s)}};else if(p.env==="xhr"||!p.env&&t.createXhr())t.get=function(e,n,r,i){var s=t.createXhr(),o;s.open("GET",e,!0);if(i)for(o in i)i.hasOwnProperty(o)&&s.setRequestHeader(o.toLowerCase(),i[o]);p.onXhr&&p.onXhr(s,e),s.onreadystatechange=function(t){var i,o;s.readyState===4&&(i=s.status,i>399&&i<600?(o=new Error(e+" HTTP status: "+i),o.xhr=s,r(o)):n(s.responseText),p.onXhrComplete&&p.onXhrComplete(s,e))},s.send(null)};else if(p.env==="rhino"||!p.env&&typeof Packages!="undefined"&&typeof java!="undefined")t.get=function(e,t){var n,r,i="utf-8",s=new java.io.File(e),o=java.lang.System.getProperty("line.separator"),u=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),i)),a="";try{n=new java.lang.StringBuffer,r=u.readLine(),r&&r.length()&&r.charAt(0)===65279&&(r=r.substring(1)),r!==null&&n.append(r);while((r=u.readLine())!==null)n.append(o),n.append(r);a=String(n.toString())}finally{u.close()}t(a)};else if(p.env==="xpconnect"||!p.env&&typeof Components!="undefined"&&Components.classes&&Components.interfaces)r=Components.classes,i=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),t.get=function(e,t){var n,s,o={},u=new FileUtils.File(e);try{n=r["@mozilla.org/network/file-input-stream;1"].createInstance(i.nsIFileInputStream),n.init(u,1,0,!1),s=r["@mozilla.org/intl/converter-input-stream;1"].createInstance(i.nsIConverterInputStream),s.init(n,"utf-8",n.available(),i.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),s.readString(n.available(),o),s.close(),n.close(),t(o.value)}catch(a){throw new Error((u&&u.path||"")+": "+a)}};return t}),define("text!templates/layer.html",[],function(){return'<canvas class="layer-canvas" width="400" height="400"></canvas>\n<ul class="anchor-points"></ul>'}),function(){function f(e){console.log&&console.log(a+e)}function l(e){console.warn?console.warn(a+e):f("WARN "+e)}function c(e){console.error?console.error(a+e):f("ERR "+e)}function p(e){return"length"in e}function d(e,t){if(!e.getContext)return;var n=["webgl","experimental-webgl"];for(var r=0;r<n.length;++r)try{var i=e.getContext(n[r],t);if(i)return i}catch(s){}}var e=["fragment","canvas","variables"],t={bool:"1i","int":"1i","float":"1f",vec2:"2f",ivec2:"2i",bvec2:"2b",vec3:"3f",ivec3:"3i",bvec3:"3b",vec4:"4f",ivec4:"4i",bvec4:"4b",mat2:"Matrix2fv",mat3:"Matrix3fv",mat4:"Matrix4fv"},n=/uniform\s+([a-z]+\s+)?([A-Za-z0-9]+)\s+([a-zA-Z_0-9]+)\s*(\[\s*(.+)\s*\])?/,r=/struct\s+\w+\s*{[^}]+}\s*;/g,i=/struct\s+(\w+)\s*{([^}]+)}\s*;/,s=/[^;]+;/g,o=/\s*([a-z]+\s+)?([A-Za-z0-9]+)\s+([a-zA-Z_0-9]+)\s*(\[\s*(.+)\s*\])?\s*;/,u=/#define\s+([a-zA-Z_0-9]+)\s+(.*)/,a="Glsl: ",h=function(e){return function(){return++e}}(0);this.Glsl=function(t){if(!(this instanceof arguments.callee))return new arguments.callee(t);if(!t)throw new Error("Glsl: {"+e+"} are required.");for(var n=0;n<e.length;n++)if(!(e[n]in t))throw new Error("Glsl: '"+e[n]+"' is required.");this.canvas=t.canvas,this.variables=t.variables,this.init=t.init||function(e){},this.update=t.update||function(e){},this.ready=t.ready||function(e){},this.prog=new Glsl.Program("attribute vec2 position; void main() { gl_Position = vec4(2.0*position-1.0, 0.0, 1.0);}",t.fragment),this.defines=this.prog.defines;if(!this.prog.uniformTypes.resolution)throw new Error("Glsl: You must use a 'vec2 resolution' in your shader.");for(var r in this.prog.uniformTypes)!(r in this.variables)&&r!="resolution"&&l("variable '"+r+"' not initialized");this.initGL(t.contextArgs),this.load(),this.syncAll(),this.init(),this.update(0,0),this.render(),this.ready()},Glsl.supported=function(){return!!d(document.createElement("canvas"))},Glsl.Program=function(e,t){this.gl=null,this.vertex=e,this.fragment=t;var n=e+"\n"+t;this.parseDefines(n),this.parseStructs(n),this.parseUniforms(n)},Glsl.Program.prototype={defines:null,syncVariable:function(e,t){this.recSyncVariable(e,t,this.uniformTypes[e],e)},parseDefines:function(e){this.defines={};var t=e.split("\n");for(var n=0;n<t.length;++n){var r=t[n].match(u);if(r&&r.length==3){var i=r[1],s=r[2];this.defines[i]=s}}},parseStructs:function(e){this.structTypes={};var n=e.match(r);if(!n)return;for(var u=0;u<n.length;++u){var a=n[u],f=a.match(i),l=f[1],c=f[2],h=c.match(s),p={};for(var d=0;d<h.length;++d){var v=h[d],m=v.match(o),g=m[2],y=m[3],b=m[4],w=t[g]||g;b&&(b in this.defines&&(b=this.defines[b]),w=[w,parseInt(b,10)]),p[y]=w}this.structTypes[l]=p}},parseUniforms:function(e){this.uniformTypes={};var r=e.split("\n");for(var i=0;i<r.length;++i){var s=r[i],o=s.match(n);if(o){var u=o[2],a=o[3],f=o[5],l=t[u]||u;f&&(f in this.defines&&(f=this.defines[f]),l=[l,parseInt(f,10)]),this.uniformTypes[a]=l}}},recSyncVariable:function(e,t,n,r){var i=this.gl;if(!n){l("variable '"+e+"' not found in your GLSL.");return}var s=n instanceof Array,o;s&&(o=n[1],n=n[0]);var u=this.locations[r];if(n in this.structTypes){var a=this.structTypes[n];if(s)for(var f=0;f<o&&f<t.length;++f){var h=r+"["+f+"].",d=t[f];for(var v in a){if(!(v in d)){l("variable '"+r+"["+f+"]' ("+n+") has no field '"+v+"'");break}var m=a[v];this.recSyncVariable(v,d[v],m,h+v)}}else{var h=r+".";for(var v in a){if(!(v in t)){l("variable '"+r+"' ("+n+") has no field '"+v+"'");break}var m=a[v];this.recSyncVariable(v,t[v],m,h+v)}}}else{var g=n;s&&(g+="v");var y="uniform"+g;switch(g){case"2f":case"2i":p(t)?i[y].call(i,u,t[0],t[1]):"x"in t&&"y"in t?i[y].call(i,u,t.x,t.y):"s"in t&&"t"in t?i[y].call(i,u,t.s,t.t):c("variable '"+r+"' is not valid for binding to vec2(). Use an Array, a {x,y} or a {s,t}.");break;case"3f":case"3i":p(t)?i[y].call(i,u,t[0],t[1],t[2]):"x"in t&&"y"in t&&"z"in t?i[y].call(i,u,t.x,t.y,t.z):"s"in t&&"t"in t&&"p"in t?i[y].call(i,u,t.s,t.t,t.p):"r"in t&&"g"in t&&"b"in t?i[y].call(i,u,t.r,t.g,t.b):c("variable '"+r+"' is not valid for binding to vec3(). Use an Array, a {x,y,z}, a {r,g,b} or a {s,t,p}.");break;case"4f":case"4i":p(t)?i[y].call(i,u,t[0],t[1],t[2],t[3]):"x"in t&&"y"in t&&"z"in t&&"w"in t?i[y].call(i,u,t.x,t.y,t.z,t.w):"s"in t&&"t"in t&&"p"in t&&"q"in t?i[y].call(i,u,t.s,t.t,t.p,t.q):"r"in t&&"g"in t&&"b"in t&&"a"in t?i[y].call(i,u,t.r,t.g,t.b,t.a):c("variable '"+r+"' is not valid for binding to vec4(). Use an Array, a {x,y,z,w}, a {r,g,b,a} or a {s,t,p,q}.");break;case"sampler2D":this.syncTexture(i,u,t,r);break;default:y in i?i[y].call(i,u,t):c("type '"+n+"' not found.")}}},syncTexture:function(e,t,n,r){var i=this.textureUnitForNames[r];i||(i=this.allocTexture(r)),e.activeTexture(e.TEXTURE0+i);var s=this.textureForTextureUnit[i];s?e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n):(s=e.createTexture(),e.bindTexture(e.TEXTURE_2D,s),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.uniform1i(t,i),this.textureForTextureUnit[i]=s)},allocTexture:function(e){var t=this.textureUnitCounter;return this.textureUnitForNames[e]=t,this.textureUnitCounter++,t},initUniformLocations:function(){this.locations={};for(var e in this.uniformTypes)this.recBindLocations(e,this.uniformTypes[e],e)},recBindLocations:function(e,t,n){var r=t instanceof Array,i;r&&(i=t[1],t=t[0]);if(t in this.structTypes){var s=this.structTypes[t];if(r)for(var o=0;o<i;++o){var u=n+"["+o+"].";for(var a in s)this.recBindLocations(a,s[a],u+a)}else{var u=n+".";for(var a in s)this.recBindLocations(a,s[a],u+a)}}else this.locations[n]=this.gl.getUniformLocation(this.program,n)},load:function(){var e=this.gl;this.program&&(e.deleteProgram(this.program),this.program=null),this.program=this.loadProgram([this.loadShader(this.vertex,e.VERTEX_SHADER),this.loadShader(this.fragment,e.FRAGMENT_SHADER)]),e.useProgram(this.program),this.initUniformLocations(),this.textureUnitForNames={},this.textureForTextureUnit={},this.textureUnitCounter=0},loadProgram:function(e){var t=this.gl,n=t.createProgram();e.forEach(function(e){t.attachShader(n,e)}),t.linkProgram(n);var r=t.getProgramParameter(n,t.LINK_STATUS);if(!r)throw t.deleteProgram(n),new Error(n+" "+t.getProgramInfoLog(n));return n},loadShader:function(e,t){var n=this.gl,r=n.createShader(t);n.shaderSource(r,e),n.compileShader(r);var i=n.getShaderParameter(r,n.COMPILE_STATUS);if(!i){var s=n.getShaderInfoLog(r),o=s.split(":"),u=parseInt(o[1],10),a=parseInt(o[2],10),f="";if(!isNaN(u)){var l="";for(var h=0;h<u;++h)l+=" ";f="\n"+l+"^"}throw c(s+"\n"+e.split("\n")[a-1]+f),n.deleteShader(r),new Error(r+" "+s)}return r}},Glsl.prototype={defines:null,start:function(){var e=this;e._stop=!1;if(e._running)return e;var t=e._running=h(),n=Date.now(),r=e._stopTime||0;return requestAnimationFrame(function i(){var s=Date.now()-n+(e._stopTime||0);if(e._stop||e._running!==t)e._running=0,e._stopTime=s;else{requestAnimationFrame(i,e.canvas);var o=s-r;r=s,e.update(s,o),e.render()}},e.canvas),e},stop:function(){return this._stop=!0,this},sync:function(){for(var e=0;e<arguments.length;++e){var t=arguments[e];this.syncVariable(t)}return this},syncAll:function(){for(var e in this.variables)this.syncVariable(e);return this},set:function(e,t){return this.variables[e]=t,this.sync(e),this},setSize:function(e,t){this.canvas.width=e,this.canvas.height=t,this.syncResolution()},initGL:function(e){var t=this;this.canvas.addEventListener("webglcontextlost",function(e){e.preventDefault()},!1),this.canvas.addEventListener("webglcontextrestored",function(){t.running&&t.syncAll(),t.load()},!1),this.gl=this.prog.gl=this.getWebGLContext(this.canvas,e)},render:function(){this.gl.drawArrays(this.gl.TRIANGLES,0,6)},getWebGLContext:function(e,t){return d(e,t)},syncVariable:function(e){return this.prog.syncVariable(e,this.variables[e])},load:function(){var e=this.gl;this.prog.load();var t=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,t);var n=e.getAttribLocation(this.prog.program,"position");e.enableVertexAttribArray(n),e.vertexAttribPointer(n,2,e.FLOAT,!1,0,0),this.syncResolution()},syncResolution:function(){var e=this.gl,t=this.canvas.width,n=this.canvas.height;e.viewport(0,0,t,n);var r=this.prog.locations.resolution;e.uniform2f(r,t,n);var i=0,s=0,o=t,u=n;e.bufferData(e.ARRAY_BUFFER,new Float32Array([i,s,o,s,i,u,i,u,o,s,o,u]),e.STATIC_DRAW)}},function(){var e=0,t=["ms","moz","webkit","o"];for(var n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,n){var r=(new Date).getTime(),i=Math.max(0,16-(r-e)),s=window.setTimeout(function(){t(r+i)},i);return e=r+i,s}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})}()}(),define("glsl",function(e){return function(){var t,n;return t||e.Glsl}}(this)),define("text!views/plot.frag",[],function(){return"precision mediump float;\nuniform vec2 resolution;\n\n#define MAX_ANCHORS     10\n#define MAX_COLOR_STOPS 10\n\nstruct AnchorPoint {\n    float multiplier;\n    vec2 point;\n};\n\nstruct ColorStop {\n    float distance;\n    vec4 color;\n};\n\nuniform AnchorPoint anchors[MAX_ANCHORS];\nuniform ColorStop colorStops[MAX_COLOR_STOPS];\n\nuniform int anchorsLength;\nuniform int colorStopsLength;\n\nfloat anchorDistance() {\n    float dist = 0.0;\n\n    for (int i = 0; i < MAX_ANCHORS; i ++) {\n        if (i >= anchorsLength) {\n            break;\n        }\n        dist += anchors[i].multiplier * distance(gl_FragCoord.xy, anchors[i].point);\n    }\n\n    return dist;\n}\n\nvec4 computeColor(float dist) {\n    if (colorStopsLength == 0) {\n        return vec4(0.0, 0.0, 0.0, 0.0);\n    }\n\n    if (dist <= colorStops[0].distance) {\n        return colorStops[0].color;\n    }\n\n    for (int i = 1; i < MAX_COLOR_STOPS; i ++) {\n        if (i >= colorStopsLength) {\n            break;\n        }\n\n        if (dist <= colorStops[i].distance) {\n            float interp = smoothstep(colorStops[i - 1].distance, colorStops[i].distance, dist);\n            return mix(colorStops[i - 1].color, colorStops[i].color, interp);\n        }\n        else if (i == colorStopsLength - 1) {\n            return colorStops[i].color;\n        }\n    }\n}\n\nvoid main() {\n    float dist = anchorDistance();\n    gl_FragColor = computeColor(dist);\n}"}),define("views/collection",["backbone","underscore"],function(e,t){return e.View.extend({setup:function(e,t){this.ItemView=t,this.$list=e,this.items=[],this.collection.each(function(e){this.handleAdd(e)}),this.listenTo(this.collection,"add",this.handleAdd),this.listenTo(this.collection,"remove",this.handleRemove)},handleAdd:function(e){var t=new this.ItemView({model:e});this.items.push(t),this.$list.append(t.$el),this.trigger("addView",t)},handleRemove:function(e){var n=t.findWhere(this.items,{model:e});n.remove(),this.items=t.without(this.items,n),this.trigger("removeView",n)}})}),define("views/anchor-point",["backbone"],function(e){return e.View.extend({className:"anchor-point",events:{mousedown:"grab",mouseover:"over",mouseout:"out",dblclick:"destroy",mousewheel:"scroll"},scale:1,render:function(){var e=this.model.toJSON();return this.$el.css({left:e.point.x*this.scale,bottom:e.point.y*this.scale}),this.$el.toggleClass("selected",e._selected),this},initialize:function(){this.listenTo(this.model,"change",this.render),this.render()},grab:function(e){this.trigger("grab",this),this.model.set("_dragging",!0),e.stopPropagation(),e.preventDefault()},moveTo:function(e){this.model.set("point",e)},drop:function(){this.model.set("_dragging",!1)},over:function(){this.model.set("_selected",!0)},out:function(){this.model.set("_selected",this.model.get("_dragging"))},setScale:function(e){this.scale=e,this.render()},destroy:function(e){this.model.destroy(),e.stopPropagation()},scroll:function(e){var t=-e.originalEvent.wheelDeltaY,n=(this.model.get("multiplier")*1e3+t)/1e3;this.model.set("multiplier",n),e.preventDefault(),e.stopPropagation()}})}),define("models/vec2",[],function(){var e=function(e,t){this.x=e,this.y=t};return e.prototype.add=function(t){return new e(this.x+t.x,this.y+t.y)},e.prototype.mult=function(t){return new e(this.x*t,this.y*t)},e.prototype.distance=function(e){return Math.sqrt((this.x-e.x)*(this.x-e.x)+(this.y-e.y)*(this.y-e.y))},e}),define("views/anchor-points",["./collection","underscore","./anchor-point","models/vec2"],function(e,t,n,r){return e.extend({className:"anchor-points",events:{mousemove:"drag",mouseup:"dragEnd",dblclick:"newAnchor"},initialize:function(){this.setup(this.$el,n),this.listenTo(this,"addView",this.handleNewView)},handleNewView:function(e){this.listenTo(e,"grab",this.dragStart),this.resize()},dragStart:function(e){this.dragging=e,this.$el.toggleClass("dragging",!0)},drag:function(e){this.dragging&&(this.dragging.moveTo(this.mousePoint(e)),e.stopPropagation())},dragEnd:function(e){this.dragging&&(this.dragging.drop(),delete this.dragging,this.$el.toggleClass("dragging",!1),e.stopPropagation())},resize:function(){var e=this.$el.width();t.each(this.items,function(t){t.setScale(e)})},mousePoint:function(e){var t=this.$el.offset(),n=this.$el.height();return new r((e.pageX-t.left)/n,(n-(e.pageY-t.top))/n)},newAnchor:function(e){this.collection.add({point:this.mousePoint(e)})}})}),define("views/layer",["jquery","underscore","backbone","handlebars","text!templates/layer.html","glsl","text!./plot.frag","./anchor-points","models/vec2"],function(e,t,n,r,i,s,o,u,a){return n.View.extend({className:"layer",template:r.compile(i),events:{resize:"resize",mousedown:"mousedown",mouseup:"mouseup",mousemove:"mousemove",mousewheel:"scroll"},render:function(){return this.glsl.variables=this.makeGlslVariables(),this.glsl.syncAll(),this.glsl.render(),this},makeGlslVariables:function(){var e=this.$el.width(),t=this.model.get("anchors").map(function(t){var n=t.toJSON();return n.point=n.point.mult(e),n}),n=this.model.get("anchors").length,r=this.model.get("colorStops").map(function(t){var n=t.toJSON();return n.distance*=e,n}),i=this.model.get("colorStops").length;return{anchors:t,anchorsLength:n,colorStops:r,colorStopsLength:i}},initialize:function(){this.$el.html(this.template(this.model.render())),this.anchorPoints=new u({collection:this.model.get("anchors"),el:this.$(".anchor-points").get(0)}),this.glsl=s({canvas:this.$(".layer-canvas").get(0),fragment:o,variables:this.makeGlslVariables(),update:function(e,t){}}),this.handleActive(),this.listenTo(this.model,"change:_active",this.handleActive),this.listenTo(this.model.get("anchors"),"all",this.render),this.listenTo(this.model.get("colorStops"),"all",this.render),this.resize()},handleActive:function(){this.$el.toggleClass("active",this.model.get("_active")||!1)},resize:function(){var e=this.$el.width();window.devicePixelRatio&&(e*=window.devicePixelRatio),this.glsl.setSize(e,e),this.render(),this.anchorPoints.resize()},mousePoint:function(e){var t=this.$el.offset(),n=this.$el.height();return new a((e.pageX-t.left)/n,(n-(e.pageY-t.top))/n)},mousedown:function(e){this.model.get("_active")&&(this.dragging=!0,this.mousemove(e),e.preventDefault())},mousemove:function(e){if(this.dragging){var t=this.mousePoint(e),n=this.model.get("anchors").distance(t);this.model.get("colorStops").setRadius(n)}},mouseup:function(e){this.dragging=!1},scroll:function(e){var t=-e.originalEvent.wheelDeltaY,n=(this.model.get("colorStops").radius*1e3+t)/1e3;this.model.get("colorStops").setRadius(n),e.preventDefault()}})}),define("models/model",["backbone"],function(e){return e.Model.extend({render:function(){var e=this.toJSON();return e.id=this.id||this.cid,e}})}),define("models/anchor-point",["./model","./vec2"],function(e,t){return e.extend({defaults:{multiplier:1,point:new t(0,0),_selected:!1,_dragging:!1}})}),define("models/anchor-point-list",["backbone","./anchor-point"],function(e,t){return e.Collection.extend({model:t,distance:function(e){var t=0;return this.forEach(function(n){t+=n.get("point").distance(e)*n.get("multiplier")}),t}})}),define("models/vec4",[],function(){function e(e){var t=Math.floor(e*255).toString(16);return t.length==1&&(t="0"+t),t}var t=function(e,t,n,r){this.x=e,this.y=t,this.z=n,this.w=r};return t.prototype.copy=function(){return new t(this.x,this.y,this.z,this.w)},t.prototype.toHex=function(){var t=e(this.x),n=e(this.y),r=e(this.z);return"#"+t+n+r},t.fromHex=function(e){var n=parseInt(e.substr(1,2),16)/255,r=parseInt(e.substr(3,2),16)/255,i=parseInt(e.substr(5,2),16)/255;return new t(n,r,i,1)},t}),define("models/color-stop",["./model","./vec4"],function(e,t){return e.extend({defaults:{distance:0,color:new t(0,0,0,0)}})}),define("models/color-stop-list",["backbone","./color-stop","models/vec4"],function(e,t,n){return e.Collection.extend({model:t,initialize:function(){this.radius=0,this.thickness=0,this.color=new n(0,0,0,1)},setRadius:function(e,t,n){this.radius=e,t&&(this.thickness=t),n&&(this.color=n);var r=this.color.copy();r.w=0,this.reset(),this.add([{distance:this.radius-this.thickness/2,color:r},{distance:this.radius,color:this.color},{distance:this.radius+this.thickness/2,color:r}]),this.trigger("change")}})}),define("models/layer",["./model","./anchor-point-list","./color-stop-list"],function(e,t,n){return e.extend({initialize:function(){this.has("anchors")||this.set("anchors",new t),this.has("colorStops")||this.set("colorStops",new n)}})}),define("views/layers",["jquery","./collection","underscore","./layer"],function(e,t,n,r){return t.extend({className:"layers",initialize:function(){this.setup(this.$el,r),this.listenTo(this,"addView",this.handleNewView),e(window).on("resize",n.bind(this.resize,this)),this.resize()},handleNewView:function(e){e.resize()},resize:function(){var t=e(".board"),r=t.width(),i=t.height(),s=Math.min(r,i),o=(i-s)/2,u=(r-s)/2;this.$el.css({margin:o+"px "+u+"px",width:s,height:s}),n.each(this.items,function(e){e.resize()})}})}),define("text!templates/layer-list.html",[],function(){return'<button class="add-layer pure-button pure-button-primary">Add Layer</button>\n<ol class="layer-list-items"></ol>'}),define("text!templates/layer-list-item.html",[],function(){return'<h1 class="title"><i class="caret icon-caret-right"></i> {{name}}</h1>\n<div class="layer-details">\n	<div class="anchor-list"></div>\n	<form class="layer-design-form pure-form pure-form-aligned">\n		<h2>Design:</h2>\n		<fieldset>\n			<div class="pure-control-group">\n				<label for="radius-{{id}}">Radius:</label>\n				<input id="radius-{{id}}" class="radius-input" step="0.05" type="number" name="radius" value="{{radius}}"></input>\n			</div>\n			<div class="pure-control-group">\n				<label for="thickness-{{id}}">Thickness:</label>\n				<input id="thickness-{{id}}" class="thickness-input" step="0.005" min="0" type="number" name="thickness" value="{{thickness}}"></input>\n			</div>\n			<div class="pure-control-group">\n				<label for="color-{{id}}">Color:</label>\n				<input id="color-{{id}}" class="color-input" type="color" name="color"></input>\n			</div>\n		</fieldset>\n	</form>\n</div>'}),define("text!templates/anchor-list.html",[],function(){return'<button class="add-anchor pure-button pure-button-primary">Add Anchor</button>\n<ul class="anchor-list-items"></ul>'}),define("text!templates/anchor-list-item.html",[],function(){return'<form class="anchor-list-item-form pure-form">\n	<button class="delete pure-button pure-button-error">×</button>\n	<label for="multiplier-{{id}}">Multiplier:</label> <input id="multiplier-{{id}}" type="number" step="0.1" name="multiplier" class="multiplier-input" value="{{multiplier}}"></input>\n</form>'}),define("views/anchor-list-item",["backbone","handlebars","text!templates/anchor-list-item.html"],function(e,t,n){return e.View.extend({tagName:"li",className:"anchor-list-item",template:t.compile(n),events:{"change input":"update","click .delete":"deleteAnchor",mouseover:"over",mouseout:"out"},initialize:function(){this.$el.html(this.template(this.model.render())),this.listenTo(this.model,"change",this.render)},render:function(){return this.$(".multiplier-input").val(Math.round(this.model.get("multiplier")*1e3)/1e3),this.$el.toggleClass("selected",this.model.get("_selected")),this},update:function(){this.model.set("multiplier",Number(this.$(".multiplier-input").val()))},deleteAnchor:function(e){this.model.destroy(),e.preventDefault()},over:function(){this.model.set("_selected",!0)},out:function(){this.model.set("_selected",!1)}})}),define("views/anchor-list",["./collection","handlebars","text!templates/anchor-list.html","./anchor-list-item","models/vec2"],function(e,t,n,r,i){return e.extend({className:"anchor-list",template:t.compile(n),events:{"click .add-anchor":"addAnchor"},initialize:function(){this.$el.html(this.template(this.collection.toJSON())),this.setup(this.$(".anchor-list-items"),r)},addAnchor:function(){this.collection.add({point:new i(.5,.5)})}})}),define("views/layer-list-item",["backbone","handlebars","text!templates/layer-list-item.html","./anchor-list","models/vec4"],function(e,t,n,r,i){return e.View.extend({className:"layer-list-item",tagName:"li",template:t.compile(n),events:{"click .title":"select","change input":"update"},initialize:function(){var e=this.model.render();e.radius=.7,e.thickness=.01,this.$el.html(this.template(e)),this.anchorList=new r({collection:this.model.get("anchors"),el:this.$(".anchor-list").get(0)}),this.update(),this.listenTo(this.model.get("colorStops"),"change",this.render),this.listenTo(this.model,"change",this.render)},update:function(){var e=Number(this.$(".radius-input").val()),t=Number(this.$(".thickness-input").val()),n=i.fromHex(this.$(".color-input").val());this.model.get("colorStops").setRadius(e,t,n)},render:function(){this.$el.toggleClass("active",this.model.get("_active")||!1),this.$(".radius-input").val(Math.round(this.model.get("colorStops").radius*1e3)/1e3),this.$(".thickness-input").val(Math.round(this.model.get("colorStops").thickness*1e3)/1e3),this.$(".color-input").val(this.model.get("colorStops").color.toHex())},select:function(){this.model.get("_active")?this.model.set("_active",!1):(this.model.collection.forEach(function(e){e.set("_active",!1)}),this.model.set("_active",!0))}})}),define("views/layer-list",["./collection","handlebars","text!templates/layer-list.html","./layer-list-item"],function(e,t,n,r){return e.extend({className:"layer-list",template:t.compile(n),events:{"click .add-layer":"newLayer"},initialize:function(){this.$el.html(this.template(this.collection.toJSON())),this.setup(this.$(".layer-list-items"),r)},newLayer:function(){var e="Layer "+(this.collection.length+1);e=prompt("New Layer Name:",e),e&&this.collection.add({name:e})}})}),define("views/drawing",["backbone","./layers","./layer-list"],function(e,t,n){return e.View.extend({initialize:function(){this.layers=new t({collection:this.model.get("layers"),el:this.$(".layers").get(0)}),this.layerList=new n({collection:this.model.get("layers"),el:this.$(".layer-list").get(0)})}})}),define("models/layer-list",["backbone","./layer"],function(e,t){return e.Collection.extend({model:t})}),define("models/drawing",["./model","./layer-list"],function(e,t){return e.extend({initialize:function(){this.has("layers")||this.set("layers",new t)}})}),requirejs.config({paths:{jquery:"//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min",handlebars:"//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.min",glsl:"libs/glsl",underscore:"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.0/underscore-min",backbone:"//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min"},shim:{handlebars:{exports:"Handlebars"},glsl:{exports:"Glsl"},underscore:{exports:"_"},backbone:{deps:["underscore","jquery"],exports:"Backbone"}}}),require(["views/layer","models/layer","models/anchor-point","models/color-stop","models/vec2","models/vec4","views/drawing","models/drawing"],function(e,t,n,r,i,s,o,u){drawing=new u,drawingView=new o({model:drawing,el:document.body})}),define("main",function(){});
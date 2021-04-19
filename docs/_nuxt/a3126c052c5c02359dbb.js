/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{1093:function(t,e,n){t.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=5)}([function(t,e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}t.exports={isDefined:function(t){return null!=t},isArray:function(t){return Array.isArray?Array.isArray(t):"[object Array]"===Object.prototype.toString.call(t)},isString:function(t){return"string"==typeof t},isNumber:function(t){return"number"==typeof t},isObject:function(t){return"object"===n(t)},toString:function(t){return null==t?"":function(t){if("string"==typeof t)return t;var e=t+"";return"0"==e&&1/t==-1/0?"-0":e}(t)}}},function(t,e,n){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var i=n(7),o=n(10),s=n(2).MAX_BITS,a=function(){function t(e,n){var r=n.location,i=void 0===r?0:r,a=n.distance,c=void 0===a?100:a,u=n.threshold,l=void 0===u?.6:u,f=n.isCaseSensitive,h=void 0!==f&&f,v=n.findAllMatches,p=void 0!==v&&v,d=n.minMatchCharLength,y=void 0===d?1:d,g=n.includeMatches,m=void 0!==g&&g;if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.options={location:i,distance:c,threshold:l,isCaseSensitive:h,findAllMatches:p,includeMatches:m,minMatchCharLength:y},e.length>s)throw new Error("Pattern length exceeds max of ".concat(s,"."));this.pattern=h?e:e.toLowerCase(),this.patternAlphabet=o(this.pattern)}var e,n;return e=t,(n=[{key:"searchIn",value:function(t){var e=t.$;return this.searchInString(e)}},{key:"searchInString",value:function(t){var e=this.options,n=e.isCaseSensitive,r=e.includeMatches;if(n||(t=t.toLowerCase()),this.pattern===t){var o={isMatch:!0,score:0};return r&&(o.matchedIndices=[[0,t.length-1]]),o}var s=this.options,a=s.location,c=s.distance,u=s.threshold,l=s.findAllMatches,f=s.minMatchCharLength;return i(t,this.pattern,this.patternAlphabet,{location:a,distance:c,threshold:u,findAllMatches:l,minMatchCharLength:f,includeMatches:r})}}])&&r(e.prototype,n),t}();t.exports=a},function(t,e){t.exports.MAX_BITS=32},function(t,e){t.exports=function(t,e){var n=e.n,r=void 0===n?3:n,i=e.pad,o=void 0===i||i,s=e.sort,a=void 0!==s&&s,c=[];if(null==t)return c;t=t.toLowerCase(),o&&(t=" ".concat(t," "));var u=t.length-r+1;if(u<1)return c;for(;u--;)c[u]=t.substr(u,r);return a&&c.sort((function(t,e){return t==e?0:t<e?-1:1})),c}},function(t,e,n){var r=n(0),i=r.isDefined,o=r.isString,s=r.isNumber,a=r.isArray,c=r.toString;t.exports=function(t,e){var n=[],r=!1;return function t(e,u){if(u){var l=u.indexOf("."),f=u,h=null;-1!==l&&(f=u.slice(0,l),h=u.slice(l+1));var v=e[f];if(i(v))if(h||!o(v)&&!s(v))if(a(v)){r=!0;for(var p=0,d=v.length;p<d;p+=1)t(v[p],h)}else h&&t(v,h);else n.push(c(v))}else n.push(e)}(t,e),r?n:n[0]}},function(t,e,n){function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){o(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var c=n(6),u=c.BitapSearch,l=c.ExtendedSearch,f=c.NGramSearch,h=n(0),v=h.isArray,p=h.isDefined,d=h.isString,y=h.isNumber,g=(h.isObject,n(4)),m=n(24),b=m.createIndex,_=m.KeyStore,w=n(27),x=w.transformMatches,k=w.transformScore,C=n(2).MAX_BITS,O={isCaseSensitive:!1,distance:100,findAllMatches:!1,getFn:g,includeMatches:!1,includeScore:!1,keys:[],location:0,minMatchCharLength:1,shouldSort:!0,sortFn:function(t,e){return t.score-e.score},threshold:.6,useExtendedSearch:!1},T=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:O,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")})(this,t),this.options=i({},O,{},n),this.options.isCaseSensitive=n.caseSensitive,delete this.options.caseSensitive,this._processKeys(this.options.keys),this.setCollection(e,r)}var e,n;return e=t,(n=[{key:"setCollection",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this.list=t,this.listIsStringArray=d(t[0]),e?this.setIndex(e):this.setIndex(this._createIndex())}},{key:"setIndex",value:function(t){this._indexedList=t}},{key:"_processKeys",value:function(e){this._keyStore=new _(e),t.verbose}},{key:"_createIndex",value:function(){return b(this._keyStore.keys(),this.list,{getFn:this.options.getFn})}},{key:"search",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{limit:!1},n=this.options,r=n.useExtendedSearch,i=n.shouldSort,o=null;o=r?new l(t,this.options):t.length>C?new f(t,this.options):new u(t,this.options);var s=this._searchUsing(o);return this._computeScore(s),i&&this._sort(s),e.limit&&y(e.limit)&&(s=s.slice(0,e.limit)),this._format(s)}},{key:"_searchUsing",value:function(t){var e=this._indexedList,n=[],r=this.options.includeMatches;if(this.listIsStringArray)for(var i=0,o=e.length;i<o;i+=1){var s=e[i],a=s.$,c=s.idx;if(p(a)){var u=t.searchIn(s),l=u.isMatch,f=u.score;if(l){var h={score:f,value:a};r&&(h.indices=u.matchedIndices),n.push({item:a,idx:c,matches:[h]})}}}else for(var d=this._keyStore.keys(),y=this._keyStore.count(),g=0,m=e.length;g<m;g+=1){var b=e[g],_=b.$,w=b.idx;if(p(_)){for(var x=[],k=0;k<y;k+=1){var C=d[k],O=_[C];if(p(O))if(v(O))for(var T=0,S=O.length;T<S;T+=1){var j=O[T],N=j.$,M=j.idx;if(p(N)){var P=t.searchIn(j),D=P.isMatch,$=P.score;if(D){var A={score:$,key:C,value:N,idx:M};r&&(A.indices=P.matchedIndices),x.push(A)}}}else{var E=O.$,I=t.searchIn(O),V=I.isMatch,L=I.score;if(!V)continue;var R={score:L,key:C,value:E};r&&(R.indices=I.matchedIndices),x.push(R)}}x.length&&n.push({idx:w,item:_,matches:x})}}return n}},{key:"_computeScore",value:function(t){for(var e=0,n=t.length;e<n;e+=1){for(var r=t[e],i=r.matches,o=i.length,s=1,a=0;a<o;a+=1){var c=i[a],u=c.key,l=this._keyStore.get(u,"weight"),f=l>-1?l:1,h=0===c.score&&l>-1?Number.EPSILON:c.score;s*=Math.pow(h,f)}r.score=s}}},{key:"_sort",value:function(t){t.sort(this.options.sortFn)}},{key:"_format",value:function(t){var e=[],n=this.options,r=n.includeMatches,i=n.includeScore,o=[];r&&o.push(x),i&&o.push(k);for(var s=0,a=t.length;s<a;s+=1){var c=t[s],u=c.idx,l={item:this.list[u],refIndex:u};if(o.length)for(var f=0,h=o.length;f<h;f+=1)o[f](c,l);e.push(l)}return e}}])&&a(e.prototype,n),t}();T.createIndex=b,t.exports=T},function(t,e,n){t.exports={BitapSearch:n(1),ExtendedSearch:n(11),NGramSearch:n(18)}},function(t,e,n){var r=n(8),i=n(9);t.exports=function(t,e,n,o){for(var s=o.location,a=void 0===s?0:s,c=o.distance,u=void 0===c?100:c,l=o.threshold,f=void 0===l?.6:l,h=o.findAllMatches,v=void 0!==h&&h,p=o.minMatchCharLength,d=void 0===p?1:p,y=o.includeMatches,g=void 0!==y&&y,m=e.length,b=t.length,_=Math.max(0,Math.min(a,b)),w=f,x=t.indexOf(e,_),k=[],C=0;C<b;C+=1)k[C]=0;if(-1!==x){var O=r(e,{errors:0,currentLocation:x,expectedLocation:_,distance:u});if(w=Math.min(O,w),-1!==(x=t.lastIndexOf(e,_+m))){var T=r(e,{errors:0,currentLocation:x,expectedLocation:_,distance:u});w=Math.min(T,w)}}x=-1;for(var S=[],j=1,N=m+b,M=1<<(m<=31?m-1:30),P=0;P<m;P+=1){for(var D=0,$=N;D<$;)r(e,{errors:P,currentLocation:_+$,expectedLocation:_,distance:u})<=w?D=$:N=$,$=Math.floor((N-D)/2+D);N=$;var A=Math.max(1,_-$+1),E=v?b:Math.min(_+$,b)+m,I=Array(E+2);I[E+1]=(1<<P)-1;for(var V=E;V>=A;V-=1){var L=V-1,R=n[t.charAt(L)];if(R&&(k[L]=1),I[V]=(I[V+1]<<1|1)&R,0!==P&&(I[V]|=(S[V+1]|S[V])<<1|1|S[V+1]),I[V]&M&&(j=r(e,{errors:P,currentLocation:L,expectedLocation:_,distance:u}))<=w){if(w=j,(x=L)<=_)break;A=Math.max(1,2*_-x)}}if(r(e,{errors:P+1,currentLocation:_,expectedLocation:_,distance:u})>w)break;S=I}var F={isMatch:x>=0,score:j||.001};return g&&(F.matchedIndices=i(k,d)),F}},function(t,e){t.exports=function(t,e){var n=e.errors,r=void 0===n?0:n,i=e.currentLocation,o=void 0===i?0:i,s=e.expectedLocation,a=void 0===s?0:s,c=e.distance,u=void 0===c?100:c,l=r/t.length,f=Math.abs(a-o);return u?l+f/u:f?1:l}},function(t,e){t.exports=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=[],r=-1,i=-1,o=0,s=t.length;o<s;o+=1){var a=t[o];a&&-1===r?r=o:a||-1===r||((i=o-1)-r+1>=e&&n.push([r,i]),r=-1)}return t[o-1]&&o-r>=e&&n.push([r,o-1]),n}},function(t,e){t.exports=function(t){for(var e={},n=t.length,r=0;r<n;r+=1)e[t.charAt(r)]=0;for(var i=0;i<n;i+=1)e[t.charAt(i)]|=1<<n-i-1;return e}},function(t,e,n){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var i=n(12),o=n(13),s=n(14),a=n(15),c=n(16),u=n(17),l=n(1),f=n(0).isString,h=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var r=n.isCaseSensitive;this.query=null,this.options=n,this._fuzzyCache={},f(e)&&e.trim().length>0&&(this.pattern=r?e:e.toLowerCase(),this.query=function(t){return t.split("|").map((function(t){return t.trim().split(/ +/g)}))}(this.pattern))}var e,n;return e=t,(n=[{key:"searchIn",value:function(t){var e=this.query;if(!this.query)return{isMatch:!1,score:1};var n=t.$;n=this.options.isCaseSensitive?n:n.toLowerCase();for(var r=!1,i=0,o=e.length;i<o;i+=1){var s=e[i],a=null;r=!0;for(var c=0,u=s.length;c<u;c+=1){var l=s[c];if(!(a=this._search(l,n)).isMatch){r=!1;break}}if(r)return a}return{isMatch:!1,score:1}}},{key:"_search",value:function(t,e){if(i.isForPattern(t))return i.match(t,e);if(s.isForPattern(t))return s.match(t,e);if(a.isForPattern(t))return a.match(t,e);if(u.isForPattern(t))return u.match(t,e);if(c.isForPattern(t))return c.match(t,e);if(o.isForPattern(t))return o.match(t,e);var n=this._fuzzyCache[t];return n||(n=new l(t,this.options),this._fuzzyCache[t]=n),n.searchInString(e)}}])&&r(e.prototype,n),t}();t.exports=h},function(t,e){var n=function(t){return t.substr(1)};t.exports={isForPattern:function(t){return"'"==t.charAt(0)},sanitize:n,match:function(t,e){var r=n(t);return{isMatch:e.indexOf(r)>-1,score:0}}}},function(t,e){var n=function(t){return t.substr(1)};t.exports={isForPattern:function(t){return"!"==t.charAt(0)},sanitize:n,match:function(t,e){var r=n(t);return{isMatch:-1===e.indexOf(r),score:0}}}},function(t,e){var n=function(t){return t.substr(1)};t.exports={isForPattern:function(t){return"^"==t.charAt(0)},sanitize:n,match:function(t,e){var r=n(t);return{isMatch:e.startsWith(r),score:0}}}},function(t,e){var n=function(t){return t.substr(2)};t.exports={isForPattern:function(t){return"!"==t.charAt(0)&&"^"==t.charAt(1)},sanitize:n,match:function(t,e){var r=n(t);return{isMatch:!e.startsWith(r),score:0}}}},function(t,e){var n=function(t){return t.substr(0,t.length-1)};t.exports={isForPattern:function(t){return"$"==t.charAt(t.length-1)},sanitize:n,match:function(t,e){var r=n(t);return{isMatch:e.endsWith(r),score:0}}}},function(t,e){var n=function(t){return t.substring(1,t.length-1)};t.exports={isForPattern:function(t){return"!"==t.charAt(0)&&"$"==t.charAt(t.length-1)},sanitize:n,match:function(t,e){var r=n(t);return{isMatch:!e.endsWith(r),score:0}}}},function(t,e,n){function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var r=n(3),s=n(19).jaccardDistance,a=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{threshold:.6};(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")})(this,t),this.options=n,this.patternNgram=r(e,{sort:!0})}var e,n;return e=t,(n=[{key:"searchIn",value:function(t){var e=t.ng;e||(e=r(t.$,{sort:!0}),t.ng=e);var n=s(this.patternNgram,e),o=n<this.options.threshold;return{score:o?n:1,isMatch:o}}}])&&i(e.prototype,n),t}();t.exports=a},function(t,e,n){t.exports={jaccardDistance:n(20)}},function(t,e,n){var r=n(21),i=r.union,o=r.intersection;t.exports=function(t,e){var n=i(t,e);return 1-o(t,e).length/n.length}},function(t,e,n){t.exports={union:n(22),intersection:n(23)}},function(t,e){t.exports=function(t,e){for(var n=[],r=0,i=0;r<t.length&&i<e.length;){var o=t[r],s=e[i];o<s?(n.push(o),r+=1):s<o?(n.push(s),i+=1):(n.push(s),r+=1,i+=1)}for(;r<t.length;)n.push(t[r]),r+=1;for(;i<e.length;)n.push(e[i]),i+=1;return n}},function(t,e){t.exports=function(t,e){for(var n=[],r=0,i=0;r<t.length&&i<e.length;){var o=t[r],s=e[i];o==s?(n.push(o),r+=1,i+=1):o<s?r+=1:(o>s||(r+=1),i+=1)}return n}},function(t,e,n){t.exports={createIndex:n(25),KeyStore:n(26)}},function(t,e,n){var r=n(0),i=r.isArray,o=r.isDefined,s=r.isString,a=n(4),c=n(3);t.exports=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=n.getFn,u=void 0===r?a:r,l=n.ngrams,f=void 0!==l&&l,h=[];if(s(e[0]))for(var v=0,p=e.length;v<p;v+=1){var d=e[v];if(o(d)){var y={$:d,idx:v};f&&(y.ng=c(d,{sort:!0})),h.push(y)}}else for(var g=t.length,m=0,b=e.length;m<b;m+=1){for(var _=e[m],w={idx:m,$:{}},x=0;x<g;x+=1){var k=t[x],C=u(_,k);if(o(C))if(i(C)){for(var O=[],T=[{arrayIndex:-1,value:C}];T.length;){var S=T.pop(),j=S.arrayIndex,N=S.value;if(o(N))if(s(N)){var M={$:N,idx:j};f&&(M.ng=c(N,{sort:!0})),O.push(M)}else if(i(N))for(var P=0,D=N.length;P<D;P+=1)T.push({arrayIndex:P,value:N[P]})}w.$[k]=O}else{var $={$:C};f&&($.ng=c(C,{sort:!0})),w.$[k]=$}}h.push(w)}return h}},function(t,e,n){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var i=n(0).isString,o=function(){function t(e){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._keys={},this._keyNames=[],this._length=e.length,e.length&&i(e[0]))for(var n=0;n<this._length;n+=1){var r=e[n];this._keys[r]={weight:1},this._keyNames.push(r)}else{for(var o=0,s=0;s<this._length;s+=1){var a=e[s];if(!a.hasOwnProperty("name"))throw new Error('Missing "name" property in key object');var c=a.name;if(this._keyNames.push(c),!a.hasOwnProperty("weight"))throw new Error('Missing "weight" property in key object');var u=a.weight;if(u<=0||u>=1)throw new Error('"weight" property in key must bein the range of (0, 1)');this._keys[c]={weight:u},o+=u}for(var l=0;l<this._length;l+=1){var f=this._keyNames[l],h=this._keys[f].weight;this._keys[f].weight=h/o}}}var e,n;return e=t,(n=[{key:"get",value:function(t,e){return this._keys[t]?this._keys[t][e]:-1}},{key:"keys",value:function(){return this._keyNames}},{key:"count",value:function(){return this._length}},{key:"toJSON",value:function(){return JSON.stringify(this._keys)}}])&&r(e.prototype,n),t}();t.exports=o},function(t,e,n){t.exports={transformMatches:n(28),transformScore:n(29)}},function(t,e,n){var r=n(0),i=(r.isArray,r.isDefined);r.isString,r.isNumber,r.isObject,t.exports=function(t,e){var n=t.matches;if(e.matches=[],i(n))for(var r=0,o=n.length;r<o;r+=1){var s=n[r];if(i(s.indices)&&0!==s.indices.length){var a={indices:s.indices,value:s.value};s.key&&(a.key=s.key),s.idx>-1&&(a.refIndex=s.idx),e.matches.push(a)}}}},function(t,e){t.exports=function(t,e){e.score=t.score}}])},1094:function(t,e,n){"use strict";var r=n(629);n.n(r).a},1095:function(t,e,n){var r=n(11);(t.exports=r(!1)).push([t.i,".card-view-small[data-v-5e711e06]{height:150px;overflow:auto}.card-view-medium[data-v-5e711e06]{height:250px;overflow:auto}.card-view-large[data-v-5e711e06]{height:350px;overflow:auto}pre[data-v-5e711e06]{font-family:Roboto,sans-serif}",""])},1096:function(t,e,n){"use strict";var r=n(630);n.n(r).a},1097:function(t,e,n){var r=n(11);(t.exports=r(!1)).push([t.i,".draggable .handle{cursor:-webkit-grab;cursor:grab}",""])},1110:function(t,e,n){"use strict";n.r(e);n(10),n(205),n(154),n(43),n(8),n(5),n(4),n(6);var r=n(31),o=n(1),c=n(50),l=n(488),f=n(2),h=n.n(f),v=n(720),d=n.n(v),y=n(1093),m=n.n(y),_=n(176),w=n(722),x=n(723),k=n(721),C=n(528),O=n(724),T=n(725),S=n(726);n(97);function j(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var N={name:"NoteCardRecord",props:{note:{type:Object,required:!0},showTags:{type:Boolean,required:!1,default:!1},editable:{type:Boolean,required:!1,default:!0},restorable:{type:Boolean,required:!1,default:!1}},data:function(){return{fullscreen:!1}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?j(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):j(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(c.d)({noteSettings:function(t){return t.settings.notes}}),{viewClass:function(){return this.noteSettings.fixed?"card-view-".concat(this.noteSettings.size):""},fileName:function(){return"".concat(this.note.title,".webm")},titleColor:function(){return this.note.color||"primary"}}),methods:{onTitleChange:function(t){this.$emit("onTitleChange",t)},onEdit:function(){this.$emit("onEdit")},onRestore:function(){this.$emit("onRestore")},onDelete:function(){this.$emit("onDelete")},onDownload:function(){this.$refs.downloadLink.click()}}},M=(n(1094),n(29)),P=n(36),D=n.n(P),$=n(206),A=n(180),E=n(71),I=n(195),V=n(434),L=n(182),R=n(42),F=n(115),component=Object(M.a)(N,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{staticClass:"elevation-6"},[n("v-toolbar",{attrs:{color:t.titleColor,flat:""}},[n("v-toolbar-title",[n("ClickToEdit",{attrs:{value:t.note.title},on:{input:t.onTitleChange}})],1),t._v(" "),n("div",{staticClass:"flex-grow-1"}),t._v(" "),n("v-btn",{staticClass:"handle",attrs:{icon:""}},[n("v-icon",[t._v("drag_indicator")])],1)],1),t._v(" "),n("v-dialog",{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},model:{value:t.fullscreen,callback:function(e){t.fullscreen=e},expression:"fullscreen"}},[n("v-card",[n("v-toolbar",{attrs:{color:t.titleColor,flat:""}},[n("v-toolbar-title",[t._v(t._s(t.note.title))]),t._v(" "),n("div",{staticClass:"flex-grow-1"}),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){t.fullscreen=!1}}},[n("v-icon",[t._v("fullscreen_exit")])],1)],1),t._v(" "),n("Audio",{attrs:{value:t.note.content.record}}),t._v(" "),t.note.content.description?n("v-card-text",[n("pre",{staticClass:"pt-2"},[t._v(t._s(t.note.content.description))])]):t._e(),t._v(" "),n("v-card-actions",[n("v-btn",{staticClass:"error",attrs:{icon:""},on:{click:function(e){return t.onDelete()}}},[n("v-icon",[t._v("delete")])],1),t._v(" "),t.editable?n("v-btn",{staticClass:"primary",attrs:{icon:""},on:{click:function(e){return t.onEdit()}}},[n("v-icon",[t._v("edit")])],1):t._e(),t._v(" "),t.restorable?n("v-btn",{staticClass:"primary",attrs:{icon:""},on:{click:function(e){return t.onRestore()}}},[n("v-icon",[t._v("restore_from_trash")])],1):t._e(),t._v(" "),n("div",{staticClass:"flex-grow-1"}),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){return t.onCopy()}}},[n("v-icon",[t._v("file_copy")])],1)],1)],1)],1),t._v(" "),n("div",{class:t.viewClass},[n("Audio",{attrs:{value:t.note.content.record}}),t._v(" "),t.note.content.description?n("v-card-text",[n("pre",[t._v(t._s(t.note.content.description))])]):t._e()],1),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showTags,expression:"showTags"}],staticClass:"text-center pt-2 px-2"},t._l(t.note.tags,(function(e){return n("v-chip",{key:e,staticClass:"ma-1"},[t._v(t._s(e))])})),1),t._v(" "),n("v-card-actions",[n("v-btn",{staticClass:"error",attrs:{icon:""},on:{click:function(e){return t.onDelete()}}},[n("v-icon",[t._v("delete")])],1),t._v(" "),n("v-btn",{staticClass:"primary",attrs:{icon:""},on:{click:function(e){return t.onEdit()}}},[n("v-icon",[t._v("edit")])],1),t._v(" "),n("div",{staticClass:"flex-grow-1"}),t._v(" "),n("v-btn",{attrs:{icon:"",color:t.showTags?"primary":""},on:{click:function(e){t.showTags=!t.showTags}}},[n("v-icon",[t._v("flag")])],1),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){t.fullscreen=!0}}},[n("v-icon",[t._v("fullscreen")])],1),t._v(" "),n("v-btn",{attrs:{icon:""},on:{click:function(e){return t.onDownload()}}},[n("v-icon",[t._v("save_alt")])],1)],1),t._v(" "),n("a",{ref:"downloadLink",attrs:{hidden:"",href:t.note.content.record,download:t.fileName}})],1)}),[],!1,null,"5e711e06",null),z=component.exports;function B(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function H(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?B(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):B(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}D()(component,{VBtn:$.a,VCard:A.a,VCardActions:E.a,VCardText:E.b,VChip:I.a,VDialog:V.a,VIcon:L.a,VToolbar:R.a,VToolbarTitle:F.b});var J={components:{NoteCardReminder:S.a,HelpFirstSteps:C.a,NoteCardTemplate:k.a,NoteCardText:w.a,NoteCardPicture:x.a,NoteCardCredentials:O.a,NoteCardCamera:T.a,NoteCardRecord:z},data:function(){return{dialog:{delete:{open:!1,noteId:null}},showTags:!1,filter:{active:!1,tags:{},query:null},snackbar:{copied:!1,trash:!1},note:{data:{},types:l.a}}},computed:H({},Object(c.c)({noteTags:"note/getAvailableTags",boardTags:"board/getAvailableTags"}),{},Object(c.d)({notes:function(t){return t.note.notes},noteOrder:function(t){return t.note.noteOrder},noteDeleteHard:function(t){return t.settings.notes.deleteHard},noteDefaultType:function(t){return t.settings.notes.defaultType}}),{filteredNoteOrder:{get:function(){return this.filteredNotes.map((function(t){return t.id}))},set:function(t){for(var e={},i=0;i<t.length;i++)e[t[i]]=i;var n=Object(r.a)(this.noteOrder);n.sort((function(a,b){return e.hasOwnProperty(a)?e.hasOwnProperty(b)?e[a]>e[b]?1:e[a]<e[b]?-1:0:-1:0})),this.$store.dispatch("note/setNoteOrder",n)}},availableTags:function(){var t={},e=!0,n=!1,r=void 0;try{for(var o,c=this.noteTags[Symbol.iterator]();!(e=(o=c.next()).done);e=!0){t[o.value]=!0}}catch(t){n=!0,r=t}finally{try{e||null==c.return||c.return()}finally{if(n)throw r}}var l=!0,f=!1,h=void 0;try{for(var v,d=this.boardTags[Symbol.iterator]();!(l=(v=d.next()).done);l=!0){t[v.value]=!0}}catch(t){f=!0,h=t}finally{try{l||null==d.return||d.return()}finally{if(f)throw h}}return Object.keys(t).sort()},filteredNotes:function(){var t={},e=!0,n=!1,r=void 0;try{for(var o,c=this.notes[Symbol.iterator]();!(e=(o=c.next()).done);e=!0){var l=o.value;t[l.id]=l}}catch(t){n=!0,r=t}finally{try{e||null==c.return||c.return()}finally{if(n)throw r}}if(!(this.availableTags&&0!==this.availableTags.length||this.filter.query))return this.noteOrder.map((function(e){return t[e]}));for(var f={},h={},v=0,d=Object.keys(this.filter.tags);v<d.length;v++){var y=d[v],_=this.filter.tags[y];!0===_?h[y]=!0:!1===_&&(f[y]=!0)}var w=this.noteOrder.map((function(e){return t[e]})).filter((function(t){var e={},n=!0,r=!1,o=void 0;try{for(var c,l=t.tags[Symbol.iterator]();!(n=(c=l.next()).done);n=!0){e[c.value]=!0}}catch(t){r=!0,o=t}finally{try{n||null==l.return||l.return()}finally{if(r)throw o}}for(var v=0,d=Object.keys(f);v<d.length;v++){var y=d[v];if(e.hasOwnProperty(y))return!1}for(var m=0,_=Object.keys(h);m<_.length;m++){var w=_[m];if(!e.hasOwnProperty(w))return!1}return!0}));if(this.filter.query){w=new m.a(w,{shouldSort:!1,threshold:.1,location:0,distance:100,minMatchCharLength:1,keys:["title","content.text","content.markdown","content.template","content.date","content.url","content.description","content.username"]}).search(this.filter.query).map((function(t){return t.item}))}return w},existNotes:function(){return this.notes.length>0}}),methods:H({},Object(c.b)({deleteNote:"note/deleteNote",deleteNoteSoft:"note/deleteNoteSoft",editNote:"note/editNote"}),{onNewNote:function(t){this.$router.push({path:"/notes/new/"+t.id,query:this.$route.query})},onNewDefaultNote:function(){this.$router.push({path:"/notes/new/"+this.noteDefaultType,query:this.$route.query})},onEditRequest:function(t){this.$router.push("/notes/edit/"+t.id)},onDeleteRequest:function(t){this.noteDeleteHard?(this.dialog.delete.open=!0,this.dialog.delete.noteId=t):(this.deleteNoteSoft(t),this.snackbar.trash=!0)},onDeleteNote:function(){this.deleteNote(this.dialog.delete.noteId),this.dialog.delete.open=!1,this.dialog.delete.noteId=null},onTitleChange:function(t,e){t.title=e,this.editNote(t)},onCopyNote:function(content){this.snackbar.copied=!1,d()(content),this.snackbar.copied=!0},onFilterTagChange:function(t){!0===this.filter.tags[t]?this.filter.tags[t]=!1:!1===this.filter.tags[t]?this.filter.tags[t]=null:null===this.filter.tags[t]&&(this.filter.tags[t]=!0)},applyTags:function(t){var e=!0,n=!1,r=void 0;try{for(var o,c=t[Symbol.iterator]();!(e=(o=c.next()).done);e=!0){var l=o.value;this.filter.tags.hasOwnProperty(l)||h.a.set(this.filter.tags,l,null)}}catch(t){n=!0,r=t}finally{try{e||null==c.return||c.return()}finally{if(n)throw r}}},applyQueryTags:function(){this.filter.tags={},this.applyTags(this.availableTags);for(var t=Object(_.b)(this.$route.query),e=0,n=Object.keys(t.tags);e<n.length;e++){var r=n[e];this.filter.tags[r]=t.tags[r]}}}),watch:{availableTags:function(t){this.applyTags(t)},"$route.query":function(){this.applyQueryTags()},"filter.tags":{deep:!0,handler:function(t){this.filter.active=!1;for(var e=0,n=Object.values(t);e<n.length;e++){if(null!==n[e]){this.filter.active=!0;break}}}}},mounted:function(){this.applyQueryTags()}},K=(n(1096),n(439)),W=n(432),Q=n(1030),X=n(185),G=n(108),U=n(196),Y=n(433),Z=n(435),tt=n(80),et=Object(M.a)(J,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{fluid:""}},[t.existNotes?t._e():n("v-row",{attrs:{justify:"center"}},[n("v-col",[n("HelpFirstSteps")],1)],1),t._v(" "),n("draggable",{staticClass:"row align-center draggable",attrs:{handle:".handle","scroll-sensitivity":200,"force-fallback":!0},model:{value:t.filteredNoteOrder,callback:function(e){t.filteredNoteOrder=e},expression:"filteredNoteOrder"}},t._l(t.filteredNotes,(function(e){return n("v-col",{key:e.id,attrs:{cols:"12",sm:"6",md:"3"}},["text"===e.type?n("NoteCardText",{attrs:{note:e,"show-tags":t.showTags},on:{onCopy:t.onCopyNote,onEdit:function(n){return t.onEditRequest(e)},onDelete:function(n){return t.onDeleteRequest(e.id)},onTitleChange:function(n){return t.onTitleChange(e,n)}}}):t._e(),t._v(" "),"reminder"===e.type?n("NoteCardReminder",{attrs:{note:e,"show-tags":t.showTags},on:{onCopy:t.onCopyNote,onEdit:function(n){return t.onEditRequest(e)},onDelete:function(n){return t.onDeleteRequest(e.id)},onTitleChange:function(n){return t.onTitleChange(e,n)}}}):t._e(),t._v(" "),"credentials"===e.type?n("NoteCardCredentials",{attrs:{note:e,"show-tags":t.showTags},on:{onCopy:t.onCopyNote,onEdit:function(n){return t.onEditRequest(e)},onDelete:function(n){return t.onDeleteRequest(e.id)},onTitleChange:function(n){return t.onTitleChange(e,n)}}}):t._e(),t._v(" "),"picture"===e.type?n("NoteCardPicture",{attrs:{note:e,"show-tags":t.showTags},on:{onCopy:t.onCopyNote,onEdit:function(n){return t.onEditRequest(e)},onDelete:function(n){return t.onDeleteRequest(e.id)},onTitleChange:function(n){return t.onTitleChange(e,n)}}}):t._e(),t._v(" "),"camera"===e.type?n("NoteCardCamera",{attrs:{note:e,"show-tags":t.showTags},on:{onCopy:t.onCopyNote,onEdit:function(n){return t.onEditRequest(e)},onDelete:function(n){return t.onDeleteRequest(e.id)},onTitleChange:function(n){return t.onTitleChange(e,n)}}}):t._e(),t._v(" "),"template"===e.type?n("NoteCardTemplate",{attrs:{note:e,"show-tags":t.showTags},on:{onCopy:t.onCopyNote,onEdit:function(n){return t.onEditRequest(e)},onDelete:function(n){return t.onDeleteRequest(e.id)},onTitleChange:function(n){return t.onTitleChange(e,n)}}}):t._e(),t._v(" "),"record"===e.type?n("NoteCardRecord",{attrs:{note:e,"show-tags":t.showTags},on:{onCopy:t.onCopyNote,onEdit:function(n){return t.onEditRequest(e)},onDelete:function(n){return t.onDeleteRequest(e.id)},onTitleChange:function(n){return t.onTitleChange(e,n)}}}):t._e()],1)})),1),t._v(" "),n("v-dialog",{attrs:{"max-width":"290"},model:{value:t.dialog.delete.open,callback:function(e){t.$set(t.dialog.delete,"open",e)},expression:"dialog.delete.open"}},[n("v-card",[n("v-card-title",{staticClass:"headline"},[t._v(t._s(t.$t("common.confirmation.title")))]),t._v(" "),n("v-card-text",[t._v(t._s(t.$t("note.delete.confirmation")))]),t._v(" "),n("v-card-actions",[n("div",{staticClass:"flex-grow-1"}),t._v(" "),n("v-btn",{attrs:{color:"error"},on:{click:function(e){return t.onDeleteNote()}}},[t._v("\n          "+t._s(t.$t("common.confirmation.agree"))+"\n        ")]),t._v(" "),n("v-btn",{attrs:{color:"primary"},on:{click:function(e){t.dialog.delete.open=!1}}},[t._v("\n          "+t._s(t.$t("common.confirmation.disagree"))+"\n        ")])],1)],1)],1),t._v(" "),n("v-snackbar",{staticClass:"text-center",attrs:{color:"success",timeout:1e3},model:{value:t.snackbar.copied,callback:function(e){t.$set(t.snackbar,"copied",e)},expression:"snackbar.copied"}},[t._v("\n    "+t._s(t.$t("note.copy.successful"))+"\n    "),n("v-btn",{attrs:{text:""},on:{click:function(e){t.snackbar.copied=!1}}},[n("v-icon",[t._v("close")])],1)],1),t._v(" "),n("v-snackbar",{staticClass:"text-center",attrs:{color:"success",timeout:1e3},model:{value:t.snackbar.trash,callback:function(e){t.$set(t.snackbar,"trash",e)},expression:"snackbar.trash"}},[t._v("\n    "+t._s(t.$t("note.delete.trash"))+"\n    "),n("v-btn",{attrs:{text:""},on:{click:function(e){t.snackbar.trash=!1}}},[n("v-icon",[t._v("close")])],1)],1),t._v(" "),n("v-footer",{staticClass:"pa-0",attrs:{app:""}},[n("v-toolbar",{attrs:{dense:"",color:"footer"}},[n("v-toolbar-items",[n("v-btn",{on:{click:function(e){t.showTags=!t.showTags}}},[n("v-icon",{attrs:{color:t.showTags?"primary":""}},[t._v("flag")])],1)],1),t._v(" "),n("v-toolbar-items",{staticClass:"flex-grow-1"},[n("v-text-field",{attrs:{placeholder:t.$t("note.filter.query"),solo:"",clearable:""},model:{value:t.filter.query,callback:function(e){t.$set(t.filter,"query",e)},expression:"filter.query"}})],1),t._v(" "),n("v-toolbar-items",[n("v-menu",{attrs:{"offset-y":"",top:"","max-height":"50%","close-on-content-click":!1},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({attrs:{color:t.filter.active||t.filter.query?"primary":""}},r),[n("v-icon",[t._v("search")])],1)]}}])},[t._v(" "),t.availableTags&&t.availableTags.length>0?n("v-list",t._l(t.availableTags,(function(e){return n("v-list-item",{key:e},[n("v-btn",{staticClass:"text-none",attrs:{block:""},on:{click:function(n){return t.onFilterTagChange(e)}}},[!0===t.filter.tags[e]?n("v-icon",{attrs:{color:"green"}},[t._v("check_circle")]):t._e(),t._v(" "),!1===t.filter.tags[e]?n("v-icon",{attrs:{color:"red"}},[t._v("remove_circle")]):t._e(),t._v(" "),null===t.filter.tags[e]?n("v-icon",[t._v("filter_list")]):t._e(),t._v(" "),n("span",{staticClass:"flex-grow-1"}),t._v("\n                "+t._s(e)+"\n              ")],1)],1)})),1):t._e()],1),t._v(" "),n("v-menu",{attrs:{"offset-y":"",top:"","open-on-hover":""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({on:{click:t.onNewDefaultNote}},r),[n("v-icon",[t._v("add_circle")])],1)]}}])},[t._v(" "),n("v-list",t._l(t.note.types,(function(e){return n("v-list-item",{key:e.id},[n("v-btn",{attrs:{block:""},on:{click:function(n){return t.onNewNote(e)}}},[n("v-icon",{attrs:{left:""}},[t._v(t._s(e.icon))]),t._v("\n                "+t._s(t.$t("note."+e.id+".title"))+"\n              ")],1)],1)})),1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=et.exports;D()(et,{VBtn:$.a,VCard:A.a,VCardActions:E.a,VCardText:E.b,VCardTitle:E.c,VCol:K.a,VContainer:W.a,VDialog:V.a,VFooter:Q.a,VIcon:L.a,VList:X.a,VListItem:G.a,VMenu:U.a,VRow:Y.a,VSnackbar:Z.a,VTextField:tt.a,VToolbar:R.a,VToolbarItems:F.a})},488:function(t,e,n){"use strict";e.a=[{id:"text",icon:"notes"},{id:"reminder",icon:"alarm"},{id:"camera",icon:"camera"},{id:"record",icon:"mic"},{id:"picture",icon:"photo"},{id:"credentials",icon:"fingerprint"},{id:"template",icon:"ballot"}]},528:function(t,e,n){"use strict";var r=n(485),o=n.n(r),c=n(488),l={name:"HelpFirstSteps",components:{"vue-markdown":o.a},data:function(){return{types:c.a}},computed:{textArgs:function(){return{appName:"DevNotes"}}}},f=n(29),h=n(36),v=n.n(h),d=n(180),y=n(71),m=n(182),_=n(42),w=n(115),component=Object(f.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{staticClass:"elevation-12"},[n("v-toolbar",{attrs:{color:"primary",flat:""}},[n("v-toolbar-title",[t._v(t._s(t.$t("note.help.first-steps.title",t.textArgs)))]),t._v(" "),n("div",{staticClass:"flex-grow-1"})],1),t._v(" "),n("v-card-text",[n("vue-markdown",{attrs:{source:t.$t("note.help.first-steps.preamble",t.textArgs)}}),t._v(" "),t._l(t.types,(function(e){return n("div",{key:e.id},[n("h3",[n("v-icon",[t._v(t._s(e.icon))]),t._v("\n        "+t._s(t.$t("note."+e.id+".title",t.textArgs))+"\n      ")],1),t._v(" "),n("vue-markdown",{attrs:{source:t.$t("note."+e.id+".help",t.textArgs)}})],1)}))],2)],1)}),[],!1,null,"4beca996",null);e.a=component.exports;v()(component,{VCard:d.a,VCardText:y.b,VIcon:m.a,VToolbar:_.a,VToolbarTitle:w.b})},629:function(t,e,n){var content=n(1095);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(12).default)("ae005de6",content,!0,{sourceMap:!1})},630:function(t,e,n){var content=n(1097);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(12).default)("61d59f78",content,!0,{sourceMap:!1})}}]);
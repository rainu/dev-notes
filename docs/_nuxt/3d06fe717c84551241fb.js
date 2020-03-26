(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{1091:function(t,r,e){"use strict";e.r(r);e(9),e(6),e(7),e(5),e(4),e(34);var n=e(1),o=e(50);function c(object,t){var r=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),r.push.apply(r,e)}return r}var l={data:function(){return{showPassword:!1,snackbar:!1,password:null}},methods:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(r){Object(n.a)(t,r,source[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(source,r))}))}return t}({},Object(o.b)({checkSecret:"settings/checkSecret",setupCrypto:"settings/setupCrypto",initBoards:"board/init",initNotes:"note/init",initSecrets:"secrets/init"}),{onUnlock:function(){var t=this;this.checkSecret(this.password).then((function(){t.setupCrypto(t.password).then((function(){return Promise.all([t.initBoards(),t.initNotes(),t.initSecrets()])})).then((function(){return t.$router.push(t.$route.query.from?t.$route.query.from:"/")}))})).catch((function(){return t.snackbar=!0}))}})},f=e(28),d=e(36),h=e.n(d),v=e(207),w=e(175),O=e(70),y=e(433),m=e(434),j=e(576),_=e(177),k=e(435),P=e(429),V=e(79),component=Object(f.a)(l,(function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("v-container",{attrs:{"fill-height":""}},[e("v-row",{attrs:{align:"center",justify:"center"}},[e("v-col",[e("v-card",[e("v-card-title",[e("span",{staticClass:"headline"},[t._v(t._s(t.$t("encryption.unlock")))])]),t._v(" "),e("v-card-text",[e("v-form",{on:{submit:function(r){return r.preventDefault(),t.onUnlock(r)}}},[e("v-text-field",{attrs:{type:t.showPassword?"text":"password",autofocus:"",label:t.$t("encryption.password"),"append-icon":t.showPassword?"visibility":"visibility_off"},on:{"click:append":function(r){t.showPassword=!t.showPassword}},model:{value:t.password,callback:function(r){t.password=r},expression:"password"}})],1)],1),t._v(" "),e("v-card-actions",[e("div",{staticClass:"flex-grow-1"}),t._v(" "),e("v-btn",{attrs:{color:"primary",type:"submit",form:"login-form",disabled:!t.password},on:{click:t.onUnlock}},[t._v(t._s(t.$t("encryption.actions.unlock")))])],1)],1)],1)],1),t._v(" "),e("v-row",[e("v-col",[e("v-snackbar",{staticClass:"text-center",attrs:{color:"error",timeout:5e3},model:{value:t.snackbar,callback:function(r){t.snackbar=r},expression:"snackbar"}},[t._v("\n        "+t._s(t.$t("encryption.invalid"))+"\n        "),e("v-btn",{attrs:{text:""},on:{click:function(r){t.snackbar=!1}}},[e("v-icon",[t._v("close")])],1)],1)],1)],1)],1)}),[],!1,null,"fafb86f2",null);r.default=component.exports;h()(component,{VBtn:v.a,VCard:w.a,VCardActions:O.a,VCardText:O.b,VCardTitle:O.c,VCol:y.a,VContainer:m.a,VForm:j.a,VIcon:_.a,VRow:k.a,VSnackbar:P.a,VTextField:V.a})},576:function(t,r,e){"use strict";e(9),e(6),e(7);var n=e(1),o=(e(61),e(5),e(4),e(201),e(25),e(29),e(3)),c=e(68),l=e(82);function f(object,t){var r=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),r.push.apply(r,e)}return r}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(r){Object(n.a)(t,r,source[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(source,r))}))}return t}r.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",inheritAttrs:!1,props:{lazyValidation:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var r=Object.values(t).includes(!0);this.$emit("input",!r)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,r=function(input){return input.$watch("hasError",(function(r){t.$set(t.errorBag,input._uid,r)}),{immediate:!0})},e={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?e.shouldValidate=input.$watch("shouldValidate",(function(n){n&&(t.errorBag.hasOwnProperty(input._uid)||(e.valid=r(input)))})):e.valid=r(input),e},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var r=this.watchers.find((function(i){return i._uid===t._uid}));r&&(r.valid(),r.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var r=this;return t("form",{staticClass:"v-form",attrs:d({novalidate:!0},this.attrs$),on:{submit:function(t){return r.$emit("submit",t)}}},this.$slots.default)}})}}]);
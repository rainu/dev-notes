(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{1070:function(t,e,n){"use strict";n.r(e);var r={components:{HelpFirstSteps:n(466).a}},o=n(35),c=n(46),l=n.n(c),v=n(1064),m=n(1066),f=n(1065),component=Object(o.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("v-container",{attrs:{fluid:""}},[e("v-row",{attrs:{justify:"center"}},[e("v-col",[e("HelpFirstSteps")],1)],1)],1)}),[],!1,null,"34422691",null);e.default=component.exports;l()(component,{VCol:v.a,VContainer:m.a,VRow:f.a})},466:function(t,e,n){"use strict";var r=n(410),o={name:"HelpFirstSteps",components:{"vue-markdown":n.n(r).a},data:function(){return{types:[{name:"text",icon:"notes"},{name:"credentials",icon:"fingerprint"},{name:"picture",icon:"photo"},{name:"camera",icon:"camera"},{name:"template",icon:"ballot"}]}},computed:{textArgs:function(){return{appName:"DevNotes"}}}},c=n(35),l=n(46),v=n.n(l),m=n(152),f=n(61),d=n(154),_=n(34),w=n(103),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{staticClass:"elevation-12"},[n("v-toolbar",{attrs:{color:"primary",flat:""}},[n("v-toolbar-title",[t._v(t._s(t.$t("note.help.first-steps.title",t.textArgs)))]),t._v(" "),n("div",{staticClass:"flex-grow-1"})],1),t._v(" "),n("v-card-text",[n("vue-markdown",{attrs:{source:t.$t("note.help.first-steps.preamble",t.textArgs)}}),t._v(" "),t._l(t.types,(function(e){return n("div",{key:e.name},[n("h3",[n("v-icon",[t._v(t._s(e.icon))]),t._v("\n        "+t._s(t.$t("note."+e.name+".title",t.textArgs))+"\n      ")],1),t._v(" "),n("vue-markdown",{attrs:{source:t.$t("note."+e.name+".help",t.textArgs)}})],1)}))],2)],1)}),[],!1,null,"4e3bfadb",null);e.a=component.exports;v()(component,{VCard:m.a,VCardText:f.b,VIcon:d.a,VToolbar:_.a,VToolbarTitle:w.b})}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{1093:function(e,t,o){"use strict";o.r(t);o(9),o(6),o(5),o(4),o(7),o(51);var n=o(1),r=o(50),c=o(169),m=o(568),l=o.n(m),v=o(716),d=o(717),f=o(718),N=o(523),w=o(719),y=o(720),T=o(722),_=o(721),O=o(510);function h(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,o)}return t}function S(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var j={components:{NoteFormReminder:_.a,HelpFirstSteps:N.a,NoteFormTemplate:f.a,NoteFormText:v.a,NoteFormPicture:d.a,NoteFormCredentials:w.a,NoteFormCamera:y.a,NoteFormRecord:T.a},data:function(){return{noteTypes:O.a}},computed:{noteType:function(){return this.$route.params.type},initialTags:function(){var e=Object(c.b)(this.$route.query),t=[];for(var o in e.tags)!0===e.tags[o]&&t.push(o);return t}},methods:S({},Object(r.b)({addNote:"note/addNote"}),{onAbort:function(){this.$router.back()},onSaveNewNote:function(e){this.addNote(S({id:l()(),type:this.noteType},e)),this.$router.back()},getNoteTypeLabel:function(e){return this.$t("note.".concat(e.id,".title"))},onNewNote:function(e){this.$router.replace("/notes/new/"+e)}})},F=o(28),P=o(36),k=o.n(P),x=o(207),C=o(175),$=o(70),V=o(434),A=o(421),component=Object(F.a)(j,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-container",{attrs:{fluid:""}},[o("v-card",[o("v-card-text",[o("v-select",{attrs:{items:e.noteTypes,"item-text":e.getNoteTypeLabel,"item-value":"id",value:e.noteType,solo:""},on:{change:e.onNewNote}}),e._v(" "),"text"===e.noteType?o("NoteFormText",{attrs:{"form-id":"note-new-form","initial-tags":e.initialTags},on:{onSubmit:e.onSaveNewNote}}):e._e(),e._v(" "),"reminder"===e.noteType?o("NoteFormReminder",{attrs:{"form-id":"note-new-form","initial-tags":e.initialTags},on:{onSubmit:e.onSaveNewNote}}):e._e(),e._v(" "),"picture"===e.noteType?o("NoteFormPicture",{attrs:{"form-id":"note-new-form","initial-tags":e.initialTags},on:{onSubmit:e.onSaveNewNote}}):e._e(),e._v(" "),"template"===e.noteType?o("NoteFormTemplate",{attrs:{"form-id":"note-new-form","initial-tags":e.initialTags},on:{onSubmit:e.onSaveNewNote}}):e._e(),e._v(" "),"credentials"===e.noteType?o("NoteFormCredentials",{attrs:{"form-id":"note-new-form","initial-tags":e.initialTags},on:{onSubmit:e.onSaveNewNote}}):e._e(),e._v(" "),"camera"===e.noteType?o("NoteFormCamera",{attrs:{"form-id":"note-new-form","initial-tags":e.initialTags},on:{onSubmit:e.onSaveNewNote}}):e._e(),e._v(" "),"record"===e.noteType?o("NoteFormRecord",{attrs:{"form-id":"note-new-form","initial-tags":e.initialTags},on:{onSubmit:e.onSaveNewNote}}):e._e()],1),e._v(" "),o("v-card-actions",[o("div",{staticClass:"flex-grow-1"}),e._v(" "),o("v-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["esc"],expression:"['esc']"}],attrs:{color:"error"},on:{click:e.onAbort,shortkey:e.onAbort}},[e._v(e._s(e.$t("note.actions.abort")))]),e._v(" "),o("v-btn",{attrs:{color:"primary",type:"submit",form:"note-new-form"}},[e._v(e._s(e.$t("note.actions.save")))])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;k()(component,{VBtn:x.a,VCard:C.a,VCardActions:$.a,VCardText:$.b,VContainer:V.a,VSelect:A.a})}}]);
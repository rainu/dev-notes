(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{1095:function(t,e,o){"use strict";o.r(e);o(10),o(8),o(5),o(4),o(6);var r=o(1),n=o(50),c=o(718),d=o(719),m=o(720),v=o(525),f=o(721),l=o(722),N=o(723),y=o(724);function _(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function O(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?_(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):_(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var h={components:{NoteFormReminder:N.a,HelpFirstSteps:v.a,NoteFormTemplate:m.a,NoteFormText:c.a,NoteFormPicture:d.a,NoteFormCredentials:f.a,NoteFormCamera:l.a,NoteFormRecord:y.a},data:function(){return{snackbar:{saved:!1}}},computed:{note:function(){return this.$store.getters["note/getNoteById"](this.$route.params.id)}},methods:O({},Object(n.b)({editNote:"note/editNote"}),{onAbort:function(){this.$router.back()},onSaveNote:function(t){this.editNote(O({id:this.note.id,type:this.note.type},t)),this.$router.back()}})},S=o(29),F=o(36),j=o.n(F),w=o(208),C=o(178),k=o(70),P=o(430),component=Object(S.a)(h,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-container",{attrs:{fluid:""}},[o("v-card",[o("v-card-title",[o("span",{staticClass:"headline"},[t._v(t._s(t.$t("note.edit.title")))])]),t._v(" "),o("v-card-text",["text"===t.note.type?o("NoteFormText",{attrs:{"form-id":"note-edit-form",data:t.note},on:{onSubmit:t.onSaveNote}}):t._e(),t._v(" "),"reminder"===t.note.type?o("NoteFormReminder",{attrs:{"form-id":"note-edit-form",data:t.note},on:{onSubmit:t.onSaveNote}}):t._e(),t._v(" "),"picture"===t.note.type?o("NoteFormPicture",{attrs:{"form-id":"note-edit-form",data:t.note},on:{onSubmit:t.onSaveNote}}):t._e(),t._v(" "),"template"===t.note.type?o("NoteFormTemplate",{attrs:{"form-id":"note-edit-form",data:t.note},on:{onSubmit:t.onSaveNote}}):t._e(),t._v(" "),"credentials"===t.note.type?o("NoteFormCredentials",{attrs:{"form-id":"note-edit-form",data:t.note},on:{onSubmit:t.onSaveNote}}):t._e(),t._v(" "),"camera"===t.note.type?o("NoteFormCamera",{attrs:{"form-id":"note-edit-form",data:t.note},on:{onSubmit:t.onSaveNote}}):t._e(),t._v(" "),"record"===t.note.type?o("NoteFormRecord",{attrs:{"form-id":"note-edit-form",data:t.note},on:{onSubmit:t.onSaveNote}}):t._e()],1),t._v(" "),o("v-card-actions",[o("div",{staticClass:"flex-grow-1"}),t._v(" "),o("v-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["esc"],expression:"['esc']"}],attrs:{color:"error"},on:{click:t.onAbort,shortkey:t.onAbort}},[t._v(t._s(t.$t("note.actions.abort")))]),t._v(" "),o("v-btn",{attrs:{color:"primary",type:"submit",form:"note-edit-form"}},[t._v(t._s(t.$t("note.actions.save")))])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;j()(component,{VBtn:w.a,VCard:C.a,VCardActions:k.a,VCardText:k.b,VCardTitle:k.c,VContainer:P.a})}}]);
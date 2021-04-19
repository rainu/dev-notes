(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{1115:function(e,t,o){"use strict";o.r(t);o(10),o(8),o(5),o(4),o(6);var n=o(1),r=o(50),l=o(720),c=o.n(l),d=o(722),v=o(723),f=o(721),_=o(724),m=o(725);function C(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,o)}return t}function h(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?C(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):C(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var w={components:{NoteCardReminder:o(726).a,NoteCardTemplate:f.a,NoteCardText:d.a,NoteCardPicture:v.a,NoteCardCredentials:_.a,NoteCardCamera:m.a},data:function(){return{dialog:{delete:{open:!1,noteId:null},deleteAll:{open:!1}},showTags:!1,snackbar:{restored:!1,copied:!1}}},computed:h({},Object(r.d)({deletedNotes:function(e){return e.note.deletedNotes}})),methods:h({},Object(r.b)({deleteNote:"note/deleteNote",deleteAllNotes:"note/clearDeletedNotes",restoreNote:"note/restoreDeletedNote"}),{onDeleteRequest:function(e){this.dialog.delete.open=!0,this.dialog.delete.noteId=e},onDeleteNote:function(){this.deleteNote(this.dialog.delete.noteId),this.dialog.delete.open=!1,this.dialog.delete.noteId=null},onDeleteAllRequest:function(){this.dialog.deleteAll.open=!0},onDeleteAllNotes:function(){this.deleteAllNotes(),this.dialog.deleteAll.open=!1},onRestore:function(e){this.restoreNote(e),this.snackbar.restored=!0},onCopyNote:function(content){this.snackbar.copied=!1,c()(content),this.snackbar.copied=!0}})},y=o(29),N=o(36),k=o.n(N),D=o(206),R=o(180),O=o(71),x=o(439),T=o(432),$=o(434),j=o(1030),A=o(182),V=o(433),P=o(435),I=o(42),E=o(115),component=Object(y.a)(w,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-container",{attrs:{fluid:""}},[o("v-row",{attrs:{align:"center"}},e._l(e.deletedNotes,(function(t){return o("v-col",{key:t.id,attrs:{cols:"12",sm:"6",md:"3"}},["text"===t.type?o("NoteCardText",{attrs:{note:t,editable:!1,restorable:!0,"show-tags":e.showTags},on:{onCopy:e.onCopyNote,onRestore:function(o){return e.onRestore(t.id)},onDelete:function(o){return e.onDeleteRequest(t.id)}}}):e._e(),e._v(" "),"reminder"===t.type?o("NoteCardReminder",{attrs:{note:t,editable:!1,restorable:!0,"show-tags":e.showTags},on:{onCopy:e.onCopyNote,onRestore:function(o){return e.onRestore(t.id)},onDelete:function(o){return e.onDeleteRequest(t.id)}}}):e._e(),e._v(" "),"credentials"===t.type?o("NoteCardCredentials",{attrs:{note:t,editable:!1,restorable:!0,"show-tags":e.showTags},on:{onCopy:e.onCopyNote,onRestore:function(o){return e.onRestore(t.id)},onDelete:function(o){return e.onDeleteRequest(t.id)}}}):e._e(),e._v(" "),"picture"===t.type?o("NoteCardPicture",{attrs:{note:t,editable:!1,restorable:!0,"show-tags":e.showTags},on:{onCopy:e.onCopyNote,onRestore:function(o){return e.onRestore(t.id)},onDelete:function(o){return e.onDeleteRequest(t.id)}}}):e._e(),e._v(" "),"camera"===t.type?o("NoteCardCamera",{attrs:{note:t,editable:!1,restorable:!0,"show-tags":e.showTags},on:{onCopy:e.onCopyNote,onRestore:function(o){return e.onRestore(t.id)},onDelete:function(o){return e.onDeleteRequest(t.id)}}}):e._e(),e._v(" "),"template"===t.type?o("NoteCardTemplate",{attrs:{note:t,editable:!1,restorable:!0,"show-tags":e.showTags},on:{onCopy:e.onCopyNote,onRestore:function(o){return e.onRestore(t.id)},onDelete:function(o){return e.onDeleteRequest(t.id)}}}):e._e()],1)})),1),e._v(" "),o("v-dialog",{attrs:{"max-width":"290"},model:{value:e.dialog.delete.open,callback:function(t){e.$set(e.dialog.delete,"open",t)},expression:"dialog.delete.open"}},[o("v-card",[o("v-card-title",{staticClass:"headline"},[e._v(e._s(e.$t("common.confirmation.title")))]),e._v(" "),o("v-card-text",[e._v(e._s(e.$t("note.delete.confirmation")))]),e._v(" "),o("v-card-actions",[o("div",{staticClass:"flex-grow-1"}),e._v(" "),o("v-btn",{attrs:{color:"error"},on:{click:function(t){return e.onDeleteNote()}}},[e._v("\n          "+e._s(e.$t("common.confirmation.agree"))+"\n        ")]),e._v(" "),o("v-btn",{attrs:{color:"primary"},on:{click:function(t){e.dialog.delete.open=!1}}},[e._v("\n          "+e._s(e.$t("common.confirmation.disagree"))+"\n        ")])],1)],1)],1),e._v(" "),o("v-dialog",{attrs:{"max-width":"290"},model:{value:e.dialog.deleteAll.open,callback:function(t){e.$set(e.dialog.deleteAll,"open",t)},expression:"dialog.deleteAll.open"}},[o("v-card",[o("v-card-title",{staticClass:"headline"},[e._v(e._s(e.$t("common.confirmation.title")))]),e._v(" "),o("v-card-text",[e._v(e._s(e.$t("note.delete.all.confirmation")))]),e._v(" "),o("v-card-actions",[o("div",{staticClass:"flex-grow-1"}),e._v(" "),o("v-btn",{attrs:{color:"error"},on:{click:function(t){return e.onDeleteAllNotes()}}},[e._v("\n          "+e._s(e.$t("common.confirmation.agree"))+"\n        ")]),e._v(" "),o("v-btn",{attrs:{color:"primary"},on:{click:function(t){e.dialog.deleteAll.open=!1}}},[e._v("\n          "+e._s(e.$t("common.confirmation.disagree"))+"\n        ")])],1)],1)],1),e._v(" "),o("v-snackbar",{staticClass:"text-center",attrs:{color:"success",timeout:1e3},model:{value:e.snackbar.restored,callback:function(t){e.$set(e.snackbar,"restored",t)},expression:"snackbar.restored"}},[e._v("\n    "+e._s(e.$t("note.restored.successful"))+"\n    "),o("v-btn",{attrs:{text:""},on:{click:function(t){e.snackbar.restored=!1}}},[o("v-icon",[e._v("close")])],1)],1),e._v(" "),o("v-snackbar",{staticClass:"text-center",attrs:{color:"success",timeout:1e3},model:{value:e.snackbar.copied,callback:function(t){e.$set(e.snackbar,"copied",t)},expression:"snackbar.copied"}},[e._v("\n    "+e._s(e.$t("note.copy.successful"))+"\n    "),o("v-btn",{attrs:{text:""},on:{click:function(t){e.snackbar.copied=!1}}},[o("v-icon",[e._v("close")])],1)],1),e._v(" "),o("v-footer",{staticClass:"pa-0",attrs:{app:""}},[o("v-toolbar",{attrs:{dense:"",color:"footer"}},[o("v-toolbar-items",[o("v-btn",{attrs:{color:"error"},on:{click:e.onDeleteAllRequest}},[o("v-icon",[e._v("delete_forever")]),e._v("\n          "+e._s(e.$t("note.delete.all.action"))+"\n        ")],1)],1),e._v(" "),o("div",{staticClass:"flex-grow-1"}),e._v(" "),o("v-toolbar-items",[o("v-btn",{on:{click:function(t){e.showTags=!e.showTags}}},[o("v-icon",{attrs:{color:e.showTags?"primary":""}},[e._v("flag")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;k()(component,{VBtn:D.a,VCard:R.a,VCardActions:O.a,VCardText:O.b,VCardTitle:O.c,VCol:x.a,VContainer:T.a,VDialog:$.a,VFooter:j.a,VIcon:A.a,VRow:V.a,VSnackbar:P.a,VToolbar:I.a,VToolbarItems:E.a})}}]);
(this.webpackJsonptodo=this.webpackJsonptodo||[]).push([[0],Array(34).concat([function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},,,,,,,function(e,t,a){"use strict";a.r(t);var n=a(0),s=a(2),c=a.n(s),o=a(20),i=a.n(o),r=a(10),l=a(8),d=function(e){var t=e.text;return Object(n.jsx)("h1",{className:"page-title",children:t})},u=function(){return Object(n.jsx)("main",{className:"main-page",children:Object(n.jsx)("div",{className:"container",children:Object(n.jsx)(d,{text:"Welcome to the greatest todo app ever!!!"})})})},j=a(3),m=a(14),b=a(6),h=(a(34),function(e){var t=e.onSearchChange,a=Object(s.useState)(""),c=Object(b.a)(a,2),o=c[0],i=c[1];return Object(n.jsx)("input",{type:"text",placeholder:"Type this somthing",className:"search-input",value:o,onChange:function(e){var a=e.target.value;i(a),t(a)}})}),f=(a(35),function(e){var t=e.fieldsContent,a=e.onDeleted,s=t.description,c=t.status,o=t.priority,i=t.endDatePlan,r=t.endDateActual,l="table__item-cell";return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("td",{className:l,children:Object(n.jsx)("span",{className:"table__item-cell--description",children:s})}),Object(n.jsx)("td",{className:l,children:Object(n.jsx)("span",{className:"table__item-cell--status",children:c})}),Object(n.jsx)("td",{className:l,children:Object(n.jsx)("span",{className:"table__item-cell--priority",children:o})}),Object(n.jsx)("td",{className:l,children:Object(n.jsx)("span",{className:"table__item-cell--datePlan",children:i})}),Object(n.jsx)("td",{className:l,children:Object(n.jsx)("span",{className:"table__item-cell--actualDate",children:r})}),Object(n.jsx)("td",{className:l,children:Object(n.jsx)("button",{type:"button",className:"btn table__btn table__btn--del",onClick:a,children:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"})})]})}),O=(a(36),function(e){var t=e.todos,a=e.onDeleted,s=e.onSelected,c=e.overlayText,o=["Description","Status","Priority","End date plan","End date actual","Action"].map((function(e){var t="Description"==e?"table__header--description":"Status"==e?"table__header--status":"Priority"==e?"table__header--priority":"End date plan"==e?"table__header--planDate":"End date actual"==e?"table__header--actualDate":"Action"==e?"table__header--action":"",a=t?"table__header ".concat(t):"table__header";return Object(n.jsx)("th",{className:a,scope:"col",children:e},e)}));if(t&&a&&s){var i=t.map((function(e){var t=e.id,c=Object(m.a)(e,["id"]),o="High"==c.fieldsContent.priority?"table__item--important":"",i="Done"==c.fieldsContent.status?"table__item--done":"";return Object(n.jsx)("tr",{className:"table__item ".concat(i," ").concat(o),onDoubleClick:function(e){return s(e,t)},children:Object(n.jsx)(f,Object(j.a)(Object(j.a)({},c),{},{onDeleted:function(){return a(t)}}))},t)}));return Object(n.jsxs)("table",{className:"table table--todo",children:[Object(n.jsx)("thead",{children:Object(n.jsx)("tr",{className:"table__headers table--todo__headers",children:o})}),Object(n.jsx)("tbody",{children:i})]})}return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)("table",{className:"table table--todo",children:[Object(n.jsx)("thead",{children:Object(n.jsx)("tr",{className:"table__headers table--todo__headers",children:o})}),Object(n.jsx)("tbody",{})]}),Object(n.jsx)("span",{children:c})]})}),p=(a(37),function(e){var t=e.filter,a=e.onFilterChange,s=e.everyStatusCount,c=[{name:"all",label:"All"},{name:"new",label:"New"},{name:"inProgress",label:"In progress"},{name:"done",label:"Done"}];c.forEach((function(e){e.count=s[e.name]}));var o=c.map((function(e){var s=e.name,c=e.label,o=e.count,i=t===s?"status-filter__btn--active":null;return Object(n.jsx)("button",{type:"button",className:"status-filter__btn btn ".concat(i),onClick:function(){a(s)},children:"".concat(c," - ").concat(o)},s)}));return Object(n.jsx)("div",{className:"status-filter",children:o})}),g=(a(38),function(e){var t=e.children,a=document.createElement("div");return a.classList.add("overlay"),Object(s.useEffect)((function(){document.body.style.overflow="hidden";var e=document.querySelector("#modal");return e&&e.append(a),function(){a.remove(),document.body.style.overflow="visible"}}),[]),Object(o.createPortal)(t,a)}),x=a(5),v=c.a.createContext({}),_=function(){return Object(s.useContext)(v)},w=function(e){var t=e.children,a=Object(s.useState)(!1),c=Object(b.a)(a,2),o=c[0],i=c[1],r=Object(s.useState)(!1),l=Object(b.a)(r,2),d=l[0],u=l[1],j=Object(s.useState)(!1),m=Object(b.a)(j,2),h=m[0],f=m[1],O={url:"https://vladmokrousov.github.io/doit/build/index.html"},p=C().showTooltip;Object(s.useEffect)((function(){x.a.auth().onAuthStateChanged((function(e){if(e)if(e.emailVerified||e.sendEmailVerification(O).catch((function(e){p("\u041f\u0440\u0438 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0438 email \u043f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430 ".concat(e.message))})),localStorage.getItem("rememberMe"))g(e);else{var t=new Date(e.metadata.lastSignInTime);Math.round(t.getTime()/1e3)<Math.round((new Date).getTime()/1e3)-86400?x.a.auth().signOut().catch((function(e){p(e.message)})):g(e)}else _();f(!0)}))}),[]);var g=function(e){i(!0),u(e)},_=function(){i(!1),u(!1)};return h?Object(n.jsx)(v.Provider,{value:{isLoggedIn:o,currentUser:d,actionCodeSettings:O},children:t}):null},N=c.a.createContext({}),C=function(){return Object(s.useContext)(N)},y=function(e){var t=e.children,a=Object(s.useState)(!1),c=Object(b.a)(a,2),o=c[0],i=c[1],r=Object(s.useState)(""),l=Object(b.a)(r,2),d=l[0],u=l[1];return Object(n.jsx)(N.Provider,{value:{isOpen:o,message:d,showTooltip:function(e){u(e),i(!0)},hideTooltip:function(){i(!1),u("")}},children:t})},S=(a(39),function(e){var t=e.selectedItemId,a=e.onEdited,c=e.onAdded,o=e.onToggleModal,i=_().currentUser,r=C().showTooltip,l=new Date,d=l.getMonth()+1,u=l.getDate(),m="".concat(l.getFullYear(),"-").concat(2==String(d).length?d:"0"+d,"-").concat(2==String(u).length?u:"0"+u),h=Object(s.useState)({description:"",priority:"Low",status:"New",endDatePlan:m,endDateActual:"-"}),f=Object(b.a)(h,2),O=f[0],p=f[1];Object(s.useEffect)((function(){t&&x.a.database().ref("users/"+i.uid+"/todos").once("value").then((function(e){e.forEach((function(e){var a=e.val();if(a.id===t)return p(Object(j.a)({},a.fieldsContent)),!0}))})).catch((function(e){r("Couldn't take the data from DB: ".concat(e.message))}))}),[]);var g=O.description,v=O.priority,w=O.status,N=O.endDatePlan;return Object(n.jsxs)("form",{className:"todos-form",onSubmit:function(e){e.preventDefault(),t?a(O):c(O),o(e)},children:[Object(n.jsx)("label",{htmlFor:"description",children:"Description (*): "}),Object(n.jsx)("input",{className:"todos-form__description-field",id:"description",type:"text",name:"description",onChange:function(e){p((function(t){return Object(j.a)(Object(j.a)({},t),{},{description:e.target.value})}))},placeholder:"What must be to do?",value:g,required:!0}),Object(n.jsxs)("div",{className:"todos-form__select-wrapper flex-wrapper flex-wrapper--jsb",children:[Object(n.jsxs)("div",{className:"todos-form__priority-wrapper",children:[Object(n.jsx)("span",{className:"todos-form__label-for-select",children:"Priority:"}),Object(n.jsxs)("select",{className:"todos-form__select",name:"priority",onChange:function(e){p((function(t){return Object(j.a)(Object(j.a)({},t),{},{priority:e.target.value})}))},value:v,children:[Object(n.jsx)("option",{value:"Low",children:"Low"}),Object(n.jsx)("option",{value:"Medium",children:"Medium"}),Object(n.jsx)("option",{value:"High",children:"High"})]})]}),Object(n.jsxs)("div",{className:"todos-form__status-wrapper",children:[Object(n.jsx)("span",{className:"todos-form__label-for-select",children:"Status: "}),Object(n.jsxs)("select",{className:"todos-form__select",disabled:!t,name:"status",onChange:function(e){"Done"==e.target.value?p((function(e){return Object(j.a)(Object(j.a)({},e),{},{endDateActual:m})})):p((function(e){return Object(j.a)(Object(j.a)({},e),{},{endDateActual:"-"})})),p((function(t){return Object(j.a)(Object(j.a)({},t),{},{status:e.target.value})}))},value:w,children:[Object(n.jsx)("option",{value:"New",children:"New"}),Object(n.jsx)("option",{value:"In process",children:"In process"}),Object(n.jsx)("option",{value:"Done",children:"Done"})]})]})]}),Object(n.jsx)("label",{htmlFor:"calendar",children:"End Date: "}),Object(n.jsx)("input",{className:"todos-form__calendar",id:"calendar",type:"date",name:"calendar",onChange:function(e){p((function(t){return Object(j.a)(Object(j.a)({},t),{},{endDatePlan:e.target.value})}))},value:N}),Object(n.jsx)("button",{className:"todos-form__submit",children:"Save"})]})}),D=(a(40),function(e){var t=e.classes,a=e.title,s=e.onCloseBtnClick,c=e.children;return Object(n.jsxs)("section",{className:"modal ".concat(t),children:[Object(n.jsx)("h2",{className:"modal__title",children:a}),s&&Object(n.jsx)("button",{className:"modal__close",onClick:s,children:"X"}),c]})}),k=function(){var e=_().currentUser,t=C().showTooltip,a=Object(s.useState)({term:"",filter:"all",showModal:!1,selectedItemId:!1,isDataLoaded:!1}),c=Object(b.a)(a,2),o=c[0],i=c[1];if(Object(s.useEffect)((function(){var t=function(e){i((function(t){t.isDataLoaded;var a=Object(m.a)(t,["isDataLoaded"]);return Object(j.a)(Object(j.a)({isDataLoaded:!0},a),{},{todosData:e.val()})}))},a=x.a.database().ref("users/"+e.uid+"/todos");return a.on("value",t),function(){a.off("value",t)}}),[]),o.isDataLoaded){var r=100,l=function(a){var n=function(e){return{fieldsContent:e,id:r}}(Object(j.a)({},a));x.a.database().ref("users/"+e.uid+"/todos").push(n).catch((function(e){t("Add item failed: ".concat(e.message))}))},u=function(e){"X"==e.target.textContent&&i((function(e){return Object(j.a)(Object(j.a)({},e),{},{selectedItemId:!1})})),i((function(e){var t=e.showModal,a=Object(m.a)(e,["showModal"]);return Object(j.a)(Object(j.a)({},a),{},{showModal:!t})}))};if(o.todosData){var f=100;Object.values(o.todosData).forEach((function(e){e.id>f&&(f=e.id)})),r=f+1;var v=o.todosData,w=o.term,N=o.filter,y=o.showModal,k=o.selectedItemId,I=function(e,t){switch(t){case"all":return e;case"new":return e.filter((function(e){return"New"==e.fieldsContent.status}));case"inProgress":return e.filter((function(e){return"In process"==e.fieldsContent.status}));case"done":return e.filter((function(e){return"Done"==e.fieldsContent.status}));default:return e}}(function(e,t){return 0===t.length?e:e.filter((function(e){return e.fieldsContent.description.toLowerCase().indexOf(t.toLowerCase())>-1}))}(Object.values(v),w),N),E={all:Object.values(v).length,new:Object.values(v).filter((function(e){return"New"==e.fieldsContent.status})).length,inProgress:Object.values(v).filter((function(e){return"In process"==e.fieldsContent.status})).length,done:Object.values(v).filter((function(e){return"Done"==e.fieldsContent.status})).length};return Object(n.jsx)("main",{className:"todos-page",children:Object(n.jsxs)("div",{className:"container",children:[Object(n.jsx)(d,{text:"Todo List"}),Object(n.jsxs)("div",{className:"flex-wrapper",children:[Object(n.jsx)("button",{className:"modal-toggle-button",onClick:u,children:"Add task"}),Object(n.jsx)(h,{onSearchChange:function(e){i((function(t){return Object(j.a)(Object(j.a)({},t),{},{term:e})}))}}),Object(n.jsx)(p,{filter:N,onFilterChange:function(e){i((function(t){return Object(j.a)(Object(j.a)({},t),{},{filter:e})}))},everyStatusCount:E})]}),Object(n.jsx)(O,{todos:I,onDeleted:function(a){x.a.database().ref("users/"+e.uid+"/todos").once("value").then((function(n){n.forEach((function(n){if(n.val().id===a)return x.a.database().ref("users/"+e.uid+"/todos/".concat(n.key)).remove().catch((function(e){t("Removing the task was failed: ".concat(e.message))})),!0}))})).catch((function(e){t("Couldn't take the data from DB: ".concat(e.message))}))},onSelected:function(e,t){i((function(e){return Object(j.a)(Object(j.a)({},e),{},{selectedItemId:t})})),u(e)}}),y&&Object(n.jsx)(g,{children:Object(n.jsx)(D,{classes:"modal--todos",title:k?"Edit task":"Add task",onCloseBtnClick:u,children:Object(n.jsx)(S,{onAdded:l,onEdited:function(a){x.a.database().ref("users/"+e.uid+"/todos").once("value").then((function(n){n.forEach((function(n){if(n.val().id===o.selectedItemId)return x.a.database().ref("users/"+e.uid+"/todos/".concat(n.key,"/fieldsContent")).set(Object(j.a)({},a)).catch((function(e){t("Editing the task was failed: ".concat(e.message))})),!0}))})).catch((function(e){t("Couldn't take the data from DB: ".concat(e.message))})),i((function(e){e.selectedItemId;var t=Object(m.a)(e,["selectedItemId"]);return Object(j.a)({selectedItemId:!1},t)}))},onToggleModal:u,selectedItemId:k})})})]})})}return Object(n.jsx)("main",{className:"todos-page",children:Object(n.jsxs)("div",{className:"container",children:[Object(n.jsx)(d,{text:"Todo List"}),Object(n.jsx)("div",{className:"flex-wrapper",children:Object(n.jsx)("button",{className:"modal-toggle-button",onClick:u,children:"Add task"})}),Object(n.jsx)(O,{overlayText:"You can sleep soundly"}),o.showModal&&Object(n.jsx)(g,{children:Object(n.jsx)(D,{classes:"modal--todos",title:"Add task",onCloseBtnClick:u,children:Object(n.jsx)(S,{onAdded:l,selectedItemId:!1,onToggleModal:u})})})]})})}return Object(n.jsx)("main",{className:"todos-page",children:Object(n.jsxs)("div",{className:"container",children:[Object(n.jsx)(d,{text:"Todo List"}),Object(n.jsx)("span",{children:"Loading..."})]})})},I=(a(41),function(e){var t=e.creationDate,a=e.description,s=e.onDeleted;return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)("div",{className:"note__header",children:[Object(n.jsx)("span",{children:t}),Object(n.jsx)("button",{type:"button",className:"btn note__btn note__btn--del",onClick:s,children:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"})]}),Object(n.jsx)("p",{className:"note__description",children:a})]})}),E=(a(42),function(e){var t=e.notes,a=e.onDeleted,s=e.onSelected,c=e.overlayText;if(t&&a&&s){var o=t.map((function(e){var t=e.id,c=Object(m.a)(e,["id"]);return Object(n.jsx)("li",{className:"list__item",onDoubleClick:function(e){return s(e,t)},children:Object(n.jsx)(I,Object(j.a)(Object(j.a)({},c),{},{onDeleted:function(){return a(t)}}))},t)}));return Object(n.jsx)("ul",{className:"list list--notes",children:o})}return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("ul",{className:"list list--notes"}),Object(n.jsx)("span",{children:c})]})}),T=(a(43),function(e){var t=e.selectedItemId,a=e.onEdited,c=e.onAdded,o=e.onToggleModal,i=_().currentUser,r=C().showTooltip,l=Object(s.useState)(""),d=Object(b.a)(l,2),u=d[0],j=d[1];Object(s.useEffect)((function(){t&&x.a.database().ref("users/"+i.uid+"/notes").once("value").then((function(e){e.forEach((function(e){var a=e.val();if(a.id===t)return j(a.description),!0}))})).catch((function(e){r("Couldn't take the data from DB: ".concat(e.message))}))}),[]);return Object(n.jsxs)("form",{className:"notes-form",onSubmit:function(e){e.preventDefault(),t?a(u):c(u),o(e)},children:[Object(n.jsx)("label",{htmlFor:"description",children:"Description (*): "}),Object(n.jsx)("textarea",{className:"notes-form__description-field",id:"description",name:"description",onChange:function(e){j(e.target.value)},placeholder:"Type something:)",value:u,required:!0}),Object(n.jsx)("button",{className:"notes-form__submit",children:"Save"})]})}),P=function(){var e=_().currentUser,t=C().showTooltip,a=Object(s.useState)({showModal:!1,selectedItemId:!1,isDataLoaded:!1}),c=Object(b.a)(a,2),o=c[0],i=c[1];if(Object(s.useEffect)((function(){var t=function(e){i((function(t){t.isDataLoaded;var a=Object(m.a)(t,["isDataLoaded"]);return Object(j.a)(Object(j.a)({isDataLoaded:!0},a),{},{notesData:e.val()})}))},a=x.a.database().ref("users/"+e.uid+"/notes");return a.on("value",t),function(){a.off("value",t)}}),[]),o.isDataLoaded){var r=100,l=function(a){var n=function(e){return{description:e,creationDate:u(),id:r}}(a);x.a.database().ref("users/"+e.uid+"/notes").push(n).catch((function(e){t("Add item failed: ".concat(e.message))}))},u=function(){var e=new Date,t=e.getMonth()+1,a=e.getDate();return"".concat(2==String(a).length?a:"0"+a,".").concat(2==String(t).length?t:"0"+t,".").concat(e.getFullYear())},h=function(e){"X"==e.target.textContent&&i((function(e){return Object(j.a)(Object(j.a)({},e),{},{selectedItemId:!1})})),i((function(e){var t=e.showModal,a=Object(m.a)(e,["showModal"]);return Object(j.a)(Object(j.a)({},a),{},{showModal:!t})}))};if(o.notesData){var f=100;Object.values(o.notesData).forEach((function(e){e.id>f&&(f=e.id)})),r=f+1;var O=o.notesData,p=o.showModal,v=o.selectedItemId;return Object(n.jsx)("main",{className:"notes-page",children:Object(n.jsxs)("div",{className:"container",children:[Object(n.jsx)(d,{text:"Notes"}),Object(n.jsx)("button",{className:"modal-toggle-button",onClick:h,children:"Add note"}),Object(n.jsx)(E,{notes:Object.values(O),onDeleted:function(a){x.a.database().ref("users/"+e.uid+"/notes").once("value").then((function(n){n.forEach((function(n){if(n.val().id===a)return x.a.database().ref("users/"+e.uid+"/notes/".concat(n.key)).remove().catch((function(e){t("Remove failed: ".concat(e.message))})),!0}))})).catch((function(e){t("Couldn't take the data from DB: ".concat(e.message))}))},onSelected:function(e,t){i((function(e){return Object(j.a)(Object(j.a)({},e),{},{selectedItemId:t})})),h(e)}}),p&&Object(n.jsx)(g,{children:Object(n.jsx)(D,{classes:"modal--notes",title:v?"Edit note":"Add note",onCloseBtnClick:h,children:Object(n.jsx)(T,{onAdded:l,onEdited:function(a){x.a.database().ref("users/"+e.uid+"/notes").once("value").then((function(n){n.forEach((function(n){if(n.val().id===o.selectedItemId)return x.a.database().ref("users/"+e.uid+"/notes/".concat(n.key,"/description")).set(a).catch((function(e){t("Edit item failed: ".concat(e.message))})),!0}))})).catch((function(e){t("Couldn't take the data from DB: ".concat(e.message))})),i((function(e){e.selectedItemId;var t=Object(m.a)(e,["selectedItemId"]);return Object(j.a)({selectedItemId:!1},t)}))},onToggleModal:h,selectedItemId:v})})})]})})}return Object(n.jsx)("main",{className:"notes-page",children:Object(n.jsxs)("div",{className:"container",children:[Object(n.jsx)(d,{text:"Notes"}),Object(n.jsx)("button",{className:"modal-toggle-button",onClick:h,children:"Add note"}),Object(n.jsx)(E,{overlayText:"You can sleep soundly"}),o.showModal&&Object(n.jsx)(g,{children:Object(n.jsx)(D,{classes:"modal--notes",title:"Add note",onCloseBtnClick:h,children:Object(n.jsx)(T,{onAdded:l,onToggleModal:h,selectedItemId:!1})})})]})})}return Object(n.jsx)("main",{className:"notes-page",children:Object(n.jsxs)("div",{className:"container",children:[Object(n.jsx)(d,{text:"Notes"}),Object(n.jsx)("span",{children:"Loading..."})]})})},F=a(13),A=(a(44),function(e){var t=e.onToggleModal,a=e.user,c=e.actionCodeSettings,o=C().showTooltip,i=Object(s.useState)({oldEmail:a.email,password:""}),r=Object(b.a)(i,2),l=r[0],d=r[1],u=Object(s.useState)(a.email),m=Object(b.a)(u,2),h=m[0],f=m[1],O=Object(s.useState)(!0),p=Object(b.a)(O,2),g=p[0],v=p[1],_=function(e){var t=e.target.id,a=e.target.value;d((function(e){return Object(j.a)(Object(j.a)({},e),{},Object(F.a)({},t,a))}))};return Object(n.jsxs)("form",{className:"change-email-form",onSubmit:g?function(e){e.preventDefault();var t=l.oldEmail,n=l.password,s=x.a.auth.EmailAuthProvider.credential(t,n);a.reauthenticateWithCredential(s).then((function(){v(!1)})).catch((function(e){o("Reauth didn't pass: ".concat(e.message))}))}:function(e){e.preventDefault(),a.verifyBeforeUpdateEmail(h,c).then((function(){o("Check your new email and confirm it to finish the change the email"),t(e)})).catch((function(e){o("Your email didn't update: ".concat(e.message))}))},children:[g?Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("label",{htmlFor:"oldEmail",children:"Old email (*): "}),Object(n.jsx)("input",{className:"change-email-form__old-email-field",id:"oldEmail",type:"email",placeholder:"Enter you old email",onChange:_,value:l.oldEmail,required:!0}),Object(n.jsx)("label",{htmlFor:"password",children:"Password (*): "}),Object(n.jsx)("input",{className:"change-email-form__password-field",id:"password",type:"password",placeholder:"Enter you password",onChange:_,value:l.password,required:!0})]}):Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("label",{htmlFor:"newEmail",children:"New email (*): "}),Object(n.jsx)("input",{className:"change-email-form__new-email-field",id:"newEmail",type:"email",placeholder:"Enter new email",onChange:function(e){f(e.target.value)},value:h,required:!0})]}),Object(n.jsx)("button",{className:"change-email-form__submit",children:g?"Continue":"Save"})]})}),M=(a(45),function(e){var t=e.onToggleModal,a=e.user,c=C().showTooltip,o=Object(s.useState)({email:a.email,oldPassword:""}),i=Object(b.a)(o,2),r=i[0],l=i[1],d=Object(s.useState)(!0),u=Object(b.a)(d,2),m=u[0],h=u[1],f=Object(s.useState)(""),O=Object(b.a)(f,2),p=O[0],g=O[1],v=function(e){var t=e.target.id,a=e.target.value;l((function(e){return Object(j.a)(Object(j.a)({},e),{},Object(F.a)({},t,a))}))};return Object(n.jsxs)("form",{className:"change-password-form",onSubmit:m?function(e){e.preventDefault();var t=r.email,n=r.oldPassword,s=x.a.auth.EmailAuthProvider.credential(t,n);a.reauthenticateWithCredential(s).then((function(){h(!1)})).catch((function(e){c("Reauth didn't pass: ".concat(e.message))}))}:function(e){e.preventDefault(),a.updatePassword(p).then((function(){c("Your password was successfully updated!"),t(e)})).catch((function(e){c("Your password didn't be update: ".concat(e.message))}))},children:[m?Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("label",{htmlFor:"email",children:"Email (*): "}),Object(n.jsx)("input",{className:"change-password-form__email-field",id:"email",type:"email",placeholder:"Enter you email",onChange:v,value:r.email,required:!0}),Object(n.jsx)("label",{htmlFor:"oldPassword",children:"Old password (*): "}),Object(n.jsx)("input",{className:"change-password-form__old-password-field",id:"oldPassword",type:"password",placeholder:"Enter you old password",onChange:v,value:r.oldPassword,required:!0})]}):Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("label",{htmlFor:"newPassword",children:"New password (*): "}),Object(n.jsx)("input",{className:"change-password-form__new-password-field",id:"newPassword",type:"password",placeholder:"Enter new password",onChange:function(e){g(e.target.value)},value:p,required:!0})]}),Object(n.jsx)("button",{className:"change-password-form__submit",children:m?"Continue":"Save"})]})}),L=(a(46),function(e){var t=e.onToggleModal,a=e.user,c=C().showTooltip,o=Object(s.useState)({email:a.email,password:""}),i=Object(b.a)(o,2),r=i[0],l=i[1],d=Object(s.useState)(!0),u=Object(b.a)(d,2),m=u[0],h=u[1],f=function(e){var t=e.target.id,a=e.target.value;l((function(e){return Object(j.a)(Object(j.a)({},e),{},Object(F.a)({},t,a))}))};return Object(n.jsx)("form",{className:"delete-account-form",onSubmit:m?function(e){e.preventDefault();var t=r.email,n=r.password,s=x.a.auth.EmailAuthProvider.credential(t,n);a.reauthenticateWithCredential(s).then((function(){h(!1)})).catch((function(e){c("Reauth didn't pass: ".concat(e.message))}))}:function(e){e.preventDefault(),a.delete().catch((function(e){c("Your account didn't be deleted: ".concat(e.message))}))},children:m?Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("label",{htmlFor:"email",children:"Email (*): "}),Object(n.jsx)("input",{className:"delete-account-form__email-field",id:"email",type:"email",placeholder:"Enter you email",onChange:f,value:r.email,required:!0}),Object(n.jsx)("label",{htmlFor:"password",children:"Password (*): "}),Object(n.jsx)("input",{className:"delete-account-form__password-field",id:"password",type:"password",placeholder:"Enter you password",onChange:f,value:r.password,required:!0}),Object(n.jsx)("button",{className:"delete-account-form__submit",children:"Continue"})]}):Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("span",{children:"Do you sure want to delete your account? This action is irreversibly..."}),Object(n.jsxs)("div",{className:"delete-account-form__bnt-wrapper",children:[Object(n.jsx)("button",{className:"delete-account-form__agree",type:"submit",children:"Yes"}),Object(n.jsx)("button",{className:"delete-account-form__disagree",type:"button",onClick:function(e){t(e)},children:"No"})]})]})})}),q=(a(47),function(){var e=_(),t=e.currentUser,a=e.actionCodeSettings,c=C().showTooltip,o=Object(s.useState)(t.displayName),i=Object(b.a)(o,2),r=i[0],l=i[1],u=Object(s.useState)(t.photoURL),j=Object(b.a)(u,2),m=j[0],h=j[1],f=Object(s.useState)(!1),O=Object(b.a)(f,2),p=O[0],v=O[1],w=Object(s.useState)(!1),N=Object(b.a)(w,2),y=N[0],S=N[1],k=Object(s.useState)(!1),I=Object(b.a)(k,2),E=I[0],T=I[1],P=Object(s.useState)(!1),F=Object(b.a)(P,2),q=F[0],B=F[1],R=Object(s.useState)(!1),U=Object(b.a)(R,2),Y=U[0],W=U[1],G="google.com"==t.providerData[0].providerId,V=t.email,H=function(e){T((function(e){return!e}))},X=function(e){B((function(e){return!e}))},z=function(e){W((function(e){return!e}))};return Object(n.jsx)("main",{className:"settings-page",children:Object(n.jsxs)("div",{className:"container",children:[Object(n.jsx)(d,{text:"Settings"}),Object(n.jsx)("span",{className:"settings-page__subtitle",children:"Account"}),Object(n.jsxs)("div",{className:"settings-wrapper",children:[Object(n.jsxs)("div",{className:"settings-item settings-item__avatar-wrapper",children:[Object(n.jsx)("img",{className:"settings-item__avatar",src:m||"https://yt3.ggpht.com/ytc/AAUvwng-3d-BcGfaNN09TTsLOoFfVhCT96sjcPQeJzQ2iQ=s900-c-k-c0x00ffffff-no-rj",onClick:function(){S(!0)},width:"100",height:"100",alt:"User's avatar"}),y?Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("input",{className:"settings-item__field settings-item__field--avatar",type:"text",name:"avatar",onChange:function(e){h(e.target.value)},placeholder:"Type link on you avatar",value:m||""}),Object(n.jsx)("button",{className:"settings-item__btn",onClick:function(){t.updateProfile({photoURL:m}).then((function(){return S(!1)})).catch((function(e){c("User avatar didn't update: ".concat(e.message))}))},children:"Save"}),Object(n.jsx)("button",{className:"settings-item__btn",onClick:function(){h(t.photoURL),S(!1)},children:"Cancel"})]}):null]}),p?Object(n.jsxs)("div",{className:"settings-item",children:[Object(n.jsx)("input",{className:"settings-item__field settings-item__field--name",type:"text",name:"name",onChange:function(e){l(e.target.value)},placeholder:"What is your name?",value:r||""}),Object(n.jsx)("button",{className:"settings-item__btn",onClick:function(){t.updateProfile({displayName:r}).then((function(){return v(!1)})).catch((function(e){c("User name didn't update: ".concat(e.message))}))},children:"Save"}),Object(n.jsx)("button",{className:"settings-item__btn",onClick:function(){l(t.displayName),v(!1)},children:"Cancel"})]}):Object(n.jsx)("div",{className:"settings-item",children:Object(n.jsx)("span",{className:"settings-item__text",onClick:function(){v(!0)},children:r||"Anonymous"})}),Object(n.jsxs)("div",{className:"settings-item settings-item--email",children:[Object(n.jsx)("span",{onClick:G?void 0:H,children:"Your email: "}),Object(n.jsx)("span",{className:G?"settings-item__text settings-item__text--unclickable":"settings-item__text",onClick:G?void 0:H,children:V})]}),!G&&Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("div",{className:"settings-item",children:Object(n.jsx)("button",{className:"settings-item__btn",onClick:X,children:"Change password"})}),Object(n.jsx)("div",{className:"settings-item",children:Object(n.jsx)("button",{className:"settings-item__btn",onClick:function(){x.a.auth().sendPasswordResetEmail(V,a).then((function(){c("Please check your email")})).catch((function(e){c("Email for reset password didn't send ".concat(e.message))}))},children:"Send me the email to reset the password"})})]}),Object(n.jsx)("div",{className:"settings-item",children:Object(n.jsx)("button",{className:"settings-item__btn",onClick:z,children:"Delete account"})})]}),Object(n.jsx)("span",{className:"settings-page__subtitle",children:"App"}),E&&Object(n.jsx)(g,{children:Object(n.jsx)(D,{classes:"modal--change-email",title:"Changing the email",onCloseBtnClick:H,children:Object(n.jsx)(A,{onToggleModal:H,user:t,actionCodeSettings:a})})}),q&&Object(n.jsx)(g,{children:Object(n.jsx)(D,{classes:"modal--change-password",title:"Changing the password",onCloseBtnClick:X,children:Object(n.jsx)(M,{onToggleModal:X,user:t})})}),Y&&Object(n.jsx)(g,{children:Object(n.jsx)(D,{classes:"modal--delete-account",title:"Deleting the account",onCloseBtnClick:z,children:Object(n.jsx)(L,{user:t,onToggleModal:z})})})]})})}),B=(a(48),function(){var e=C().showTooltip,t=Object(s.useState)({email:"",password:"",repeatPassword:""}),a=Object(b.a)(t,2),c=a[0],o=a[1],i=function(e){var t=e.target.id,a=e.target.value;o((function(e){return Object(j.a)(Object(j.a)({},e),{},Object(F.a)({},t,a))}))};return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)("form",{className:"sign-up-form",onSubmit:function(t){t.preventDefault();var a=c.email,n=c.password;n==c.repeatPassword?x.a.auth().createUserWithEmailAndPassword(a,n).then((function(){return localStorage.setItem("rememberMe","true")})).catch((function(t){return e("Your account didn't be created: ".concat(t.message))})):e("You password and repeated password don't match")},children:[Object(n.jsx)("label",{htmlFor:"email",children:"Email (*): "}),Object(n.jsx)("input",{className:"sign-up-form__email-field",id:"email",type:"email",name:"email",placeholder:"Enter your email",onChange:i,value:c.email,required:!0}),Object(n.jsx)("label",{htmlFor:"password",children:"Password (*): "}),Object(n.jsx)("input",{className:"sign-up-form__password-field",id:"password",type:"password",name:"password",placeholder:"Create a password",onChange:i,value:c.password,required:!0}),Object(n.jsx)("label",{htmlFor:"repeatPassword",children:"Repeat password (*): "}),Object(n.jsx)("input",{className:"sign-up-form__repeat-password-field",id:"repeatPassword",type:"password",name:"repeat-password",placeholder:"Repeat a password",onChange:i,value:c.repeatPassword,required:!0}),Object(n.jsx)("button",{className:"sign-up-form__submit",children:"Sign up"})]}),Object(n.jsxs)("div",{className:"modal--sign-up__sign-up-with-google",children:[Object(n.jsxs)("span",{className:"sign-up-with-google__text",children:["You can pass an alternative registration with Google."," "]}),Object(n.jsx)("button",{className:"sign-up-with-google__btn",onClick:function(){var t=new x.a.auth.GoogleAuthProvider;x.a.auth().signInWithPopup(t).then((function(){return localStorage.setItem("rememberMe","true")})).catch((function(t){e(t.message)}))},children:"Let's do it!"})]}),Object(n.jsxs)("span",{className:"modal--sign-up__go-to-sign-in",children:["Already have an account?"," ",Object(n.jsx)(r.b,{className:"modal--sign-up__sign-in-link",to:"/sign-in",children:"Sign in"})]})]})}),R=function(){return Object(n.jsx)("main",{className:"sign-up-page",children:Object(n.jsx)(D,{classes:"modal--sign-up",title:"Sign up",children:Object(n.jsx)(B,{})})})},U=(a(53),function(){var e=C().showTooltip,t=Object(s.useState)({email:"",password:""}),a=Object(b.a)(t,2),c=a[0],o=a[1],i=Object(s.useState)(localStorage.getItem("rememberMe")),l=Object(b.a)(i,2),d=l[0],u=l[1],m=function(e){var t=e.target.id,a=e.target.value;o((function(e){return Object(j.a)(Object(j.a)({},e),{},Object(F.a)({},t,a))}))};return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)("form",{className:"sign-in-form",onSubmit:function(t){t.preventDefault();var a=c.email,n=c.password;x.a.auth().signInWithEmailAndPassword(a,n).catch((function(t){return e(t.message)}))},children:[Object(n.jsx)("label",{htmlFor:"email",children:"Email (*): "}),Object(n.jsx)("input",{className:"sign-in-form__email-field",id:"email",type:"email",name:"email",placeholder:"Enter you email",onChange:m,value:c.email,required:!0}),Object(n.jsx)("label",{htmlFor:"password",children:"Password (*): "}),Object(n.jsx)("input",{className:"sign-in-form__password-field",id:"password",type:"password",name:"password",placeholder:"Enter you password",onChange:m,value:c.password,required:!0}),Object(n.jsx)("label",{htmlFor:"rememberMe",children:"Remember me "}),Object(n.jsx)("input",{className:"sign-up-form__remember-me-checkbox",id:"rememberMe",type:"checkbox",name:"remember-me",onChange:function(e){d?(localStorage.removeItem("rememberMe"),u(null)):(localStorage.setItem("rememberMe","true"),u("true"))},checked:!!d}),Object(n.jsx)("button",{className:"sign-in-form__submit",children:"Sign in"})]}),Object(n.jsx)("button",{className:"modal--sign-in__google-btn",onClick:function(){var t=new x.a.auth.GoogleAuthProvider;x.a.auth().signInWithPopup(t).catch((function(t){e(t.message)}))},children:"Sign in with Google"}),Object(n.jsxs)("span",{className:"modal--sign-in__go-to-reset",children:["Forgot password?"," ",Object(n.jsx)(r.b,{className:"modal--sign-in__reset-link",to:"/reset-password",children:"Reset"})]}),Object(n.jsxs)("span",{className:"modal--sign-in__go-to-sign-up",children:["Return to"," ",Object(n.jsx)(r.b,{className:"modal--sign-in__sign-up-link",to:"/sign-up",children:"Sign up"})]})]})}),Y=function(){return Object(n.jsx)("main",{className:"sign-in-page",children:Object(n.jsx)(D,{classes:"modal--sign-in",title:"Sign in",children:Object(n.jsx)(U,{})})})},W=(a(54),function(){var e=_().actionCodeSettings,t=C().showTooltip,a=Object(s.useState)(""),c=Object(b.a)(a,2),o=c[0],i=c[1];return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)("form",{className:"reset-password-form",onSubmit:function(a){a.preventDefault(),x.a.auth().sendPasswordResetEmail(o,e).then((function(){})).catch((function(e){t(e.message)}))},children:[Object(n.jsx)("label",{htmlFor:"email",children:"Email (*): "}),Object(n.jsx)("input",{className:"reset-password-form__email-field",id:"email",type:"email",name:"email",placeholder:"Enter you email",onChange:function(e){i(e.target.value)},value:o,required:!0}),Object(n.jsx)("button",{className:"reset-password-form__submit",children:"Reset password"})]}),Object(n.jsx)(r.b,{className:"modal--reset-password__sign-in-link",to:"/sign-in",children:"I remember :)"})]})}),G=function(){return Object(n.jsx)("main",{className:"reset-password-page",children:Object(n.jsx)(D,{classes:"modal--reset-password",title:"Reset password",children:Object(n.jsx)(W,{})})})},V=(a(55),function(){var e=C().showTooltip;return Object(n.jsx)("header",{className:"page-header",children:Object(n.jsxs)("div",{className:"container flex-wrapper flex-wrapper--jsb",children:[Object(n.jsxs)("nav",{className:"main-nav",children:[Object(n.jsx)(r.c,{exact:!0,to:"/",activeClassName:"main-nav__active-link",children:"Doit!"}),Object(n.jsxs)("ul",{className:"main-nav__list",children:[Object(n.jsx)("li",{className:"main-nav__item",children:Object(n.jsx)(r.c,{to:"/todo",activeClassName:"main-nav__active-link",children:"Todo"})}),Object(n.jsx)("li",{className:"main-nav__item",children:Object(n.jsx)(r.c,{to:"/notes",activeClassName:"main-nav__active-link",children:"Notes"})}),Object(n.jsx)("li",{className:"main-nav__item",children:Object(n.jsx)(r.c,{to:"/settings",activeClassName:"main-nav__active-link",children:"Settings"})})]})]}),Object(n.jsx)("button",{className:"page-header__sign-out",onClick:function(t){x.a.auth().signOut().catch((function(t){e(t.message)}))},children:"Sign out"})]})})}),H=(a(56),function(){var e=C(),t=e.message,a=e.isOpen,s=e.hideTooltip;return a?Object(n.jsxs)("div",{className:"tooltip",children:[Object(n.jsx)("span",{className:"tooltip__message",children:t}),Object(n.jsx)("button",{className:"tooltip__close",onClick:function(){return s()},children:"X"})]}):null}),X=(a(57),a(58),a(59),function(){var e=_(),t=e.isLoggedIn,a=e.currentUser;return Object(n.jsx)(r.a,{children:t?Object(n.jsx)(n.Fragment,{children:a.emailVerified?Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(l.b,{path:"/sign-in",render:function(){return Object(n.jsx)(l.a,{to:"/"})}}),Object(n.jsx)(l.b,{path:"/sign-up",render:function(){return Object(n.jsx)(l.a,{to:"/"})}}),Object(n.jsx)(V,{}),Object(n.jsx)(H,{}),Object(n.jsx)(l.b,{path:"/",component:u,exact:!0}),Object(n.jsx)(l.b,{path:"/todo",component:k}),Object(n.jsx)(l.b,{path:"/notes",component:P}),Object(n.jsx)(l.b,{path:"/settings",component:q})]}):Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(l.b,{path:"/sign-in",render:function(){return Object(n.jsx)(l.a,{to:"/"})}}),Object(n.jsx)(l.b,{path:"/sign-up",render:function(){return Object(n.jsx)(l.a,{to:"/"})}}),Object(n.jsx)(V,{}),Object(n.jsx)("div",{className:"app__overlay",children:Object(n.jsx)("span",{className:"app__confirm-message",children:"Please confirm your email to use the app"})})]})}):Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(H,{}),Object(n.jsx)(l.b,{path:"/sign-up",component:R}),Object(n.jsx)(l.b,{path:"/sign-in",component:Y}),Object(n.jsx)(l.b,{path:"/reset-password",component:G}),Object(n.jsx)(l.a,{to:"/sign-up"})]})})});a(60),a(62);x.a.initializeApp({apiKey:"AIzaSyD4KDh3FaOBTHDF_oleVT06eUTvbDCStNY",authDomain:"todo-1c323.firebaseapp.com",databaseURL:"https://todo-1c323-default-rtdb.firebaseio.com",projectId:"todo-1c323",storageBucket:"todo-1c323.appspot.com",messagingSenderId:"372839437605",appId:"1:372839437605:web:31ef34b6e882e585f576cc"}),i.a.render(Object(n.jsx)(w,{children:Object(n.jsx)(y,{children:Object(n.jsx)(X,{})})}),document.querySelector("#root"))}]),[[66,1,2]]]);
//# sourceMappingURL=main.756797d4.chunk.js.map
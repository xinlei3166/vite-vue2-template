import{d as a,k as r,i as u,n as _}from"./index-30228a89.js";const o=a({setup(){const e=r().proxy.$bus,n=u(0);function s(){n.value++,e.emit("change-number",n.value)}return{number:n,onAdd:s}}});var c=function(){var e=this,n=e._self._c;return e._self._setupProxy,n("div",[n("div",{staticClass:"title"},[e._v("A组件")]),n("div",{staticClass:"title"},[e._v("当前结果："+e._s(e.number))]),n("a-button",{staticStyle:{"margin-left":"64px"},attrs:{type:"primary",size:"small"},on:{click:e.onAdd}},[e._v("增加")])],1)},i=[],l=_(o,c,i,!1,null,"382d4b6f",null,null);const f=l.exports;export{f as default};

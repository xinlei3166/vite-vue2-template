import{d as o,k as r,i as u,o as c,p as _,n as i}from"./index-30228a89.js";const l=o({setup(){const n=r().proxy.$bus,e=u(0),s=a=>{e.value=a};return c(()=>{n.on("change-number",s)}),_(()=>{n.off("change-number",s)}),{number:e}}});var f=function(){var n=this,e=n._self._c;return n._self._setupProxy,e("div",[e("div",{staticClass:"title"},[n._v("B组件")]),e("div",{staticClass:"title"},[n._v("当前结果："+n._s(n.number))])])},m=[],v=i(l,f,m,!1,null,"fa6c265c",null,null);const p=v.exports;export{p as default};

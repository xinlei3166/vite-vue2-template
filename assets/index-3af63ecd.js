import{_ as n,I as i,d as C,a as b,f as y,c as k,b as w,i as d,h as S,j as B,s as O,m as A,n as F}from"./index-30228a89.js";import{u as z}from"./theme-8bd68b9f.js";import{_ as E}from"./logo-64ba4bd3.js";var U={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 10-56 0z"}}]},name:"lock",theme:"outlined"};const L=U,M={name:"IconLockOutlined",displayName:"LockOutlined",functional:!0,props:n({},i.props),render:function(e,t){var s=t.data,a=t.children,o=t.props;return e(i,n({},s,{props:n({},s.props,o,{icon:L})}),a)}};var V={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"}}]},name:"user",theme:"outlined"};const q=V,D={name:"IconUserOutlined",displayName:"UserOutlined",functional:!0,props:n({},i.props),render:function(e,t){var s=t.data,a=t.children,o=t.props;return e(i,n({},s,{props:n({},s.props,o,{icon:q})}),a)}},R=C({__name:"index",setup(r){const e=z(),t=b(),s=y(),a=k(),o=w(),_="Vue App",v=d(!0),l=d(!1),p=d(),u=S({userAccount:"",password:""}),g={account:[{required:!0,message:"请输入账号",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]},m=async()=>{l.value=!0;const c=await B({account:u.userAccount,password:u.password});if(l.value=!1,!c||c.code!==0)return;O(c.data.accessToken);let f=s.query,{redirect:h}=f;h&&delete f.redirect;let x="/";await o.setUserinfo(),await o.setPermissions(),A.success({content:"登录成功",duration:1,onClose:()=>{t.push({path:x}).catch(()=>{})}})};return{__sfc:!0,theme:e,router:t,route:s,menuStore:a,userStore:o,title:_,checked:v,loading:l,formRef:p,form:u,rules:g,doLogin:m,onSubmit:()=>{p.value.validate(async c=>{c&&await m()})},UserOutlined:D,LockOutlined:M}}});var I=function(){var e=this,t=e._self._c,s=e._self._setupProxy;return t("div",{staticClass:"user-layout box-border border-border"},[t("div",{staticClass:"login-wrap"},[t("div",{staticClass:"login"},[t("div",{staticClass:"login-title"},[t("img",{staticClass:"login-title-img",attrs:{src:E}}),t("span",{staticClass:"login-title-text"},[e._v(e._s(s.title))])]),t("div",{staticClass:"text-text2 text-center mt-4 mb-12"},[e._v(" Vue 是一款非常流行的 JavaScript 前端框架 ")]),t("a-form",{ref:"formRef",staticClass:"login-form",attrs:{model:s.form,rules:s.rules,colon:!1,"label-col":{flex:"50px"},"label-align":"right"}},[t("a-form-item",{staticClass:"login-form-item",attrs:{label:"",name:"account"}},[t("a-input",{attrs:{size:"large","allow-clear":!1,placeholder:"账号：admin"},scopedSlots:e._u([{key:"prefix",fn:function(){return[t(s.UserOutlined,{staticClass:"text-primary text-3.5",attrs:{type:"user"}})]},proxy:!0}]),model:{value:s.form.account,callback:function(a){e.$set(s.form,"account",typeof a=="string"?a.trim():a)},expression:"form.account"}})],1),t("a-form-item",{staticClass:"login-form-item",attrs:{label:"",name:"password"}},[t("a-input-password",{attrs:{size:"large",type:"password","allow-clear":!1,placeholder:"密码：123456"},scopedSlots:e._u([{key:"prefix",fn:function(){return[t(s.LockOutlined,{staticClass:"text-primary text-3.5",attrs:{type:"user"}})]},proxy:!0}]),model:{value:s.form.password,callback:function(a){e.$set(s.form,"password",typeof a=="string"?a.trim():a)},expression:"form.password"}})],1),t("a-form-item",{attrs:{label:""}},[t("a-checkbox",{model:{value:s.checked,callback:function(a){s.checked=a},expression:"checked"}},[e._v("自动登录")]),t("a",{staticClass:"float-right text-btn",attrs:{href:"#"}},[e._v("忘记密码")])],1),t("a-form-item",{staticClass:"login-form-btn-wrap",attrs:{label:""}},[t("a-button",{staticClass:"login-btn",attrs:{size:"large",type:"primary",loading:s.loading},on:{click:s.onSubmit}},[e._v(" 登 录 ")])],1)],1)],1),e._m(0)])])},H=[function(){var r=this,e=r._self._c;return r._self._setupProxy,e("div",{staticClass:"footer"},[e("div",{staticClass:"links"},[e("a",{staticClass:"link",attrs:{href:"_self"}},[r._v("帮助")]),e("a",{staticClass:"link",attrs:{href:"_self"}},[r._v("隐私")]),e("a",{staticClass:"link",attrs:{href:"_self"}},[r._v("条款")])]),e("div",{staticClass:"copyright"},[r._v("Copyright © 2023 君惜 (xinlei3166)")])])}],P=F(R,I,H,!1,null,"de581aa0",null,null);const G=P.exports;export{G as default};

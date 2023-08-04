# vite-vue2-template

使用 `Vue3` 语法开发 `Vue2` 项目，2.x 最后一个版本 `Vue@2.7`

**安装pnpm**

```javascript
npm i -g pnpm 
```

**起步**

执行这个命令安装完依赖，apps目录下的应用可以正常启动。

```javascript
pnpm i 
```

**安装依赖**

```javascript
pnpm i -w pkgName
```

递归每个package安装
```javascript
pnpm i -w -r pkgName
```

**给子包安装指定依赖**
```javascript
pnpm -F @packages/components add lodash
```

**package间的相互引用**
```javascript
pnpm -F @packages/components add @packages/utils
```


**项目结构**
```javascript
├── base
├── apps // web项目
├── features // 可复用的页面组件代码
├── packages // 常用工具和库
│   ├── components
│   ├── hooks
│   ├── lib
│   ├── plugins
│   ├── styles
│   ├── types
│   └── utils
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── tsconfig.json
```

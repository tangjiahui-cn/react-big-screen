import{j as c}from"./index-CURBny2a.js";import{R as p}from"./index-BBZy8l_p.js";import{N as u}from"./index-C1dqQr_n.js";import{DEFAULT_OPTIONS as f}from"./attributes-DfsdLXbf.js";import{r as g}from"./react-vendor--oJ8assb.js";import"./monaco-editor-dqJR7YPI.js";import"./echarts-Ce17RAXK.js";import"./ahooks-0i8_p3j2.js";import"./antd-DB3XX4mR.js";import"./lodash-es-CdGItEyc.js";import"./index-ZF7PDGmW.js";import"./Line-Dasc69KG.js";function l(t="name",m,n){return!(m!=null&&m.length)||!(n!=null&&n.length)?{source:[]}:{dimensions:[t,...m.map(r=>r.name)],source:n.map(r=>{const o={[t]:`${r[t]??""}`};return m.forEach(a=>{o[a.name]=r[a.value]||0}),o})}}function x(t){var m;return((m=t==null?void 0:t.map)==null?void 0:m.call(t,n=>({id:n==null?void 0:n.key,type:"line",color:n==null?void 0:n.color})))||[]}const D=u(t=>{const{width:m,height:n,options:r,dataSource:o}=t,a=g.useMemo(()=>({tooltip:{trigger:"item"},dataset:l(r==null?void 0:r.nameCode,r==null?void 0:r.seriesList,Array.isArray(o)?o:[]),xAxis:[{type:"category"}],yAxis:[{}],series:x(r==null?void 0:r.seriesList)}),[o,r==null?void 0:r.seriesList,r==null?void 0:r.nameCode]);return c.jsx(p,{options:a,style:{width:m,height:n,background:r==null?void 0:r.background}})},f);export{D as default};

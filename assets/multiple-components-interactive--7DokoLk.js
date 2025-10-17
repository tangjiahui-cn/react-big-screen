const e={peopleTable:{count:1},text:{count:3},input:{count:3},button:{count:2}},t=[{cId:"peopleTable",cName:"人员表格",x:36,y:78,width:1215,height:617,category:"other",isAllPage:!0,pageId:"58de04a398",name:"人员表格",id:"bbf50939c1",level:5,dataSourceType:"static",show:!0},{cId:"text",cName:"文本",x:-10,y:21,width:120,height:32,category:"base",pageId:"58de04a398",name:"文本",id:"ee9db7f84d",level:2,dataSourceType:"static",show:!0,options:{value:"名称：",fontSize:14,lineHeight:32,color:"black",textAlign:"right"}},{cId:"input",cName:"输入框",x:113,y:21,width:250,height:32,category:"base",pageId:"58de04a398",name:"输入框",id:"615ec59655",level:3,dataSourceType:"static",show:!0,events:[{triggerId:"input",targets:[{id:"bbf50939c1",opts:[{operateId:"6a255cf30f",exposeId:"changeFilter",option:{parserFunc:`/**
 * 转换request扩展参数函数 (必须包含主函数main)
 *
 * @params {value} 默认携带参数或json对象
 * @params {origin} 源componentNode
 * @params {target} 目标componentNode
 * @params {option} 事件的最小配置 event.target.opt.option
 * @return {value} 返回修改后的额外查询参数
 */
function main(value, {origin, target, option}) {
  return {
    name: value
  }
}`}}]}]}]},{cId:"text",cName:"文本",x:344,y:21,width:120,height:32,category:"base",pageId:"58de04a398",name:"文本",id:"2452bc1a6d",level:2,dataSourceType:"static",show:!0,options:{value:"年龄：",fontSize:14,lineHeight:32,color:"black",textAlign:"right"}},{cId:"text",cName:"文本",x:685,y:22,width:120,height:32,category:"base",pageId:"58de04a398",name:"文本",id:"5a5065846e",level:2,dataSourceType:"static",show:!0,options:{value:"性别：",fontSize:14,lineHeight:32,color:"black",textAlign:"right"}},{cId:"button",cName:"按钮",x:1110,y:21,width:64,height:32,category:"base",pageId:"58de04a398",name:"按钮",id:"f7a6242bd8",level:4,dataSourceType:"static",show:!0,options:{value:"重置",borderRadius:2},events:[{triggerId:"onClick",targets:[{id:"bbf50939c1",opts:[{operateId:"10a58acd6b",exposeId:"clearFilter",option:{}}]},{id:"615ec59655",opts:[{operateId:"c5d340d171",exposeId:"changeValue",option:{value:"",type:"text"}}]},{id:"a9c0dc09a2",opts:[{operateId:"3680eeb6fe",exposeId:"changeValue",option:{value:"",type:"text"}}]},{id:"7fb1e2ee25",opts:[{operateId:"83f080e146",exposeId:"changeValue",option:{value:"",type:"text"}}]}]}]},{cId:"button",cName:"按钮",x:1185,y:22,width:64,height:32,category:"base",pageId:"58de04a398",name:"按钮",id:"1f965fc068",level:4,dataSourceType:"static",show:!0,options:{value:"查询",type:"primary",borderRadius:2},events:[{triggerId:"onClick",targets:[{id:"bbf50939c1",opts:[{operateId:"500cfc5bf7",exposeId:"refresh",option:{}}]}]}]},{cId:"input",cName:"输入框",x:463,y:21,width:250,height:32,category:"base",pageId:"58de04a398",name:"输入框",id:"a9c0dc09a2",level:3,dataSourceType:"static",show:!0,events:[{triggerId:"input",targets:[{id:"bbf50939c1",opts:[{operateId:"898b7b0079",exposeId:"changeFilter",option:{parserFunc:`/**
 * 转换request扩展参数函数 (必须包含主函数main)
 *
 * @params {value} 默认携带参数或json对象
 * @params {origin} 源componentNode
 * @params {target} 目标componentNode
 * @params {option} 事件的最小配置 event.target.opt.option
 * @return {value} 返回修改后的额外查询参数
 */
function main(value, {origin, target, option}) {
  return {
    age: value
  }
}`}}]}]}]},{cId:"input",cName:"输入框",x:802,y:20,width:250,height:32,category:"base",pageId:"58de04a398",name:"输入框",id:"7fb1e2ee25",level:3,dataSourceType:"static",show:!0,events:[{triggerId:"input",targets:[{id:"bbf50939c1",opts:[{operateId:"b495f323b8",exposeId:"changeFilter",option:{parserFunc:`/**
 * 转换request扩展参数函数 (必须包含主函数main)
 *
 * @params {value} 默认携带参数或json对象
 * @params {origin} 源componentNode
 * @params {target} 目标componentNode
 * @params {option} 事件的最小配置 event.target.opt.option
 * @return {value} 返回修改后的额外查询参数
 */
function main(value, {origin, target, option}) {
  return {
    sex: value
  }
}`}}]}]}]}],a={scale:.6709999999999992,scaleDefault:1,scaleStep:.02,scaleMinZoom:.1,scaleMaxZoom:2,width:1280,height:720,currentPageId:"58de04a398",editorOffsetX:44,editorOffsetY:18,currentMenu:"library",currentPage:"default",language:"zh"},o=[],n=[],i=[{id:"b74a34caf4",name:"收藏1",children:[{cId:"line",cName:"折线图",x:8,y:10,width:500,height:374,category:"charts",options:{seriesList:[{key:"1",name:"数据1",value:"value1",color:"#f8e71c"},{key:"2",name:"数据2",value:"value2",color:"#7ed321"},{key:"3",name:"数据3",value:"value3",color:"#1071e0"}],nameCode:"xxx"},dataSourceType:"static",staticDataSource:[{name:"选项一",xxx:"分类1",value1:100,value2:200,value3:300},{name:"选项二",xxx:"分类2",value1:50,value2:150,value3:250},{name:"选项三",xxx:"分类3",value1:80,value2:180,value3:280}],pageId:"58de04a398",name:"折线图",id:"7227bde647",level:2,show:!0}],gmtCreate:"2025-03-25 10:54:46"}],r=[{name:"多组件联动",id:"58de04a398"}],c={used:e,componentNodes:t,config:a,selectedIds:o,localPackages:n,favorites:i,pages:r};export{t as componentNodes,a as config,c as default,i as favorites,n as localPackages,r as pages,o as selectedIds,e as used};

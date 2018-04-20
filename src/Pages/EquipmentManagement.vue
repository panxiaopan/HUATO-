<template>
      <Row class="Equimpent">
        <Row class="headertop">
            <Col span="24">当前位置----仪器管理</Col>
        </Row>
        <Row>
             <Form  :label-width="80" inline style="margin-top:20px;">
                    <FormItem label="仪器序列号">
                        <Input  placeholder="仪器序列号" v-model="loggerSn"></Input>
                    </FormItem>
                     <FormItem label="数据时间">
                        <DatePicker type="daterange" v-model="DataTime"   placeholder="Select date" style="width: 200px" :options="disabledDate"></DatePicker>
                     </FormItem>
                    <FormItem>
                        <Button type="primary" @click="locating">查询</Button>
                     </FormItem>
                     <FormItem>
                        <Button type="primary" @click="BulkManage" >批量归纳整理</Button>
                     </FormItem>
             </Form>
               <Table border :columns="columnsManage"  :data="dataManage[0]" @on-selection-change="SelectionDatch" :loading="loadingmain"></Table>
             <Row class="pages">
                    <Page :total="totalnameber" :page-size="pageIndex"  show-total  @on-change="pageIndexChange"></Page>
            </Row>
        </Row>
         <Row>
             <Modal
                v-model="modalqu"
                title="仪器归纳弹框"
                width=900
                >
                 <div style="height:40px;margin:10px;">
                       <Input  placeholder="用户名..." style="width: 200px" v-model="userName"></Input>
                        <Button type="primary" shape="circle" icon="ios-search" style="margin-left:20px"  @click="SeachUser" ></Button>
                 </div>
                <div class="conclude" style="margin-right:20px">
                        <Table highlight-row border :columns="columnsuser" :data="Datauser[0]" height="400"    @on-current-change="Selectsuer"></Table>
                </div>
                <div class="conclude" >
                     <Table highlight-row border :columns="columnszone" :data="datazone[0]" height="400"    @on-current-change="Selectzone" :loading="loading" ></Table>
                </div>
                <div slot="footer">
                    <Button type="primary"   @click="SubmitClon">提交</Button>
                </div>
             </Modal>
                 <Modal
                    width=740
                    v-model="modalHistory"
                    title="历史记录">
                     <div style="height:50px">
                         
                         <DatePicker type="daterange"  v-model="DataHistoryTime"   placement="bottom-end" placeholder="选择数据时间" style="width: 200px"></DatePicker>
                          <Button type="primary" style="margin-left:20px" @click="SeachHistory" >查询</Button>  
                     </div>
                     <Table border :columns="columnsHistory" :data="dataHistory[0]" height="400" :loading="loading"></Table>

                </Modal>

        </Row>
     </Row>
</template>
<script>
import {GetLoggerManageData,GetGroupDataUserCode,GetUserDataUser,LoggerInductiveArrangement,LoggerRestoreUse,GetLoggerHistory} from '@/assets/api/api'
import{timeFormattershow,SevenDay}from'@/assets/js/common';
import qs from 'qs';
export default {
      data(){
          return{
              loadingmain:false,
              loading:false,
              HisGroupName:'',
              dataHistory:[],
              modalHistory:false,
              Judge:[],
              ListInductiveArrangementTable:[],
              GroupId:null,
              GroupName:null,
              userName:'',
              Datauser:[],
              Userzone:"",
              datazone:[],
              modalqu:false,
              totalnameber:null,
              DataTime:[],
              DataHistoryTime:[new Date(SevenDay(new Date())), new Date()],
              loggerSn:'',
              pageIndex:12,
              pageSize:1,
             dataManage:[],
             disabledDate:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
               },
             columnsHistory:[
                 {
                     type:'index',
                     width:'60'
                 },
                 {
                     title:'数据时间',
                     key:'LogsTime'
                 },
                 {
                     title:'历史数据展示',
                     render:(h,params) =>{
                         return h("div",[
                            h('span',{
                                style:{
                                  marginRight: '10px'
                                }
                            },params.row.LogsChone),
                           h('span',{
                                style:{
                                  marginRight: '10px'
                                }
                             },params.row.LogsChtwo),
                            h('span',{
                                style:{
                                  marginRight: '10px'
                                }
                             },params.row.LogsChthree),                            
                           h('span',{
                                style:{
                                  marginRight: '10px'
                                }
                             },params.row.LogsChfour), 

                         ])
                     }
                 },
                 {
                     title:'经度',
                     key:'Longitudel'

                 },
                 {
                     title:"纬度",
                     key:'LatiTudeE'
                 },
             ],
             columnsManage:[
                 {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                 },
                 {
                     title:'仪器序列号',
                     key:'LoggerSn',
                    
                 },
                 {
                     title:'仪器名称',
                     key:'LoggerName'

                 },
                 {
                     title:'最近记录时间',
                     key:'LogsTime',
                      width:150
                 },
                 {
                     title:'最新数据',
                     render:(h,params) =>{
                         return h('div',[
                             h('span',{
                               props:{
                                  
                               },
                               style:{
                                   display:"inline-block",
                                   width:'40PX', 
                               }  
                             },params.row.LogsChone),
                             h('span',{
                               props:{
                                  
                               },
                               style:{
                                   display:"inline-block",
                                   width:'40PX', 
                                   display:params.row.LoggerChnum>1 ? "inline-block" :'none'
                               }  
                             },params.row.LogsChtwo),
                              h('span',{
                               props:{
                                  
                               },
                               style:{
                                   display:"inline-block",
                                   width:'40PX', 
                                   display:params.row.LoggerChnum>2 ? "inline-block" :'none'
                               }  
                             },params.row.LogsChthree),
                             h('span',{
                               props:{
                                  
                               },
                               style:{
                                   display:"inline-block",
                                   width:'40PX', 
                                   display:params.row.LoggerChnum>3 ? "inline-block" :'none'
                               }  
                             },params.row.LogsChfour),

                         ])
                     }
                 },
                 {
                     title:'操作',
                     render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '10px'
                                    },
                                    on: {
                                        click: () => {
                                           this.HistotyData(this.dataManage[0][params.index].LoggerSn)
                                        }
                                    }
                                }, '历史数据'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style:{
                                         marginRight: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.InductiveManagement(this.dataManage[0][params.index].LoggerSn)
                                        }
                                    }
                                }, '归纳整理'),
                              h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                       disabled:Boolean(this.dataManage[0][params.index].LoggerState !== 4  ? true : false)
                                    },
                                    on: {
                                        click: () => {
                                            this.Desterilize(this.dataManage[0][params.index].LoggerSn)
                                        }
                                    }
                                }, '恢复使用'),
                            ]);
                        }

                 }
             ],
             columnszone:[
                {
                    type:'index',
                    title:'序号',
                    width:100
                },
                 {
                    title:'分区名称',
                    key:'GroupName'
                 },
                 {
                     title:'仪器数量',
                     key:'GlCount'
                 }
             ],
             columnsuser:[
                   {
                    type:'index',
                    title:'序号',
                    width:100
                  },
                 {
                    title:'用户名称',
                    key:"UserName"
                  },
                 {
                    title:'用户仪器数量',
                    key:"LoginStatistics",
                    width:120

                  },
                   {
                    title:'分区数量',
                    key:'SubordinateUsers'
                  },
             ],
          }
      },
      methods:{
         GetEquipment () {//列表请求
         this.loadingmain=true
             this.dataManage=[]
              var params={
                        pageIndex:this.pageIndex,
                        pageSize:this.pageSize,
                        loggerSn:this.loggerSn,
                        staDate:this.DataTime[0],
                        endDate:this.DataTime[1]
                      }
              GetLoggerManageData(qs.stringify(params)).then(res=>{
                      if(res.State==1){
                         this.loadingmain=false  
                          this.totalnameber=res.TotalNumber
                          this.dataManage.push(res.Data) 
                          console.log(res)
                      }else{
                           this.loadingmain=false  
                      }
               })
            },
           locating(){//仪器型号查询
                this.GetEquipment ()
           },
          pageIndexChange(pages){//翻页点击
                this.pageSize=pages
                this.GetEquipment ()  
           },
           InductiveManagement(index){//归纳
               if(this.Judge.length !== 0){
                    this.$Message.error('选择批量归纳!');
               }else{
                  this.modalqu=true 
                  this.ListInductiveArrangementTable=[]
                    var Loggersn={
                        LoggerSn:index
                    }
                   this.ListInductiveArrangementTable.push(Loggersn)
               }
                

           },
         GetGroupDataUserCode(){//分区名称仪器数量
            this.datazone=[];
              var parms={
                   userName:this.Userzone
             }
             GetGroupDataUserCode(qs.stringify(parms)).then(res=>{
                    if(res.State==1){
                        this.datazone.push(res.Data)
                    }   
                })
         },
         GetUserDataUser(){//得到弹框用户左侧
         this.Datauser=[]
          var parms={
                   userName:this.userName
             }
            GetUserDataUser(qs.stringify(parms)).then(res =>{
                       if(res.State==1){
                            this.Datauser.push(res.Data)
                            this.modalqu=false
                            this.GetGroupDataUserCode()//提交后更新
                       }        
            })
         },
         SeachUser(){//查询用户
            this.GetUserDataUser()
         },
         SubmitClon(){//提交
                var  inductiveArrangement={
                       GroupId:this.GroupId,
                       GroupName:this.GroupName,
                       ListInductiveArrangementTable:this.ListInductiveArrangementTable
                }
             LoggerInductiveArrangement(inductiveArrangement).then(res =>{
                              if(res.State==1){
                                   this.$Message.success('Success!');
                                   this.modalqu=false 
                                   this.GetEquipment ()
                              }
             })

         },

         Selectzone(currentRow){//选择分区
              this.GroupId=currentRow.GroupId
              this.GroupName=currentRow.GroupName
         },
        Selectsuer(currentRow){
               this.Userzone=currentRow.UserName
               this.GetGroupDataUserCode()
        },
        SelectionDatch(val){//选择
               this.Judge=val
        },
        BulkManage(){//批量管理
              if(this.Judge.length==0){
                  this.$Message.error('选择要归纳的仪器!');
              }else{
                   this.modalqu=true 
                   this.ListInductiveArrangementTable=this.Judge
              }
        },
        Desterilize(index){//恢复
            var parms={
                loggerSn:index
            }  
          
            LoggerRestoreUse(qs.stringify(parms)).then(res =>{
                   if(res.State==1){
                       this.$Message.success('Success!');
                       this.GetEquipment ()

                   }
            })   
        },
        SeachHistory(){//查询LEIBIAO
            this.HistotyData()
        },
        HistotyData(index){
            this.loading=true
            this.dataHistory=[]
            this.modalHistory=true;
          var parms={
                loggerSn:index,
                staDate:timeFormattershow(this.DataHistoryTime[0]),
                endDate:timeFormattershow(this.DataHistoryTime[1])
            }  
          GetLoggerHistory(qs.stringify(parms)).then(res =>{
              console.log(res)
              console.log(parms)
              if(res.State==1){
                this.loading=false  
               this.dataHistory.push(res.Data)
              }else if(res.TotalNumber==0){
                   this.loading=false   
              }
            
          })

        }
      },
      mounted(){
                this.GetEquipment()//列表   
                this.GetGroupDataUserCode()//fenqu
                this.GetUserDataUser()
               
      }
}
</script>
<style lang="scss" scoped>

</style>
<template>
<Row>
    <Row class="headertop">
        <Col span="24">当前位置----用户管理</Col>
    </Row>
    <Row>
        <Form  :label-width="80" inline style="margin-top:20px;">
                     <FormItem label="数据时间">
                        <DatePicker type="daterange"   @on-change="Slectdata"  v-model="HandleDataTime"  format="yyyy-MM-dd"  placeholder="选择时间" style="width: 200px"  :options="disabledDate"></DatePicker>
                     </FormItem>
                    <FormItem>
                        <Button type="primary" @click="SeachOplogData" >查询</Button>
                   </FormItem>
                 
         </Form>
         <Table border :columns="columnsHandle" :data="OPerationData[0]" :loading="loading"></Table>
            <Row class="pages">
                    <Page :total="totalnameber" :page-size="pageIndex"  show-total  @on-change="pageIndexChange"></Page>
            </Row>
    </Row>
</Row>

</template>
<script>
import {GetUserNameOplogData} from '@/assets/api/api'
import{timeFormattershow}from'@/assets/js/common';
import qs from 'qs';
export default {
    data(){
      return{
          staDate:"",
          endDate:'',
          disabledDate:{
                disabledDate(time) {
                     return time.getTime() > Date.now();
                    }
               },
          loading:false,
          totalnameber:null,
          OPerationData:[],
          HandleDataTime:[],
          pageIndex:12,
          pageSize:1,
          columnsHandle:[
             {
              type:'index',
               title:'序号',
               width:120
             },
             {
               title:'操作时间',
               key:'OpTime',
               width:180
             },
             {
                title:'操作类型',
                key:'OpText',
               
             },
             {
                title:'操作类型',
                 width:150,
                 render:(h,params) =>{
                   return h("div",[
                      h('span',{
                        props:{
                           display:this.OPerationData[0][params.index].OpType== 1 
                        },
                        style:{
                         display:this.OPerationData[0][params.index].OpType==1 ? "inline-block" :'none'
                        }
                      },'修改'),
                      h('span',{
                        props:{
                            
                        },
                       style:{
                           display:this.OPerationData[0][params.index].OpType==2 ? "inline-block" :'none'
                        }
                      },'添加'),
                       h('span',{
                        props:{
                           
                        },
                        style:{
                            display:this.OPerationData[0][params.index].OpType==0 ? "inline-block" :'none'
                        }
                      },'删除'),
                   ])
                 }

             },
          ]
      }
    },
    methods:{

      Slectdata(time){
              this.staDate=time[0];
              this.endDate=time[1]
         },
        GetUserNameOplogData(){
          this.loading=true
          this.OPerationData=[]
          var params={
              pageIndex:this.pageIndex,
              pageSize:this.pageSize,
              staDate:this.staDate,
              endDate: this.endDate
          }
            GetUserNameOplogData(qs.stringify(params)).then(res=>{
                          if(res.State==1){
                             this.OPerationData.push(res.Data)
                             this.totalnameber=res.TotalNumber
                             this.loading=false
                          }else{
                               this.loading=false
                          }
            })
        },
       
        SeachOplogData(){
          this.GetUserNameOplogData()
        },
        pageIndexChange(index){
                this.pageSize=index
                this.GetUserNameOplogData()
        }
    },
    mounted(){
       this.GetUserNameOplogData()
    }
}
</script>
<style lang ='scss' scoped>

</style>

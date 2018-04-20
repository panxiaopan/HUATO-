<template>
<Row>
      <Row class="headertop">
        <Col span="24">当前位置----分区信息</Col>
      </Row>
      <Row>
          <div class='subregion'>统计中心</div>
           <Table border stripe  :columns="columnstitleStat"  :data="Informationlist" ></Table>
      </Row>
      <Row>
          <div class='subregion'>报警统计</div>
             <Form  :label-width="80" inline style="margin-top:20px">
                <FormItem label="数据时间" >
                   <DatePicker type="daterange" placeholder="起始时间" format="yyyy-MM-dd" v-model="DataTime" @on-change="validitydata"  @keyup.enter.native='Lookup'  :options="disabledDate"></DatePicker>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="Lookup" >查询</Button>
                </FormItem>
            </Form>
           <Table border stripe  :columns="columnstitleAlarm"  :data="Alarmmationlist" ></Table>
      </Row>
</Row>
</template>
<script>
import { GetStatisticalCentreGroupData,GetStatisticalCentreAlarmData } from '@/assets/api/api'
import qs from 'qs';
import{timeFormattershow,SevenDay}from'@/assets/js/common';
export default {
      data(){
          return{
              disabledDate:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
               },
              DataTime:[new Date(SevenDay(new Date())), new Date()],
              Alarmmationlist:[],
              Informationlist:[],
              columnstitleAlarm:[
                  {   type:'index',
                      title:'序号',
                      width:120,
                      align:'center',
                  },
                  {
                      title:'报警总数',
                      key:'AlarmCount'
                  },
                  {
                      title:'微信报警总数',
                      key:'WeChatAlarmCount'
                  },
                  {
                      title:'微信报警发送成功数',
                      key:'WeChatAlarmSuccessNumber'
                  },
                  {
                      title:'微信报警发送失败数',
                      key:'WeChatAlarmFailNumber'
                  },
                  {
                      title:'邮件报警总数',
                      key:'EmailAlarmCount'
                  },
                  {
                      title:'邮件报警发送成功数',
                      key:'EmailAlarmSuccessNumber'
                  },
                  {
                      title:'邮件发送失败数',
                      key:'EmailAlarmFailNumber'
                  }
              ],

               columnstitleStat:[
                   {
                        type: 'index',
                        title:"序号",
                        align: 'center',
                        width:120,
                     },
                     {
                         title:'分区数量',
                         key:'GroupNunber'
                     },
                     {
                         title:'分区用户关系数',
                         key:'GroupUserNunber' 
                     },
                     {
                         title:'分区仪器关系总数',
                         key:'GroupLoggerNunber'  
                     },
               ],
               disabledDate:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
               },
          }

      },
    methods:{
           GetCentreGroupData(){
               GetStatisticalCentreGroupData().then( res =>{
                   this.Informationlist.push(res.Data)
             })
          },
          validitydata(time){//查询时间
            this.DataTime =  time;   
            },
         GETAlarmData(){
             var parms={
                      staDate:timeFormattershow(this.DataTime[0]),
                      endDate:timeFormattershow(this.DataTime[1])

             }
             GetStatisticalCentreAlarmData(qs.stringify(parms)).then(res=>{
                    console.log(res)
                    console.log(parms)
                    if(res.State==1){
                       this.Alarmmationlist.push(res.Data)
                       this.$Message.success('Success!');
                    }
             })   
         }, 
         Lookup(){//查询
               this.GETAlarmData()
         },

        },
      mounted(){
           this.GetCentreGroupData()//统计中心
           this.GETAlarmData()//报警
      }
}
</script>
<style lang ='scss' scoped>

</style>

<template>
  <Row>
      <Row class="headertop">
        <Col span="24">当前位置----用户管理</Col>
      </Row>
       <Row style="margin-top:20px;">
          <Col span="24">
                    <Form  :label-width="100" inline>
                        <FormItem label="用户名称:" >
                            <Input v-model="userName"></Input>
                        </FormItem>
                        <FormItem label="公司名称:">
                            <Input v-model="companyName"></Input>
                        </FormItem>
                        <FormItem label="注册时间:">
                            <DatePicker @on-change="Slectdata" type="daterange" v-model="timevalue" format="yyyy-MM-dd" confirm placement="bottom-end" placeholder="选择时间" style="width: 200px" :options="disabledDate"  ></DatePicker>
                        </FormItem>
                        <FormItem >
                            <Button type="primary" @click="SeachList">查询</Button>
                        </FormItem>
                        <FormItem >
                            <Button type="primary" @click="modal1 = true" >新建</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Table border stripe  :columns="columnstitle"  :data="datauserlist[0]" :loading="loading"></Table>
            </Row>
            <Row class="pages">
                    <Page :total="totalnameber" :page-size="pageSize"  show-total  @on-change="pageIndexChange"></Page>
            </Row>
            <Row>
                <Modal
                    width=540
                    v-model="modal1"
                    title="新增与编辑用户"
                    @on-cancel="Countermand"
                    >
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" inline>
                                <FormItem label="用户名称" prop="UserName">
                                    <Input v-model="formValidate.UserName" placeholder="请输入用户名称"></Input>
                                </FormItem>
                                 <FormItem label="公司名称" prop="Ucompany">
                                    <Input v-model="formValidate.Ucompany"   placeholder="请输入公司名称"></Input>
                                </FormItem>
                              <FormItem label="真实姓名" prop="UserTrueName">
                                    <Input v-model="formValidate.UserTrueName"  placeholder="输入真实姓名"></Input>
                                </FormItem>
                                <FormItem label="联系方式" prop="UserPhone">
                                    <Input  v-model="formValidate.UserPhone"  placeholder="输入联系方式"></Input>
                                </FormItem>
                                <FormItem label="邮箱地址" prop="UserEmail">
                                    <Input v-model="formValidate.UserEmail" placeholder="输入邮箱地址"></Input>
                                </FormItem>
                                <FormItem label="密码" prop="UserPassword">
                                    <Input  v-model="formValidate.UserPassword"  placeholder="输入密码"></Input>
                                </FormItem>
                                 <FormItem label="有效期" prop="Uvalidity">
                                     <DatePicker type="date" placeholder="选择有效期" format="yyyy-MM-dd" v-model="formValidate.Uvalidity" @on-change="validitydata"  :options="UvalidityData" style="width:162px"></DatePicker>
                                </FormItem>
                                <FormItem label='使用状态'>
                                        <Select v-model="formValidate.UserState" style="width:100px" >
                                            <Option  value="1" >启用</Option>
                                            <Option  value="2" >停用</Option>
                                        </Select>
                            </FormItem>
                                <FormItem label='报警类型'>
                                        <CheckboxGroup v-model="Checkedarml" @on-change="handlechecked">
                                            <Checkbox label="1">超线</Checkbox>
                                            <Checkbox label="2">掉线</Checkbox>
                                        </CheckboxGroup>
                                </FormItem>

                                <FormItem label="使用语言" >
                                    <RadioGroup v-model="formValidate.UserLanguage">
                                        <Radio label="1">中文</Radio>
                                        <Radio label="2">英文</Radio>
                                    </RadioGroup>
                                </FormItem>
                        </Form>
                    <div slot="footer">
                            <Button type="primary"   @click="handleSubmit('formValidate')">提交</Button>
                    </div>
                </Modal> 
                 <Modal 
                 title="子用户查看"
                 v-model="Modalson"
                 width=560
                 >
                   <Table border stripe  height="400"  :columns="columnsSontitle"  :data="dataSonlist[0]" ></Table>
                 </Modal>
            </Row> 
  </Row> 
</template>
<script>
import { GetUserManageDate,AddUser,GetEditData,DeleteUserData,OneKeyNoLogin,OneKeyYesLogin,EditUser,GetUserTableManageDate} from '@/assets/api/api'
import{timeFormattershow}from'@/assets/js/common';
import qs from 'qs';
export default {
     data(){
       return{
         ruleValidate: {
                UserName: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' }
                ],
                UserEmail: [
                    { required: true, message: '输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
                ],
               Ucompany:[
                    { required: true, message: '公司名称', trigger: 'blur' }
               ],
               UserTrueName:[
                   { required: true, message: '输入真实姓名', trigger: 'blur' } 
               ],
               UserPassword:[
                   { required: true, message: '输入密码', trigger: 'blur' },
                   {pattern: /^[^\u4e00-\u9fa5]{0,}$/ , message: '不能为汉字'},
                   { type: 'string', min: 5, message: '密码不能少于5位', trigger: 'blur' }   
               ],
               UserPhone:[
                     { required: true, message: '输入电话号码', trigger: 'blur' },
                     {pattern: /^1[34578]\d{9}$/, message: '您的手机号码输入错误'}
               ],
               Uvalidity:[
                     { required: true, message: '选择有效期', trigger: 'blur' },
               ]

        },
        formValidate: {//新增用户
             UserName: '',
             UserEmail: '',
             UserLanguage:'1',
             Uvalidity:'',
             Ucompany:'',
             UserPassword:'',
             UserTrueName:'',
             UserPhone:'',
             UserState:'1',
        },
        dataSonlist:[],
        Modalson:false,
        IsAdd:true,
        Checkedarml:[],//存选中的状态
        modal1: false,
        loading:false,
        totalnameber:null,
        timevalue:'',
        userName:"",
        companyName:'',
        staDate:'',
        endDate:'',
        pageIndex:1,
        pageSize:12,
        disabledDate: {
          disabledDate(time) {
              return time.getTime() > Date.now();
          }
      },
        UvalidityData:{
          disabledDate(time) {
              return time.getTime() < Date.now();
          }
        },
        datauserlist:[],
         columnsSontitle:[
                {
                    title: '用户名称',
                    key:  'UserName'
                },
                  {
                    title: '登录密码',
                    key: 'UserPassword'
                },
                  {
                    title: '最近登录时间',
                    key: 'RecentLoginTime',
                    width:150,
                }, 
               {
                    title: '登录统计',
                    key: 'LoginStatistics'
                }, 
                 {
                    title: '操作',
                    render: (h, params) => {
                        return h('div', [ 
                            h('Button', {
                            props: {
                                size: 'small'
                            },
                            style: {
                                // display: this.datauserlist[0][params.index].UserState != 2 ? 'inline-block' : 'none'
                                // disabled:this.datauserlist[0][params.index].SubordinateUsers = 0  ? 'false' : 'true'
                            },
                            on: {
                                click: () => {
                                    // this.keyban(this.datauserlist[0][params.index].UserGuid)  
                                        this.DeleSonlist(this.datauserlist[params.index].UserGuid)
                                }
                            }
                        }, '物理删除'),
                        ]);
                     }
                },

                
         ],

          columnstitle:[
                     {
                        type: 'index',
                        title:"序号",
                        align: 'center',
                     },
                     {
                          title: '用户名称',
                          key: 'UserName'
                      },
                      {
                          title: '公司名称',
                          key: 'Ucompany'
                      },
                      {
                          title: '联系方式',
                          key: 'UserPhone'
                      },
                      {
                          title: '有效期',
                          key: 'Uvalidity'
                      },
                      {
                          title: '注册日期',
                          key: 'UrecordDate',
                          width:150,
                      },
                      {
                          title: '下属用户统计',
                          //key: 'SubordinateUsers',
                          width: 150,
                           render: (h, params) => {
                              return h('div', [ 
                                  h('Button', {
                                    props: {
                                        size: 'small',
                                        disabled:Boolean(this.datauserlist[0][params.index].SubordinateUsers == 0  ? true : false)
                                    },
                                    style: {
                                       // display: this.datauserlist[0][params.index].UserState != 2 ? 'inline-block' : 'none'
                                      // disabled:this.datauserlist[0][params.index].SubordinateUsers = 0  ? 'false' : 'true'
                                    },
                                    on: {
                                        click: () => {
                                              console.log(this.datauserlist[0][params.index].SubordinateUsers)
                                            // this.keyban(this.datauserlist[0][params.index].UserGuid)  
                                              this.lookover(this.datauserlist[0][params.index].UserGuid)
                                        }
                                    }
                                }, this.datauserlist[0][params.index].SubordinateUsers),
                              ]);
                             }
                      },
                      {
                          title: '最近登录时间',
                          key: 'RecentLoginTime',
                      },
                      {
                          title: '登录统计',
                          key: 'LoginStatistics'
                      },
                        {
                          title: '用户密码',
                          key: 'UserPassword'
                        },
                      {
                          title: '登录状态',
                          key: 'UserState',
                          width: 100,
                          render:(h,params)=>{
                              return h('div',[
                                  h('span',{
                                      props:{
                                        
                                      }
                                  },this.datauserlist[0][params.index].UserState != 1 ? '停用' : '启用')
                              ])
                          }
                        },
                      {
                          title: '操作',
                          width: 280,
                          render: (h, params) => {
                            return h('div', [
                                   h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '15px',
                                        display: this.datauserlist[0][params.index].UserState != 2 ? 'inline-block' : 'none'
                                    },
                                    on: {
                                        click: () => {
                                             this.keyban(this.datauserlist[0][params.index].UserGuid)  
                                        }
                                    }
                                }, '一键禁止'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '15px',
                                        display: this.datauserlist[0][params.index].UserState == 2 ? 'inline-block' : 'none'
                                    },
                                    on: {
                                        click: () => {
                                             this.recoverkeyban(this.datauserlist[0][params.index].UserGuid)  
                                        }
                                    }
                                }, '恢复使用'),  
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '15px'
                                    },
                                    on: {
                                        click: () => {
                                            this.IsAdd=false;
                                            this.modal1=true;
                                            this.information(this.datauserlist[0][params.index].UserGuid)
                                        }
                                    }
                                  }, '信息修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                           this.Daleteuser(this.datauserlist[0][params.index].UserGuid) 
                                        }
                                    }
                                  }, '物理删除')
                               ]);
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
         GetUserManageDatelist(){//列表请求
              this.loading=true;
              this.datauserlist=[];
             var parms={
                    userName:this.userName,
                    companyName:this.companyName,
                    staDate:this.staDate,
                    endDate:this.endDate,
                    pageIndex:this.pageIndex,
                    pageSize:12,
                    
              }
            GetUserManageDate(qs.stringify(parms)).then(res=>{
                 if(res.State==1){
                    this.datauserlist.push(res.Data)
                    this.totalnameber=res.TotalNumber
                    this.loading=false;
                    console.log(this.datauserlist)
                 }
            })
            },
            SeachList(){//点击查询
                this.GetUserManageDatelist()
            },
            pageIndexChange(pages){//翻页点击
                this.pageIndex=pages
                this.GetUserManageDatelist()    
            },
            handleSubmit (name) {
                    var params={
                        user:this.formValidate
                    }
                    if(this.IsAdd){
                        console.log(params)
                            this.$refs[name].validate((valid) => {
                                if (valid) {  
                                AddUser(params).then(res=>{
                                    console.log(res)
                                        if(res.State==1){
                                          this.modal1=false;
                                          this.GetUserManageDatelist()
                                          this.$Message.success('Success!');
                                        } else if(res.State==3){
                                            this.$Message.error('用户已存在!');
                                        }      
                                })
                                } else {
                                    this.$Message.error('提交失败!');
                                }
                            })
                    }else{   
                          //编辑的时候时间没有转换   需要把标准时间转换一下
                          this.formValidate.Uvalidity=timeFormattershow(this.formValidate.Uvalidity)     
                          this.$refs[name].validate((valid) => {
                               
                                if (valid) {  
                                EditUser(params).then(res=>{
                                        if(res.State==1){
                                          this.modal1=false;
                                          this.GetUserManageDatelist()
                                          this.$Message.success('Success!');
                                        }     
                                 })
                                } else {
                                    this.$Message.error('提交失败!');
                                }
                            })
                    }


            },
            validitydata(validity){//新增时候的有效期
            this.formValidate.Uvalidity=  validity;    
            },
            handlechecked(valval){//t添加时候的报警类型
            this.Checkedarml=valval
                switch(Number(valval)){
                        case 1:
                            this.formValidate.AlarmType=1;
                            break;
                        case 2:
                            this.formValidate.AlarmType=2;
                    }
                    if (this.Checkedarml.length == 2) {
                        this.formValidate.AlarmType=3;
                    }else if(this.Checkedarml.length==0){
                        this.formValidate.AlarmType=0;
                    }
                console.log(this.formValidate.AlarmType)
            },
        Countermand(){//取消时候清空验证
             this.$refs['formValidate'].resetFields();
        },
        recoverkeyban(index){//恢复使用
                var parms={
                        userGuid:index
                    }
                    OneKeyYesLogin(qs.stringify(parms)).then(res=>{
                        if(res.State==1){
                            this.$Message.success('Success!');
                            this.GetUserManageDatelist()
                        }
             })  
        },
        keyban(index){
                var parms={
                        userGuid:index
                    }
            OneKeyNoLogin(qs.stringify(parms)).then(res=>{
                        if(res.State==1){
                            this.$Message.info('禁止成功')
                            this.GetUserManageDatelist()
                        }

             })   
        },
        information(index){//信息编辑
            var parms={
                    userId:index
            }                            
            GetEditData(qs.stringify(parms)).then(res =>{
                    this.formValidate.Ucompany=res.Data.Ucompany;
                    this.formValidate.UserEmail=res.Data.UserEmail;
                    this.formValidate.UserLanguage=String(res.Data.UserLanguage);
                    this.formValidate.UserName=res.Data.UserName;
                    this.formValidate.UserPassword=res.Data.UserPassword;
                    this.formValidate.UserPhone=res.Data.UserPhone;
                    this.formValidate.UserTrueName=res.Data.UserTrueName;
                    this.formValidate.Uvalidity=res.Data.Uvalidity;
                    this.formValidate.AlarmType=res.Data.AlarmType;
                    this.formValidate.UserState=String(res.Data.UserState)
                    switch(res.Data.AlarmType){//报警时候的选中显示,
                    case'1':
                        this.Checkedarml=['1'] 
                        break;
                    case'2':
                        this.Checkedarml=['2'] 
                        break;
                    case'3':
                        this.Checkedarml=['1','2']
                        break;
                    }            
            })

        },
        Daleteuser(index){//删除
                var parms={
                    userGuid:index
                }
              this.$Modal.confirm({
                    title: '提示',
                    content: '确定删除吗?',
                    onOk: () => {
                    DeleteUserData(qs.stringify(parms)).then(res=>{
                            if(res.State==1){
                                this.$Message.info('删除成功')
                                this.GetUserManageDatelist()
                            }
                        })
                    },
                    onCancel: () => {
                        this.$Message.info('取消');
                    }
                });
        },
        lookover(index){//查看子用户
                 var parms={
                    userGuid:index
                }
                   GetUserTableManageDate(qs.stringify(parms)).then(res=>{
                        console.log(res)
                        if(res.State==1){ 
                           this.Modalson=true; 
                           this.dataSonlist.push(res.Data)
                        }
                })
        },
        DeleSonlist(index){
             var parms={
                    userGuid:index
                }
                DeleteUserData(qs.stringify(parms)).then(res=>{
                        if(res.State==1){
                            this.$Message.info('删除成功')
                            this.lookover()
                        }
                })
        },
        
     },
     mounted(){
         this.GetUserManageDatelist()//列表请求
         
     }
}
</script>
<style lang ='scss' scoped>

</style>

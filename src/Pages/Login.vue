<template>
    <Row class="loginpng" style="height:100%">

        <Form ref="formInline" :model="formInline" :rules="ruleInline"  class="Fromstyle">
            <FormItem>
               <div style="font-size:20px;text-align:center"><strong>华图售后管理系统</strong></div> 
            </FormItem>
            <FormItem prop="userName">
                <Input type="text" v-model="formInline.userName" placeholder="用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="userPwd">
                <Input type="password" v-model="formInline.userPwd" placeholder="密码" @keyup.enter.native="handleSubmit('formInline')">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" long @click="handleSubmit('formInline')" >登录</Button>
            </FormItem>
        </Form>
    </Row>
</template>
<script>
import { UserLogin } from '@/assets/api/api';
 import {getIp} from '@/assets/js/getIp';
 import axios from 'axios';
 import qs from 'qs';
    export default {
        data () {
            return {
                formInline: {
                    userName: '',
                    userPwd: '',
                    userIp: ''
                },
                ruleInline: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    userPwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 5, message: '密码不能少于5位', trigger: 'blur' }   
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                let user = { name :this.formInline.userName}
                this.$refs[name].validate((valid) => {
                    if (valid) {
                       UserLogin(qs.stringify(this.formInline)).then(res =>{
                           if(res.State == 1){
                                console.log(res)
                                sessionStorage.setItem('user', JSON.stringify(user)); 
                                this.$router.push('/Home')
                                this.$Message.success('登录成功!');
                           } 
                       })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        },
         mounted() {
      // 获取真实ip
            getIp((ip) => {
                this.formInline.userIp = ip;
                })
      }
    }
</script>
<style>
    .loginpng{
        
         background: url(../assets/img/login.jpg);
 
    }
    .Fromstyle{
      margin: 0 auto;
      width: 300px;
      height: 200px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -150px;
      margin-top: -100px;
    }
</style>


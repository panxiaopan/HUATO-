
<template>
    <div class="layout UserManage">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu  theme="dark" width="auto" @on-select='changeRouter' :class="menuitemClasses" :active-name="$route.path" >
                    <MenuItem name="/Home">
                      <Icon type="person"></Icon>
                        <span>用户管理</span>
                    </MenuItem>
                    <MenuItem name="/Information" >
                        <Icon type="ios-keypad-outline"></Icon>
                        <span>统计中心</span>
                    </MenuItem>
                    <MenuItem name="/EquipmentManagement">
                       <Icon type="ios-cog"></Icon>
                        <span>仪器管理</span>
                    </MenuItem>
                   <MenuItem name="/Operation">
                        <Icon type="clipboard"></Icon>
                        <span>操作日志</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon>
                     <span style="float: right;display: inline-block;font-size: 16px;padding-right: 40px;">欢迎您 {{Username}}<Button type="primary" style="margin-left:20px;" @click="Exit">退出</Button></span>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                isCollapsed: false,
                Username:'',
            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },
            changeRouter (route) {//点击配相应的路由界面
                this.$router.push(route)
            },
            Exit () {
                this.$Modal.confirm({
                    title: '提示',
                    content: '确定退出吗?',
                    onOk: () => {
                         sessionStorage.removeItem('user');
                         this.$router.push('/Login');
                    },
                    onCancel: () => {
                        this.$Message.info('取消');
                    }
                });
            },
            
        },
       mounted(){
           let user = JSON.parse(sessionStorage.getItem('user'));
           this.Username=user.name
       }
    }
</script>
<style  lang="scss" scoped>
    .ivu-layout{
      height: 100%;
    }
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 100%;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }

</style>
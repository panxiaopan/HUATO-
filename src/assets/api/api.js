import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = "/";


//登录接口
export const UserLogin = (params) => { 
    return axios
        .post('/FunctionOperationManage/UserLogin', params)
        .then(res => res.data)
    };
//用户管理数据
export const GetUserManageDate = (params) => { 
    return axios
        .post('/FunctionOperationManage/GetUserManageDate', params)
        .then(res => res.data)
    };
//用户管理新增接口
export const AddUser = (params) => { 
    return axios
        .post('/FunctionOperationManage/AddUser', params)
        .then(res => res.data)
    };
//用户编辑接口穿对应的id
export const GetEditData = (params) => { 
    return axios
        .post('/FunctionOperationManage/GetEditData', params)
        .then(res => res.data)
    };
   //用户管理-删除
   export const DeleteUserData = (params) => { 
    return axios
        .post('/FunctionOperationManage/DeleteUserData', params)
        .then(res => res.data)
    }; 
//一键禁止
export const OneKeyNoLogin = (params) => { 
    return axios
        .post('/FunctionOperationManage/OneKeyNoLogin', params)
        .then(res => res.data)
    }; 
//禁止恢复
export const OneKeyYesLogin  = (params) => { 
    return axios
        .post('/FunctionOperationManage/OneKeyYesLogin ', params)
        .then(res => res.data)
    };
//用户编辑提交接口
export const EditUser  = (params) => { 
    return axios
        .post('/FunctionOperationManage/EditUser', params)
        .then(res => res.data)
    };
    //用户管理得到子用户数据
    export const GetUserTableManageDate  = (params) => { 
        return axios
            .post('/FunctionOperationManage/GetUserTableManageDate', params)
            .then(res => res.data)
        };
//统计中心统计接口
export const GetStatisticalCentreGroupData  = () => { 
    return axios
        .get('/FunctionOperationManage/GetStatisticalCentreGroupData')
        .then(res => res.data)
    };
//报警统计
export const GetStatisticalCentreAlarmData  = (params) => { 
    return axios
        .post('/FunctionOperationManage/GetStatisticalCentreAlarmData',params)
        .then(res => res.data)
    };
 //得到仪器管理数据接口
 export const GetLoggerManageData  = (params) => { 
    return axios
        .post('/FunctionOperationManage/GetLoggerManageData',params)
        .then(res => res.data)
    };
//归纳弹框右侧接口
export const GetGroupDataUserCode  = (params) => { 
    return axios
        .post('/FunctionOperationManage/GetGroupDataUserCode',params)
        .then(res => res.data)
    };
//归纳弹框左侧
export const GetUserDataUser  = (params) => { 
    return axios
        .post('/FunctionOperationManage/GetUserDataUser',params)
        .then(res => res.data)
    };
//仪器归纳整理接口
export const LoggerInductiveArrangement  = (params) => { 
    return axios
        .post('/FunctionOperationManage/LoggerInductiveArrangement',params)
        .then(res => res.data)
    };

//仪器回复使用接口
export const LoggerRestoreUse  = (params) => { 
    return axios
        .post('/FunctionOperationManage/LoggerRestoreUse',params)
        .then(res => res.data)
    };
    //获得仪器历史数据接口
 export const GetLoggerHistory = (params) =>{
     return axios
     .post('/FunctionOperationManage/GetLoggerHistory',params)
     .then(res => res.data)
 };
 //操作日志管理接口
 export const GetUserNameOplogData = (params) =>{
    return axios
    .post('/FunctionOperationManage/GetUserNameOplogData',params)
    .then(res => res.data)
};
//验证mac的接口


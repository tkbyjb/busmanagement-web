
export default function(state) {
    const states = [
        {state:0, mess: '系统错误,操作失败', type:'error'},
        {state:1, mess: '操作成功', type:'success'},
        {state:-1, mess: '某字段值要求唯一,重复了', type:'error'},
        {state:-2, mess: '密码或用户名错误', type:'error'},
        {state:-3, mess: '验证码错误', type:'error'},
        {state:-4, mess: '用户名已存在', type:'error'},
        {state:-5, mess: '创建人不存在', type:'error'},
        {state:-6, mess: '负责人不存在', type:'error'},
        {state:-7, mess: '类型名已经存在', type:'error'},
        {state:-8, mess: '角色名已经存在', type:'error'},
        {state:-9, mess: '领用人用户不存在', type:'error'},
        {state:-10, mess: '审核人用户名对应用户不存在', type:'error'},
        {state:-11, mess: '上传文件为空', type:'error'},
        {state:-12, mess: '角色不存在', type:'error'},
        {state:-13, mess: '请先登录', type:'error'},
        {state:-14, mess: '没有权限访问', type:'error'},
    ];
    for(let i=0;i<states.length;i++){
        if(state == states[i].state){
            return states[i]
        }
    }
    return null;
}

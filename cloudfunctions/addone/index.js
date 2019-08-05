// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const ename = event.ename;
  const isJoin = event.isJoin;
 // 添加之前先检查 是否有重名的情况 如果有则不添加
  var emp = await db.collection('emps')
    .where({
      ename: ename, // 只选择参加的人数
    }).count()
  if (emp.total == 0){
    var res = await db.collection("emps").add({
      data: {
        // 员工姓名， 是否参加，添加时间
        ename, isJoin, addTime: new Date().getTime()
      }
    });
    
  }else{
    var res = await db.collection("emps").where({ename}).update({data:{isJoin}})
  }
  return {
    res
  }
}
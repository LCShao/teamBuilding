// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const ename = event.ename;
  const isJoin = event.isJoin;
  const shortName = event.shortName;
// 添加之前先检查 是否是同一个微信昵称 只能用自己的微信给自己报名
  var sname = await db.collection('emps')
    .where({
      shortName: shortName, // 在数据库中搜索同微信昵称的记录
    }).count()
  var emp = await db.collection('emps')
    .where({
      ename: ename, // 在数据库中搜索同名的记录
    }).count()
  if (sname.total == 0){
    // 再检查 是否有重名的情况(防止两个微信号 重复报名) 如果有则更新
    if (emp.total == 0) {
      var res = await db.collection("emps").add({
        data: {
          // 员工姓名， 是否参加，添加时间，昵称
          ename, isJoin, shortName, addTime: new Date().getTime()
        }
      });
    } else {
      var res = await db.collection("emps").where({ ename }).update({ data: { isJoin } })
    }
    return {
      res
    }
  }else{
    // 如果微信昵称已存在 在添加就会提示
    if (emp.total == 0) {
      var res = { _id: -1, errMsg: "不能重复报名!" }
      return {
        res
      }
    }else{
      var res = await db.collection("emps").where({ ename }).update({ data: { isJoin } })
      return {
        res
      }
    } 
  } 
}
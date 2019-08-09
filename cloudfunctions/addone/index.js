// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const ename = event.ename;
  const phoneNo = event.phoneNo;
  const isJoin = event.isJoin;
  // const shortName = event.shortName;
// 添加之前先检查 是否是同一个手机号 只能用自己的微信给自己报名
  var phoneCount = await db.collection('emps')
    .where({
      phoneNo: phoneNo, 
    }).count()

  if (phoneCount.total == 0){
    // 手机号已经有则更新 没有则添加
    var res = await db.collection("emps").add({
      data: {
        // 员工姓名，手机号， 是否参加，添加时间，昵称
        ename, phoneNo, isJoin, addTime: new Date().getTime()
      }
    });
    }else{
      // 如果手机号已存在 覆盖原有记录
      var res = await db.collection("emps").where({ phoneNo }).update({ data: { isJoin , ename} })
    }
    return {
      res
    }
  }
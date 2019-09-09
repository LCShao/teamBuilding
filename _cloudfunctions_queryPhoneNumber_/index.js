// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const phoneNo = event.phoneNo;
  var no = await db.collection('emps').where({
    phoneNo:phoneNo
  }).count()
  console.log("Que数量"+no)
  return no;
}
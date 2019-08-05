// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var Tp = await db.collection('emps')
    .where({
      isJoin: true, // 只选择参加的人数
    })
    .count() 
  var Fp = await db.collection('emps')
    .where({
      isJoin: false, // 只选择不参加的人数
    })
    .count()
  // console.log(Tp.total, Fp.total)
  return {Tp:Tp.total, Fp:Fp.total}
}
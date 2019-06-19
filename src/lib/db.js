const { axios, DEV } = require('./axios');
/**
*   @database: { 接口管理 }
*   @desc:     { 批量中国金币抽签产品列表 } 
	以下参数在建立过程中与系统保留字段冲突，已自动替换:
	@desc:批量插入数据时，约定使用二维数组values参数，格式为[{goods_name,url }]，数组的每一项表示一条数据*/
module.exports.addSampleChinagoldcoin = (values) =>
  axios({
    method: 'post',
    data: {
      values,
      id: 88,
      nonce: 'ed1e1f2554'
    }
  });

/** NodeJS服务端调用：
 *
 *   @database: { 接口管理 }
 *   @desc:     { 获取金币抽签产品列表 }
 */
module.exports.getSampleChinagoldcoin = () =>
  DEV
    ? mock(require('./mock/89_5d2a41ff42.json'))
    : axios({
        url: '/89/5d2a41ff42.json'
      });

/** NodeJS服务端调用：
*
*   @database: { 接口管理 }
*   @desc:     { 更新抽签信息 } 
	以下参数在建立过程中与系统保留字段冲突，已自动替换:
	@id:_id. 参数说明：api 索引序号
    const { total_num, price, winner, _id } = params;
*/
module.exports.setSampleChinagoldcoin = (params) =>
  axios({
    url: '/90/1b78067af6.json',
    params
  });

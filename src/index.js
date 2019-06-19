const cheerio = require('cheerio');
const axios = require('axios');
const db = require('./lib/db');

// 获取商品列表
const getGoodsList = async () => {
  let html = await axios
    .get('http://yding.chinagoldcoin.net/')
    .then((res) => res.data);
  const $ = cheerio.load(html);
  let items = $('.history_reserve .item .tit a');

  let goods = [];
  items.each((idx, item) => {
    goods.push({
      goods_name: $(item).text(),
      url: $(item).attr('href')
    });
  });
  console.log(goods);
  db.addSampleChinagoldcoin(goods);
};

const getGoodsDetail = async () => {
  let { data: res } = await db.getSampleChinagoldcoin();
  for (let i = 0; i < res.length; i++) {
    console.log(res[i]);
    await handleGoods(res[i]);
    console.log(`第${i}/${res.length}件商品处理完毕`);
  }
};

const handleGoods = async ({ url, id: _id }) => {
  if (!url.includes('http')) {
    url = 'http://yding.chinagoldcoin.net' + url;
  }
  let html = await axios.get(url).then((res) => res.data);
  const $ = cheerio.load(html);

  let winner = $('.describe p')
    .text()
    .match(/抽取(\d+)个|抽取(\d+)名/g)[0]
    .replace(/抽取|个|名/g, '');
  let total_num = $('.num')
    .text()
    .trim();
  let price = $('.price span')
    .last()
    .text();
  let params = { winner, total_num, price, _id };
  console.log(params);
  await db.setSampleChinagoldcoin(params);
};

getGoodsDetail();

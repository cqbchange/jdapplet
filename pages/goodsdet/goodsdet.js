// pages/goodsdet/goodsdet.js
var WxParse = require('../../wxParse/wxParse.js');
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    //轮播
    circular: false,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    title: '商品详情',
    //选中商品样式
    chegoodstyle: "",
    block: "block",
    pagename: "goodsdet",
    //商品数据
    goodslist: {},
    sku: [],
    color: [],
    allnum: 1,
    //商品id
    goodid: 0,
    //选择的商品参数
    checkgoods: "",
    checkaddress: "",
    point: 3,
    skudh: false,
    //单价
    nowpageprice: 0,
    //总金额
    allprice: 0,
    chegoodscombo: 0,
    //富文本
    info: "",
    //sku选择的空数组
    skunull: [],
    //父级id
    ac: "",
  },
  //加入购物车
  addshopcar() {
    let than = this
    wx.getStorage({
      key: "token",
      success(res) {
        wx.request({
          url: 'http://api_devs.wanxikeji.cn/api/shoppingCarAddModify',
          method: "post",
          data: {
            token: res.data,
            good_id: than.data.goodid,
            num: than.data.allnum,
            price: Number(than.data.nowpageprice),
            money: Number(than.data.allprice),
            sku: String(than.data.checkgoods),
          },
          success(ress) {
            wx.showModal({
              title: ress.data.msg
            })
          }
        })
      }
    })

  },
  //地址选择
  chooseadd() {
    let _this = this
    wx.getLocation({
      type: "wg84",
      success(res) {
        wx.chooseLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          success(ress) {
            _this.setData({
              checkaddress: ress.address
            })
          }
        })
      }
    })
  },
  //立即购买
  atonsebuy() {
    wx.navigateTo({
      url: '/pages/confirmorder/confirmorder',
    })
  },
  //数量加
  numjia() {
    this.setData({
      allnum: this.data.allnum += 1,
    })
    this.conputprice();
  },
  //数量减
  numjian() {
    if (this.data.allnum >= 2) {
      this.setData({
        allnum: this.data.allnum -= 1,
      })
      this.conputprice();
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //轮播
    changeProperty: function (e) {
      var propertyName = e.currentTarget.dataset.propertyName
      var newData = {}
      newData[propertyName] = e.detail.value
      this.setData(newData)
    },
    changeIndicatorDots: function (e) {
      this.setData({
        indicatorDots: !this.data.indicatorDots
      })
    },
    changeAutoplay: function (e) {
      this.setData({
        autoplay: !this.data.autoplay
      })
    },
    intervalChange: function (e) {
      this.setData({
        interval: e.detail.value
      })
    },
    durationChange: function (e) {
      this.setData({
        duration: e.detail.value
      })
    },

  },
  //选择商品规格
  ordergood(e) {
    console.log(this.data.sku.skuList);
    let id = e.currentTarget.dataset.id
    this.data.skunull[id] = e.currentTarget.dataset.name
    this.setData({
      skunull: this.data.skunull
    })
    console.log(this.data.skunull);
    this.data.sku.skuList.forEach((ele, ind) => {
      let re = this.data.skunull.every((elem)=>{
        return ele.specs.indexOf(elem) != -1
      })
      if (re) {
        this.setData({
          chegoodscombo: ind,
          nowpageprice: ele.specs.slice(-1),
          allprice: ele.specs.slice(-1),
          checkgoods: ele.specs,
        })
      }
    });

  },
  //套餐选择
  ordercombo(e) {
    console.log(e.currentTarget.dataset);
    this.setData({
      nowpageprice: e.currentTarget.dataset.name.slice(-1),
      allprice: e.currentTarget.dataset.name.slice(-1),
      checkgoods: e.currentTarget.dataset.name,
      chegoodscombo: e.currentTarget.dataset.index
    })
  },
  //展开商品规格
  chusgoodsgge() {
    this.setData({
      skudh: !this.data.skudh
    })
  },
  //关闭展开商品规格
  close() {
    this.setData({
      skudh: !this.data.skudh
    })
  },
  //计算价格函数
  conputprice() {
    let than = this
    than.setData({
      allprice: than.data.nowpageprice * than.data.allnum
    })
  },
  onLoad() {
    let than = this
    //接收商品id
     const eventChannel = this.getOpenerEventChannel()
     //上一个页面定义的名字
     eventChannel.on('goodsid', function(data) {
    wx.request({
      url: 'http://api_devs.wanxikeji.cn/api/goodInfo',
      method: "post",
      data: {
        good_id: data.data,
      },
      success(res) {
        console.log(res);
        console.log(res.data.data.info[0].imgs);
        let a = JSON.parse(res.data.data.info[0].imgs)
        // console.log(typeof a);
        console.log(a);
        if (typeof a == "object") {
          res.data.data.info[0].imgs = a
        } else {
          res.data.data.info[0].imgs = a.split(",")
        }
        let obj = JSON.parse(res.data.data.good_name)
        if (typeof (obj) == "object") {
          res.data.data.good_name = JSON.parse(res.data.data.good_name).name
        }
        let sku = JSON.parse(res.data.data.info[0].edition)
        let spu = JSON.parse(res.data.data.info[0].colour)
        let info = JSON.parse(res.data.data.info[0].info)
        than.setData({
          nowpageprice: JSON.parse(sku).skuList[0].specs.slice(-1),
          goodslist: res.data.data,
          sku: JSON.parse(sku),
          goodid:data.data,
          color: spu,
          info: info,
          allprice: JSON.parse(sku).skuList[0].specs.slice(-1),
          checkgoods: JSON.parse(sku).skuList[0].specs
        })
        than.data.sku.specList.forEach((ele) => {
          than.data.skunull.push(null)
        });
        console.log(than.data.skunull);
        WxParse.wxParse('info', 'html', than.data.info, than, 5);
        than.conputprice();
      }
    })
     })
  }
})
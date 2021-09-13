// pages/fenlei/index.js
Page({
  userInfo: {},
  /**
   * 页面的初始数据
   */
  data: {
    title: '购物车',
    classfil: [], //一级
    text: '12',
    token: "",
    addressid: "",
    isSelect: 0,
    isshow: true,
    action: false,
    addres: '',
    addressData: true,
    shaddlist: [],
    cityData: false,
    procinceindex: -1, //选择标红 
    procinceindex1: -1, //选择标红 
    procinceindex2: -1, //选择标红 
    province: [], //省
    province1: [], //市
    province2: [], //区
    selectp: '', //请选择
    selectp1: '', //请选择
    selectp2: "请选择",
    sctive: [],
    pData: true,
    cData: false,
    xData: false,
    // ============
    ccData: false,
    xcData: true,
    pcData: false,
    // ===========
    pindex: false,
    cindex: false,
    xindex: true,
    pcxarr: [],
    //选择的整条地址
    wholeadd: "",
    // items: [
    //   {value: 'USA', name: '美国',num:1 ,price:321443},
    //   {value: 'CHN', name: '中国',num:1, price:32434},
    //   {value: 'BRA', name: '巴西',num:1, price:23546},
    //   {value: 'JPN', name: '日本',num:1,price:2435},
    //   {value: 'ENG', name: '英国',num:1,price:2145},
    //   {value: 'FRA', name: '法国',num:1,price:2314}
    // ],
    items: [],
    select_all: false, //反选
    nums: 0, //总计
    price: 0, //价格
    checkboxall: false, //全选
    inputnum: 1,
    // chcheckboxall:false
    compiles: true, //编辑
    //结算的所有商品
    paygooddata: [],
    //token
    token: "",
  },
  //

  //地址点击
  address() {
    this.setData({
      action: true,
    })
  },
  //选择送货地址
  chuseadd(e) {
    console.log(e);
    this.setData({
      addressid: e.currentTarget.dataset.id,
      addres: e.currentTarget.dataset.name.area,
      wholeadd: e.currentTarget.dataset.name,
      action: false
    })
  },
  //地址取消
  detele() {
    this.setData({
      action: false
    })
  },
  //选择其他地址
  elseaddress() {
    this.setData({
      addressData: false,
      cityData: true,
      province: this.data.province
    })
  },
  //返回
  goback() {
    this.setData({
      addressData: true,
      cityData: false,
    })
  },
  //城市点击事件clickprocince procinceindex
  clickprocince(e) {
    this.fngong(e.currentTarget.dataset['index'])

    // arr.push('请选择')
    this.setData({
      procinceindex: e.currentTarget.dataset['index'],
      selectp: e.currentTarget.dataset.bean.name,
      pData: false,
      cData: true,
      // pcxarr:arr,
      selectp1: '',
      pindex: false,
      cindex: false,
      xindex: true,
      pcData: true
    })
  },
  //区点击事件clickprocince procinceindex
  clickprocince1(e) {
    let arr = []
    arr.push(e.currentTarget.dataset.bean.name)
    this.fngong1(this.data.procinceindex, e.currentTarget.dataset['index'])
    // arr.push('请选择')
    this.setData({
      procinceindex1: e.currentTarget.dataset['index'],
      selectp1: e.currentTarget.dataset.bean.fullname,
      pData: false,
      cData: false,
      xData: true,
      ccData: true,
      pindex: false,
      cindex: false,
      xindex: true,
      pcxarr: this.data.pcxarr
    })
  },
  // 县
  clickprocince2(e) {
    let add = this.data.selectp + this.data.selectp1 + e.currentTarget.dataset.bean.fullname
    this.setData({
      procinceindex2: e.currentTarget.dataset['index'],
      selectp2: e.currentTarget.dataset.bean.fullname,
      addres: add,
      action: false,
      procinceindex: -1, //选择标红 
      procinceindex1: -1, //选择标红 
      procinceindex2: -1, //选择标红 
      // province:[],//省
      province1: [], //市
      province2: [], //区
      selectp: '', //请选择
      selectp1: '', //请选择
      selectp2: "请选择",
      sctive: [],
      pData: true,
      cData: false,
      xData: false,
      ccData: false,
      xcData: true,
      pcData: false,
      pcxarr: []
    })
  },
  //省
  fngong(a) {
    // 引入SDK核心类C:\Users\Master\Desktop\weixin\jdapplet\utils\qqmap-wx-jssdk.js
    let QQMapWX = require('../../utils/qqmap-wx-jssdk.min');

    // 实例化API核心类
    let qqmapsdk = new QQMapWX({
      key: 'A5WBZ-GUFEJ-3QHF7-K4WVF-RCHKJ-JKBXP' // 必填
    });
    //在Page({})中使用下列代码 
    //页面显示/切入前台时触发
    let _this = this;
    //调用获取城市列表接口
    qqmapsdk.getCityList({
      success: function (res) { //成功后的回调
        var city = res.result[0];
        //根据对应接口getCityList返回数据的Id获取区县数据（以北京为例） 
        qqmapsdk.getDistrictByCityId({
          // 传入对应省份ID获得城市数据，传入城市ID获得区县数据,依次类推
          id: city[a].id, //对应接口getCityList返回数据的Id，如：北京是'110000'
          success: function (res) { //成功后的回调
            // _this.data.province=res.result[0]
            _this.setData({
              province1: res.result[0]
            })
          },
          fail: function (error) {
            console.error(error);
          },
          complete: function (res) {
            return res.result[0]
          }
        });
      },
    });
  },
  //市
  fngong1(a, b) {
    // 引入SDK核心类C:\Users\Master\Desktop\weixin\jdapplet\utils\qqmap-wx-jssdk.js
    let QQMapWX = require('../../utils/qqmap-wx-jssdk.min');

    // 实例化API核心类
    let qqmapsdk = new QQMapWX({
      key: 'A5WBZ-GUFEJ-3QHF7-K4WVF-RCHKJ-JKBXP' // 必填
    });
    //在Page({})中使用下列代码 
    //页面显示/切入前台时触发
    let _this = this;
    //调用获取城市列表接口
    qqmapsdk.getCityList({
      success: function (res) { //成功后的回调
        var city = res.result[0];
        //根据对应接口getCityList返回数据的Id获取区县数据（以北京为例） 
        qqmapsdk.getDistrictByCityId({
          // 传入对应省份ID获得城市数据，传入城市ID获得区县数据,依次类推
          id: city[a].id, //对应接口getCityList返回数据的Id，如：北京是'110000'
          success: function (res) { //成功后的回调
            var city1 = res.result[0]
            qqmapsdk.getDistrictByCityId({
              id: city1[b].id,
              success: function (res) {
                _this.setData({
                  province2: res.result[0]
                })
              }
            })
          },
          fail: function (error) {
            console.error(error);
          },
          complete: function (res) {
            return res.result[0]
          }
        });
      },
    });
  },
  //返回选择省
  clickp() {
    this.setData({
      pindex: true,
      cindex: false,
      xindex: false,
      // ====
      pData: true,
      cData: false,
      xData: false,
    })
  },
  clickc() {
    this.setData({
      pindex: false,
      cindex: true,
      xindex: false,
      // ====
      pData: false,
      cData: true,
      xData: false,
    })
  },
  clickx() {
    this.setData({
      pindex: false,
      cindex: false,
      xindex: true,
      //===
      pData: false,
      cData: false,
      xData: true,
    })
  },

  //全选按钮
  selectall(e) {
    let _this = this
    let arr = []
    let num = 0
    let price = 0
    if (this.data.checkboxall == true) {
      this.data.checkboxall = false
      // _this.setData({
      //   paygooddata: []
      // })
      for (let i = 0; i < _this.data.items.length; i++) {
        _this.data.items[i].checked = this.data.checkboxall
      }
      _this.data.items.forEach(ele => {
        ele.checked = false
      });
    } else {
      this.data.checkboxall = true
      for (let i = 0; i < _this.data.items.length; i++) {
        _this.data.items[i].checked = this.data.checkboxall
        num += _this.data.items[i].num
        price += _this.data.items[i].num * _this.data.items[i].price
      }
      _this.data.items.forEach(ele => {
        ele.checked = true
      });
      // _this.setData({
      //   paygooddata: _this.data.items
      // })
    }
    let checkboxalls = this.data.checkboxall
    arr = _this.data.items
    _this.setData({
      items: arr,
      nums: num,
      price: price,
      checkboxall: checkboxalls,
    })
  },
  //单选校验全选
  select(e) {
    let i = e.currentTarget.dataset['index']
    let arr = []
    let num = 0
    let price = 0
    if (this.data.items[i].checked === true) {
      this.data.items[i].checked = false;
      // let con = [...this.data.paygooddata]
      // con.forEach((ele, index) => {
      //   let ind = this.data.paygooddata.indexOf(this.data.items[i].good_id)
      //   if (ele.good_id == this.data.items[i].good_id) {
      //     ele.checked = false
      //     this.data.paygooddata.splice(ind, ind+1)
      //   }
      // });
      console.log(this.data.items);
    } else {
      this.data.items[i].checked = true;
      console.log(this.data.items);
      // this.data.paygooddata.push(this.data.items[i])
    }

    for (let i = 0; i < this.data.items.length; i++) {
      if (this.data.items[i].checked == true) {
        arr.push(i)
        num += this.data.items[i].num
        price += this.data.items[i].num * this.data.items[i].price
      }
    }
    if (arr.length == this.data.items.length) {
      this.data.checkboxall = true
    } else {
      this.data.checkboxall = false
    }
    let checkboxalls = this.data.checkboxall
    this.data.checkboxall = checkboxalls
    this.setData({
      checkboxall: checkboxalls,
      nums: num,
      price: price,
    })
  },
  //数量加1
  addnum(e) {
    let i = e.currentTarget.dataset['index']
    let carts = this.data.items
    let numss = 0
    let price = 0
    let num = carts[i].num
    if (num < 200) {
      num = num + 1
    }
    carts[i].num = num
    for (let i = 0; i < this.data.items.length; i++) {
      if (this.data.items[i].checked == true) {
        numss += this.data.items[i].num
        price += this.data.items[i].num * this.data.items[i].price
      }
    }
    this.setData({
      items: carts,
      nums: numss,
      price: price,
    })
  },
  //数量减一
  subnum(e) {
    let i = e.currentTarget.dataset['index']
    let carts = this.data.items
    let numss = 0
    let price = 0
    let num = carts[i].num
    if (num > 1) {
      num = num - 1
    }
    carts[i].num = num
    for (let i = 0; i < this.data.items.length; i++) {
      if (this.data.items[i].checked == true) {
        numss = this.data.items[i].num
        price = this.data.items[i].num * this.data.items[i].price
      }
    }
    this.setData({
      items: carts,
      nums: numss,
      price: price,
    })
  },
  //输入数量
  bindKeyInput(e) {
    let i = e.currentTarget.dataset['index']
    let carts = this.data.items
    let num = carts[i].num
    if (Number(e.detail.value) > 0 && Number(e.detail.value) < 200) {
      num = Number(e.detail.value)
      console.log(12)
    } else {
      console.log(1)
      num = 1
    }
    let numss = 0
    let price = 0
    carts[i].num = num
    for (let i = 0; i < this.data.items.length; i++) {
      console.log(this.data.items[i].checked == true)
      if (this.data.items[i].checked == true) {
        numss += this.data.items[i].num
        price += this.data.items[i].num * this.data.items[i].price
      }
    }
    this.setData({
      items: carts,
      nums: numss,
      price: price,
    })
  },
  //编辑
  compile() {
    // let compile=false

    if (this.data.compiles == false) {
      this.data.compiles = true
    } else {
      this.data.compiles = false
    }
    let compile = this.data.compiles
    this.setData({
      compiles: compile
    })
  },
  //删除购物车
  deteleshopping(e) {
    let shopcarid = []
    let than = this
    than.data.paygooddata.forEach(ele => {
      shopcarid.push(ele.shopping_car_id)
    })
    wx.request({
      url: 'http://api_devs.wanxikeji.cn/api/shoppingCarDelete',
      method: "post",
      data: {
        token: than.data.token,
        shopping_car_id: String(shopcarid)
      },
      success(ress) {
        console.log(ress);
        wx.showModal({
          title: ress.data.msg,
        })
      }
    })
    if (this.data.checkboxall == true) {
      this.data.items = []
      let carts = this.data.items
      this.setData({
        items: carts,
        checkboxall: false,
        compiles: true,
        nums: 0, //总计
        price: 0, //价格
      })
    } else {
      let carts = []
      let s = new Set(this.data.items);
      for (let i = 0; i < this.data.items.length; i++) {
        if (this.data.items[i].checked == true) {
          carts.push(this.data.items[i])
          s.delete(this.data.items[i])
          // numss+=this.data.items[i].num
          // price+=this.data.items[i].num*this.data.items[i].price
        }
      }
      this.setData({
        items: Array.from(s),
        checkboxall: false,
        // compiles:true,
        nums: 0, //总计
        price: 0, //价格
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  //去结算
  gopay() {
    let than = this
    let shopcarid = []
    than.setData({
      paygooddata:[]
    })
    than.data.items.forEach(ele=> {
      if(ele.checked == true){
        than.data.paygooddata.push(ele)
      }
    });
    console.log(than.data.paygooddata);
    than.data.paygooddata.forEach(ele => {
      shopcarid.push(ele.shopping_car_id)
    })
    if (than.data.paygooddata.length != 0) {
      wx.request({
        url: 'http://api_devs.wanxikeji.cn/api/generateOrder',
        method: "post",
        data: {
          token: than.data.token,
          address_id: String(than.data.addressid),
          money: String(than.data.price),
          shopping_car_ids: shopcarid
        },
        success(ress) {
          wx.navigateTo({
            url: '/pages/confirmorder/confirmorder',
            success(res) {
              res.eventChannel.emit('oderdata', {
                data: than.data.paygooddata
              })
              res.eventChannel.emit('addres', {
                data: than.data.wholeadd
              })
              res.eventChannel.emit('allprice', {
                data: than.data.price
              })
              res.eventChannel.emit('orderinfo', {
                data: ress.data.data
              })
            }
          })
        }
      })
    } else {
      wx.showModal({
        title: "请选择商品"
      })
    }
  },
  /** api/goodInfo
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 引入SDK核心类C:\Users\Master\Desktop\weixin\jdapplet\utils\qqmap-wx-jssdk.js
    let QQMapWX = require('../../utils/qqmap-wx-jssdk.min');

    // 实例化API核心类
    let qqmapsdk = new QQMapWX({
      key: 'A5WBZ-GUFEJ-3QHF7-K4WVF-RCHKJ-JKBXP' // 必填
    });
    //在Page({})中使用下列代码 
    //页面显示/切入前台时触发
    let _this = this;
    //定位
    qqmapsdk.reverseGeocoder({
      poi_options: 'policy=2',
      success: function (res) {
        _this.setData({
          addres: res.result.address
        })
      }
    })
    //调用获取城市列表接口
    qqmapsdk.getCityList({
      // poi_options: 'policy=2',
      success: function (res) { //成功后的回调
        _this.data.province = res.result[0]
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onLoad() {
    let than = this
    //购物车数据
    wx.getStorage({
      key: "token",
      success(ress) {
        than.setData({
          token: ress.data
        })
        wx.request({
          url: 'http://api_devs.wanxikeji.cn/api/shoppingCarList',
          method: "post",
          data: {
            token: ress.data,
          },
          success(res) {
            console.log(res);
            res.data.data.data.forEach(ele => {
              ele.checked = false
              try {
                let a = JSON.parse(ele.good_name)
                if (a.id == "lcwll" ||a.id == "lsycqb") {
                  ele.good_name = a.name
                }
                if (typeof ele.img == "string") {
                  ele.img = JSON.parse(ele.img)[0]
                }
              } catch (error) {

              }
            });
            than.setData({
              items: res.data.data.data,
              token: ress.data
            })
          }
        })
        //地址信息
        wx.request({
          url: 'http://api_devs.wanxikeji.cn/api/userAddressList',
          method: "post",
          data: {
            token: ress.data
          },
          success(resa) {
            console.log(resa.data.data);
            than.setData({
              shaddlist: resa.data.data,
              addres: resa.data.data[0].area,
              addressid: resa.data.data[0].address_id,
              wholeadd: resa.data.data[0]
            })
          }
        })
      }
    })

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    let than = this
    //购物车数据
    wx.request({
      url: 'http://api_devs.wanxikeji.cn/api/shoppingCarList',
      method: "post",
      data: {
        token: than.data.token,
      },
      success(res) {
        res.data.data.data.forEach(ele => {
          ele.checked = false
          try {
            let a = JSON.parse(ele.good_name)
            if (a.id == "lcwll" ||a.id == "lsycqb") {
              ele.good_name = a.name
            }
            if (typeof ele.img == "string") {
              ele.img = JSON.parse(ele.img)[0]
            }
          } catch (error) {

          }
        });
        than.setData({
          items: res.data.data.data,
        })
      }
    })
    //地址信息
    wx.request({
      url: 'http://api_devs.wanxikeji.cn/api/userAddressList',
      method: "post",
      data: {
        token: than.data.token
      },
      success(resa) {
        wx.hideNavigationBarLoading(); //完成停止加载图标
        wx.stopPullDownRefresh();
        than.setData({
          shaddlist: resa.data.data,
          addres: resa.data.data[0].area,
          addressid: resa.data.data[0].address_id,
          wholeadd: resa.data.data[0]
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
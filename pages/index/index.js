// index.js
// 获取应用实例
const app = getApp()
Page({
  //下拉刷新
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    //分类数据
    classfil: [],
    //轮播
    background: [],
    //小圆点
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    title: '京东购物',
    showmor:false,
    //默认下标
    deindex: -1,
    //商品每页条数
    gdata: 500,
    //热卖
    hotgod: 1,
    //商品列表数据
    goodslistdata: [],
    //分类图标
    icon: [{
        icon: "/static/indeximg/super.svg",
        title: "京东超市"
      },
      {
        icon: "/static/indeximg/jdian.svg",
        title: "京东家电"
      },
      {
        icon: "/static/indeximg/shirt.svg",
        title: "京东服饰"
      },
      {
        icon: "/static/indeximg/phon.svg",
        title: "京东手机"
      },
      {
        icon: "/static/indeximg/hdao.svg",
        title: "财富岛"
      },
      {
        icon: "/static/indeximg/phonhf.svg",
        title: "充话费"
      },
      {
        icon: "/static/indeximg/beans.svg",
        title: "领京豆"
      },
      {
        icon: "/static/indeximg/youhq.svg",
        title: "领优惠券"
      },
      {
        icon: "/static/indeximg/thry.svg",
        title: "免费水果"
      },
      {
        icon: "/static/indeximg/wei.svg",
        title: "唯品会"
      },
    ],
    //所有商品数据
    allgoodsdata:[],
    //懒加载数量截取
    num:0,
  },
  //商品数据
  getgoods() {
    let than = this;
    wx.request({
      url: 'http://api_devs.wanxikeji.cn/api/goodList',
      method: "post",
      data: {
        size: this.data.gdata,
      },
      success(res) {
        let mydata = []
        res.data.data.data.forEach(ele => {
          try {
            let a = JSON.parse(ele.good_name)
            if (a.id == "lsycqb" ) {
              ele.good_name = a.name
              mydata.push(ele)
            } else if(a.id =="lcwll" ){
              let b = JSON.parse(ele.img)
              ele.good_name = a.name
              ele.img = b[0]
              mydata.push(ele)
            }
          } catch (error) {}
        });
        than.setData({
          allgoodsdata:mydata,
          goodslistdata: mydata.slice(0,2)
        })
        console.log(than.data.allgoodsdata);
      }
    })
  },
  unfold(){
    this.setData({
      showmor:!this.data.showmor
    })
  },
  //点击商品分类
  checkgoodsclass(e) {
    let b =[]
    let a = e.currentTarget.dataset.name.good_type_id
    this.data.allgoodsdata.forEach(ele => {
      if(a == ele.type_id || a == ele.type_parent_id){
         b.push(ele)
      }
    });
    this.setData({
      deindex: e.currentTarget.dataset.index,
      goodslistdata:b
    })
  },
  checkgoo() {
    this.setData({
      deindex: -1,
      goodslistdata:this.data.allgoodsdata.slice(0,9)
    })
  },
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
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //点击每个商品
  lookgoods(e) {
    let a = e.currentTarget.dataset.id
    console.log(a);
    wx.navigateTo({
      url: '/pages/goodsdet/goodsdet',
      success(res){
        res.eventChannel.emit('goodsid',{data:a})
      }
    })
  },
  onLoad() {
   
    let than = this;
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    //请求接口商品分类
    wx.request({
      url: 'http://api_devs.wanxikeji.cn/api/goodType',
      success(res) {
        let a = []
        res.data.data.forEach(ele => {
          if (ele.parent_id == "0") {
            try {
              let b = JSON.parse(ele.type_name)
              if (b.id == "lcwll") {
                ele.type_name = b.name
                a.push(ele)
              }
            } catch (error) {
              a.push(ele)
            }
          }
        });
        than.setData({
          classfil: a.slice(5,a.length)
        })
      },
    })
    //商品数据
    this.getgoods()
    //轮播接口
    wx.request({
      url: 'http://api_devs.wanxikeji.cn/api/bannerList',
      success(res) {
        than.setData({
          background: res.data.data.splice(0, 3)
        })
      }
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
    /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.num = this.data.num +=10
    this.setData({
      goodslistdata:this.data.allgoodsdata.slice(0,this.data.num)
    })
  },

})
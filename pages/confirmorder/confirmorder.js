// pages/confirmorder/confirmorder.js
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
   title:"确认订单",
   pagename:"confirmorder",
   block:"block",
   defi:false,
   defimdex:false,
   //订单信息
   orderinfo:{},
   chuseadd:{
   },
   //结算商品数据
   settlegoods:[],
   //收货地址
   shadd:[
  ],
  //添加地址
  consignee:"",
  contact:"",
  area:"",
  detaddress:"",
  procince:"",
  city:"",
  areacode:"",
  //总金额
  allprice:"",
  token:"",
  },
  //选择收货地址
  checkadd(){
    let than = this
    wx.getStorage({
      key:"token",
      success(res){
        wx.request({
          url: 'http://api_devs.wanxikeji.cn/api/userAddressList',
          method:"post",
          data:{
            token:res.data
          },
          success(ress){
            than.setData({
              shadd:ress.data.data
            })
          }
        })
      }
    })
this.setData({
  defimdex:!this.data.defimdex
})
  },
  //添加收货地址
  address(){
    let than = this
     this.setData({
      defi:!this.data.defi
     })
     let data = {
      token: than.data.token,
      phone: than.data.contact,
      procince: than.data.procince,
      city: than.data.city,
      area: than.data.area,
      name: than.data.consignee,
      detailed: than.data.detaddress,
    }
    if(data !=""){
      wx.request({
        url: 'http://api_devs.wanxikeji.cn/api/userAddressAddModify',
        method: "post",
        data: data,
        success(res){
          than.setData({
            'chuseadd.name':than.data.consignee,
            'chuseadd.phone':than.data.contact,
            'chuseadd.area':than.data.area
          })
          console.log(res);
        }
      })
    }
   
  },
    //自动定位
    getautoadd() {
      let than = this
      wx.getLocation({
        isHighAccuracy: true,
        type: "wgs84",
        success(res) {
          wx.chooseLocation({
            latitude: res.latitude,
            longitude: res.longitude,
            success: function (ress) {
              //逆向地址解析获取编码
              wx.request({
                url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude + '&key=PXZBZ-PMKE2-ZOKUK-CJP66-5TWX7-ERBB5',
                success(ress) {
                  let a = [...ress.data.result.ad_info.adcode]
                  than.setData({
                    procince: a.slice(0, 2).join(''),
                    city: a.slice(2, 4).join(''),
                    areacode: a.slice(4, 6).join('')
                  })
                }
              })
              if (than.data.defimdex == 1) {
                than.setData({
                  area: ress.address
                })
              } else {
                than.setData({
                  'repetadd.add': ress.address
                })
              }
            }
          })
  
        }
      })
  
    },
  repet(e){
    this.data.shadd.forEach((ele,index) => {
      if(e.currentTarget.dataset.index == index){
        this.setData({
          chuseadd:ele
        })
      }
    });
    this.setData({
      defimdex:false
    })
  },
  //支付
  paymony(){
    let than = this
    wx.requestPayment({
      nonceStr:String(than.data.orderinfo.nonce_str) ,
      paySign:String(than.data.orderinfo.paySign) ,
      timeStamp:String(than.data.orderinfo.timeStamp) ,
      package:'prepay_id='+String(than.data.orderinfo.prepay_id) ,
      signType:"MD5",
      success(res){
       wx.switchTab({
         url: '/pages/shoppingcart/shoppingcart',
       })
      },
      fail(){
        wx.switchTab({
          url: '/pages/shoppingcart/shoppingcart',
        })
      }
    })
  },
  onLoad(){
    let than = this
    let m = 0
    //接收商品数据
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('oderdata', function(data) {
      than.setData({
        settlegoods: data.data
      })
    })
    eventChannel.on('addres', function(data) {
      than.setData({
        chuseadd: data.data
      })
    })
    eventChannel.on('allprice', function(data) {
      than.setData({
        allprice: data.data
      })
    })
    eventChannel.on('orderinfo',function(data){
      than.setData({
        orderinfo:data.data
      })
    })
    wx.getStorage({
      key:"token",
      success(res){
        than.setData({
          token:res.data
        })
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})

// pages/myorder/myorder.js
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
    title: "我的订单",
    block: "block",
    pagename: "myorder",
    defltindex: 0,
    orderitem: [
      "全部",
      "待付款",
      "待收货",
      "已收货"
    ],
    //所有订单
    allorder: [],
    //页面渲染数据
    randerdata:[],
    //按钮信息
   btnmsg:"再次购买",
   btnmsgs:"去付款",
  },
  clickitem(e) {
    let _this = this
    _this.setData({
      defltindex: e.currentTarget.dataset.index,
    })
    let fildata =[]
    if(_this.data.defltindex == 0){
       _this.setData({
        randerdata:_this.data.allorder
       })
    }else if(_this.data.defltindex == 1){
      _this.setData({
        randerdata:[],
      })
      _this.data.allorder.forEach(ele => {
         if(ele.status == "未支付"){
          fildata.push(ele)
          _this.setData({
            randerdata:fildata
          })
         }
       });
    }else if(_this.data.defltindex == 2){
      _this.setData({
        randerdata:[],
      })
      _this.data.allorder.forEach(ele => {
         if(ele.status == "已发货"){
          fildata.push(ele)
          _this.setData({
            randerdata:fildata
          })
         }
       });
    }else if(_this.data.defltindex == 3){
      _this.setData({
        randerdata:[],
      })
      _this.data.allorder.forEach(ele => {
         if(ele.status == "已收货"){
          fildata.push(ele)
          _this.setData({
            randerdata:fildata
          })
         }
       });
    }
  },
  onLoad() {
    let than = this
    wx.getStorage({
      key: "token",
      success(res) {
        wx.request({
          url: "http://api_devs.wanxikeji.cn/api/orderList",
          method: "post",
          data: {
            token: res.data
          },
          success(ress) {
            ress.data.data.data.forEach(ele => {
              switch (ele.status) {
                case 1:
                  ele.status = "未支付"
                  break;
                case 2:
                  ele.status = "支付成功"
                  break;
                case 3:
                  ele.status = "未发货"
                  break;
                case 4:
                  ele.status = "已发货"
                  break;
                case 5:
                  ele.status = "已收货"
                  break;
              }
              ele.childern.forEach(elem => {
                console.log(elem);
                elem.good_name = JSON.parse(elem.good_name)
                try {
                  let a =JSON.parse(elem.img)
                  elem.img = a[0]
                } catch (error) {
                  elem.img = elem.img
                }
              });
            });
            than.setData({
              allorder: ress.data.data.data,
              randerdata:ress.data.data.data
            })
          }
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
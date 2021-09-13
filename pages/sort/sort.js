// pages/fenlei/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'商品分类',
    classfil:[],//一级
    text:'12',
    isSelect:0,
    database:[],//所有数据
    second:[],//二级
    three:[],//三级
  },
//左边导航点击
navclick(e){
  let m=e.currentTarget.dataset['index']
  let s= this.data.classfil[m]
  console.log(this.data.classfil[m])
  let arr=[]
  this.data.database.forEach((item)=>{
  if(item.parent_id==s.good_type_id){
    arr.push(item)
  }
})
console.log(arr)
//三级
let sarr=[]
this.data.database.forEach((item)=>{
  arr.forEach((item2)=>{
if(item.parent_id==item2.good_type_id){
  sarr.push(item)
  console.log(sarr)
}
  })
})

this.setData({
  text:arr,
  isSelect:e.currentTarget.dataset['index'],
  second:arr,
  three:sarr
})
},
//三级点击事件
threeitem(e){
  console.log(e.currentTarget.dataset.item.good_type_id)
  let a=e.currentTarget.dataset.item.good_type_id
  wx.navigateTo({
    url: '/pages/listofgoods/listgoods',
    success(res){
      console.log(res)
      res.eventChannel.emit('goodtypeid',{data:a})
    }
  })
  console.log(123)
},
// lookgoods(e) {
//   console.log(e);
//   let a = e.currentTarget.dataset.id
//   wx.navigateTo({
//     url: '/pages/goodsdet/goodsdet',
//     success(res){
//       res.eventChannel.emit('goodsid',{data:a})
//     }
    
//   })
// },

  /** api/goodInfo
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //请求接口
  let than = this;
  wx.request({
    url: 'http://api_devs.wanxikeji.cn/api/goodType',
    success(res){
      let arr =[]
      res.data.data.forEach(element => {
        if(element. parent_id==0){
          arr.push(element)
        }
      });
      console.log(arr)
      //第一次点击分类加载的   二级
      let sarr=[]
      res.data.data.forEach((item)=>{
      if(item.parent_id==arr[0].good_type_id){
        sarr.push(item)
      }
    }) 
     //第一次点击分类加载的   三级
     let tarr=[]
     res.data.data.forEach((item)=>{
       sarr.forEach((item2)=>{
         if(item.parent_id==item.good_type_id){
           tarr.push(item)
         }
       })
     })
    let s=sarr
      than.setData({
        classfil: arr,
        database:res.data.data,
        second:sarr,
        three:tarr
      })
      console.log(than.data.database);
    },
  })
 
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
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
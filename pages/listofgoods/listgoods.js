const app = getApp()
Page({
  data: {
    goodslistdata: [],
    title:'商品列表',
    block:"block",
    pagename:"listgoods",
  },
  //点击每个商品
  lookgoods(e) {
    let a = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/goodsdet/goodsdet',
      success(res){
        res.eventChannel.emit('goodsid',{data:a})
      }
    })
    console.log(a);
  },
  onLoad() {
    let than = this
    //接收id
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('goodtypeid', function(data) {
      wx.request({
       url: 'http://api_devs.wanxikeji.cn/api/goodList',
       method: "post",
       data: {
        good_type:data.data,
       }, success(res) {
         than.setData({
           goodslistdata:res.data.data.data
         })
       }
  })
})
}
})
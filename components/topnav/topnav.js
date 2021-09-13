// components/topnav/topnav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //接收参数
  title:{
  type:String,
  value:'default value'
  },
  block:{
    type:String,
    value:'none'
  },
  pagename:{
    type:String,
    value:'index'
  }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title:'京东购物'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ret(){
      if(this.properties.pagename == "goodsdet"){
        wx.switchTab({
          url: '/pages/index/index',
        })
      }else if(this.properties.pagename == "login"){
        //tabBar
        wx.switchTab({
            url: '/pages/personcenter/personcenter',
          })
      }else if(this.properties.pagename == "myorder"){
        wx.switchTab({
          url: '/pages/personcenter/personcenter',})
      }else if(this.properties.pagename=='listgoods'){
        wx.switchTab({
          url: '/pages/sort/sort',
        })
      }else{
        wx.switchTab({
          url: '/pages/shoppingcart/shoppingcart',
        })
      }
    },
  },
  onload:function(options){
    this.setData({
       title:options.title
    })
  }
})


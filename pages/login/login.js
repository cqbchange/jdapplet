// pages/Login/login.js
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
    login: "登录",
    block: "block",
    check: false,
    //授权信息
    anthor: false,
    pagename: "login",
    openid: "",
    //是否有info
    info: true,
    //是否有token
    token: false,
  },
  check() {
    this.setData({
      check: !this.data.check
    })
  },
  //点击一键登录
  login() {
    let than = this
    if (this.data.check == true) {
      wx.login({
        success: (res) => {
          wx.request({
            url: 'http://api_devs.wanxikeji.cn/api/codeExchangeOpenid',
            data: {
              code: res.code
            },
            success(ress) {
              than.setData({
                openid: ress.data.data.openid
              })
              wx.request({
                url: 'http://api_devs.wanxikeji.cn/api/refreshToken',
                method:"post",
                data:{
                  openid:ress.data.data.openid
                },
                success(val){
                  wx.setStorage({
                  key: "token",
                  data: val.data.data.token,
                })
                }
              })
              if (ress.data.data.info == undefined) {
                than.setData({
                  info: false
                })
              } else {
                than.setData({
                  info: true
                })
              
                wx.setStorage({
                  key: "icon",
                  data: ress.data.data.info.icon
                })
              }
            }
          })
        }
      })
      wx.getUserProfile({
        desc: '展示用户信息',
        success: (res) => {
          res.rawData = JSON.parse(res.rawData);
          wx.setStorage({
            key: "name",
            data: res.rawData.nickName
          })
          if (than.data.info == false) {
            wx.request({
              url: 'http://api_devs.wanxikeji.cn/api/register',
              method: "post",
              data: {
                openid: this.data.openid,
                nick_name: res.rawData.nickName,
                icon: res.userInfo.avatarUrl,
              },
              success(ress) {
                wx.setStorage({
                  key: "token",
                  data: ress.data.data.token
                })
                if (ress.statusCode == 200) {
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                }
              }
            })
          }else{
            wx.switchTab({
              url: '/pages/index/index',
            })
          }

        }
      })

    } else {
      wx.showModal({
        title: '请勾选用户协议',
      })
    }
  },
  //关闭授权层
  closeauthor() {
    this.setData({
      anthor: !this.data.anthor
    })
  },
  onLoad() {
    let than = this
    wx.getStorage({
      key: "token",
      success(res) {
        than.setData({
          token: true
        })
        wx.switchTab({
          url: '/pages/index/index',
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
// pages/personcenter/personcenter.js
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
    title: "个人中心",
    goodslistdata: [],
    amitem: [
      "我的收货地址",
      "新增收货地址",
      "编辑地址",
      "修改个人信息",
    ],
    amends: false,
    defimdex: 0,
    //收货人输入框
    consignee: '',
    //联系方式输入框
    contact: '',
    //所在地区
    area: '',
    //省份编码
    procince: "",
    //城市编码
    city: "",
    //区县编码
    areacode: "",
    //详细地址
    detaddress: '',
    //编辑的详细地址
    detaddresss: '',
    //开关
    switch1Checked: false,
    onwadd: '',
    //编辑地址数据
    repetadd: {},
    shadd: [
    ],
    //头像
    icons: "",
    nackname: "",
    //修改个信息
    //头像
    icon: "",
    //昵称
    nickname: "",
    //性别
    sex: 3,
    //邮箱
    email: '',
    //qq
    qq: "",
    //手机号
    phon: "",
    //修改密码
    newpassword: "4657646",
    //旧密码
    oldpassword: "764867654",
    items: [{
        value: '1',
        name: '男'
      },
      {
        value: '2',
        name: '女',
        checked: 'true'
      },
      {
        value: '3',
        name: '保密'
      },
    ]
  },

  onLoad() {
    let than = this;
    wx.getStorage({
      key: "icon",
      success(res) {
        than.setData({
          icons: res.data
        })
      }
    })
    wx.getStorage({
      key: "token",
      success(res) {
        wx.request({
          url: 'http://api_devs.wanxikeji.cn/api/userAddressList',
          method: "post",
          data: {
            token: res.data
          },
          success(ress) {
            wx.request({
              url: 'https://apis.map.qq.com/ws/district/v1/list?key=PXZBZ-PMKE2-ZOKUK-CJP66-5TWX7-ERBB5',
              success(val) {
              }
            })
            than.setData({
              shadd: ress.data.data
            })
          }
        })
      }
    })
    wx.getStorage({
      key: "name",
      success(res) {
        than.setData({
          nackname: res.data
        })
      }
    })

    wx.request({
      url: 'http://api_devs.wanxikeji.cn/api/goodList',
      method: "post",
      data: {
        size: "500",
      },
      success(res) {
        let mydata = []
        res.data.data.data.forEach(ele => {
          try {
            let a = JSON.parse(ele.good_name)
            let b = JSON.parse(ele.img)
            if (a.id == "lsycqb" ) {
              ele.good_name = a.good_name
              mydata.push(ele)
            }
             if(a.id =="lcwll"){
              ele.good_name = a.name
              ele.img = b[0]
              mydata.push(ele)
            }
          } catch (error) {}
        });
        than.setData({
          goodslistdata: mydata
        })
      }
    })
  },
  //点击设置按钮
  setuserinfo() {
    let than = this
    this.setData({
      amends: true,
    })

  },
  //查看订单
  showorder(){
    wx.navigateTo({
      url: '/pages/myorder/myorder',
    })
  },
  //关闭修改信息界面
  closeset() {
    this.setData({
      amends: false
    })
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
    
  },
  //点击每个菜单
  rset(e) {
    this.setData({
      defimdex: e.currentTarget.dataset.index,
      defitem: e.currentTarget.dataset.index
    })
  },
  //开关
  switch1Change() {
    this.setData({
      switch1Checked: !this.data.switch1Checked
    })
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
  //点击添加地址
  addshipping() {
    let than = this
    wx.getStorage({
      key: "token",
      success(res) {
        let data = {
          token: res.data,
          phone: than.data.contact,
          procince: than.data.procince,
          city: than.data.city,
          area: than.data.areacode,
          name: than.data.consignee,
          detailed: than.data.detaddress,
        }
        if (data != "") {
          wx.request({
            url: 'http://api_devs.wanxikeji.cn/api/userAddressAddModify',
            method: "post",
            data: data,
            success(res) {
              wx.showModal({
                title: res.data.msg,
              })
              if (res.data.msg == "新增成功") {
                than.setData({
                  contact: '',
                  procince: '',
                  city: '',
                  areacode: '',
                  consignee: '',
                  detaddress: '',
                  area: '',
                })
              }
            }
          })
        }
      }
    })

  },
  //编辑地址
  repet(e) {
    this.data.shadd.forEach((ele, index) => {
      if (e.currentTarget.dataset.index == index) {
        this.setData({
          repetadd: ele,
          detaddresss:ele.detailed
        })
      }
    });
    this.setData({
      defimdex: 2
    })
  },
  //确认修改
  reperadd(){
    let than = this
    wx.getStorage({
      key:"token",
      success(res){
        let data = {
          token: res.data,
          phone: than.data.repetadd.phone,
          procince: than.data.procince,
          city: than.data.city,
          area: than.data.repetadd.add,
          name: than.data.repetadd.name,
          detailed: than.data.detaddresss,
          address_id:than.data.repetadd.address_id
        }
        if (data != "") {
          wx.request({
            url: 'http://api_devs.wanxikeji.cn/api/userAddressAddModify',
            method: "post",
            data: data,
            success(res) {
              wx.showModal({
                title: res.data.msg,
              })
              if (res.data.msg == "修改成功") {
                than.setData({
                  repetadd:[],
                  detaddresss: '',
                })
              }
            }
          })
          if(than.data.switch1Checked == true){
             wx.request({
               url: 'http://api_devs.wanxikeji.cn/api/userAddressDfault',
               method:"post",
               data:{
                 token:res.data,
                 id:than.data.repetadd.address_id
               },
               success(res){
                 console.log(res);
               }
             })
          }
        }
      }
    })
  },
  //性别选择
  radioChange(e) {
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      sex: e.detail.value
    })
  },
  //上传头像
  chooseimg(){
    let _this = this
    wx.chooseImage({
       success(res){
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          filePath: tempFilePaths[0],
          name: 'img',
          url: 'http://api_devs.wanxikeji.cn/api/savePic',
          success(ress){
            console.log(ress);
            const data = JSON.parse(ress.data)
            _this.setData({
              icons:"http://api_devs.wanxikeji.cn/" +data.data
            })
          }
        })
       }
    })
  },
  //修改个人信息
  confirm() {
    let than = this
    if (than.data.defimdex == 3) {
      wx.getStorage({
        key:'token',
        success(res){
          wx.request({
            url: 'http://api_devs.wanxikeji.cn/api/userModify',
            method:"post",
            data:{
              token:res.data,
              nick_name:than.data.nackname,
              sex:than.data.sex,
              email:than.data.email,
              qq:than.data.qq,
              icon:than.data.icons,
              phone:than.data.phon
            },
            success(ress){
              console.log(than.data.icons);
              wx.setStorage({
                key:'icon',
                data:than.data.icons
              })
              wx.setStorage({
                key:'name',
                data:than.data.nackname
              })
              wx.showModal({
                title: ress.data.msg,
              })
            }
          })
        }
      })
    } else {
      wx.request({
        url: 'http://api_devs.wanxikeji.cn/api/rePassword',
        method: "post",
        data: {
          token: get,
          pw: than.data.newpassword,
          old: than.data.oldpassword
        },
        success(res) {
          console.log(res);
        }
      })
    }
  },
 
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
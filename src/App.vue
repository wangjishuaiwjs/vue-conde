<template>
    <div id="app">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
        
        <!-- <link rel="stylesheet" href="./assets/css/reset.css"> -->
        <div class="container-fuild">
            <nav class="navbar navbar-default navbar-fixed-top navbar-inverse navbar-fixed-top">
              <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  <a class="navbar-brand" href="#">
                        <img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg" /> 
                  </a>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                 <!--  <form class="navbar-form navbar-left">
                    <div class="form-group">
                      <input type="text" class="form-control" placeholder="Search">
                    </div>
                    <button type="submit" class="btn btn-default">搜索</button>
                  </form> -->
                  <ul class="nav navbar-nav navbar-right">
                      <li>
                          <router-link to="/home">主页</router-link>
                      </li>
                      <li>
                          <router-link to="/news">
                            消息通知
                            <span v-if="newsCount" class="badge">{{newCount}}</span>
                          </router-link>
                      </li>
                      <li>
                          <router-link to="/newpeople">新手入门</router-link>
                      </li>
                      <li>
                          <router-link to="/cnodeapi">API</router-link>
                      </li>
                      <li>
                          <router-link to="/above">关于</router-link>
                      </li>
                      <li>
                          <router-link to="/center">个人中心</router-link>
                      </li>
                      <li>
                          <router-link to="/login">登录</router-link>
                      </li>
                      <!--  <li>
                          <router-link to="/douban">豆瓣</router-link>
                      </li> -->
                  </ul>
                </div>
              </div>
            </nav>
        </div>
        

        <div class="fen"></div>
        <router-view id="main-pag"></router-view>
    </div>



</template>

<script>


// console.log(document)
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      newsCount:''
    }
  },
  created(){
    // 消息通知
      this.token = JSON.parse(localStorage.getItem('token'))
      console.log(this.token)
      this.$http.get('/message/count',{
        params:{
          // accesstoken :'d29c4930-ce10-4a8d-9b0f-9f43233da3d0'
          accesstoken :this.token
        }
      }).then(function(msg){
        // console.log(msg)
        this.newsCount = msg.data.data;
        // console.log(this.newsCount)
      }.bind(this)).catch(function(err){
        console.log(err); 
      })
  }
}
$(function(){
  // 铺获以 img src="//"
  // console.log($('img').attr('src'))
  // 判断当时的路径是否是以http开头的
  var reg = /^http.*?/;
  // 执行匹配
  var res = reg.exec($('img').attr('src'));

  if(!res){
    // 手动添加
    $('img').attr('src','http:'+$('img').attr('src'))
  }

})
</script>

<style>
*{
    margin:0;
    padding:0;
}
#app {
  background:#E1E1E1;
  padding:0 5px;
}
a{
  text-decoration: none;
  /*color:#fff;*/
}
.navbar-brand{
    display:inline-block;
    width:130px;
    /*margin-top:10px;*/
}
#main-pag{
    display:block;
    /*margin-top:50px;*/
    position:relative;
}
/*{
    background: #3879D9;
}*/
.fen{
    width:100%;
    height:70px;
  }
</style>

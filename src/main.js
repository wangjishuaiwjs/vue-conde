import Vue from 'vue'
import App from './App.vue'

// 引入elejs
import ElementUI from 'element-ui'

// 引入ele css
import 'element-ui/lib/theme-default/index.css'
// ele JS需要use
Vue.use(ElementUI)

//引入bootstrap
// import './assets/css/bootstrap.min.css'  
// import './assets/js/bootstrap.min'  

// 挂载路由
import router from './router';

// 引入axios
import axios from 'axios'

// 创建基本的axios配置
var $http = axios.create({
	baseURL : 'https://cnodejs.org/api/v1'
});


// 挂载到vue的原形
Vue.prototype.$http = $http;

new Vue({
  el: '#app',
  render: h => h(App),
  router
})

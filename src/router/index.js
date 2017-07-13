// 路由文件

import Vue from 'vue'

import VueRouter from 'vue-router'

// 组件
import Home from '../components/Home.vue'
import Cnodeapi from '../components/Cnodeapi.vue'
import News from '../components/News.vue'
import Newpeople from '../components/Newpeople.vue'
import Above from '../components/Above.vue'
import Center from '../components/Center.vue'
import Login from '../components/Login.vue'
// import Douban from '../components/Douban.vue'
import User from '../components/User.vue'
import Settopic from '../components/Settopic.vue'
import Updatetop from '../components/Updatetop.vue'


import Topic from '../components/Topic.vue'

// 使用
Vue.use(VueRouter)

// 创建路由
export default new VueRouter({
	routes : [
		{
			path : '/home',
			name : 'home',
			component : Home
		},
		{
			path : '/news',
			name : 'news',
			component :News
		},
		{
			path : '/cnodeapi',
			name : 'cnodeapi',
			component : Cnodeapi
		},
		{
			path : '/newpeople',
			name : 'newpeople',
			component :Newpeople
		},
		{
			path : '/above',
			name : 'above',
			component : Above
		},
		{
			path : '/user/:loginname',
			name : 'user',
			component : User
		},
		{
			path : '/center',
			name : 'center',
			component : Center
		},
		{
			path : '/login',
			name : 'login',
			component : Login
		},
		// {
		// 	path : '/douban',
		// 	name : 'douban',
		// 	component : Douban
		// },
		{
			path:'/topic/:id',
			name:'topic',
			component:Topic
		},
		// {
		// 	path:'/topic/:id',
		// 	name:'topic',
		// 	component:Topic
		// },
		{
			path:'/settopic',
			name:'settopic',
			component:Settopic
		},
		{
			path:'/updatetop',
			name:'updatetop',
			component:Updatetop
		},
		{
			path:'/*',
			redirect:'/home'
		}

	]
})


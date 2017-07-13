<template>
	<div class="settopic">
		<!-- <h3>发布话题</h3> -->
			<div class="settopic-content">
				<div id='main'>

					<div id='content'>
						<div v-if="!isSuccess" class='panel'>
							<div class='header'>
							  <ul class='breadcrumb'>
							    <li><router-link to="/">主页</router-link><span class='divider'></span></li>
							    <li class='active'>发布话题</li>
							  </ul>
							</div>
							<div>
								<!-- <p>请选择话题模块</p> -->
								<el-button type="success">请选择话题模块</el-button>
								<div class="setfen"></div>
								<el-radio-group v-model="radio2">
								    <el-radio :label="3">分享</el-radio>
								    <el-radio :label="6">问答</el-radio>
								    <el-radio :label="9">招聘</el-radio>
								    <el-radio :label="12">客户端测试</el-radio>
								</el-radio-group>
								<div class="setfen"></div>
								<!-- {{radio2}} -->
								<el-input v-model="input" placeholder="请输入话题标题"></el-input>
								<div class="setfen"></div>
								<!-- {{input}} -->
								

								<el-input type="textarea" :rows="10" placeholder="请输入发布话题内容" v-model="textarea">
								</el-input>
								<div class="setfen"></div>
								<!-- {{textarea}} -->
							</div>
							<el-row>
								<el-col :span="6" :offset="18">
									<el-button class="topicsibmit" type="success" @click="createTopic">发布</el-button>
								</el-col>
							</el-row>
						</div>
					</div>
					<div id="content">
						<!-- <div v-if="isSuccess" class="loginB"> -->
						<div v-if="isSuccess" class="loginB">
					  		<div class="loginB-1">
							</div>
					  		<h1 class="loginsuccess"><strong>登录成功!</strong></h1>
					  		<p style="text-align:center"><router-link to="/" style="border-bottom:1px solid #337AB7">点击进入首页</router-link></p>
					  	</div>
					</div>

				</div>
			</div>
		
	</div>
</template>
<script>
	export default{
		data(){
			return{
				token : '',
				radio2: 12,
				input: '',
				textarea:'',
				isSuccess:false
			}
		},
		methods:{
			createTopic(){
				this.radio2 = this.radio2==3?'share':(this.radio2==6?'ask':(this.radio2==9?'job':'dev'))
				console.log(this.token)
				console.log(this.input)
				console.log(typeof this.input)
				console.log(this.radio2)
				console.log(this.textarea)
				this.$http.post('/topics',{
					accesstoken:this.token,
					// accesstoken:'b86261c7-fc2b-473c-9604-e4270cb20d75',
					// accesstoken:'d29c4930-ce10-4a8d-9b0f-9f43233da3d0',
					// accesstoken:'2595e48d-cd06-4bf3-b3d2-1ebb2c9ac837',
					// title : this.input,
					title :'我是测试222',

					// tab : this.radio2,
					tab : 'dev',

					content : this.textarea
					// content : '啊啊啊啊啊啊啊啊啊  在试'
				}).then(function(msg){
					console.log(msg);
					this.isSuccess = msg.data.success;
				}.bind(this)).catch(function(err){
					console.log(err);
				});
			}
		},
		created(){
			// console.log(JSON.parse(localStorage.getItem('token')))
			this.token = JSON.parse(localStorage.getItem('token'));
			console.log(this.token)
		}
	}
</script>
<style>
	.setfen{
		width:100%;
		height:20px;
	}
	.topicsibmit{
		margin:0 auto;
	}

	/*发表成功的提示*/
	.loginB{
		width:90%;
		height:35%;
		margin:0 auto;
		background:#F0F0F0;
		margin-top:50px;
		border:0px solid #ccc;
		position:relative;
	}
	.loginB-1{
		width:100%;
		height:30px;
		margin-top:20px;
		/*background:red;*/
	}
</style>
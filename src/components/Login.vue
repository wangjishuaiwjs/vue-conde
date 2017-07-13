<template>
	<div class="login">
		<!-- <h3>登录页面部分</h3> -->

		<div class="login-content">
			<div id='main'>

				<div id='content'>
					<div class='panel'>
						<div class='header'>
						  <ul class='breadcrumb'>
						    <li><router-link to="/">主页</router-link><span class='divider'></span></li>
						    <li class='active'>登录</li>
						  </ul>
						</div>
						<div class='inner'>
						  	<div v-if="user.success" class="loginB">
						  		<div class="loginB-1">
								</div>
						  		<h1 class="loginsuccess"><strong>登录成功!</strong></h1>
						  		<p style="text-align:center"><router-link to="/" style="border-bottom:1px solid #337AB7">点击进入首页</router-link></p>
						  	</div>
							<div v-else class="loginB">
								<div class="loginB-1">
								</div>
								<form action="" class="login-F">
									<input type="text" placeholder="Access Token :" v-model="token" class="login-T">

									<!-- <input type='submit' :click="loginPut" class='login-btn' value='登录'/> -->
									<button v-on:click="loginPut" class='login-btn'>登录</button>
									<!-- {{token}} -->
								</form>
							</div>
						</div>
					</div>
				</div>

			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				token:'',
				user:{}
			}
		},
		 // b86261c7-fc2b-473c-9604-e4270cb20d75
		methods:{	
			loginPut:function(){
				// console.log(111)
				// console.log(this.token);
				this.token?this.token:''
				this.$http.post('/accesstoken',{
					// params:{
						accesstoken:this.token
					// }
				}).then(function(msg){
					// console.log(msg)
					// console.log(msg.data)
					this.user = msg.data
					// console.log(this.user)

					// 存储到本地
					localStorage.setItem('token',JSON.stringify(this.token));
					localStorage.setItem('user',JSON.stringify(this.user));
				}.bind(this)).catch(function(err){
					console.log(err)
				})
			}
		},
		created:function(){
			// this.loginPut(this.token)
			// 判断当前存储到本地的数据有没有
			if(localStorage.getItem('user')){
				this.user = JSON.parse(localStorage.getItem('user'));
				// console.log(this.user)
			} 
			if(localStorage.getItem('token')){
				this.token = JSON.parse(localStorage.getItem('token'));
				// console.log(this.user)
			} 
		}
	}
</script>

<style>
	/*.login-content .inner{
		margin:0 auto;
	}*/
	#content>.panel>.inner{
		height:580px;
	}

	.loginB{
		width:90%;
		height:35%;
		margin:0 auto;
		background:#F0F0F0;
		margin-top:50px;
		border:0px solid #ccc;
		position:relative;
	}
	.login-F{
		position:relative;
		display:block;
		margin-top:20px;
	}
	.loginB-1{
		width:100%;
		height:30px;
		margin-top:20px;
		/*background:red;*/
	}
	.login-T{
		font-size:16px;
		display:block;
		width:90%;
		line-height:2;
		border:0 solid #ccc;
		border-bottom:2px solid #13CE66;
		margin:0 auto;
		margin-top:20px;
	}
	.login-btn{
		font-size:16px;
		display:block;
		width:90%;
		line-height:2;
		border:0 solid #ccc;
		background:#13CE66;
		border-radius:3px;
		margin:0 auto;
		margin-top:20px;
		color:#fff;
		text-align:center;
	}
	.loginsuccess{
		display:block;
		margin-top:10px;
		color:#13CE66;
		text-align:center;
		border:0px solid #ccc;
		  /*line-height:35%;*/

	}
</style>
<template>
	<div class="center">
		<!-- <h3>个人中心</h3> -->
		<div v-if="user.loginname" class="center-content">
			<div id='main'>
				<div id='content'>
					<div class='panel'>
					    <div class='header'>
					      <ul class='breadcrumb'>
					        <li><router-link to="/">主页</router-link><span class='divider'>/用户详情</span></li>
					      </ul>
					    </div>
					    <div id='sidebar'>
						  	<div class="panel">
						  		<el-button type="success" class='inner'>
						      		<!-- <a href='/topic/create' id='create_topic_btn'> -->
						      		<router-link to="/settopic">
						        	<span class='span-success'>发布话题</span>
							      	<!-- </a> -->
							      	</router-link>
							    </el-button>
						  	</div>
						</div>

					    <div class='inner userinfo'>
					      	<div class='user_big_avatar'>
					        	<img :src="user.avatar_url"/>
					     	</div>
					     	<a class='dark' style="color:#444">{{user.loginname}}</a>

					      	<div class='user_profile'>
						        <ul class='unstyled'>
						          	<span class='big'>{{user.score}}</span> 积分
							        <li>
							            <a class='dark' href="/user/wangjuntingR/collections" target='_blank' style="color:#444">
							              <span class='big collect-topic-count' style="color:#444">{{collections.length}}</span>个话题收藏
							            </a>
							        </li>
							        <li>
							            <i class="fa fa-lg fa-fw fa-github"></i>
							            <a class='dark' href="https://github.com/wangjuntingR" target='_blank' style="color:#444">
							              @{{user.githubUsername}}
							            </a>
						          	</li>
						          
						       	</ul>
					     	</div>
					      	<p class='col_fade'>
					      		注册时间 
								<span v-if="Math.floor(((new Date()).getTime() - new Date(user.create_at).getTime())/1000/60/60/24/30/12)>0">{{Math.floor(((new Date()).getTime() - new Date(user.create_at).getTime())/1000/60/60/24/30/12)}} 年前</span>
								<span v-else-if="Math.floor(((new Date()).getTime() - new Date(user.create_at).getTime())/1000/60/60/24/30)>0">{{Math.floor(((new Date()).getTime() - new Date(user.create_at).getTime())/1000/60/60/24/30)}} 月前</span>
								<span v-else-if="Math.floor(((new Date()).getTime() - new Date(user.create_at).getTime())/1000/60/60/24)>0">{{Math.floor(((new Date()).getTime() - new Date(user.create_at).getTime())/1000/60/60/24)}} 天前</span>
								<span v-else-if="Math.floor(((new Date()).getTime() - new Date(user.create_at).getTime())/1000/60/60)>0">{{Math.floor(((new Date()).getTime() - new Date(user.create_at).getTime())/1000/60/60)}} 小时前</span>
								<span v-else-if="Math.floor(((new Date()).getTime() - new Date(user.create_at).getTime())/1000/60)>0">{{Math.floor(((new Date()).getTime() - new Date(user.create_at).getTime())/1000/60)}} 分前</span>
								<span v-else-if="Math.floor(((new Date()).getTime() - new Date(user.create_at).getTime())/1000)>0">{{Math.floor(((new Date()).getTime() - new Date(user.create_at).getTime())/1000)}} 秒前</span>
					      	</p>
					    </div>
					</div>

				    <div class='panel'>
						<div class='header'>
						    <span class='col_fade'>最近创建的话题</span>
						</div
						<div class='cell'>
							<div v-if="user.recent_topics?user.recent_topics.length:''">
							    <el-row v-for="topic,index in user.recent_topics" :key="index" class="content-detail">
									<el-col :span="1">
										<!-- <router-link :to="{name:'user',params:{loginname:topic.author.loginname}}"> -->
											<img width="30" :src="topic.author.avatar_url" alt="">
										<!-- </router-link> -->
									</el-col>
									<el-col :span="16" :offset="2" style="overflow:hidden" class="content-title">
										<router-link :to="{name:'topic',params:{id:topic.id}}" style="color:#000">
											<p id="UT">{{topic.title}}</p>
										</router-link>
									</el-col>
									<el-col :span="4" :offset="1" class="content-time" style="">
										<div v-if="Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60/24/30)>0">{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60/24/30)}} 月前</div> 
										<div v-else-if="Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60/24)>0">{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60/24)}} 天前</div> 
										<div v-else-if="Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60)>0">{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60)}} 小时前</div> 
										<div v-else-if="Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60)>0">{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60)}} 小时前</div> 
										<div v-else>{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000)}} 秒前</div> 
									</el-col>
								</el-row>
							</div>
							<div v-else>
								<el-row>
									<el-col :span="16" :offset="4">
										<h4 style="color:#13CE66">你还没有创建话题,快去创建吧</h4>
									</el-col>
								</el-row>
							</div>
						
						</div>
				    </div>

				<div class='panel'>
				    <div class='header'>
				      <span class='col_fade'>最近参与的话题</span>
				    </div>
				    <div class='cell'>
				    	<div v-if="user.recent_replies?user.recent_replies.length:''">
						    <el-row v-for="topic,index in user.recent_replies" :key="index" class="content-detail">
									<el-col :span="1">
										<!-- <router-link :to="{name:'user',params:{loginname:topic.author.loginname}}"> -->
											<img width="30" :src="topic.author.avatar_url" alt="">
										<!-- </router-link> -->
									</el-col>
									<el-col :span="16" :offset="2" style="overflow:hidden" class="content-title">
										<router-link :to="{name:'topic',params:{id:topic.id}}" style="color:#000">
											<p id="UT">{{topic.title}}</p>
										</router-link>
									</el-col>
									<el-col :span="5" :offset="0" class="content-time" style="">
										<div v-if="Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60/24/30)>0">{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60/24/30)}} 月前</div> 
										<div v-else-if="Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60/24)>0">{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60/24)}} 天前</div> 
										<div v-else-if="Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60)>0">{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60)}} 小时前</div> 
										<div v-else-if="Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60)>0">{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60)}} 小时前</div> 
										<div v-else>{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000)}} 秒前</div> 
									</el-col>
							</el-row>
						</div>	
						<div v-else>
							<el-row>
								<el-col :span="16" :offset="4">
									<h4 style="color:#13CE66">最近无参与话题,快去参与吧</h4>
								</el-col>
							</el-row>
						</div>
					</div>
				    
				</div>
			</div>
		</div>
		<div v-else  id='main'>
			<div  class="loginB">
		  		<div class="loginB-1">
				</div>
		  		<h1 class="loginsuccess"><strong>请登录!</strong></h1>
		  		<p style="text-align:center"><router-link to="/login" style="border-bottom:1px solid #337AB7">点击登录</router-link></p>
		  	</div>
		</div>
		
	</div>
</template>
<script>
	export default{
		data(){
			return{
				loginname:'',
				user:{},
				userstore:{},
				collections:[]
			}
		},
		created(){
			// console.log(JSON.parse(localStorage.getItem('user')))
			this.userstore = JSON.parse(localStorage.getItem('user'))
			console.log(this.userstore)
			this.loginname = this.userstore.loginname;
			this.$http.get('/user/'+this.loginname).then(function(msg){
				// console.log(msg)
				// console.log(msg.data)
				this.user = msg.data.data
				// console.log(this.user)
			}.bind(this)).catch(function(err){
				console.log(err)
			})

			// 收藏的话题
			this.$http.get('/topic_collect/'+this.loginname).then(function(msg2){
				// console.log(msg2),
				this.collections = msg2.data.data
				console.log(this.collections.length)
			}.bind(this)).catch(function(err){
				console.log(err)
			})		
		},
		updated(){
      		// 数据更新完成
	        var reg = /^http.*?/;

	      
	      $('img').each(function(index){
	        // console.log($(this));
	        var res = reg.exec($(this).attr('src'));
	        if(!res){
	          $(this).attr('src','http:'+$(this).attr('src'))
	        }
	      });
	    }
	}
</script>
<style>
	.center #main img{
		width:30px;
	}
	.span-success{
		color:#fff;
	}
	.loginB{
		width:90%;
		height:35%;
		margin:0 auto;
		background:#F0F0F0;
		margin-top:50px;
		border:0px solid #ccc;
		border-radius:3px;
		position:relative;
	}
	.loginB-1{
		width:100%;
		height:30px;
		margin:20px 0;
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
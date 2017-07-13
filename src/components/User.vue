<template>
	<div class="user">
		<!-- <h3>用户详情</h3> -->
		<div class="user-content">
			<div id='main'>
				<div id='content'>
					<div class='panel'>
					    <div class='header'>
					      <ul class='breadcrumb'>
					        <li><router-link to="/">主页</router-link><span class='divider'>/用户详情</span></li>
					      </ul>
					    </div>
					    <!-- <div id='sidebar'>
						  	<div class="panel">
						    	<div class='inner'>
						      		<a href='/topic/create' id='create_topic_btn'>
						        	<span class='span-success'>发布话题</span>
							      	</a>
							    </div>
						  	</div>
						</div> -->

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
							              <span class='big collect-topic-count'>{{collections.length}}</span>个话题收藏
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
				    </div>

				   <div class='panel'>
				    <div class='header'>
				      <span class='col_fade'>最近参与的话题</span>
				    </div>
				    <div class='cell'>
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
								<el-col :span="4" :offset="1" class="content-time" style="">
									<div v-if="Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60/24/30)>0">{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60/24/30)}} 月前</div> 
									<div v-else-if="Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60/24)>0">{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60/24)}} 天前</div> 
									<div v-else-if="Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60)>0">{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60)}} 小时前</div> 
									<div v-else-if="Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60)>0">{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60)}} 小时前</div> 
									<div v-else>{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000)}} 秒前</div> 
								</el-col>
							</el-row>	
					</div>
				    
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
				loginname:'',
				user:{},
				collections:[]
			}
		},
		created(){
			// console.log(this.$route.params.loginname);
			this.loginname = this.$route.params.loginname;
			this.$http.get('/user/'+this.loginname,{}).then(function(msg){
				// console.log(msg)
				// console.log(msg.data)
				this.user = msg.data.data
				console.log(this.user)
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
	.user #main img{
		width:30px;
	}
	#CT{
		white-space: nowrap;
		text-overflow:ellipsis;
		margin:0 0;
	}
	.content-detail{
		margin-top: 20px;
		border-bottom: 1px solid #eee;
		font-size:14px;
	}
</style>
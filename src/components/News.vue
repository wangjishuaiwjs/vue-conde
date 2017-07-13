<template>
	<div class="news">
		<!-- <h3>消息通知</h3> -->
		<div class="news-content">
			<div id='main'>
				<div id='content'>
				    <div class='panel'>
					    <div class='header'>
					      <ul class='breadcrumb'>
					        <li><router-link to="/">主页</router-link><span class='divider'></span></li>
					        <li class='active'>新消息</li>
					      </ul>
					    </div>
				    
					    <div class='inner'>
					    	<p v-if="unRead.length==0">无消息</p>
					    	<div v-else class='cell'  v-for="news in unRead">
								<span style="white-space: nowrap;text-overflow:ellipsis;margin:0 0;">
									<router-link :to="{name:'user',params:{loginname:news.author.loginname}}">
										{{news.author.loginname}}
									</router-link>
									回复了你的话题
									<router-link :to="{name:'topic',params:{id:news.topic.id}}" style="color:#000">
										<span style="white-space: nowrap;text-overflow:ellipsis;overflow:hidden;margin:0 0;color:#337AB7">
											{{news.topic.title}}
										</span>
									</router-link>
									<!-- <el-button style="margin-bottom:10px" size="small" type="success" @click="setRead">标记已读</el-button> -->
								</span>
						    </div>
					    </div>
				    </div>
					
					<el-button style="margin-bottom:10px" size="small" type="success" @click="setRead">全部标记已读</el-button>

				    <div class='panel'>
				    	<!-- <div class='header'>
				    		<span class='col_fade'>过往信息</span>
				    	</div> -->
				    	<div class='header'>
					      <ul class='breadcrumb'>
					        <li class='active'>过往消息</li>
					      </ul>
					    </div>
				    
				    	<p v-if="read.length==0">无消息</p>
						<div v-else class='cell'  v-for="news in read">
							<span style="white-space: nowrap;text-overflow:ellipsis;margin:0 0;">
								<router-link :to="{name:'user',params:{loginname:news.author.loginname}}">
									{{news.author.loginname}}
								</router-link>
								回复了你的话题
								<router-link :to="{name:'topic',params:{id:news.topic.id}}" style="color:#000">
									<span style="white-space: nowrap;text-overflow:ellipsis;overflow:hidden;margin:0 0;color:#337AB7">
										{{news.topic.title}}
									</span>
								</router-link>
							</span>
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
				token:'',
				read:[],
				unRead:[]
			}
		},
		methods:{
			setRead(){
				this.$http.post('/message/mark_all',{
					accesstoken :this.token
				}).then(function(msg){
					console.log(msg)
				}).catch(function(err){
					console.log(err)
				})
			}
		},
		created:function(){
			this.token = JSON.parse(localStorage.getItem('token'))
			console.log(this.token)

			this.$http.get('/messages',{
				params:{
					// accesstoken :'d29c4930-ce10-4a8d-9b0f-9f43233da3d0'
					accesstoken :this.token
				}
			}).then(function(msg){
				// console.log(msg)
				this.read = msg.data.data.has_read_messages;
				this.unRead = msg.data.data.hasnot_read_messages;
				// console.log(this.read)
				// console.log(this.unRead)
			}.bind(this)).catch(function(err){
				console.log(err);	
			})
		}
	}
</script>
<style>
	.cell{
		border-bottom: 1px solid #eee;
		padding:10px 5px;
	}
</style>

<!-- 2595e48d-cd06-4bf3-b3d2-1ebb2c9ac837 -->

<template>
	<div class="topic">

	    <img v-if="content.length==0" width="100%" src="../assets/imgs/loading.gif" alt="">
		<div v-else class="topic-detail">
			<el-row>
				<el-col :span="20" :offset="1">
					<h3><el-button type="success" size="mini" v-if="content.top">置顶</el-button>
					<el-button type="success" size="mini" v-else-if="content.good">精华</el-button>
					<el-button type="default" size="mini" v-else>{{content.tab=='share'?'分享':(content.tab=='job'?'招聘':(content.tab=='ask'?'问答':'测试'))}}</el-button>
					<b>{{content.title}}</b></h3>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="20" :offset="1" class="topic-author">
					<ul>
						<li>
							<b>·</b> 发布于:
							<span v-if="Math.floor(((new Date()).getTime() - new Date(content.create_at).getTime())/1000/60/60/24/30)>0">{{Math.floor(((new Date()).getTime() - new Date(content.create_at).getTime())/1000/60/60/24/30)}} 月前</span>
							<span v-else-if="Math.floor(((new Date()).getTime() - new Date(content.create_at).getTime())/1000/60/60/24)>0">{{Math.floor(((new Date()).getTime() - new Date(content.create_at).getTime())/1000/60/60/24)}} 天前</span>
							<span v-else-if="Math.floor(((new Date()).getTime() - new Date(content.create_at).getTime())/1000/60/60)>0">{{Math.floor(((new Date()).getTime() - new Date(content.create_at).getTime())/1000/60/60)}} 小时前</span>
							<span v-else-if="Math.floor(((new Date()).getTime() - new Date(content.create_at).getTime())/1000/60)>0">{{Math.floor(((new Date()).getTime() - new Date(content.create_at).getTime())/1000/60)}} 分前</span>
							<span v-else-if="Math.floor(((new Date()).getTime() - new Date(content.create_at).getTime())/1000)>0">{{Math.floor(((new Date()).getTime() - new Date(content.create_at).getTime())/1000)}} 秒前</span>

							<!-- {{content.create_at}} -->
							<!-- {{Math.floor(((new Date()).getTime() - new Date(content.create_at).getTime())/1000/60/60/24/30)}} -->
						</li>
						<li><b>·</b> 作者:{{content.author?content.author.loginname:''}}</li>
						<li><b>·</b> {{content.visit_count}}次浏览</li> 
						<li><b>·</b> 来自 
							<!-- <span>{{content.tab}}</span> -->
							{{content.tab=='share'?'分享':(content.tab="job"?'招聘':(content.tab=='ask'?'问答':'客户端测试'))}}
						</li> 
					</ul>
				</el-col>
			</el-row>
			<el-row v-if="token" class="collection">
				<el-col :span="2" :offset="1">
					<!-- <router-link :to="{name:'updatetop',params:{topicdetail:content}}"> -->
					<router-link :to="{name:'updatetop',params:{topic_id:content.id,title:content.title,tab:content.tab,content:content.content}}">
						<i v-if="isMytopic" class="el-icon-edit"></i>
						<div v-else style="width:10px;color:transparent">1</div>
					</router-link>
					
				</el-col>
				<el-col :span="2" :offset="1">
					<i v-if="isMytopic" class="el-icon-delete"></i>
					<div v-else style="width:10px;color:transparent">1</div>
				</el-col>
				<el-col :span="5" :offset="13">
					<el-button v-if="content.is_collect" @click="collect" type="success" style="background:#ccc;color:#000;border:1px solid #ccc">取消收藏</el-button>
					<el-button v-else @click="decollect" :span="4" type="success">收藏</el-button>
				</el-col>
			</el-row>
			<el-row class="topic-fen"><div></div></el-row>
			<el-row class="topic-data" v-html="content.content"></el-row>
			<el-row class="topic-RcountR">
				<el-col :span="24">{{content.reply_count}} 条回复</el-col>
			</el-row>
			<!-- <h3>{{content.replies?content.replies.length:''}}</h3> -->
			<!-- 回复内容 -->
			<el-row v-if="content.replies">
				<el-row v-for="reply,index in content.replies" :key="index"  class="reply-AM">
					<el-row>
						<el-col :span="1"><img :src="reply.author.avatar_url" alt="" style="width:30px"></el-col>
						<el-col :span="16" :offset="1">
							{{reply.author.loginname}}
							<span class="topic-RAT">{{index+1}} 楼</span> <b>·</b>
							<span class="topic-RAT" v-if="Math.floor(((new Date()).getTime() - new Date(reply.create_at).getTime())/1000/60/60/24/30)>0">{{Math.floor(((new Date()).getTime() - new Date(reply.create_at).getTime())/1000/60/60/24/30)}} 月前</span> 
							<span class="topic-RAT" v-else-if="Math.floor(((new Date()).getTime() - new Date(reply.create_at).getTime())/1000/60/60/24)>0">{{Math.floor(((new Date()).getTime() - new Date(reply.create_at).getTime())/1000/60/60/24)}} 天前</span> 
							<span class="topic-RAT" v-else-if="Math.floor(((new Date()).getTime() - new Date(reply.create_at).getTime())/1000/60/60)>0">{{Math.floor(((new Date()).getTime() - new Date(reply.create_at).getTime())/1000/60/60)}} 小时前</span> 
							<span class="topic-RAT" v-else-if="Math.floor(((new Date()).getTime() - new Date(reply.create_at).getTime())/1000/60)>0">{{Math.floor(((new Date()).getTime() - new Date(reply.create_at).getTime())/1000/60)}} 小时前</span> 
							<span class="topic-RAT" v-else>{{Math.floor(((new Date()).getTime() - new Date(reply.create_at).getTime())/1000)}} 秒前</span> 
						</el-col>
						<el-col :span="4" :offset="2" class="goodhand" v-show="reply.ups.length">
						<!-- <el-col :span="4" :offset="2" class="goodhand"> -->
							<router-link to="">
								<span class="glyphicon glyphicon-thumbs-up" @click="clickGood"></span>
								<span>{{reply.ups.length}}</span>
							</router-link>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24" v-html="reply.content"></el-col>
					</el-row>
				</el-row>
			</el-row>
			<!-- <el-row v-else>
				<h3>暂无回复</h3>
			</el-row> -->
			<el-row v-if="token" class="myreply">
				<el-col :span="24">
					添加回复
				</el-col>
			</el-row>
			<el-row v-if="token">
				<el-input type="textarea" :rows="10" placeholder="请输入发布话题内容" v-model="myreply">
				</el-input>
				<div class="setfen"></div>
			</el-row>
			<el-row v-if="token">
				<el-col :span="5" :offset="19">
					<!-- <el-button class="topicsibmit" type="success">发布</el-button> -->
					<el-button class="topicsibmit" type="success" @click="setMyreply">发布</el-button>
				</el-col>
			</el-row>
			<div class="setfen"></div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				replybgC : 'replybgC',
				topicId : this.$route.params.id,
				content:{},
				token : '',
				user : {},
				isMytopic : false,
				myreply:''
			}
		},
		methods:{
			clickGood(){

			},
			// 点击收藏
			collect(){
				// this.content.is_collect = !this.content.is_collect
				this.$http.post('/topic_collect/collect',{
					// accesstoken :this.token,
					accesstoken :'d29c4930-ce10-4a8d-9b0f-9f43233da3d0',
					topic_id:this.topicId
				}).then(function(msg){
					// console.log(msg)
					// console.log(this.content.is_collect)
					// this.content.is_collect = true;
				}.bind(this)).catch(function(err){
					console.log(err)
				})
			},
			// 取消收藏
			decollect(){
				this.content.is_collect = !this.content.is_collect
				console.log(this.token)
				// console.log(this.content.is_collect)
				this.$http.post('/topic_collect/de_collect',{
					// accesstoken :this.token,
					accesstoken :'d29c4930-ce10-4a8d-9b0f-9f43233da3d0',
					topic_id:this.topicId
				}).then(function(msg){
					// console.log(msg)
					// console.log(this.content.is_collect)
					// this.content.is_collect = false

				}.bind(this)).catch(function(err){
					console.log(err)
				})
			},
			// 添加回复
			setMyreply(){
				console.log(this.myreply);
				console.log(typeof this.myreply);
				console.log(this.token)
				console.log(typeof this.token)
				this.$http.post('/topic/'+this.topicId+'/replies',{
					// accesstoken:this.token,
					accesstoken:'2595e48d-cd06-4bf3-b3d2-1ebb2c9ac837',
					content:this.myreply,
					// content:'测试2'
					// reply_id:
				}).then(function(msg){
					// console.log(msg)
				}).catch(function(err){
					console.log(err)
				});

				// 再次调用让回复显示
				this.$http.get('/topic/'+this.topicId,{
					parmas:{
						accesstoken :this.token
					}
				}).then(function(msg){
					// console.log(msg.data.data);
					this.content = msg.data.data
					// console.log(this.content)
					// console.log(this.content.author.loginname)
					// 判断id是否相同，决定是不是自己的话题，判断权限
					this.isMytopic = ((this.content.author.loginname).indexOf(this.user.loginname))==0?true:false
					// console.log(this.user.loginname)
					// console.log((this.content.author.loginname).indexOf(this.user.loginname))
				}.bind(this)).catch(function(err){
					console.log(err)
				})


			},
			// 点赞回复
			clickGood(){
				// console.log(111)
				console.log(this.content.replies)
				// console.log(this.floor)
				// this.$http.post('/reply/'this.'/ups ')

			}
		},
		created:function(){
			// 读取
			this.token = localStorage.getItem('token')
			this.user = JSON.parse(localStorage.getItem('user'))
			console.log(this.token)
			this.$http.get('/topic/'+this.topicId,{
				parmas:{
					accesstoken :this.token
				}
			}).then(function(msg){
				// console.log(msg.data.data);
				this.content = msg.data.data
				console.log(this.content)
				// console.log(this.content.author.loginname)
				// 判断id是否相同，决定是不是自己的话题，判断权限
				this.isMytopic = ((this.content.author.loginname).indexOf(this.user.loginname))==0?true:false
				// console.log(this.user.loginname)
				// console.log((this.content.author.loginname).indexOf(this.user.loginname))
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
	.topic{
		 background:#E1E1E1;
		 /*height:auto;*/
	}
	.topic-detail{
		padding:5px;
		background:#fff;
		position:relative;
	}
	.topic-author{
		font-size:12px;
		color:#999;
	}
	.topic-author>ul>li{
		display:block;
		float:left;
		margin-left:10px;
	}
	.topic-fen>div{
		width:100%;
		border-top:1px solid #ddd;
		margin-top:10px;
	}
	.collection{
		margin:5px 20px 0 0;
		/*border-bottom: 1px solid #eee;*/
	}
	.collection i{
		font-size:18px;
		color:#999;
		display:block;
		padding:3px 3px;
		margin-top:0.625rem;
	}
	.topic img{
		width:100%;
	}
	/*data数据中话题的具体部分*/
	h1{	
		width:100%;
		border-bottom:1px solid #ddd;
		margin-top:10px;
	}
	h2{
		font-size:26px;
		width:100%;
		border-bottom:1px solid #ddd;
		margin-top:10px;
	}
	.topic-data p{
		line-height:2;
	}
	.topic-data ul>li{
		list-style-type:square;
	}

	/*评论*/
	.topic-RcountR{
		background:#eee;
		line-height:3;
	}
	.markdown-text>p{
		line-height:2;
	}
	.markdown-text>p>a{
		display:none;
	}
	.topic-RAT{
		color:#0088CC;
		font-size:10px;
	}
	.replybgC{
		background:#F4FCF0;
	}
	.reply-AM{
		margin:5px 10px 0 0;
		border-bottom: 1px solid #eee;
	}
	/*添加回复部分*/
	.myreply{
		font-size:16px;
		padding:0 10px;
		line-height:2;
		background:#eee;
		border-radius:2px;
		margin:10px 0;
	}
	/*.goodhand:hover{
		display:block;
	}*/
</style>
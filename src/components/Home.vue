<template>
	<div id="cnode">
		<!-- 话题也头部导航栏 -->
		 <!-- <img v-if="topics.length==0" width="100%" src="../assets/imgs/loading.gif" alt=""> -->
		<div>
			<div class="header">
				<el-row class="header-cl">
					<el-col :span="3" :offset="1" class="header-click">
						<div class="headerB btBg">
							<router-link to="/cnode?tab=all" >全部</router-link>
						</div>
					</el-col>
					<el-col :span="3" class="header-click"><div class="headerB"><router-link to="/cnode?tab=good">精华</router-link></div></el-col>
					<el-col :span="3" class="header-click"><div class="headerB"><router-link to="/cnode?tab=ask">问答</router-link></div></el-col>
					<el-col :span="3" class="header-click"><div class="headerB"><router-link to="/cnode?tab=job">招聘</router-link></div></el-col>
					<el-col :span="3" class="header-click"><div class="headerB"><router-link to="/cnode?tab=share">分享</router-link></div></el-col>
					<el-col :span="5" class="header-click"><div class="headerB"><router-link to="/cnode?tab=dev">客户端测试</router-link></div></el-col>
				</el-row>
			</div>
			<!-- 话题内容 -->
			 <img v-if="topics.length==0" width="100%" src="../assets/imgs/loading.gif" alt="">
			<div v-else class="content">
				<el-row v-for="topic,index in topics" :key="index" class="content-detail">
					<el-col :span="1">
						<router-link :to="{name:'user',params:{loginname:topic.author.loginname}}">
							<img width="30" :src="topic.author.avatar_url" alt="">
						</router-link>
					</el-col>
					<!-- <el-col :span="3" :offset="2"><span style="font-size:10px;color:#999"> {{topic.reply_count}} / {{topic.visit_count}} </span></el-col> -->
					<el-col :span="2" :offset="2" class="">
						<el-button type="success" size="mini" v-if="topic.top">置顶</el-button>
						<el-button type="success" size="mini" v-else-if="topic.good">精华</el-button>
						<el-button type="default" size="mini" class="default-button" v-else>{{topic.tab=='share'?'分享':(topic.tab=='job'?'招聘':(topic.tab=='ask'?'问答':'测试'))}}</el-button>
					</el-col>
					<el-col :span="13" :offset="1" style="overflow:hidden" class="content-title">
						<router-link :to="{name:'topic',params:{id:topic.id}}" style="color:#000">
							<p id="CT">{{topic.title}}</p>
							<span style="color:#aaa;font-size:10px">{{topic.reply_count}}/{{topic.visit_count}} </span>
						</router-link>
					</el-col>
					<el-col :span="4" :offset="1" class="content-time" style="">
						<div v-if="Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60/24/30)>0">{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60/24/30)}} 月前</div> 
						<div v-else-if="Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60/24)>0">{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60/24)}} 天前</div> 
						<div v-else-if="Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60)>0">{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60)}} 小时前</div> 
						<div v-else-if="Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60)>0">{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60)}} 小时前</div> 
						<div v-else>{{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000)}} 秒前</div> 


						<!-- {{((new Date()).getTime() - new Date(topic.last_reply_at).getTime())}} -->
						<!-- {{Math.floor(((new Date()).getTime() - new Date(topic.last_reply_at).getTime())/1000/60/60/24)}} -->
					</el-col>
				</el-row>	
			</div>
			<!-- 分页 -->
			<div class="block">
				<router-link :to="'/cnode?tab='+tab+'&page=currentPage3'">
					<el-pagination @current-change="handleCurrentChange" :current-page.sync="page" layout="prev, pager, next" :total="1000">
					</el-pagination>
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
    $(function(){
    	// console.log(111)
    	// console.log($('.headerB'))
    	$('.headerB').click(function(){
    		// console.log(111)
    		$('.btBg').removeAttr('class','btBg')
    		$(this).attr('class','btBg')

    	})
    })
  	
 	
	export default {
		data(){
			return {
				tab : '',
				topics:[],
		  		// page : 1,
		  		page :1,
		        loginname:[],
			}
		},
		methods:{
			handleCurrentChange(val){
				// console.log(val)
				 this.page = val
				 // console.log(this.currentPage3)
				 this.getTopics(this.$route.query.tab,this.$route.query.page)
			},
			getTopics(tab,page){
				// 根据tab请求对应的分类
				tab = tab?tab:'all';

				this.tab = tab;
				// console.log(tab)
				// 分页
				page = page?page:(this.page)

				page = this.page

				// console.log(page)
				// console.log(this.page)
				// console.log(111)
				// 发送请求
				this.$http.get('/topics',{
					params:{
						tab : tab,
						page: page,
						// limit : 40
					}
				}).then(function(msg){
					this.topics = msg.data.data;
					// console.log(this.topics)
					// console.log(this.topics[0].author.loginname)
				}.bind(this)).catch(function(err){
					console.log(err);
				})
			}
			
			
		},
		created(){
			// console.log(this.$route.query);

			// 进入该页面时，调用
			this.getTopics(this.$route.query.tab,this.$route.query.page)
		},

		// 监测
		watch:{
			'$route':function(){
				// console.log(this.$route.query);

				this.getTopics(this.$route.query.tab,this.$route.query.page)
			}
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
	#cnode{
		text-align:left;
		
	}
	.header{
		background:#F6F6F6;
	}
	.header-click>div{
		text-align:center;
	}
	.header a{
		color:#80BD01;
		/*color:#fff;*/
		font-size:14px;
		
	}
	.header .el-col{
		padding:10px 0;
	}
	.content{
		padding:5px;
		background:#fff;
	}
	.content-detail{
		margin-top: 20px;
		border-bottom: 1px solid #eee;
		font-size:14px;
	}
	/*.active{

	}*/
	.content-title:hover{
		display:block;
		/*display:underline;*/
		overflow:hidden;
	}
	#CT{
		white-space: nowrap;
		text-overflow:ellipsis;
		margin:0 0;
	}
	.content-time>div{
		font-size:10px;
		color:#777;
		text-align:center;
	}
	.default-button{
		background:#ddd;
	}
	.btBg{
		background:#13CE66;
		color:#fff;
		padding:2px 0;
		border-radius:4px;
	}
	.btBg>a{
		color:#fff;
		text-decoration:none;
	}

</style>

<!-- Token: d29c4930-ce10-4a8d-9b0f-9f43233da3d0 -->
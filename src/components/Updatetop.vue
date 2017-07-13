<template>
	<div class="updatetop">
		<!-- <h3>编辑</h3> -->
		

		<div class="updatetop-content">
				<div id='main'>

					<div id='content'>
						<div class='panel'>
							<div class='header'>
							  <ul class='breadcrumb'>
							    <li><a href='/'>主页</a><span class='divider'></span></li>
							    <li class='active'>编辑话题</li>
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
								<el-button type="success">请输入话题标题</el-button>
								<el-input v-model="input" placeholder="请输入话题标题"></el-input>
								<div class="setfen"></div>
								<!-- {{input}} -->
								
								<!-- <el-button type="success">原话提内容</el-button>
								<el-input type="textarea" :rows="8" placeholder="">
									<div v-html="textarea"></div>
								</el-input>
 -->
								<el-button type="success">请输入修改话题</el-button>
								<el-input type="textarea" :rows="8" placeholder="请输入修改的话题" v-model="textarea">
								</el-input>
								<div class="setfen"></div>
								<!-- {{textarea}} -->
							</div>
							<el-row>
								<el-col :span="6" :offset="18">
									<el-button class="topicsibmit" type="success" @click="updateTopic">发布</el-button>
								</el-col>
							</el-row>
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
				radio2:'',
				input: '',
				textarea:'',
				topic_id:''
			}
		},
		methods:{
			updateTopic(){
				this.radio2 = this.radio2==3?'share':(this.radio2==6?'ask':(this.radio2==9?'job':'dev'))
				console.log(1111)
				console.log(this.input)
				console.log(this.radio2)
				console.log(this.textarea)
				console.log(this.topic_id)
				this.$http.post('/topics/update',{
					accesstoken:this.token,
					topic_id:this.topic_id,
					title:this.input,
					tab:this.radio2,
					content:this.textarea
				}).then(function(msg){
					console.log(msg)
				}).catch(function(err){
					console.log(err)
				})
			}
		},
		created(){
			// console.log(this.$route.params.topic_id)
			// console.log(this.$route.params.title)
			// console.log(this.$route.params.tab)
			// console.log(this.$route.params.content)
			// console.log(this.$route.params.tab=='share'?3:(this.$route.params.tab=='ask'?6:(this.$route.params.tab=='job'?9:12)))
			this.topic_id=(this.$route.params.topic_id)
			this.radio2=(this.$route.params.tab=='share'?3:(this.$route.params.tab=='ask'?6:(this.$route.params.tab=='job'?9:12)))
			this.input=(this.$route.params.title)
			this.textarea=(this.$route.params.content)
			this.token = JSON.parse(localStorage.getItem('token'));
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
</style>
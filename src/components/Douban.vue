<template>
	<div class="">
		<h3>豆瓣网</h3>
		<h3>正在上映的电影 </h3>
		<ul>
			<li v-for="movie in movies">
				<img :src="movie.images.large" alt="">
				<p v-text="movie.title"></p>
				<p>
					
				</p>
			</li>
		</ul>

	</div>
</template>
<script>
	import jsonp from 'jsonp'

	export default	{
		data(){
			return {
				movies : []
			}
		},
		created : function(){
			var cthis = this
			jsonp('https://api.douban.com/v2/movie/in_theaters',function(err,datas){
				console.log(datas)
				datas.subjects.forEach(function(item){
					console.log(item)
					cthis.movies.push(item);
					// console.log(cthis.movies)
				})
			})
		}
	}
</script>
<style>
	
</style>	
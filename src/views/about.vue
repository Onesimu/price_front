<template>
	<section>

		<slider></slider>

		<div class="tile">
				<div class="column is-6 is-offset-3">
					<div class="box has-text-centered">
						<h1 class="title is-2">联系我们</h1>
						<h2 class="title">同泰物流（深圳）有限公司</h2>
							<p class="social is-large">
							地址：河北石家庄
							<br> 邮编：05000
							<br> 电话：400-004-0000
							<br> 传真：002-8888888、020-58393074
							<br> 邮箱：market@sina.cn
						</p>
					</div>
				</div>
		</div>
		
	</section>
</template>

<style lang="scss" scoped>
  .has-margin-3 {
    margin-top: 1rem;
  }

  .is-large {
    font-size: 1.5rem;
    line-height: 2rem
  }

  .tile {
    margin-top: 1rem;
    background: url('../assets/about_banner.png');
  }

  .box {
    background-color: rgba(255, 255, 255, 0.7);
  }
</style>

<script>
  import slider from '../components/slider'
  export default {
    components: {
      slider
    },
  }
</script>

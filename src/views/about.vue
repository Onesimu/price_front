<template>
	<section>

		<slider></slider>

    <iframe src="./about.html" width="100%" height="3920" seamless scrolling="no"></iframe>

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

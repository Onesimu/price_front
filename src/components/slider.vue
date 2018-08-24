<template>
	<div class="baner-box">
		<ul class="banner">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
	$banner-height:30vw;
	ul li {
		list-style: none;
	}

	li:nth-child(1) {
		background: url('../assets/banner.jpg');
	}

	li:nth-child(2) {
		background: url('../assets/banner1.jpg');
	}

	li:nth-child(3) {
		background: url('../assets/banner3.png');
	}

	li:nth-child(4) {
		background: url('../assets/banner4.png');
	}

	.baner-box {
		position: relative;
		width: 100%;
		height: $banner-height;
		overflow: hidden;
	}

	.banner {
		width: 400%;
		position: absolute;
		left: 0;
		animation-name: bannerMove;
		animation-duration: 8s;
		animation-iteration-count: infinite;
	}

	@keyframes bannerMove {
		0%,
		30% {
			left: 0;
		}
		35%,
		65% {
			left: -100%;
		}
		70%,
		99% {
			left: -200%;
		}
		100% {
			left: -300%;
		}
	}

	.banner li {
		float: left;
		width: 25%;
		height: $banner-height;
	}
</style>

<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {},
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #fafafa;
	}

	@import "./styles/main.css";
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	/* #ifndef APP-NVUE */
	/* 引入animate动画库 */
	@import url("./styles/animate.css");
	/* #endif */
	@import url("./styles/free.css");
</style>
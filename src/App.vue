<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
page {
  height: 100%;
  background-color: #fafafa;
}

@import "./styles/main.css";

@import "@/uni_modules/uview-ui/index.scss";

@import "./styles/animate.css";
@import "./styles/free.css";
</style>

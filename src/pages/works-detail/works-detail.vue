<template>
  <view class="main">
    <view @click="isUp && open()">
      <u-status-bar />
      <view
        class="flex justify-between align-center main__header"
        :style="{ height: $u.addUnit($u.getPx(44)) }"
      >
        <view class="ml-3" @click="back">
          <u-icon color="#ffffff" name="arrow-left"></u-icon>
        </view>
        <view class="text-white main__header-title">作品详情</view>
        <view class="mr-3"></view>
      </view>
    </view>
    <view
      class="main__content w-100 h-100 flex justify-center align-center"
      :style="{ height: $u.addUnit($u.getPx(getImageHeight)) }"
      @click="handleGo"
    >
      <u--image
        :showLoading="true"
        :lazy-load="true"
        :src="dataInfo.url"
        :fade="true"
        mode="aspectFill"
      ></u--image>
    </view>
    <u-popup :show="show" :overlay="false" :round="20" mode="bottom">
      <view>
        <view
          class="flex justify-center align-center"
          @click="open"
          @touchmove="handleMove"
          @touchend="handleEnd"
          @touchstart="handleStart"
        >
          <view class="popup__move"></view>
        </view>
        <scroll-view
          scroll-y="true"
          :style="{ height: $u.addUnit($u.getPx(height - 60)) }"
        >
          <view class="popup__content mx-4">
            <view class="popup__content__title">{{ dataInfo.title }}</view>
            <view class="popup__content__sub">{{ dataInfo.subTitle }}</view>
            <view class="popup__content__pro">作品简介</view>
            <view class="popup__content__dec">{{ dataInfo.description }} </view>
          </view>
        </scroll-view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { findByIdWorksDetailApi } from "@/api/api.js";
import { isEmpty } from "lodash-es";
import { showLoading, hideLoading, showToast } from "@/utils/loading.js";
const DEFINE_MODEL_HEIGHT = 280;
export default {
  data() {
    return {
      id: null,
      show: false,
      // popup 最后的高度
      height: DEFINE_MODEL_HEIGHT,
      isUp: false,
      custom: {},
      // 默认的popup高度
      recordHeight: DEFINE_MODEL_HEIGHT,
      // 手势滑动的高度
      currentHeight: 0,
      // 去除appbar和状态栏剩余的高度
      fullHeight: 0,
      // 半屏高度
      bScreenHeight: 0,
      // 屏幕高度
      screenHeight: 0,
      // 状态栏的高度
      statusBarHeight: 0,

      dataInfo: {
        id: "",
        title: "",
        subTitle: "",
        description: "",
        url: "",
      },
    };
  },
  computed: {
    getImageHeight() {
      const appbarHeight = 44;
      return (
        this.screenHeight -
        this.statusBarHeight -
        appbarHeight -
        DEFINE_MODEL_HEIGHT -
        60
      );
    },
  },
  onLoad(e) {
    if (e && !isEmpty(e) && e.id) {
      this.id = e.id;
    } else {
      showToast("数据异常");
    }

    this.custom = wx.getMenuButtonBoundingClientRect();
    setTimeout(() => {
      this.show = true;
    }, 50);
    this.handleDefaultData();
    this.init();
  },
  methods: {
    async init() {
      try {
        showLoading();
        const res = await findByIdWorksDetailApi(this.id);

        hideLoading();
        if (isEmpty(res)) {
          showToast("数据异常");
        } else {
          const data = res[0];
          this.dataInfo = {
            id: data.Id,
            title: data.Enrollname,
            subTitle: data.Schoolname,
            description: data.Createnote,
            url: data.filenames,
          };
        }
      } catch (e) {
        hideLoading();
        showToast("发生异常");
      }
    },
    handleDefaultData() {
      this.screenHeight = uni.$u.sys().screenHeight;
      this.statusBarHeight = uni.$u.sys().statusBarHeight;

      const customHeight =
        this.custom.bottom + this.custom.top - this.statusBarHeight;
      this.fullHeight =
        this.screenHeight - customHeight - uni.$u.sys().safeAreaInsets.bottom;

      this.bScreenHeight = this.screenHeight / 2;
    },
    open() {
      if (this.isUp) {
        this.isUp = false;
        this.height = DEFINE_MODEL_HEIGHT;
      } else {
        this.isUp = true;
        this.height = this.fullHeight;
      }
    },
    back() {
      this.show = false;
      setTimeout(() => {
        uni.navigateBack();
      }, 50);
    },
    handleGo() {
      uni.navigateTo({
        url: `/pages/works-detail/works-image?url=${this.dataInfo.url}`,
      });
    },
    handleStart(e) {
      this.currentHeight = e.touches[0].clientY;
    },
    handleMove(e) {
      const height = e.changedTouches[0].clientY;
      const moveHeight = this.screenHeight - height;
      this.isUp = height - this.currentHeight > 5 ? false : true;

      if (!this.isUp && moveHeight < this.bScreenHeight) {
        this.height = DEFINE_MODEL_HEIGHT;
      } else if (moveHeight > this.bScreenHeight && this.isUp) {
        this.height = this.fullHeight;
      } else {
        this.height = moveHeight;
      }
    },

    handleEnd(e) {
      const height = e.changedTouches[0].clientY;

      const moveHeight = this.screenHeight - height;
      if (!this.isUp && moveHeight < this.bScreenHeight) {
        this.height = DEFINE_MODEL_HEIGHT;
        this.recordHeight = this.height;
      } else if (moveHeight > this.bScreenHeight && this.isUp) {
        this.height = this.fullHeight;
        this.recordHeight = this.height;
      } else {
        this.height = this.recordHeight;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #000000;

  &__header {
    background-color: transparent;

    &-title {
      font-size: 16px;
    }
  }
}

.popup__move {
  margin-top: 15px;
  margin-bottom: 40px;
  height: 5px;
  width: 50px;
  background-color: #bcbcbc;
  border-radius: 100rpx;
}

.popup__content {
  &__title {
    font-size: 40rpx;
    font-family: SourceHanSerifCN-Heavy, SourceHanSerifCN;
    font-weight: 800;
    color: #333333;
    line-height: 58rpx;
    margin-bottom: 30rpx;
  }

  &__sub {
    margin-bottom: 60rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 40rpx;
  }

  &__pro {
    margin-bottom: 40rpx;
    font-size: 40rpx;
    font-family: SourceHanSerifCN-Heavy, SourceHanSerifCN;
    font-weight: 800;
    color: #333333;
    line-height: 58rpx;
  }

  &__dec {
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 40rpx;
  }
}
</style>

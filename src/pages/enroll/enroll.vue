<template>
	<view class="enroll">
		<u-navbar leftIcon=" " placeholder title="报名入口"></u-navbar>
		<u-notice-bar text="带*的为必填项,同时身份信息一经审核通过不可更改"></u-notice-bar>
		<view class="mt-4 mx-5">
			<u--form :borderBottom="false" labelPosition="left" :model="userInfo" ref="enrollform">
				<u-form-item required label="姓&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;名" prop="name" labelWidth="160rpx"
					:borderBottom="false">
					<u--input v-model="userInfo.name" border="none" placeholder="请输入您的真实姓名"></u--input>
				</u-form-item>
				<u-form-item required label="性&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;别" prop="sex" labelWidth="160rpx"
					:borderBottom="false">
					<u-radio-group v-model="userInfo.sex">
						<u-radio :customStyle="{marginRight: '16px'}" v-for="(item, index) in sexlist" :key="index"
							:label="item.name" :name="item.name">
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item required label="电子邮箱" prop="email" labelWidth="160rpx" :borderBottom="false">
					<u--input v-model="userInfo.email" border="none" placeholder="请输入您的真实姓名"></u--input>
				</u-form-item>
				<u-form-item labelPosition="top" required label="入住身份" labelWidth="160rpx" prop="identity"
					:borderBottom="false">
					<u-radio-group v-model="userInfo.identity" placement="column">
						<u-radio :customStyle="{marginTop: '8px'}" v-for="(item, index) in identitylist" :key="index"
							:label="item.name" :name="item.name">
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item required label="参赛身份" prop="face" labelWidth="160rpx" :borderBottom="false">
					<u-radio-group v-model="userInfo.face">
						<u-radio :customStyle="{marginRight: '16px'}" v-for="(item, index) in facelist" :key="index"
							:label="item.name" :name="item.name">
						</u-radio>
					</u-radio-group>
				</u-form-item>

				<u-form-item required label="手&ensp;机&ensp;号" prop="phone" labelWidth="160rpx" :borderBottom="false">
					<u--input v-model="userInfo.phone" border="none" placeholder="请填写手机号"></u--input>
					<text slot="right" @tap="getCode" :text="tips" class="enroll-phone">{{tips}}</text>
				</u-form-item>
				<u-form-item required label="验&ensp;证&ensp;码" prop="code" labelWidth="160rpx" :borderBottom="false">
					<u--input v-model="userInfo.code" border="none" placeholder="请填写验证码"></u--input>
				</u-form-item>
			</u--form>
		</view>
		<view class="mx-4">
			<u-button type="primary" text="提交报名" shape="circle" customStyle="margin-top: 100rpx;margin-bottom: 150rpx;"
				color="linear-gradient(to right, #3ED3EA 0%, #0270EF 100%)" @click="submit"></u-button>
		</view>
		<u-code ref="uCode" @change="codeChange" seconds="20" @start="disabled = true" @end="disabled = false"></u-code>
		<u-modal :show="show" closeOnClickOverlay>
			<view class="flex-column justify-center">
				<view class="text-center">
					<image style="width: 80px;height: 80px;" src="../../static/success.png"></image>
				</view>
				<view class="text-center mt-4 enroll__success">报名成功</view>
				<view class="mt-2 enroll__success__text"> 恭喜您报名成功，请到大赛官网
					（http://www.tgcid.org）上传作品吧～</view>
			</view>
			<u-button slot="confirmButton" text="确定" type="success" shape="circle"
				color="linear-gradient(to right, #3ED3EA 0%, #0270EF 100%)" @click="() => show = false"></u-button>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				disabled: false,
				tips: '',
				value: '',
				userInfo: {
					name: '楼兰',
					sex: '',
					face: '',
					identity: '',
					phone: '',
					email: '',
					code: ''
				},
				rules: {
					name: {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					sex: {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
					email: {
						type: 'email',
						required: true,
						message: '请填写正确的电子邮箱',
						trigger: ['blur']
					},
					identity: {
						type: 'string',
						required: true,
						message: '请选择入住身份',
						trigger: ['blur', 'change']
					},
					face: {
						type: 'string',
						required: true,
						message: '请选择参赛身份',
						trigger: ['blur', 'change']
					},
					phone: [{
							type: 'string',
							required: true,
							message: '请填写手机号',
							trigger: ['blur', 'change']
						},
						{
							validator: (rule, value, callback) => {
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger: ['change', 'blur'],
						}
					],
					code: {
						type: 'string',
						required: true,
						len: 4,
						message: '请填写4位验证码',
						trigger: ['blur']
					},
				},
				sexlist: [{
						name: '男',
						disabled: false
					},
					{
						name: '女',
						disabled: false
					},
				],
				identitylist: [{
						name: '大学生（大学生创新奖）',
						disabled: false
					},
					{
						name: '非大学生（创新设计奖）',
						disabled: false
					},
				],
				facelist: [{
						name: '个人',
						disabled: false
					},
					{
						name: '团体',
						disabled: false
					}
				],
			}

		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.enrollform.setRules(this.rules)
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.enrollform.validate().then(res => {
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.enroll {
		&-phone {
			color: $uni-color-primary;
		}

		&__success {
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 50rpx;

			&__text {
				font-size: 30rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #BCBCBC;
				line-height: 42rpx;
				text-align: center;
			}
		}
	}
</style>
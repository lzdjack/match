// 通用弹出框
export function showToast(title, icon = 'none', _success, ) {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title: title,
		duration: 1500,
		mask: false,
		icon
	});
	if (_success) {
		setTimeout(_success, 1500);
	}
}
// 通用弹出框
export function showTimeOutToast(title, duration = 1500, mask = false, icon = 'none') {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	setTimeout(function() {
		uni.showToast({
			title,
			duration,
			mask,
			icon
		});
	}, 100)

}

// loading弹出框
export function showLoading(title = '正在加载', duration = 99999, mask = true, icon = 'loading') {
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

// 隐藏loading弹出框
export function hideLoading() {
	uni.hideToast()
}

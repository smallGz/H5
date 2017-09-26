var toURL = window.location.href.substring(0,location.href.lastIndexOf('/'));

var wxDefault = {
	title:'懒一点，活的简单点',
	desc:'听说，懒人改变世界，那就送你一个懒人神器。',
	imgUrl:toURL+'/images/share.jpg',
	link:toURL+'/index.html',
	success:function(){
		_czc.push(["_trackEvent", "按钮", "分享回调", "分享回调", 0, "btn"]);
	}
};

$(function(){
    didi.setShare({
		url: wxDefault.link, // 分享地址
		icon: wxDefault.imgUrl, // 分享图标
		title: wxDefault.title, // 分享标题
		content: wxDefault.desc, // 分享文案
		success: wxDefault.success
	});
});

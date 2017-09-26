//定义加载canvas
var loadCanvas;
var loadContext;
//加载进程
var loadProcess = 0;
var onShake = true;

function preLoading(){
	var loaderInterval = setInterval(function(){
		clearInterval(loaderInterval);
		$('#loading').show();
		loadCanvas = document.getElementById('loader_movie');
		loadContext = loadCanvas.getContext('2d');
		sourceLoading();
	},20)
}

function sourceLoading(){
	//存储素材
	var storageObj = {};
	var createsSourceNum = 0;

	for(var i=0;i<data.length;i++){
		if(data[i].type == 'image'){
			storageObj[data[i].name] = new Image();
			storageObj[data[i].name].src = data[i].url;
			storageObj[data[i].name].onload = function(){
				createsSourceNum++;
			}
		}else if(data[i].type == 'audio'){
			storageObj[data[i].name] = document.createElement('audio');
			storageObj[data[i].name].src = data[i].url;
			createsSourceNum++;
		}
	}
	//加载狮子吼声音
	setTimeout(function(){ storageObj['lion'].play(); },500)

	var loaderInterval = setInterval(function(){
		if(loadProcess < Math.ceil(createsSourceNum / data.length*100)){
			loadProcess++;
		}
		//清空canvas
		loadContext.clearRect(0,0,640,700);
		//重新定义canvas样式
		loadContext.font = '30px Georgia';
		loadContext.fillStyle = '#ce9c55';
		loadContext.textAlign = 'center';
		loadContext.fillText(loadProcess + '%',320,350);
		//加载完成
		if(loadProcess == 100){
			setTimeout(function(){
				//loader移除
				$('#loader').fadeOut(500);
				//index移入
				$('#index').fadeIn(500);
				//摇晃手机 触发事件
				if(window.DeviceMotionEvent){//手机支持重力感应事件
					window.addEventListener('devicemotion',deviceMotionHandler,false);
				}else{
					//手机不支持重力感应事件
					console.log('手机不支持重力感应事件');
				}
			},1000);
			//触发事件后，清除
			clearInterval(loaderInterval);
		}

	},20)

}


	var SHAKE_THRESHOLD = 3000;
	var last_update = 0;
	var x = y = z = last_x = last_y = last_z = 0;
	
function deviceMotionHandler(eventData){

    var acceleration = eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
        if ((curTime - last_update) > 100) {
            var diffTime = curTime - last_update;
            last_update = curTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
            if (speed > SHAKE_THRESHOLD) {
            	if(!on_shake)return;
				on_shake =false;
				alert('a');
                showResult();
            }
            last_x = x;
            last_y = y;
            last_z = z;
        }
}

function showResult(){
	alert('aa');
}

$(function(){
	preLoading();
})

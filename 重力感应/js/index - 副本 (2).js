
var storageObj = {};
var LoadedResource = 0;
var loadCanvas;
var loadContext;
var LoaderProcess = 0;
var on_shake =true;

var user_size = {width:0,height:0};
var movie_size = {width:0,height:0};
var body_size = {width:0,height:0};

var SHAKE_THRESHOLD = 3000;
var last_update = 0;
var x = y = z = last_x = last_y = last_z = 0;

var MovieInterval;
var MovieFrame = 0;
var result_arr = [1,2,3,4,5,6,7,8];
var try_count = 0;

//初始化
function init(){
	user_size.width = 640;
	user_size.height = window.innerHeight;
	movie_size.width = 640;
	movie_size.height = user_size.height - 100;
	
	body_size.height = movie_size.height - 320;
	body_size.width = body_size.height/600*528;
	$('#result_canvas').attr('width','640').attr('height',movie_size.height);
	$('#result_canvas').css('width','640px').attr('height',movie_size.height + 'px');
}

function pre_loader(){
	init();
	var loaderIntervel = setInterval(function(){
		clearInterval(loaderIntervel);
		$('#loading').show();
		loadCanvas = document.getElementById('loader_movie');
		loadContext = loadCanvas.getContext('2d');
		page_loader();


	},20)

}

	function page_loader(){

		//先把素材加载完
		for(var i=0;i<data.length;i++){

			if(data[i].type == 'image'){
				storageObj[data[i].name] = new Image();
				storageObj[data[i].name].src = data[i].url;
				storageObj[data[i].name].onload = function(){
					LoadedResource++;
				}
			}else if(data[i].type == 'audio'){
				storageObj[data[i].name] = document.createElement('audio');
				storageObj[data[i].name].src = data[i].url;
				LoadedResource++;
			}

		}

		setTimeout(function(){	storageObj['lion'].play(); },500)

		//隔20秒显示数字内容
		var loaderIntervel = setInterval(function(){
			if(LoaderProcess < Math.ceil(LoadedResource / data.length * 100)){
				LoaderProcess++;
			}
			loadContext.clearRect(0,0,640,700);

			loadContext.font = '30px Georgia';
			loadContext.fillStyle = '#ce9c55';
			loadContext.textAlign = 'center';
			loadContext.fillText(LoaderProcess + '%',320,350);

			if(LoaderProcess == 100){
				setTimeout(function(){
					$('#loader').fadeOut(500);
					$('#index').fadeIn(500);
					//重力感应触发事件
					if(window.DeviceMotionEvent){
						//设备支持
						window.addEventListener('devicemotion',deviceMotionHandler,false);
					}else{
						//设备不支持
						alert('not support mobile event');
					}
				},1000)
				clearInterval(loaderIntervel);
			}
		},20)

	}

	



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

                show_result();
            }
            last_x = x;
            last_y = y;
            last_z = z;
        }

	}


	function show_result(){
		storageObj['result'].pause();
		storageObj['shake'].play();

		if($('#index:visible').length > 0){
			$('#shake').fadeOut(300);
			$('#shake_tip').fadeOut(300);

			setTimeout(function(){
				$('#door_left').animate({'left':'-350px'},800);
				$('#door_right').animate({'right':'-350px'},800);
			},300)
			setTimeout(function(){
				$('#index').hide();
			},1100)
		}

		setTimeout(function(){
			ResultCanvas = document.getElementById('result_canvas');
			ResultContext = ResultCanvas.getContext('2d');
			$('#result').fadeIn(300);
			clearInterval(MovieInterval);
			var ResultID = result_arr[try_count];

			MovieFrame = 0;
			MovieInterval = setInterval(function(){
				ResultContext.clearRect(0,0,640,1000);
				MovieFrame++;

				ResultContext.drawImage(storageObj['result_'+ResultID+'_frame_'+(MovieFrame%2)],0,0,640,300,0,0,640,300);
				ResultContext.drawImage(storageObj['result_'+ResultID+'_body_'+(MovieFrame%4)],0,0,528,600,320-body_size.width*0.5,250,body_size.width,body_size.height);

			if ((try_count>0 && MovieFrame>10) || (try_count==0 && MovieFrame>20)){
				if (MovieFrame%10==6){
					ResultContext.drawImage(storageObj['repeat'],0,0,30,160,550-2,movie_size.height*0.6-80-4,30,160);
				}
				if (MovieFrame%10==7){
					ResultContext.drawImage(storageObj['repeat'],0,0,30,160,550+2,movie_size.height*0.6-80+4,30,160);
				}
				if (MovieFrame%10==8){
					ResultContext.drawImage(storageObj['repeat'],0,0,30,160,550-1,movie_size.height*0.6-80-2,30,160);
				}
				if (MovieFrame%10==9){
					ResultContext.drawImage(storageObj['repeat'],0,0,30,160,550+1,movie_size.height*0.6-80+2,30,160);
				}
				if (MovieFrame%10<6){
					ResultContext.drawImage(storageObj['repeat'],0,0,30,160,550,movie_size.height*0.6-80,30,160);
				}


			}
			},300)
		},600)

		setTimeout(function(){	storageObj['result'].play();},2200)
		setTimeout(function(){
			on_shake = true;
			try_count++;
			try_count > 7 && try_count = 0; 
		},4000)

	}



$(document).ready(function() {
	pre_loader();

});


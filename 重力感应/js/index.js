function MainFun(){
	this.storageObj = {};
	this.LoadedResource = 0;
	this.loadCanvas;
	this.loadContext;
	this.LoaderProcess = 0;
	

	this.user_size = {width:0,height:0};
	this.movie_size = {width:0,height:0};
	this.body_size = {width:0,height:0};

	this.MovieInterval;
	this.MovieFrame = 0;
	this.result_arr = [1,2,3,4,5,6,7,8];
	this.try_count = 0;
}

MainFun.prototype = {
	init : function(){
		var self = this;
		self.user_size.width = 640;
		self.user_size.height = window.innerHeight;
		self.movie_size.width = 640;
		self.movie_size.height = self.user_size.height - 100;
		
		self.body_size.height = self.movie_size.height - 320;
		self.body_size.width = self.body_size.height/600*528;
		$('#result_canvas').attr('width','640').attr('height',self.movie_size.height);
		$('#result_canvas').css('width','640px').attr('height',self.movie_size.height + 'px');
	},
	pre_loader : function(){
		var self = this;
		self.init();
		var loaderIntervel = setInterval(function(){
			clearInterval(loaderIntervel);
			$('#loading').show();
			self.loadCanvas = document.getElementById('loader_movie');
			self.loadContext = self.loadCanvas.getContext('2d');
			self.page_loader();

		},20)
	},
	page_loader : function(){
		var self = this;
		//先把素材加载完
		for(var i=0;i<data.length;i++){

			if(data[i].type == 'image'){
				self.storageObj[data[i].name] = new Image();
				self.storageObj[data[i].name].src = data[i].url;
				self.storageObj[data[i].name].onload = function(){
					self.LoadedResource++;
				}
			}else if(data[i].type == 'audio'){
				self.storageObj[data[i].name] = document.createElement('audio');
				self.storageObj[data[i].name].src = data[i].url;
				self.LoadedResource++;
			}

		}

		setTimeout(function(){	self.storageObj['lion'].play(); },500)

		//隔20秒显示数字内容
		var loaderIntervel = setInterval(function(){
			if(self.LoaderProcess < Math.ceil(self.LoadedResource / data.length * 100)){
				self.LoaderProcess++;
			}
			self.loadContext.clearRect(0,0,640,700);

			self.loadContext.font = '30px Georgia';
			self.loadContext.fillStyle = '#ce9c55';
			self.loadContext.textAlign = 'center';
			self.loadContext.fillText(self.LoaderProcess + '%',320,350);

			if(self.LoaderProcess == 100){
				setTimeout(function(){
					$('#loader').fadeOut(500);
					$('#index').fadeIn(500);
					//重力感应触发事件
					if(window.DeviceMotionEvent){
						//设备支持
						window.addEventListener('devicemotion',self.deviceMotionHandler,false);
					}else{
						//设备不支持
						alert('not support mobile event');
					}
				},1000)
				clearInterval(loaderIntervel);
			}
		},20)
	},
	// deviceMotionHandler : function(eventData){
	// 	var acceleration = eventData.accelerationIncludingGravity;
 //        var curTime = new Date().getTime();
 //        var self = this;

 //        if ((curTime - self.last_update) > 100) {
 //            var diffTime = curTime - self.last_update;
 //            self.last_update = curTime;
 //            self.x = acceleration.x;
 //            self.y = acceleration.y;
 //            self.z = acceleration.z;
 //            var speed = Math.abs(self.x + self.y + self.z - self.last_x - self.last_y - self.last_z) / diffTime * 10000;
 //            if (speed > self.SHAKE_THRESHOLD) {
 //            	if(!self.on_shake)return;
	// 			self.on_shake =false;

 //                self.show_result();
 //            }
 //            self.last_x = self.x;
 //            self.last_y = self.y;
 //            self.last_z = self.z;
 //        }
	// },
	show_result : function(){
		var self = this;
		self.storageObj['result'].pause();
		self.storageObj['shake'].play();

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
			self.ResultCanvas = document.getElementById('result_canvas');
			self.ResultContext = self.ResultCanvas.getContext('2d');
			$('#result').fadeIn(300);
			clearInterval(self.MovieInterval);
			var ResultID = result_arr[try_count];

			self.MovieFrame = 0;
			self.MovieInterval = setInterval(function(){
				self.ResultContext.clearRect(0,0,640,1000);
				self.MovieFrame++;

				self.ResultContext.drawImage(self.storageObj['result_'+ResultID+'_frame_'+(self.MovieFrame%2)],0,0,640,300,0,0,640,300);
				self.ResultContext.drawImage(self.storageObj['result_'+ResultID+'_body_'+(self.MovieFrame%4)],0,0,528,600,320-self.body_size.width*0.5,250,self.body_size.width,self.body_size.height);

			if ((self.try_count>0 && self.MovieFrame>10) || (self.try_count==0 && self.MovieFrame>20)){
				if (self.MovieFrame%10==6){
					self.ResultContext.drawImage(self.storageObj['repeat'],0,0,30,160,550-2,self.movie_size.height*0.6-80-4,30,160);
				}
				if (self.MovieFrame%10==7){
					self.ResultContext.drawImage(self.storageObj['repeat'],0,0,30,160,550+2,self.movie_size.height*0.6-80+4,30,160);
				}
				if (self.MovieFrame%10==8){
					self.ResultContext.drawImage(self.storageObj['repeat'],0,0,30,160,550-1,self.movie_size.height*0.6-80-2,30,160);
				}
				if (self.MovieFrame%10==9){
					self.ResultContext.drawImage(self.storageObj['repeat'],0,0,30,160,550+1,self.movie_size.height*0.6-80+2,30,160);
				}
				if (self.MovieFrame%10<6){
					self.ResultContext.drawImage(self.storageObj['repeat'],0,0,30,160,550,self.movie_size.height*0.6-80,30,160);
				}


			}
			},300)
		},600)

		setTimeout(function(){	self.storageObj['result'].play();},2200);
		setTimeout(function(){
			on_shake = true;
			self.try_count++;
			if(self.try_count > 7){
				self.try_count = 0; 
			}
			//self.try_count > 7 && self.try_count = 0; 
		},4000);
	}

}





$(document).ready(function() {
	var on_shake =true;
	var loading = new MainFun();
	



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

	               // loading.show_result();
	               alert('1');
	            }
	            self.last_x = self.x;
	            self.last_y = self.y;
	            self.last_z = self.z;
	        }
	}

	loading.pre_loader();

});


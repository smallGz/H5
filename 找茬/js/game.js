var picgame = {
    action: {
        totalNum : 0,//几处不同
        clickNum : 0,//鼠标点击次数
        correctNum : 0,//找对张数
        correctPecent : 0,//正确率
        timerPasser : 0,
        clickData : null //点击不同之处

    },
    timer : null,
    second : 0,
    maxSecond : 60,
    currIndex : 0,
    firstInit : 0,
    cupNum : 0,
    //初始化
    init : function(index,type){
        var img = picimgs[index];
        this.currIndex = index;
        var self = this;
        this.action.totalNum = img.data.length;
        this.action.clickData = img.data;

        for(var i=0;i<this.action.clickData.length;i++){
            this.action.clickData[i].find = false;
        }
        $('#leftpic').css({
            width : img.w/45 + 'rem',
            height : img.h/45 + 'rem',
            background : "url(" + img.url1 + ")",
                "background-size": img.w/45 + "rem " + img.h/45 + "rem"
        });
        $('#rightpic').css({
            width : img.w/45 + 'rem',
            height : img.h/45 + 'rem',
            background : "url(" + img.url2 + ")",
                "background-size": img.w/45 + "rem " + img.h/45 + "rem"
        });
        for(var i=0;i<img.data.length;i++){
            var item = img.data[i];
            var $mask1 = $("<div id='maskleft" + i + "' data-id='" + i + "'></div>").addClass("floatmask").css({
                width: item.w/45 + "rem",
                height: item.h/45 + "rem",
                left: item.l/45 + "rem",
                top: item.t/45 + "rem"
            });
            var $mask2 = $("<div  id='maskright" + i + "'  data-id='" + i + "'></div>").addClass("floatmask").css({
                width: item.w/45 + "rem",
                height: item.h/45 + "rem",
                left: item.l/45 + "rem",
                top: item.t/45 + "rem"
            });
            
            $mask2.click(function(e) {
                var id = $(this).attr("data-id");
                self.action.clickData[id].find = 1;
                self.action.clickNum = self.action.clickNum + 1;
                self.showTips();
               
                $('.gameT').css({
                    'left':this.offsetLeft + 'px',
                    'top':this.offsetTop + 'px',
                    'background':'url(images/right-btn.png) no-repeat',
                    'background-size':'cover'
                });
                e.stopPropagation();
                e.preventDefault()
            });
            $("#leftpic").append($mask1);
            $("#rightpic").append($mask2)
        };
        if (self.firstInit == 0) {
            self.firstInit = 1;
            $("#rightpic").click(function(e) {
                self.action.clickNum = self.action.clickNum + 1;
                self.showTips();
                $('.gameT').css({
                    'left':e.clientX - $('#picbox').offset().left - $('.gameT').width()/2 + 'px',
                    'top':e.clientY -$('#picbox').offset().top - $('.gameT').height()/2 + 'px',
                    'background':'url(images/wront-btn.png) no-repeat',
                    'background-size':'cover'
                });
            })
        }
        self.showTips();
    },
    showTips : function(){
        var self = this;
        var correctNum = 0;
        
        for(var i=0;i<this.action.clickData.length;i++){
            var item = this.action.clickData[i];
            if(item.find){
             correctNum = correctNum + 1;   
            }
        }
        this.action.correctNum = correctNum ;
        this.action.correctPecent = parseInt(correctNum * 100 / this.action.clickNum) ? parseInt(correctNum * 100 / this.action.clickNum) : 0;
        $("#totalNum").html(this.action.totalNum);
        $("#clickNum").html(this.action.clickNum);
        $("#timeNum").html(this.action.correctNum);
        $("#correctPecent").html(this.action.correctPecent);
        $("#currLevel").html(self.currIndex + 1);

        //全找对，进入下一关
        if (this.action.correctNum == this.action.totalNum) {
            self.gameNext();
        }
        

    },
    startTimer : function(){
        var self = this;
        this.timer = setInterval(function(){
            self.second = self.second + 1;
            var percent = Math.max(parseInt((self.maxSecond - self.second) * 100 / self.maxSecond), 0);
            var cupNum = Math.floor((self.maxSecond - self.second)/(self.maxSecond / 5)) + 1;
            if (percent < 80) {
                $('#cupOn i').eq(cupNum).addClass('on');
            } 
            if(self.second == 10){
                $('#leftpic').css('transform','scaleX(0)');
                $('#rightpic').css('transform','scaleX(1)');
            }
            if(self.second == 5){
                $('#countDownDiv').hide();
            }
            $('#timeStart span:eq('+ (self.second - 1) +')').show();
            
        },1e3);
    },
    stopTimer: function() {
        clearInterval(this.timer)
    },
    gamestart : function(){
        if (this.timer) {
            this.stopTimer()
        }
        this.action = {
            totalNum: 0,
            clickNum: 0,
            correctNum: 0,
            correctPecent: 0,
            timerPasser: 0,
            clickData: null
        };
        this.timer = null;
        this.second = 0;
        this.maxSecond = 120;
        $("#leftpic").empty();
        $("#rightpic").empty();
        this.init(this.currIndex);
        this.startTimer()

    },
    gameNext : function(){
        var self = this;
        if(picimgs.length - 1 == this.currIndex){
            alert('恭喜你！你打通关啦！');
        }else{
            $('#passDiv').show();
            $('#nextBtn').click(function(){
                $('#passDiv').hide();
                self.currIndex = self.currIndex + 1;
                self.gamestart();
            })
            

        }
        self.stopTimer();
    },
    gameover: function(optmsg) {
        var self = this;
        var msg = optmsg;
        alert(msg);
        self.stopTimer();
    }
 
}
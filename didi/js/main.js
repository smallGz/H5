$(function(){
    var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var touchstart = mobile ? "touchstart" : "mousedown";
    var touchend = mobile ? "touchend" : "mouseup";
    var touchmove = mobile ? "touchmove" : "mousemove";
    var tap = mobile ? "tap" : "click";

    //定义变量
    var firstMusic=true;
    var allowMusic=true;
    var pNum=2;
    var showNum=2;
    var timer;
    var isShow=true;
    var motionObj = {};
    //可调节的参数
    var manifest=[
        {src:'images/p1.jpg'},
        {src:'images/p1_1.png'},
        {src:'images/p1_2.png'},
        {src:'images/p1_3.png'},
        {src:'images/p1_4.png'},
        {src:'images/p2_1_1.jpg'},
        {src:'images/p2_1_2.jpg'},
        {src:'images/p2_2.png'},
        {src:'images/p2_3.png'},
        {src:'images/p2_4.png'},
        {src:'images/p3_1_1.jpg'},
        {src:'images/p3_1_2.jpg'},
        {src:'images/p3_1_3.jpg'},
        {src:'images/p3_3.png'},
        {src:'images/p4_1_1.jpg'},
        {src:'images/p4_1_2.jpg'},
        {src:'images/p4_1_3.jpg'},
        {src:'images/p4_3.png'},
        {src:'images/p5_1_1.jpg'},
        {src:'images/p5_1_2.jpg'},
        {src:'images/p5_1_3.jpg'},
        {src:'images/p5_3.png'},
        {src:'images/p6_1_1.jpg'},
        {src:'images/p6_1_2.jpg'},
        {src:'images/p6_1_3.jpg'},
        {src:'images/p6_3.png'},
        {src:'images/p7_1.jpg'},
        {src:'images/p7_1.png'},
        {src:'images/p7_2.jpg'},
        {src:'images/p7_2.png'},
        {src:'images/p7_3.png'},
        {src:'images/p7_4.png'}
    ];

    //定义时间动画
    for(var i=1;i<=7;i++){
        motionObj["page"+i] = new TimelineMax();
    }

    //初始化函数
    initBtn();

    /***********************loading start*******************************/
    function handleOverallProgress(event){
        $('.loadingtxt').text(Math.ceil(event.loaded*100)+"%");
    }
    function handleOverallComplete(event){
        $('.loading').remove();
        //bgsound.play();
        initPageMotion();
    }
    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("progress", handleOverallProgress);
    loader.addEventListener("complete", handleOverallComplete);
    loader.setMaxConnections(1);
    loader.loadManifest(manifest);
    /***********************loading end*******************************/
    function initPageMotion(){
        //page1
        motionObj['page'+1].add(TweenMax.from('.p1_1', .6, { alpha: 0,y:-30, delay:.5, ease:Linear.easeNone,onStart:function(){
            TweenMax.to('.p1_4', .6, { alpha:0,repeat:-1,yoyo:true, ease:Linear.easeNone});
        }}));
        motionObj['page'+1].pause();
        //page2
        motionObj['page'+2].add(TweenMax.from('.p2_2', .6, { y: 100, delay:.5, ease:Expo.easeOut,onStart:function(){
            $('.page2').show();
        },onComplete:function(){
            setTimeout(function(){
                $('.p2_1,.p2_7').show();
                moviePlay();
            },500);
        }}));
        motionObj['page'+2].add(TweenMax.from('.p2_3', .6, { alpha: 0,y: 10, ease:Linear.easeNone}),'+=1');
        motionObj['page'+2].add(TweenMax.from('.p2_4', .6, { alpha: 0,y: 30, ease:Expo.easeOut,onComplete:function(){
            $('.p2_4').addClass('guideLeft');
        }}),'-=.2');
        motionObj['page'+2].pause();
        //page7
        motionObj['page'+7].add(TweenMax.from('.p7_1', .6, { alpha: 0,y: 30, ease:Expo.easeOut,onStart:function(){
            $('.page7').show();
            //bgSwitch();
        }}));
        motionObj['page'+7].add(TweenMax.from('.p7_2', .6, { alpha: 0,y: 30, ease:Expo.easeOut}),'-=.2');
        motionObj['page'+7].add(TweenMax.from('.p7_3', .6, { alpha: 0,y: 30, ease:Expo.easeOut}),'-=.2');
        motionObj['page'+7].add(TweenMax.from('.p7_4', .6, { alpha: 0,y: 30, ease:Expo.easeOut}),'-=.2');
        motionObj['page'+7].pause();

        $(".main").fadeIn(500,function(){
            motionObj['page'+1].play();
        });
    }
    //多张图片切换形成动画
    function moviePlay(){
        isShow = true;
        timer = setInterval(function(){
            isShow ? $(".p2_1_2").show() : $(".p2_1_2").hide();
            isShow = !isShow;
        },300)
        
    }
    //初始化动画
    function initBtn(){
        $('.p1_2').on(touchstart,function(){
           $('.p1_3').show(); 
           setTimeout(function(){
            $('.page1').fadeOut("500",function(){
                motionObj['page'+2].restart();
            })
           },500);
        });
        $('.p2_5').on(touchstart,function(){
            if(pNum<6){
                switchVideo();
            }else{
                motionObj['page'+7].restart();
                clearInterval(timer);
            }
        });
    }
    function switchVideo(){
        $(".p2_4").removeClass("guideLeft");
        pNum++;
        $('.p2_6').show();
        $('.p2_1,.p2_3,.p2_4,.p2_5,.p2_7').hide();
        clearInterval(timer);
        for(var i=1;i<4;i++) $('.p2_1_'+ i +'>img').attr('src','images/p'+pNum+'_1_'+ i +'.jpg');
        $('#p2_3').attr('src','images/p'+pNum+'_3.png');
        setTimeout(function(){
            $('.p2_6').hide();
            $('.p2_1,.p2_5,.p2_7').show();
            moviePlay();
            animaSwitch();
        },500);
    }
    function animaSwitch(){
        TweenMax.from('.p2_3', .6, { alpha: 0,y: 10, ease:Linear.easeNone,onStart:function(){
            $('.p2_3').show();
        },onComplete:function(){
            TweenMax.from('.p2_4', .6, { alpha: 0,y: 50, ease:Expo.easeOut,onStart:function(){
                $('.p2_4').show();
            },onComplete:function(){
                $('.p2_4').addClass('guideLeft');
            }})
        }});
    }

});
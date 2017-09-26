//判断浏览器的默认大小
toSize();
function toSize(){
  var oHtml = document.querySelector("#html");
  var iW= oHtml.getBoundingClientRect().width;//oHtml.clientWidth;
  oHtml.style.fontSize=iW/16+"px";
}
window.addEventListener("resize",
  function(){
    toSize();
  },
  false);
window.addEventListener("orientationchange",
  function(){
    toSize();
  },
  false)

window.onload = function(){

//点击“确认”关闭“
var oCloseBtns = document.querySelectorAll('.close');
var oPopup = document.querySelector('.popup');

for(var i=0;i<oCloseBtns.length;i++){
    oCloseBtns[i].addEventListener("touchend",
        function(){
          this.parentNode.style.display = 'none';
          oPopup.style.display = 'none';
        },
        false);
}
var oBtnStart = document.querySelector('.btn-start');
var oBtnTip = document.querySelector('.btn-tip');
var oBtnTuodan = document.querySelector('.btn-tuodan');
var oBtnClose = document.querySelector(".btn-close");

var oDivStart = document.querySelector('.div-start');
var oDivTip = document.querySelector('.div-tip');
var oDivViewInfo = document.querySelector('.view-infor');
//<!-- 现在开始测试 -->
oBtnStart.addEventListener("touchend",
    function(){
      oPopup.style.display = 'block';
      oDivStart.style.display = 'block';
    },
    false);
//<!--查看活动奖品 -->
oBtnTip.addEventListener("touchend",
    function(){
      oPopup.style.display = 'block';
      oDivTip.style.display = 'block';
    },
    false);
//<!--看我的脱单日子 -->
oBtnTuodan.addEventListener("touchend",
    function(){
      oDivStart.style.display = 'none';
      oPopup.style.display = 'block';
      oDivViewInfo.style.display = 'block';
    },
    false);
//<!--关闭 -->
oBtnClose.addEventListener("touchend",
    function(){
      oPopup.style.display = 'none';
      oDivViewInfo.style.display = 'none';
    },
    false);
}
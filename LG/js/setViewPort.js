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


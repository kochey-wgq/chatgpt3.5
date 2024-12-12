(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;

            if(clientWidth > 750){ //超过 主流 移动端分辨率后还原PC自适应
              clientWidth = 750; 
              docEl.style.fontSize = 16 + 'px'; 
              return
            }
            if (!clientWidth) return;
            docEl.style.fontSize = 16 * (clientWidth / 375) + 'px';

        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

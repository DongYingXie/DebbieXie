/**
 * Created by Por Zhang on 15/3/19.
 * Email: porzhang@gmail.com
 */
var mtel = (function () {
    var _$ = {};
    return _$;
})();

;(function (_$) {
    var common = function () {

    };
    common.prototype={
        getUrlParam: function (name){
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }
    }
    _$.common = new common();
})(mtel);

;(function (_$) {
    var lang = function () {

    };
    var langChoose = mtel.common.getUrlParam("lang");

    lang.prototype={
        text: "en" == langChoose ? lang_en : lang_zh
    };

    _$.lang = new lang();
})(mtel);

(function () {
    var langChoose = mtel.common.getUrlParam("lang");
    var font = document.createElement("style");
    var head = document.getElementsByTagName('head')[0];
        head.appendChild(font);
    if(langChoose === "en"){
        font.innerHTML = "body,h1,h2,h3,div,p,li,i,b,a{font-family: 'Roboto Condensed' !important;}"
    }else{
        font.innerHTML = "body,h1,h2,h3,div,p,li,i,b,a{font-family: 'heiti tc' !important;}"
    }
})()
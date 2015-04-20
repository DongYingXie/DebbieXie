jQuery.extend({
    getLanguege:function (_subString,_obj){
        var returnValue='';
        $.each(_obj,function(_name,_value){
            if(_name==_subString){
                returnValue=_value;
            }
        });
        return returnValue;
    },
    setLanguege:function (_attr,_obj){
        var translateGroup=$('[translate]');
        $.each(translateGroup,function(index){
            // debugger;
            console.log($(this).attr(_attr)+index);
            var beforeString=$(this).attr(_attr);
            if(beforeString==''||beforeString==undefined){
                console.log('you translate undefined');
            }else{
                var afterString=$.getLanguege(beforeString,_obj);
                console.log(afterString);
                if(afterString==''||afterString==undefined){
                    $(this).text(beforeString);
                }else{
                    $(this).text(afterString);
                }
            }
        })
    },
    initLange:function(){
        var initOj=enObj;
        $('.toggle').find('.selected').hasClass('en')?initOj=enObj:initOj=zhObj;
        $.setLanguege('translate',initOj);
        $('.languege').on('click',function(){
            $('.languege').removeClass('selected');
            $(this).addClass('selected');
            var langObj=enObj;
            $(this).hasClass('en')?langObj=enObj:langObj=zhObj;
            $.setLanguege('translate',langObj);
        });
    }
});
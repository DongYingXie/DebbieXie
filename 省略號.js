window.onload = function() {
    var arr = new Array();
    $("#InFubPhoto").find('.txt').each(function() {
        var str = $(this).html();
        arr.push(str);

        for (i = 0; i < arr.length; i++) {
            var cd = arr[i].length;
            if (cd > 29) {
                $(this).html(arr[i].substring(0, 29) + "......")
            }
        }
    });

}
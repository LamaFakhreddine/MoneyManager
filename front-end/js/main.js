
(function ($) {   
   /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        var element = document.getElementById("preloder");
        element.classList.toggle("loaded");
        console.log("done")
    });

})(jQuery);
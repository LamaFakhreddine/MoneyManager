
    (function ($) {   
   /*------------------
        Preloader
    --------------------*/
    var loaded = $(window).on('load', function () {
        var loaded = false;
        var element = document.getElementById("preloder");
        element.classList.toggle("loaded");
        loaded = true; 
        console.log(loaded);
        return loaded;
    });

    /*--------------------------------
        Button Activator 
    ----------------------------------*/
  $('.btn-row button').on('click', function () {
        $('.btn-row button').removeClass('active-btn');
        $(this).addClass('active-btn');
    });

    /*--------------------------------
        Number Animation 
    ----------------------------------*/
    window.onload = function() {
        const counters = document.querySelectorAll('.cash-font-lg, .cash-font-md');
        const speed = 400; 
        counters.forEach(counter => {
            const updateCount = () =>{
                const target =  +counter.getAttribute('data-target');
                const count = +counter.innerText; 
                const increment = Math.ceil(target / speed);
                if(count < target){
                    counter.innerHTML = count + increment;
                    setTimeout(updateCount, 1); 
                }else{
                    counter.innerHTML = "$"+target; 
                }
            }
            updateCount();
        });
    };

    setTimeout(window.onload, 2000);

})(jQuery);
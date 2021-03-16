
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
        console.log("Animating numbers");
        setTimeout(numAnimation, 600);
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
    function numAnimation() {
        const counters = document.querySelectorAll('.cash-font-lg, .cash-font-md, .cash-font-sm');
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

    function createDate(){
        var date = new Date();
        var day = date.toLocaleDateString("default", { day: "numeric" })   
        var month = date.toLocaleDateString("default",{month:"long"});
        $(".date-month").text(month);
        $(".date-day").text(day);
    }createDate();
    
})(jQuery);

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
        setTimeout(loadChart, 500);
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
                    if(counter.classList.contains("decrease-font") || counter.classList.contains("increase-font")){
                        counter.innerHTML = target+"% ";
                    }else{
                        counter.innerHTML = "$ "+target;
                    } 
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


    
    function loadChart() {
        var labelElement = document.getElementById("monthly").getElementsByClassName("outflow-font");
        var expenses = jQuery.map(labelElement, function(element){ 
            return element.getAttribute("data-target");
        });
        var chartLabel = jQuery.map(labelElement, function(element){
            return $(element).prev().text();
        });

        Chart.defaults.global.legend.labels.usePointStyle = true;

        var donutChart = new Chart(document.getElementById("doughnut-chart"), {
            type: 'doughnut',
            data: {
                labels : chartLabel,
                datasets : [{
                    label : "Expenses (USD)",
                    data : expenses,
                    backgroundColor : ["#d0e7e7","#51ecec","#2ca058", "#673ab7","#e67a32","#2ca0a0","#eb80bb","#8890ff"],
                    borderColor: "transparent",
                    innerRadius : 90,
                }]
            },
            options : {
                cutoutPercentage : 75,
                animation : {
                    animateRotate : true
                },
                chart : {
                    width: '100%'
                },
                legend : {
                    position : "bottom",
                    labels: {
                        fontColor : '#fdfdfd',
                        boxWidth: 8,
                    }
                }
            }
        }); 
        
       

    }

    
})(jQuery);
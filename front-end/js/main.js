
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
        setTimeout(loadDonutChart, 500);
        console.log("loaded donut chart");
        setTimeout(loadBarChart,500);
        console.log("loaded bar chart");
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

    /*--------------------------------
        Setting Date 
    ----------------------------------*/
    function createDate(){
        var date = new Date();
        var day = date.toLocaleDateString("default", { day: "numeric" })   
        var month = date.toLocaleDateString("default",{month:"long"});
        var year = date.toLocaleDateString("default",{year:"numeric"});
        $(".date-month").text(month);
        $(".date-m").text(month);
        $(".date-day").text(day);
        $(".date-year").text(year);
    }createDate();


     /*--------------------------------
        Loading Charts 
    ----------------------------------*/
    function loadDonutChart() {
        var labelElement = document.getElementById("monthly").getElementsByClassName("outflow-font");
        var expenses = jQuery.map(labelElement, function(element){ 
            return element.getAttribute("data-target");
        });
        var chartLabel = jQuery.map(labelElement, function(element){
            return $(element).prev().text();
        });

        Chart.Legend.prototype.afterFit = function() {
            this.height = this.height - 10;
        };
        Chart.defaults.global.legend.labels.usePointStyle = true;

        var donutChart = new Chart(document.getElementById("doughnut-chart"), {
            type: 'doughnut',
            data: {
                labels : chartLabel,
                datasets : [{
                    label : "Expenses (USD)",
                    data : expenses,
                    // backgroundColor : ["#d0e7e7","#51ecec","#2ca058", "#673ab7","#e67a32","#2ca0a0","#eb80bb","#8890ff"],
                    backgroundColor: ["#c9f7f7","#76ebeb","#2ca0a0","#187575","#154949",
                                    "#1f7e61","#4dcea7","#dcb1ff"],
                    borderColor: "transparent",
                    innerRadius : 90,
                }]
            },
            options : {
                cutoutPercentage : 75,
                chart : {
                    width: '100%'
                },
                legend : {
                    position : "bottom",
                    labels: {
                        fontColor : '#fdfdfd98',
                        boxWidth: 8,
                    }
                }
            }
        }); 
    }

    var getDateArray = function(current) {
        var a = [];
        var old = new Date(current.valueOf());
        old.setDate(current.getDate() - 15);
        while(old<=current){
            var day = old.toLocaleDateString("default", { day: "numeric" })   
            var month = old.toLocaleDateString("default",{month:"short"});
            var s = month + ' '+day;
            a.push(s);
            old.setDate(old.getDate()+1);
        }
        return a;
    };


    function loadBarChart() {
        var current = new Date(); 
       var dateAxis = getDateArray(current);
       
       console.log(dateAxis);
        var barChartData = {
            labels : dateAxis,
            datasets: [
                {
                    label: "Expenses",
                    backgroundColor: "#76ebebbb",
                    borderWidth: 2,
                    data: [13, 50, 26,14,25,26,6,16, 7,3, 5, 6, 7,2,20,19]
                },
                {
                    label: "Profits",
                    backgroundColor: "#1f7e61d3",
                    borderWidth: 2,
                    data: [10,7,2,4,5,26,6,16,4,6,9,7,3,10,20,30]
                }
            ]
        };
        
        var chartOptions = {
            maintainAspectRatio : false,
            responsive: true,
            legend: {
                position: "right",
                labels:{
                    fontColor: '#fdfdfd98',
                    boxWidth: 8,
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: '#fdfdfd98',
                        beginAtZero: true
                    },
                    gridLines : {
                        color: '#8a8a8a34',
                    }
                }],
                xAxes: [{
                    ticks:{
                        fontColor: '#fdfdfd98',
                    },
                    gridLines : {
                        display : false,
                    }
                    // type: 'time',
                    // ticks: {
                    //     source : 'auto'
                    // },
                    // time: {
                    //     displayFormats: {
                    //         day: 'MMM D'
                    //     }
                    // }
                }],
                ticks: [{
                    fontColor: '#fdfdfd'
                }]
            }
        }

        var ctx = document.getElementById("bar-chart").getContext("2d");
        window.myBar = new Chart(ctx, {
            type: "bar",
            data: barChartData,
            options: chartOptions
          });
    }

     /*--------------------------------
        Sidebar Animation 
    ----------------------------------*/
    window.onload = function(){
        console.log("btn ready");
        document.getElementById("sidebar-btn").onclick =  function openCloseSidebar(){
            var sidebarDiv = document.getElementById("sidebarDiv");
            var sidebar = document.getElementById("mySidebar");
            var sidebarBtn = document.getElementById("sidebar-btn");
  
            if(sidebarDiv.classList.contains("overlay")){
                sidebar.style.marginLeft = "-250px";
                sidebarBtn.style.marginLeft= "0px";
                console.log("closed");
            }else{
                sidebar.style.marginLeft = "0";
                sidebarBtn.style.marginLeft= "250px";
                console.log("opened");
            }
            sidebarDiv.classList.toggle("overlay");
            console.log("toggled overlay")
        }
    }

})(jQuery);
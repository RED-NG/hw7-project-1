var counter = 75

function setTime(){
    var timerInterval = setInterval(function(){
        if(counter > 0) {
          counter--;
          $(".countdown").text(counter);
          }
    }, 1000);
}

$("start-btn").on("click",function(){
    //setTime()
    
})


var counter = 40;
var qCount = 0;
var correct = 0
var wrong = 0
var ranNum;

$(".real-btn")[0].style.display = 'none' 
$(".fake-btn")[0].style.display = 'none' 
$(".real-btn").attr("button-type", "real")
$(".fake-btn").attr("button-type", "fake")




function setTime() {
  var timerInterval = setInterval(function() {
    if (counter > 0) {
      counter--;
      $("#countdown").text(counter)

    }
    if(counter === 0) {
      clearInterval(timerInterval);
      
    }

  }, 1000);
}

var unfilteredTweets = []

TweetJs.ListTweetsOnUserTimeline("TheOnion", function(data) {
  for (i = 0; i < data.length; i++){
    var tweetData = data[i].text
    unfilteredTweets.push(tweetData)
    localStorage.setItem("test", unfilteredTweets)    
  }
    getTweets = localStorage.getItem("test")
    filteredTweets = []
    filteredTweets.push(getTweets)
    allTweets = filteredTweets[0].split(",").filter(x=>x.length>110&&!x.includes("RT" && "@" && "\u2026"))
      console.log(allTweets)

    var unfilteredTweets2 = []

TweetJs.ListTweetsOnUserTimeline("InsideEdition", function(data) {
  for (i = 0; i < data.length; i++){
    var tweetData2 = data[i].text
    unfilteredTweets2.push(tweetData2)
    localStorage.setItem("test", unfilteredTweets2)    
  }
    getTweets2 = localStorage.getItem("test")
    filteredTweets2 = []
    filteredTweets2.push(getTweets2)
    allTweets2 = filteredTweets2[0].split(",").filter(x=>x.length>90&&!x.includes("RT" && "@" && "\u2026"))
    console.log(allTweets2)


    function nextQ(){
      $(".tweet").empty()
      if (qCount < allTweets2.length){
        ranNum = Math.floor(Math.random() * 2)
        console.log(ranNum)
        if (ranNum===1){
          var realP = $("<p>");
          realP.addClass("newP")
          realP.attr("tweet-type", "real");
          realP.text(allTweets2[qCount]);
          $(".tweet").append(realP);
        } else {
          var fakeP = $("<p>");
          fakeP.addClass("newP")
          fakeP.attr("tweet-type", "fake");
          fakeP.text(allTweets[qCount]);
          $(".tweet").append(fakeP);
        }
        qCount++
      }
      if (qCount === allTweets2.length){
        console.log("finish")
        $(".container").empty()
        var gameOver = $("<div>")
        gameOver.text("GAME OVER")
        var scoreCorrect = $("<div>")
        scoreCorrect.text("correct " + correct)
        var scoreWrong = $("<div>")
        scoreWrong.text("wrong " + wrong)
        var tryAgain = $("<button>")
        tryAgain.text("Try Again")
        tryAgain.click(function() {
          location.reload();
        });
        $(".container").append(gameOver)
        $(".container").append(scoreCorrect)
        $(".container").append(scoreWrong)
        $(".container").append(tryAgain)
      }
    }




  $("#start-btn").on("click", function() {
    nextQ();
    setTime();
    this.style.display = 'none' 
    $(".real-btn")[0].style.display = 'inline' 
    $(".fake-btn")[0].style.display = 'inline' 
  });


  $(".real-btn").on("click", function(){
    $(".result").empty();
    if ($(".real-btn").attr("button-type") === $(".newP").attr("tweet-type")){
      var result = $("<p>")
      result.text("correct")
      correct++
      $(".result").append(result)
    } else {
      var result = $("<p>")
      result.text("wrong")
      $(".result").append(result)
      wrong++   
    }
    nextQ();

  })
  

  $(".fake-btn").on("click", function(){
    $(".result").empty();
    if ($(".fake-btn").attr("button-type") === $(".newP").attr("tweet-type")){
      var result = $("<p>")
      result.text("correct")
      correct++
      $(".result").append(result)
    } else {
      var result = $("<p>")
      result.text("wrong")
      $(".result").append(result)
      wrong++    
    }
    nextQ();
  })

  });
  });

  //if time runs out, try again => refresh page






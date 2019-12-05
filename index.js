var counter = 75;
var qCount = 0;
var ranNum;

$(".real-btn")[0].style.display = 'none' 
$(".fake-btn")[0].style.display = 'none' 



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
      if (qCount < 10){
        ranNum = Math.floor(Math.random() * 2)
        console.log(ranNum)
        if (ranNum===1){
          var realP = $("<p>");
          realP.attr("tweet-type", "real");
          realP.text(allTweets[qCount]);
          $(".tweet").append(realP);
        } else {
          var fakeP = $("<p>");
          fakeP.attr("tweet-type", "fake");
          fakeP.text(allTweets2[qCount]);
          $(".tweet").append(fakeP);
        }
        qCount++
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

    nextQ();
  
  })

  $(".fake-btn").on("click", function(){
    nextQ();
  })

  });
  });
// 1. need if statement (check whether or not the answer is right or wrong)
// 2. if answer is right, then tweet-type attribute is true/real and if it matches the button pressed
// should be on the button
// 3. set attributes to button
// 4. style with cash money






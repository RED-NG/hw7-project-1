var counter = 75;
var qCount = 0

function setTime() {
  var timerInterval = setInterval(function() {
    if (counter > 0) {
      counter--;
      $(".countdown").text(counter);
    }
  }, 1000);
}



var unfilteredTweets = []


TweetJs.ListTweetsOnUserTimeline("realDonaldTrump", function(data) {
  for (i = 0; i < data.length; i++){
    var tweetData = data[i].text
    unfilteredTweets.push(tweetData)
    localStorage.setItem("test", unfilteredTweets)    
  }
    getTweets = localStorage.getItem("test")
    filteredTweets = []
    filteredTweets.push(getTweets)
    allTweets = filteredTweets[0].split(",").filter(x=>x.length>70&&!x.includes("RT" && "@"))
    console.log(allTweets)
});

function nextQ(){
  if (qCount < allTweets.length){
    $(".tweet").text(allTweets[qCount])
    qCount++
  }
}

$("#start-btn").on("click", function() {
  nextQ();
});
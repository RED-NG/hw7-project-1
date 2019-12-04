var counter = 75;
var qCount = 0

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


  var thirdArr = allTweets.concat(allTweets2)


  let randomArr = thirdArr
  .map((a) => ({sort: Math.random(), value: a}))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value)

  console.log(randomArr)



  function nextQ(){
    if (qCount < randomArr.length){
      $(".tweet").text(randomArr[qCount])
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







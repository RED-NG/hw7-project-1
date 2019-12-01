var counter = 75;

function setTime() {
  var timerInterval = setInterval(function() {
    if (counter > 0) {
      counter--;
      $(".countdown").text(counter);
    }
  }, 1000);
}

$("#start-btn").on("click", function() {
  console.log("response");
  var queryURL = "https://api.twitter.com/1.1/statuses/user_timeline.json";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {});
});

TweetJs.ListTweetsOnUserTimeline("MicroBlizz", function(data) {
  console.log(data);
});

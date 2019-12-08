var counter = 3;
var qCount = 0;
var correct = 0;
var wrong = 0;
var ranNum;
var timerInterval;
$(".real-btn")[0].style.display = "none";
$(".fake-btn")[0].style.display = "none";
$(".real-btn").attr("button-type", "real");
$(".fake-btn").attr("button-type", "fake");

function setTime() {
  timerInterval = setInterval(function() {
    if (counter > 0) {
      counter--;
      $("#countdown").text(counter);
    }
    if (counter === 0) {
      $(".container").empty();
      $(".tryAgainBtn").empty();
      var timeOut = $("<p>");
      timeOut.addClass("pTimeout");
      timeOut.text("Better luck next time, Junior.");
      var tryAgain = $("<button>");
      tryAgain.text("Try Again");
      tryAgain.addClass("btn btn-dark");
      tryAgain.click(function() {
        location.reload();
      });
      $(".container").append(timeOut);
      $(".clearTime").empty();
      $(".tryAgainBtn").append(tryAgain);
    }
  }, 1000);
}

var unfilteredTweets = [];
TweetJs.ListTweetsOnUserTimeline("TheOnion", function(data) {
  for (i = 0; i < data.length; i++) {
    var tweetData = data[i].text;
    unfilteredTweets.push(tweetData);
    localStorage.setItem("test", unfilteredTweets);
  }
  getTweets = localStorage.getItem("test");
  filteredTweets = [];
  filteredTweets.push(getTweets);
  allTweets = filteredTweets[0]
    .split(",")
    .filter(x => x.length > 110 && !x.includes("RT" && "@" && "\u2026"));
  console.log(allTweets);
  var unfilteredTweets2 = [];
  TweetJs.ListTweetsOnUserTimeline("InsideEdition", function(data) {
    for (i = 0; i < data.length; i++) {
      var tweetData2 = data[i].text;
      unfilteredTweets2.push(tweetData2);
      localStorage.setItem("test", unfilteredTweets2);
    }
    getTweets2 = localStorage.getItem("test");
    filteredTweets2 = [];
    filteredTweets2.push(getTweets2);
    allTweets2 = filteredTweets2[0]
      .split(",")
      .filter(x => x.length > 70 && !x.includes("RT" && "@" && "\u2026"));
    console.log(allTweets2);

    function nextQ() {
      $(".tweet").empty();
      if (qCount < allTweets2.length) {
        ranNum = Math.floor(Math.random() * 2);
        console.log(ranNum);
        if (ranNum === 1) {
          var realP = $("<p>");
          realP.addClass("newP");
          realP.attr("tweet-type", "real");
          realP.text(allTweets2[qCount]);
          $(".tweet").append(realP);
        } else {
          var fakeP = $("<p>");
          fakeP.addClass("newP");
          fakeP.attr("tweet-type", "fake");
          fakeP.text(allTweets[qCount]);
          $(".tweet").append(fakeP);
        }
        qCount++;
      }
      if (qCount === allTweets2.length) {
        console.log("finish");
        $(".container").empty();
        var gameOver = $("<div>");
        gameOver.text("GAME OVER");
        var scoreCorrect = $("<div>");
        scoreCorrect.text("YOU WIN. You know your bullshit.");
        var scoreWrong = $("<div>");
        scoreWrong.text(
          "YOU LOSE. Bet you believe it when strippers say they like you too."
        );
        var scoreTie = $("<div>");
        scoreTie.text("TIE");
        var tryAgain = $("<button>");
        tryAgain.text("Try Again");
        tryAgain.addClass("btn btn-dark");
        tryAgain.click(function() {
          location.reload();
        });
        $(".container").append(gameOver);
        if (correct > wrong) {
          $(".container").append(scoreCorrect);
          $(".clearTime").empty();
          clearInterval(window.timerInterval);
        } else if (wrong > correct) {
          $(".container").append(scoreWrong);
          $(".clearTime").empty();
          clearInterval(window.timerInterval);
        } else {
          $(".container").append(scoreTie);
          $(".clearTime").empty();
          clearInterval(window.timerInterval);
        }
        $(".container").append(tryAgain);
      }
    }
    $("#start-btn").on("click", function() {
      nextQ();
      setTime();
      this.style.display = "none";
      $(".real-btn")[0].style.display = "inline";
      $(".fake-btn")[0].style.display = "inline";
    });
    $(".real-btn").on("click", function() {
      $(".result").empty();
      if (
        $(".real-btn").attr("button-type") === $(".newP").attr("tweet-type")
      ) {
        var result = $("<p>");

        result.addClass("resultP");

        result.text("CORRECT! Nice guess.");
        correct++;
        $(".result").append(result);
      } else {
        var result = $("<p>");

        result.addClass("resultP");

        result.text("WRONG!");
        $(".result").append(result);
        wrong++;
      }
      nextQ();
    });
    $(".fake-btn").on("click", function() {
      $(".result").empty();
      if (
        $(".fake-btn").attr("button-type") === $(".newP").attr("tweet-type")
      ) {
        var result = $("<p>");

        result.addClass("resultP");

        result.text("CORRECT! Nice guess.");
        correct++;
        $(".result").append(result);
      } else {
        var result = $("<p>");

        result.addClass("resultP");

        result.text("WRONG!");
        $(".result").append(result);
        wrong++;
      }
      nextQ();
    });
  });
});

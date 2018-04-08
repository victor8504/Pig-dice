// back-end
function Player(name) {
  this.name = name;
  this.session = 0;
  this.total = 0;
}

Player.prototype.roll = function() {
  var rolled = Math.floor(Math.random() * 6 + 1);
  if (rolled === 1) {
    this.session = 0;
  } else {
    this.session += rolled;
  }
  return rolled;
}

Player.prototype.hold = function() {
  this.total += this.session;
  this.session = 0;
}

//front-end
$(document).ready(function() {
  $("form#players").submit(function(event) {
    event.preventDefault();

    var player1 = $("#player-one").val();
    var player2 = $("#player-two").val();
    var maxScore =$("#maxscore").val();

    $("div.console").show();
    $("#player1").text(player1);
    $("#player2").text(player2);

    var p1 = new Player(player1);
    var p2 = new Player(player2);

    $("#player1-roll").click(function() {
      var rolledp1 = p1.roll();
      if (rolledp1 === 1) {
        $("#player1-roll").hide();
        $("#player1-hold").hide();

        $("#player2-roll").show();
        $("#player2-hold").show();

        $("#die-roll-1").text(rolledp1);

        var totalp1 = p1.total;
        p1.hold();
        $("#finalscore1").text(totalp1);

      } else {
        var sessionp1 = p1.session;
        $("#sesssiontotal1").text(sessionp1);
        $("#die-roll-1").text(rolledp1);
      }
    })

    $("#player2-roll").click(function() {
      var rolledp2 = p2.roll();
      if (rolledp2 === 1) {
        $("#player2-roll").hide();
        $("#player2-hold").hide();

        $("#player1-roll").show();
        $("#player1-hold").show();

        var totalp2 = p2.total;
        $("#finalscore2").text(totalp2);

        $("#die-roll-2").text(rolledp2);

        p2.hold();

      } else {
        var sessionp2 = p2.session;
        $("#sesssiontotal2").text(sessionp2);
        $("#die-roll-2").text(rolledp2);
      }
    })

    $("#player1-hold").click(function() {
      p1.hold();
      if (p1.total >= maxScore) {
        alert("Player 1 won")
      }

      $("#player1-roll").hide();
      $("#player1-hold").hide();

      $("#player2-roll").show();
      $("#player2-hold").show();

      var totalp1 = p1.total;
      $("#finalscore1").text(totalp1);
    })

    $("#player2-hold").click(function() {
      p2.hold();
      if (p2.total >= maxScore) {
        alert("Player 2 won")
      }

      $("#player2-roll").hide();
      $("#player2-hold").hide();

      $("#player1-roll").show();
      $("#player1-hold").show();

      var totalp2 = p2.total;
      $("#finalscore2").text(totalp2);
    })
  })
})

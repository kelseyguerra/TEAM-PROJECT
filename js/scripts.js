function GameObject (symbol, xcoordinate, ycoordinate) {
  this.symbol = symbol;
  this.xcoordinate = xcoordinate;
  this.ycoordinate = ycoordinate;
}

GameObject.prototype.move = function () {
  var y = "y" + this.ycoordinate;
  var yTarget = document.getElementsByClassName(y);
  var xTarget = $(yTarget).find(".x"+this.xcoordinate);
  $(xTarget).text(this.symbol);
};

$(document).ready(function(){
  var player = new GameObject("O", 0, 0);
  player.move();
  $("button#move-left").click(function(event) {
    event.preventDefault();
    if (player.xcoordinate > 0) {
      player.xcoordinate = player.xcoordinate - 1;
    }
    player.move();
  });
  $("button#move-right").click(function(event) {
    event.preventDefault();
    if (player.xcoordinate < 3) {
      player.xcoordinate = player.xcoordinate + 1;
    }
    player.move();
  });
  $("button#move-up").click(function(event) {
    event.preventDefault();
    if (player.ycoordinate > 0) {
      player.ycoordinate = player.ycoordinate - 1;
    }
    player.move();
  });
  $("button#move-left").click(function(event) {
    event.preventDefault();
    if (player.ycoordinate < 3) {
      player.ycoordinate = player.ycoordinate + 1;
    }
    player.move();
  });
});

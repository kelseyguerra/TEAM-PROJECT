function GameObject (symbol, xcoordinate, ycoordinate) {
  this.symbol = symbol;
  this.xcoordinate = xcoordinate;
  this.ycoordinate = ycoordinate;
}


function redraw(objectArray){
  $("td").text("");
  objectArray.forEach(function(element){
    $(".y" + element.ycoordinate + " .x" + element.xcoordinate).text(element.symbol);
  });
}

function condition(player, toilet) {
  if (player.xcoordinate === toilet.xcoordinate && player.ycoordinate === toilet.ycoordinate) {
    alert("You win, now you get to shit.")
  }
}

$(document).ready(function(){
  var objectArray = [];
  var player = new GameObject("O", 0, 0);
  var toilet = new GameObject("T", 3, 3);
  objectArray.push(toilet);
  objectArray.push(player);
  redraw(objectArray);
  $("button#move-left").click(function(event) {
    event.preventDefault();
    if (player.xcoordinate > 0) {
      player.xcoordinate = player.xcoordinate - 1;
    }
    redraw(objectArray);
    condition(player, toilet);
  });
  $("button#move-right").click(function(event) {
    event.preventDefault();
    if (player.xcoordinate < 3) {
      player.xcoordinate = player.xcoordinate + 1;
    }
    redraw(objectArray);
    condition(player, toilet);
  });
  $("button#move-up").click(function(event) {
    event.preventDefault();
    if (player.ycoordinate > 0) {
      player.ycoordinate = player.ycoordinate - 1;
    }
    redraw(objectArray);
    condition(player, toilet);
  });
  $("button#move-down").click(function(event) {
    event.preventDefault();
    if (player.ycoordinate < 3) {
      player.ycoordinate = player.ycoordinate + 1;
    }
    redraw(objectArray);
    condition(player, toilet);
  });
});

function GameObject (symbol, xcoordinate, ycoordinate) {
  this.symbol = symbol;
  this.xcoordinate = xcoordinate;
  this.ycoordinate = ycoordinate;
}

function coinFlip() {
  return Math.floor(Math.random() * 2);
}

function moveNpc(enemy) {
  // Horizontal Move
  if (coinFlip() === 0) {
    // Border Checks
    if (enemy.xcoordinate === 0) {
      enemy.xcoordinate += 1;
    } else if (enemy.xcoordinate === 3) {
      enemy.xcoordinate -= 1;
    // Left
    } else if (coinFlip() === 0) {
      enemy.xcoordinate -= 1;
    // Right
    } else {
      enemy.xcoordinate += 1;
    }
  // Vertical Move
  } else {
    // Border Checks
    if (enemy.ycoordinate === 0) {
      enemy.ycoordinate += 1;
    } else if (enemy.ycoordinate === 3) {
      enemy.ycoordinate -= 1;
    // Up
    } else if (coinFlip() === 0) {
      enemy.ycoordinate += 1;
    // Down
    } else {
      enemy.ycoordinate -= 1;
    }
  }
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
  var enemy = new GameObject("X", 0, 3);
  var player = new GameObject("O", 0, 0);
  var toilet = new GameObject("T", 3, 3);
  objectArray.push(toilet);
  objectArray.push(player);
  objectArray.push(enemy);
  redraw(objectArray);
  $("button#move-left").click(function(event) {
    event.preventDefault();
    if (player.xcoordinate > 0) {
      player.xcoordinate = player.xcoordinate - 1;
    }
    moveNpc(enemy);
    redraw(objectArray);
    condition(player, toilet);
  });
  $("button#move-right").click(function(event) {
    event.preventDefault();
    if (player.xcoordinate < 3) {
      player.xcoordinate = player.xcoordinate + 1;
    }
    moveNpc(enemy);
    redraw(objectArray);
    condition(player, toilet);
  });
  $("button#move-up").click(function(event) {
    event.preventDefault();
    if (player.ycoordinate > 0) {
      player.ycoordinate = player.ycoordinate - 1;
    }
    moveNpc(enemy);
    redraw(objectArray);
    condition(player, toilet);
  });
  $("button#move-down").click(function(event) {
    event.preventDefault();
    if (player.ycoordinate < 3) {
      player.ycoordinate = player.ycoordinate + 1;
    }
    moveNpc(enemy);
    redraw(objectArray);
    condition(player, toilet);
  });
});

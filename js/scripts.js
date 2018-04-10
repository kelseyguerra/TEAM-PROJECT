function GameObject (symbol, xcoordinate, ycoordinate, direction) {
  this.symbol = symbol;
  this.xcoordinate = xcoordinate;
  this.ycoordinate = ycoordinate;
  this.direction;
}

function coinFlip() {
  return Math.floor(Math.random() * 2);
}

function movePattern (enemy, type, hunted, counter) {
  if (type === "random") {
    moveNpcRandom(enemy);
  } else if (type === "horizontal") {
    moveNPCHorizontal(enemy);
  }else if (type === "vertical") {
    moveNPCVertical(enemy);
  } else if (type === "hunter"){
    if(counter%2 === 0){
      moveNpcHunter(enemy, hunted);
    }
  }
}

function moveNpcHunter(enemy, hunted){
  var xDistance = hunted.xcoordinate - enemy.xcoordinate;
  var yDistance = hunted.ycoordinate - enemy.ycoordinate;
  if(xDistance > yDistance){
    if(xDistance > 0){
      enemy.xcoordinate += 1;
    } else{
      enemy.xcoordinate -= 1;
    }
  } else if (yDistance > xDistance){
    if(yDistance > 0){
      enemy.ycoordinate += 1;
    } else{
      enemy.ycoordinate -= 1;
    }
  } else{
    if(xDistance > 0){
      enemy.xcoordinate += 1;
    } else{
      enemy.xcoordinate -= 1;
    }
  }
}

function moveNpcRandom(enemy) {
  // Horizontal Move
  if (coinFlip() === 0) {
    // Border Checks
    if (enemy.xcoordinate === 0) {
      enemy.xcoordinate += 1;
    } else if (enemy.xcoordinate === 5) {
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
    } else if (enemy.ycoordinate === 5) {
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

function moveNPCHorizontal(enemy) {
  if (enemy.direction === "right") {
    if (enemy.xcoordinate < 5) {
      enemy.xcoordinate += 1;
    } else {
      enemy.xcoordinate -= 1;
      enemy.direction = "left";
    }
  } else {
    if (enemy.xcoordinate > 0) {
      enemy.xcoordinate -= 1;
    } else {
      enemy.xcoordinate += 1;
      enemy.direction = "right";
    }
  }
}

function moveNPCVertical(enemy) {
  if (enemy.direction === "down") {
    if (enemy.ycoordinate < 5) {
      enemy.ycoordinate += 1;
    } else {
      enemy.ycoordinate -= 1;
      enemy.direction = "up";
    }
  } else {
    if (enemy.ycoordinate > 0) {
      enemy.ycoordinate -= 1;
    } else {
      enemy.ycoordinate += 1;
      enemy.direction = "down";
    }
  }
}

function turnCountDown(turnTimer) {
  turnTimer --;
  $("#turnOutput").text(turnTimer);
  $(".meter-bar").last().remove();
  return turnTimer;
}

// UI Logic
function condition(player, toilet, enemies, turnTimer) {
  var returnValue = "go";
  if (player.xcoordinate === toilet.xcoordinate && player.ycoordinate === toilet.ycoordinate) {
    $("#output").text("You win, now you get to poop.");
    $(".navigation").hide();
    $(".refresh").show();
    returnValue = "stop";
  } else if (turnTimer === 0){
    $("#output").text("You ran out of time and had an accident.");
    $(".navigation").hide();
    $(".refresh").show();
    returnValue = "stop";
  }
  enemies.forEach(function(enemy){
    if (player.xcoordinate === enemy.xcoordinate && player.ycoordinate === enemy.ycoordinate) {
      $("#output").text("You lose!");
      $(".navigation").hide();
      $(".refresh").show();
      returnValue = "stop";
    }
  });
  return returnValue;
}

function redraw(objectArray){
  $("td").text("");
  objectArray.forEach(function(element){
    $(".y" + element.ycoordinate + " .x" + element.xcoordinate).html("<img src=\"img/" + element.symbol + "\">");
  });
}

function enduranceMeter(counter) {
  for (var i = 0; i < counter; i ++) {
    $("#meter").append("<div class=\"meter-bar\"></div>")
  }
}

$(document).ready(function(){
  var turnTimer = 20;
  var objectArray = [];
  var enemies= [];
  var enemy1 = new GameObject("poop.png", (Math.ceil(Math.random() * 4)), (Math.ceil(Math.random() * 4)));
  var enemy2 = new GameObject("hunter.gif", (Math.ceil(Math.random() * 4)), (Math.ceil(Math.random() * 4)));
  var player = new GameObject("player.png", 0, 0);
  var toilet = new GameObject("toilet.png", 5, 5);
  var enemyType1 = "vertical";
  var enemyType2 = "hunter";
  objectArray.push(toilet);
  objectArray.push(player);
  objectArray.push(enemy1);
  enemies.push(enemy1);
  objectArray.push(enemy2);
  enemies.push(enemy2);

  enduranceMeter(turnTimer);

  redraw(objectArray);
  // $("#turnOutput").text(turnTimer);
  $("button#move-left").click(function(event) {
    event.preventDefault();
    if (player.xcoordinate > 0) {
      player.xcoordinate = player.xcoordinate - 1;
    }
    redraw(objectArray);
    var firstCheck = condition(player, toilet, enemies, turnTimer);
    if (firstCheck === "go") {
      movePattern(enemy1, enemyType1, toilet, turnTimer);
      movePattern(enemy2, enemyType2, player, turnTimer);
      redraw(objectArray);
    }
    turnTimer = turnCountDown(turnTimer);
    condition(player, toilet, enemies, turnTimer);
  });
  $("button#move-right").click(function(event) {
    event.preventDefault();
    if (player.xcoordinate < 5) {
      player.xcoordinate = player.xcoordinate + 1;
    }
    redraw(objectArray);
    var firstCheck = condition(player, toilet, enemies, turnTimer);
    if (firstCheck === "go") {
      movePattern(enemy1, enemyType1, toilet, turnTimer);
      movePattern(enemy2, enemyType2, player, turnTimer);
      redraw(objectArray);
    }
    turnTimer = turnCountDown(turnTimer);
    condition(player, toilet, enemies, turnTimer);
  });
  $("button#move-up").click(function(event) {
    event.preventDefault();
    if (player.ycoordinate > 0) {
      player.ycoordinate = player.ycoordinate - 1;
    }
    redraw(objectArray);
    var firstCheck = condition(player, toilet, enemies, turnTimer);
    if (firstCheck === "go") {
      movePattern(enemy1, enemyType1, toilet, turnTimer);
      movePattern(enemy2, enemyType2, player, turnTimer);
      redraw(objectArray);
    }
    turnTimer = turnCountDown(turnTimer);
    condition(player, toilet, enemies, turnTimer);
  });
  $("button#move-down").click(function(event) {
    event.preventDefault();
    if (player.ycoordinate < 5) {
      player.ycoordinate = player.ycoordinate + 1;
    }
    redraw(objectArray);
    var firstCheck = condition(player, toilet, enemies, turnTimer);
    if (firstCheck === "go") {
      movePattern(enemy1, enemyType1, toilet, turnTimer);
      movePattern(enemy2, enemyType2, player, turnTimer);
      redraw(objectArray);
    }
    turnTimer = turnCountDown(turnTimer);
    condition(player, toilet, enemies, turnTimer);
  });

  $("#restart").click(function() {
    location.reload();
  });
});

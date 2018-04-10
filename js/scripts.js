function GameObject (symbol, xCoordinate, yCoordinate, direction) {
  this.symbol = symbol;
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
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
  var xDistance = hunted.xCoordinate - enemy.xCoordinate;
  var yDistance = hunted.yCoordinate - enemy.yCoordinate;
  if(xDistance > yDistance){
    if(xDistance > 0){
      enemy.xCoordinate += 1;
    } else{
      enemy.xCoordinate -= 1;
    }
  } else if (yDistance > xDistance){
    if(yDistance > 0){
      enemy.yCoordinate += 1;
    } else{
      enemy.yCoordinate -= 1;
    }
  } else{
    if(xDistance > 0){
      enemy.xCoordinate += 1;
    } else{
      enemy.xCoordinate -= 1;
    }
  }
}

function moveNpcRandom(enemy) {
  // Horizontal Move
  if (coinFlip() === 0) {
    // Border Checks
    if (enemy.xCoordinate === 0) {
      enemy.xCoordinate += 1;
    } else if (enemy.xCoordinate === 5) {
      enemy.xCoordinate -= 1;
    // Left
    } else if (coinFlip() === 0) {
      enemy.xCoordinate -= 1;
    // Right
    } else {
      enemy.xCoordinate += 1;
    }
  // Vertical Move
  } else {
    // Border Checks
    if (enemy.yCoordinate === 0) {
      enemy.yCoordinate += 1;
    } else if (enemy.yCoordinate === 5) {
      enemy.yCoordinate -= 1;
    // Up
    } else if (coinFlip() === 0) {
      enemy.yCoordinate += 1;
    // Down
    } else {
      enemy.yCoordinate -= 1;
    }
  }
}

function moveNPCHorizontal(enemy) {
  if (enemy.direction === "right") {
    if (enemy.xCoordinate < 5) {
      enemy.xCoordinate += 1;
    } else {
      enemy.xCoordinate -= 1;
      enemy.direction = "left";
    }
  } else {
    if (enemy.xCoordinate > 0) {
      enemy.xCoordinate -= 1;
    } else {
      enemy.xCoordinate += 1;
      enemy.direction = "right";
    }
  }
}

function moveNPCVertical(enemy) {
  if (enemy.direction === "down") {
    if (enemy.yCoordinate < 5) {
      enemy.yCoordinate += 1;
    } else {
      enemy.yCoordinate -= 1;
      enemy.direction = "up";
    }
  } else {
    if (enemy.yCoordinate > 0) {
      enemy.yCoordinate -= 1;
    } else {
      enemy.yCoordinate += 1;
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
  if (player.xCoordinate === toilet.xCoordinate && player.yCoordinate === toilet.yCoordinate) {
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
    if (player.xCoordinate === enemy.xCoordinate && player.yCoordinate === enemy.yCoordinate) {
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
    $(".y" + element.yCoordinate + " .x" + element.xCoordinate).html("<img src=\"img/" + element.symbol + "\">");
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
    if (player.xCoordinate > 0) {
      player.xCoordinate = player.xCoordinate - 1;
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
    if (player.xCoordinate < 5) {
      player.xCoordinate = player.xCoordinate + 1;
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
    if (player.yCoordinate > 0) {
      player.yCoordinate = player.yCoordinate - 1;
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
    if (player.yCoordinate < 5) {
      player.yCoordinate = player.yCoordinate + 1;
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

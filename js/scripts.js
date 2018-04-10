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

// BLOCK BARRIER CHECK
function notABarrier(object, direction) {
  if (direction === "left") {
    if ($(".y" + object.ycoordinate + " .x" + (object.xcoordinate - 1)).attr('class').includes("barrier")) {
      return false;
    }
    return true;
  } else if (direction === "right") {
    if ($(".y" + object.ycoordinate + " .x" + (object.xcoordinate + 1)).attr('class').includes("barrier")) {
      return false;
    }
    return true;
  } else if (direction === "up") {
    if ($(".y" + (object.ycoordinate - 1) + " .x" + object.xcoordinate).attr('class').includes("barrier")) {
      return false;
    }
    return true;
  } else if (direction === "down") {
    if ($(".y" + (object.ycoordinate + 1) + " .x" + object.xcoordinate).attr('class').includes("barrier")) {
      return false;
    }
    return true;
  }
}

// BORDER WALL CHECK
function notAWall(object, direction) {
  if (direction === "left") {
    if ($(".y" + object.ycoordinate + " .x" + object.xcoordinate).attr('class').includes("wall-left")) {
      return false;
    } else {
      return true;
    }
  } else if (direction === "right") {
    if ($(".y" + object.ycoordinate + " .x" + object.xcoordinate).attr('class').includes("wall-right")) {
      return false;
    } else {
      return true;
    }
  } else if (direction === "up") {
    if ($(".y" + object.ycoordinate + " .x" + object.xcoordinate).attr('class').includes("wall-up")) {
      return false;
    } else {
      return true;
    }
  } else if (direction === "down") {
    if ($(".y" + object.ycoordinate + " .x" + object.xcoordinate).attr('class').includes("wall-down")) {
      return false;
    } else {
      return true;
    }
  }
}

function turnCountDown(turnTimer) {
  turnTimer --;
  $(".meter-bar").last().remove();
  $("#turnOutput").text(turnTimer);
  return turnTimer;
}

// UI Logic
function condition(player, toilet, enemy, turnTimer) {
  if (player.xcoordinate === toilet.xcoordinate && player.ycoordinate === toilet.ycoordinate) {
    $("#output").text("You win, now you get to poop.");
    $(".navigation").hide();
    $(".refresh").show();
    return "stop";
  } else if (player.xcoordinate === enemy.xcoordinate && player.ycoordinate === enemy.ycoordinate) {
    $("#output").text("You lose!");
    $(".navigation").hide();
    $(".refresh").show();
    return "stop";
  } else if (turnTimer === 0){
    $("#output").text("You ran out of time and had an accident.");
    $(".navigation").hide();
    $(".refresh").show();
    return "stop";
  }
  return "go";
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
  var enemy = new GameObject("poop.png", (Math.ceil(Math.random() * 4)), (Math.ceil(Math.random() * 4)));
  var player = new GameObject("player.png", 0, 0);
  var toilet = new GameObject("toilet.png", 5, 5);
  var enemyType = "vertical";
  objectArray.push(toilet);
  objectArray.push(player);
  objectArray.push(enemy);


  enduranceMeter(turnTimer);

  redraw(objectArray);
  $("button#move-left").click(function(event) {
    event.preventDefault();
    if (player.xcoordinate > 0 && notAWall(player, "left") && notABarrier(player, "left")) {
      player.xcoordinate = player.xcoordinate - 1;
    }
    redraw(objectArray);
    var firstCheck = condition(player, toilet, enemy, turnTimer);
    if (firstCheck === "go") {
      movePattern(enemy, enemyType, toilet, turnTimer);
      redraw(objectArray);
    }
    turnTimer = turnCountDown(turnTimer);
    condition(player, toilet, enemy, turnTimer);
  });
  $("button#move-right").click(function(event) {
    event.preventDefault();
    if (player.xcoordinate < 5 && notAWall(player, "right") && notABarrier(player, "right")) {
      player.xcoordinate = player.xcoordinate + 1;
    }
    redraw(objectArray);
    var firstCheck = condition(player, toilet, enemy, turnTimer);
    if (firstCheck === "go") {
      movePattern(enemy, enemyType, toilet, turnTimer);
      redraw(objectArray);
    }
    turnTimer = turnCountDown(turnTimer);
    condition(player, toilet, enemy, turnTimer);
  });
  $("button#move-up").click(function(event) {
    event.preventDefault();
    if (player.ycoordinate > 0 && notAWall(player, "up") && notABarrier(player, "up")) {
      player.ycoordinate = player.ycoordinate - 1;
    }
    redraw(objectArray);
    var firstCheck = condition(player, toilet, enemy, turnTimer);
    if (firstCheck === "go") {
      movePattern(enemy, enemyType, toilet, turnTimer);
      redraw(objectArray);
    }
    turnTimer = turnCountDown(turnTimer);
    condition(player, toilet, enemy, turnTimer);
  });
  $("button#move-down").click(function(event) {
    event.preventDefault();
    if (player.ycoordinate < 5 && notAWall(player, "down") && notABarrier(player, "down")) {
      player.ycoordinate = player.ycoordinate + 1;
    }
    redraw(objectArray);
    var firstCheck = condition(player, toilet, enemy, turnTimer);
    if (firstCheck === "go") {
      movePattern(enemy, enemyType, toilet, turnTimer);
      redraw(objectArray);
    }
    turnTimer = turnCountDown(turnTimer);
    condition(player, toilet, enemy, turnTimer);
  });

  $("#restart").click(function() {
    location.reload();
  });
});

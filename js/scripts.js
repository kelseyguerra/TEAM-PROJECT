var enemy = {
  type: "NPC",
  xCoord: 3,
  yCoord: 3,
  direction: "up"
}

function movePattern (type) {
  if (type === "random") {
    moveNpcRandom();
  } else if (type === "horizontal") {
    moveNPCHorizontal();
  }else if (type === "vertical") {
    moveNPCVertical();
  }
}

function coinFlip() {
  return Math.floor(Math.random() * 2);
}

function moveNpcRandom() {
  // Horizontal Move
  if (coinFlip() === 0) {
    // Border Checks
    if (enemy.xCoord === 0) {
      enemy.xCoord += 1;
    } else if (enemy.xCoord === 3) {
      enemy.xCoord -= 1;
    // Left
    } else if (coinFlip() === 0) {
      enemy.xCoord -= 1;
    // Right
    } else {
      enemy.xCoord += 1;
    }
  // Vertical Move
  } else {
    // Border Checks
    if (enemy.yCoord === 0) {
      enemy.yCoord += 1;
    } else if (enemy.yCoord === 3) {
      enemy.yCoord -= 1;
    // Up
    } else if (coinFlip() === 0) {
      enemy.yCoord += 1;
    // Down
    } else {
      enemy.yCoord -= 1;
    }
  }
  $("td").text("");
  $(".y" + enemy.yCoord + " .x" + enemy.xCoord).text("X");
}

function moveNPCHorizontal() {
  if (enemy.direction === "right") {
    if (enemy.xCoord < 3) {
      enemy.xCoord += 1;
    } else {
      enemy.xCoord -= 1;
      enemy.direction = "left";
    }
  } else {
    if (enemy.xCoord > 0) {
      enemy.xCoord -= 1;
    } else {
      enemy.xCoord += 1;
      enemy.direction = "right";
    }
  }
  $("td").text("");
  $(".y" + enemy.yCoord + " .x" + enemy.xCoord).text("X");
}

function moveNPCVertical() {
  if (enemy.direction === "down") {
    if (enemy.yCoord < 3) {
      enemy.yCoord += 1;
    } else {
      enemy.yCoord -= 1;
      enemy.direction = "up";
    }
  } else {
    if (enemy.yCoord > 0) {
      enemy.yCoord -= 1;
    } else {
      enemy.yCoord += 1;
      enemy.direction = "down";
    }
  }
  $("td").text("");
  $(".y" + enemy.yCoord + " .x" + enemy.xCoord).text("X");
}

$(document).ready(function() {

  // SET NPC POSITION
  $(".y" + enemy.yCoord + " .x" + enemy.xCoord).text("X");

  // TRIGGER NPC MOVEMENT
  $("#test-npc").click(function() {
    movePattern("vertical");
  });
});

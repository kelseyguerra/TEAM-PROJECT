var enemy = {
  type: "NPC",
  xCoord: 3,
  yCoord: 3,
}

function coinFlip() {
  return Math.floor(Math.random() * 2);
}

function moveNpc() {
  var xCurrent = enemy.xCoord;
  var yCurrent = enemy.yCoord;
  if (coinFlip() === 0) {
    enemy.xCoord -= 1;
    if (enemy.xCoord < 0) {
      enemy.xCoord += 2;
    }
  } else {
    enemy.xCoord += 1;
    if (enemy.xCoord > 3) {
      enemy.xCoord -= 2;
    }
  }
  $(".y" + yCurrent + " .x" + xCurrent).text("");
  $(".y" + enemy.yCoord + " .x" + enemy.xCoord).text("X");
}

$(document).ready(function() {
  // SET NPC POSITION
  $(".y" + enemy.yCoord + " .x" + enemy.xCoord).text("X");

  // TRIGGER NPC MOVEMENT
  $("#test-npc").click(function() {
    moveNpc();
  });
});

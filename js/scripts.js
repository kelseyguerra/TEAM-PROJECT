var enemy = {
  type: "NPC",
  xCoord: 3,
  yCoord: 3,
}

function coinFlip() {
  return Math.floor(Math.random() * 2);
}

function moveNpc() {
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

$(document).ready(function() {
  // SET NPC POSITION
  $(".y" + enemy.yCoord + " .x" + enemy.xCoord).text("X");

  // TRIGGER NPC MOVEMENT
  $("#test-npc").click(function() {
    moveNpc();
  });
});

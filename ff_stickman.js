goog.provide('net.killerandroid.fightingfigures.FFStickman');

net.killerandroid.fightingfigures.FFStickman = function(position, color) {
  this.canvas = document.getElementById("player_canvas_" + position);
  this.context = this.canvas.getContext("2d");
  this.visible = false;
  this.color = color;
}

net.killerandroid.fightingfigures.FFStickman.prototype.draw = function() {
  if (!this.context) return;

  this.context.fillStyle = this.color;
  this.context.strokeStyle = this.color;
  this.context.lineWidth = 5;

  var centerX = 150;
  var centerY = 35;
  var radius = 15;

  // head
  this.context.beginPath();
  this.context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  // (x,y) center, radius, start angle, end angle, anticlockwise
  this.context.fill();

  this.context.beginPath();

  // body
  this.context.moveTo(centerX, centerY + radius);
  this.context.lineTo(centerX, centerY + radius + 40);

  // arms
  this.context.moveTo(centerX, centerY + radius + 10);
  this.context.lineTo(centerX - 40, centerY + radius + 25);
  this.context.moveTo(centerX, centerY + radius + 10);
  this.context.lineTo(centerX + 40, centerY + radius + 25);

  // legs
  this.context.moveTo(centerX, centerY + radius + 40);
  this.context.lineTo(centerX - 45, centerY + radius + 70);
  this.context.moveTo(centerX, centerY + radius + 40);
  this.context.lineTo(centerX + 45, centerY + radius + 70);

  this.context.stroke();

  this.visible = true;
}

net.killerandroid.fightingfigures.FFStickman.prototype.erase = function() {
  if (!this.context) return;
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.visible = false;
}

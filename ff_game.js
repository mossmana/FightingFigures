/*
Copyright 2016 Ann Marie Mossman

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
goog.provide('net.killerandroid.fightingfigures.FFGame');

goog.require('cast.receiver.games.GameManager');
goog.require('cast.receiver.games.EventType');
goog.require('cast.receiver.games.GameplayState');
goog.require('cast.receiver.games.PlayerState');
goog.require('cast.receiver.games.StatusCode');
goog.require('net.killerandroid.fightingfigures.FFConstants');
goog.require('net.killerandroid.fightingfigures.FFStickman');
goog.require('net.killerandroid.fightingfigures.FFCommands');

net.killerandroid.fightingfigures.FFGame = function(gameManager) {
  console.log("Initializing game!");
  this.gameManager = gameManager;
  this.isRunning = false;
  this.players = {
    'healer': new net.killerandroid.fightingfigures.FFStickman(0, '#000000'),
    'caster': new net.killerandroid.fightingfigures.FFStickman(1, '#FFFFFF'),
    'attacker': new net.killerandroid.fightingfigures.FFStickman(2, '#FFFFFF'),
    'defender': new net.killerandroid.fightingfigures.FFStickman(3, '#000000')
  };
  this.playerCt = 0;
  this.boundMessageReceivedCallback = this.onMessageReceived.bind(this);
  this.boundPlayerAvailableCallback = this.onPlayerAvailable.bind(this);
  this.boundPlayerQuitCallback = this.onPlayerQuit.bind(this);
  this.commands = new net.killerandroid.fightingfigures.FFCommands();
}

net.killerandroid.fightingfigures.FFGame.prototype.start = function() {
  if (this.isRunning) return;
  console.log("Starting game");
  this.gameManager.updateGameStatusText('Game running.');
  this.gameManager.updateGameplayState(cast.receiver.games.GameplayState.RUNNING, null);
  this.isRunning = true;
  var players = this.gameManager.getPlayers();
  for (var i = 0; i < players.length; i++) {
    this.addPlayer(players[i].playerId);
  }
  this.gameManager.addEventListener(
    cast.receiver.games.EventType.GAME_MESSAGE_RECEIVED,
    this.boundMessageReceivedCallback);
  this.gameManager.addEventListener(
    cast.receiver.games.EventType.PLAYER_AVAILABLE,
    this.boundPlayerAvailableCallback);
  this.gameManager.addEventListener(
    cast.receiver.games.EventType.PLAYER_DROPPED,
    this.boundPlayerQuitCallback);
  this.gameManager.addEventListener(
    cast.receiver.games.EventType.PLAYER_QUIT,
    this.boundPlayerQuitCallback);
}

net.killerandroid.fightingfigures.FFGame.prototype.stop = function() {
  if (!this.isRunning) return;
  this.gameManager.updateGameStatusText('Game stopped.');
  this.isRunning = false;
  this.gameManager.removeEventListener(
    cast.receiver.games.EventType.GAME_MESSAGE_RECEIVED,
    this.boundMessageReceivedCallback);
  this.gameManager.removeEventListener(
    cast.receiver.games.EventType.PLAYER_AVAILABLE,
    this.boundPlayerAvailableCallback);
  this.gameManager.removeEventListener(
    cast.receiver.games.EventType.PLAYER_DROPPED,
    this.boundPlayerQuitCallback);
  this.gameManager.removeEventListener(
    cast.receiver.games.EventType.PLAYER_QUIT,
    this.boundPlayerQuitCallback);
}

net.killerandroid.fightingfigures.FFGame.prototype.onPlayerAvailable = function(event) {
  console.log("On player available - " + event.statusCode);
  if (event.statusCode != cast.receiver.games.StatusCode.SUCCESS) return;
  if (this.playerCt == net.killerandroid.fightingfigures.FFConstants.MAX_PLAYERS) return;
  this.addPlayer(event.playerInfo.playerId);
}

net.killerandroid.fightingfigures.FFGame.prototype.onPlayerQuit = function(event) {
  console.log("On player quit - " + event.statusCode);
  if (event.statusCode != cast.receiver.games.StatusCode.SUCCESS) return;
  this.removePlayer(event.playerInfo.playerId);
  var connectedPlayers = this.gameManager.getConnectedPlayers();
  if (connectedPlayers.length == 0) {
    console.log("No more players are connected - stopping.");
    cast.receiver.CastReceiverManager.getInstance().stop();
  }
}

net.killerandroid.fightingfigures.FFGame.prototype.onMessageReceived = function(event) {
  console.log("On message received - " + event.statusCode);
  if (event.statusCode != cast.receiver.games.StatusCode.SUCCESS) return;
  var type = event.requestExtraMessageData[
      net.killerandroid.fightingfigures.FFConstants.MESSAGE_TYPE];
  console.log("Message type = " + type);
  var value = event.requestExtraMessageData[
    net.killerandroid.fightingfigures.FFConstants.MESSAGE_VALUE];
  console.log("Message value = " + value);
  if (type === net.killerandroid.fightingfigures.FFConstants.MESSAGE_TEXT) {
    this.showMessage(event.playerInfo.playerId, value);
  } else if (type === net.killerandroid.fightingfigures.FFConstants.MESSAGE_COMMAND) {
    this.performCommand(event.playerInfo.playerId, value);
  }
}

net.killerandroid.fightingfigures.FFGame.prototype.addPlayer = function(playerId) {
  console.log("Adding player " + playerId);
  var key = playerId.split(":")[1];
  console.log("key = " + key);
  var player = this.players[key];
  if (player && !player.visible) {
    player.draw();
    this.gameManager.updatePlayerState(playerId,
      cast.receiver.games.PlayerState.PLAYING, null);
    this.playerCt++;
  }
}

net.killerandroid.fightingfigures.FFGame.prototype.removePlayer = function(playerId) {
  console.log("Removing player " + playerId);
  var key = playerId.split(":")[1];
  console.log("key = " + key);
  var player = this.players[key];
  if (player && player.visible) {
    player.erase();
    this.playerCt--;
  }
}

net.killerandroid.fightingfigures.FFGame.prototype.showMessage = function(playerId, text) {
  console.log("Show text for " + playerId + " = " + text);
  var id = playerId.split(":")[1];
  document.getElementById("message_" + id).value += "\n" + text;
}

net.killerandroid.fightingfigures.FFGame.prototype.performCommand = function(playerId, command) {
  console.log("Perform command for " + playerId + " = " + command);
  this.showMessage(playerId, ">>> " + command);
  this.commands.handle(playerId, command);
}

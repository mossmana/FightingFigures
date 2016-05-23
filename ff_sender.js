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
goog.require('net.killerandroid.fightingfigures.FFConstants');

var gameManagerClient = null;

function initializeCastApi() {
  console.log("Initializing cast api for " + net.killerandroid.fightingfigures.FFConstants.APPLICATION_ID);
  var sessionRequest = new chrome.cast.SessionRequest(
    net.killerandroid.fightingfigures.FFConstants.APPLICATION_ID);
  console.log("Session request created");
  var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
    onSessionReady, onCastReceiverChanged);
  console.log("API config created");
  chrome.cast.initialize(apiConfig, onCastInit, onCastError);
}

var onCastReceiverChanged = function(receiverAvailability) {
  if (receiverAvailability === chrome.cast.ReceiverAvailability.AVAILABLE) {
    console.log("Click cast button to start!");
  } else {
    console.log("Not ready. Do NOT click cast button.");
  }
}

var onSessionReady = function(session) {
  console.log("Session ready.");
  chrome.cast.games.GameManagerClient.getInstanceFor(session,
    function(result) {
      console.log("Game manager client initialized!");
      gameManagerClient = result.gameManagerClient;
    },
    function(error) {
      console.error('error description: ' + error.errorDescription +
              ', error code: ' + error.errorCode);
    });
}

var onCastInit = function() {
  console.log("Cast sender API initialized.");
}

var onCastError = function(error) {
  console.error("Cast sender API error");
  console.dir(error);
}

function addHealer() {
  var playerId = net.killerandroid.fightingfigures.FFConstants.PLAYER_ID_PREFIX + "healer";
  addPlayer(playerId);
}

function removeHealer() {
  var playerId = net.killerandroid.fightingfigures.FFConstants.PLAYER_ID_PREFIX + "healer";
  removePlayer(playerId);
}

function addCaster() {
  var playerId = net.killerandroid.fightingfigures.FFConstants.PLAYER_ID_PREFIX + "caster";
  addPlayer(playerId);
}

function removeCaster() {
  var playerId = net.killerandroid.fightingfigures.FFConstants.PLAYER_ID_PREFIX + "caster";
  removePlayer(playerId);
}

function addAttacker() {
  var playerId = net.killerandroid.fightingfigures.FFConstants.PLAYER_ID_PREFIX + "attacker";
  addPlayer(playerId);
}

function removeAttacker() {
  var playerId = net.killerandroid.fightingfigures.FFConstants.PLAYER_ID_PREFIX + "attacker";
  removePlayer(playerId);
}

function addDefender() {
  var playerId = net.killerandroid.fightingfigures.FFConstants.PLAYER_ID_PREFIX + "defender";
  addPlayer(playerId);
}

function removeDefender() {
  var playerId = net.killerandroid.fightingfigures.FFConstants.PLAYER_ID_PREFIX + "defender";
  removePlayer(playerId);
}

function addPlayer(playerId) {
  console.log("Adding: " + playerId);
  gameManagerClient.sendPlayerAvailableRequestWithPlayerId(playerId,
      /* extraMessageData */ null,
      /* successCallback */ null, /* errorCallback */ null);
}

function removePlayer(playerId) {
  console.log("Removing: " + playerId);
  var player = gameManagerClient.getCurrentState().getPlayer(playerId);
  if (player) {
    console.log("Sending player quit request.");
    gameManagerClient.sendPlayerQuitRequestWithPlayerId(playerId,
      /* extraMessageData */ null, /* successCallback */ null,
      /* errorCallback */ null);
  } else {
    console.log("Player does not exist.");
  }
}

function sendMessage(id) {
  var playerId = net.killerandroid.fightingfigures.FFConstants.PLAYER_ID_PREFIX + id;
  console.log("Sending message: " + playerId);
  var message = {};
  message[net.killerandroid.fightingfigures.FFConstants.MESSAGE_TYPE] =
    net.killerandroid.fightingfigures.FFConstants.MESSAGE_TEXT;
  message[net.killerandroid.fightingfigures.FFConstants.MESSAGE_VALUE] =
    document.getElementById('message_' + id).value;
  gameManagerClient.sendGameMessageWithPlayerId(playerId, message);
}

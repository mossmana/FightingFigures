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
goog.require('net.killerandroid.fightingfigures.FFGame');
goog.require('cast.receiver.games.GameManagerConfig');
goog.require('cast.receiver.games.GameManager');

var game = null;

function initGame() {
    var castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    var appConfig = new cast.receiver.CastReceiverManager.Config();
    appConfig.statusText = net.killerandroid.fightingfigures.FFConstants.APPLICATION_NAME;
    appConfig.maxInactivity = net.killerandroid.fightingfigures.FFConstants.MAX_INACTIVITY;
    var gameConfig = new cast.receiver.games.GameManagerConfig();
    gameConfig.applicationName = net.killerandroid.fightingfigures.FFConstants.APPLICATION_NAME;
    gameConfig.maxPlayers = net.killerandroid.fightingfigures.FFConstants.MAX_PLAYERS;
    var gameManager = new cast.receiver.games.GameManager(gameConfig);
    game = new net.killerandroid.fightingfigures.FFGame(gameManager);
    var startGame = function() {
      console.log("Starting game");
      game.start();
    }
    castReceiverManager.onReady = function(event) {
      if (document.readyState === 'complete') {
        startGame();
      } else {
        window.onload = startGame;
      }
    }
    castReceiverManager.start(appConfig);
}

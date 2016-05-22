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

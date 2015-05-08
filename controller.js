var game;

window.onload = function() {

    game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
    
    game.global =
    {
        enterLastValue : false,
        gameWidth : 800,
        gameHeight : 600,
        possibleTypes : ["metal", "glass", "plastic", "paper"],

    }
    
    //ajout de tous les états du jeu
    game.state.add('boot', bootState);
    game.state.add('load', loadState);
    game.state.add('menu', menuState);
    game.state.add('worldmap', worldmapState);
    game.state.add('shooter', shooterState);
    game.state.add('shop', shopState);

    //etat de départ
    game.state.start('boot');
};
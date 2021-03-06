var game;

window.onload = function() {

    game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
    //console.log(achievements);
    game.global =
    {
        enterLastValue : false,
        gameWidth : 800,
        gameHeight : 600,
        selectedItem : 0,
        totalTrash : 0,
        totalMetal : 0,
        totalGlass : 0,
        totalPaper : 0,
        totalPlastic : 0,
        stockMetal : 0,
        stockGlass : 0,
        stockPaper : 0,
        stockPlastic : 0,
        possibleTypes : ["plastic", "metal", "glass", "paper"],
        lastLevel : 0,
        clearedLevels : [],
        
    };
    
    // Ajout de tous les états du jeu
    game.state.add('quizz', quizzState);
    game.state.add('gameover', gameoverState);
    game.state.add('boot', bootState);
    game.state.add('load', loadState);
    game.state.add('menu', menuState);
    game.state.add('achievement', achievementState);
    game.state.add('tutorial', tutorialState);
    game.state.add('worldmap', worldmapState);
    game.state.add('shop', shopState);
    game.state.add('shooter', shooterState);    

    // Etat de départ
    game.state.start('boot');
};
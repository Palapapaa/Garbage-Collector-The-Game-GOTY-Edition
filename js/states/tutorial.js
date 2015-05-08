var tutorialState = {
 
    preload : function(){
        console.log("Tutorial state preload");
        this.inputManager = new InputManager(game);
    },
    
    create : function(){
        // Affichage de l'image de fond
        var background = game.add.sprite(0,0,"mainBackground");
        
        // Affichage du Titre du menu
        var loadingLabel = game.add.text(game.world.centerX, 100, 'Tutoriel',
        { font: '96px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);
    },
    
    update : function(){
        // Passage à l'état de jeu world map
        if(this.inputManager.esc.isDown){
            game.state.start('menu');
        }
    },

};
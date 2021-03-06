var shopState = {
 
    preload : function(){
        console.log("Shop state preload");
        this.inputManager = new InputManager(game);
    },
    
    create : function(){
        // Affichage du fond
        var background = game.stage.backgroundColor = '#199BC4';
        
        // Affichage du Titre du menu
        var loadingLabel = game.add.text(game.world.centerX, 100, 'Boutique',
        { font: '96px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);
    },
    
    update : function(){
        // Passage à l'état de jeu world map
        if(this.inputManager.esc.isDown){
            game.state.start('worldmap');
        }
    },

};
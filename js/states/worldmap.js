var worldmapState = {
 
    preload : function(){
        console.log("WorldMap state preload");
        this.inputManager = new InputManager(game);
    },
    
    create : function(){
        // Affichage du fond
        var background = game.stage.backgroundColor = '#199BC4';
        
        // Affichage du Titre du menu
        var loadingLabel = game.add.text(game.world.centerX, 100, 'Choix du niveau',
        { font: '64px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);
        
        // Texte temporaire d'explication 
        var explainLabel = game.add.text(game.world.centerX, 400, 'Appuyer sur S pour aller à la boutique',
        { font: '32px Arial', fill: '#ffffff' });
        explainLabel.anchor.setTo(0.5, 0.5);
        explainLabel = game.add.text(game.world.centerX, 500, 'Appuyer sur Espace pour jouer',
        { font: '32px Arial', fill: '#ffffff' });
        explainLabel.anchor.setTo(0.5, 0.5);

        var player = new Player();

        var ennemies = [];
    },
    
    update : function(){
         // Passage à l'état de jeu shooter
        if(this.inputManager.fire.isDown){
            game.state.start('shooter');
        }
        // Passage à l'état de jeu shop
        if(this.inputManager.shop.isDown){
            game.state.start('shop');
        }
        // Passage à l'état de jeu menu
        if(this.inputManager.esc.isDown){
            game.state.start('menu');
        }    
    },
    
};
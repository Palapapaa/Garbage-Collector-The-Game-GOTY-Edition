var bootState = {
 
    preload : function(){
        console.log("Boot state preload");
        
        //Mise en place du fond d'écran
        game.load.image('mainBackground' , 'assets/graphics/background.png');
        //Mise en place de la progress bar
        game.load.image('progressBar' , 'assets/graphics/progress_bar.png');
    },
    
    create : function(){
        //Mise en place des paramètres de base du jeu
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        //On démarre l'état de chargement
        game.state.start('load');        
    },
    
};
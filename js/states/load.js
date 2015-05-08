var loadState = {
 
    preload : function(){
        console.log("Load state preload");
        
        
        //chargement des images
        game.load.image('menuBackground' , 'assets/graphics/background_menu.png');
        game.load.image('shopBackground' , 'assets/graphics/background_shop.png');
        game.load.image('worldmapBackground' , 'assets/graphics/background_worldmap.png');
        game.load.image('shooterBackground' , 'assets/graphics/background_shooter.png');

        game.load.image('spritePlayer' , 'assets/graphics/player.png');

        
        //chargement des sons
        game.load.audio('explosion',['assets/audio/explosion.wav',]);
        game.load.audio('hit',['assets/audio/hit.wav',]);
        game.load.audio('shoot',['assets/audio/shoot.wav',]);
        game.load.audio('startup',['assets/audio/startup.wav',]);
        game.load.audio('bgm_menu',['assets/audio/gin_menu.mp3',]);
    
    },
    
    create : function(){
        
        
        //On démarre l'état du menu
        game.state.start('menu');
    },
    
};
var loadState = {
 
    preload : function(){
        console.log("Load state preload");
        
        game.load.image('menuBackground' , 'assets/graphics/menuBackground.png');
        
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
var loadState = {
 
    preload : function(){
        console.log("Load state preload");
        
        // Affichage de l'image de fond
        var background = game.add.sprite(0,0,"mainBackground");

        // Affichage du texte de chargement
        var loadingLabel = game.add.text(game.world.centerX, 200, 'Chargement...',
        { font: '96px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);
        
        // Affichage de la progress bar
        var progressBar = game.add.sprite(game.world.centerX, 300, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);
        
        // Chargement des images
        game.load.image('menuBackground' , 'assets/graphics/background_menu.png');
        game.load.image('shooterBackground' , 'assets/graphics/background_shooter.png');
        
        game.load.image('spritePlayer' , 'assets/graphics/sprite_joueur_e1.png');

        game.load.image('spriteTrashMetal' , 'assets/graphics/sprite_trash_metal_e1.png');
        game.load.image('spriteTrashPlastic' , 'assets/graphics/sprite_trash_plastic_e1.png');
        game.load.image('spriteTrashPaper' , 'assets/graphics/sprite_trash_paper_e1.png');
        game.load.image('spriteTrashGlass' , 'assets/graphics/sprite_trash_glass_e1.png');

        game.load.image('spriteProjMetal' , 'assets/graphics/sprite_projectile_metal_e1.png');
        game.load.image('spriteProjPlastic' , 'assets/graphics/sprite_projectile_plastic_e1.png');
        game.load.image('spriteProjPaper' , 'assets/graphics/sprite_projectile_glass_e1.png');
        game.load.image('spriteProjGlass' , 'assets/graphics/sprite_projectile_paper_e1.png');


        game.load.image('spriteEnnemi' , 'assets/graphics/sprite_ennemi1_e1.png');
        game.load.image('spritePickup' , 'assets/graphics/sprite_pickup_e1.png');
        
        // Chargement des sons
        game.load.audio('explosion',['assets/audio/explosion.wav',]);
        game.load.audio('hit',['assets/audio/hit.wav',]);
        game.load.audio('shoot',['assets/audio/shoot.wav',]);
        game.load.audio('startup',['assets/audio/startup.wav',]);
        game.load.audio('bgm_menu',['assets/audio/gin_menu.mp3',]);    
    },
    
    create : function(){
        // On démarre l'état du menu
        game.state.start('menu');
    },
    
};
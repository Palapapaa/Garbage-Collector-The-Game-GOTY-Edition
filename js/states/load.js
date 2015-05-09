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
        game.load.image('achievementsBackground' , 'assets/graphics/background_achievements.png');
        game.load.image('shooterBackground' , 'assets/graphics/background_shooter.png');
        
        game.load.image('spritePlayer' , 'assets/graphics/sprite_joueur_e1.png');

        //Sprite trash
        game.load.image('spriteTrashMetal' , 'assets/graphics/sprite_trash_metal_e1.png');
        game.load.image('spriteTrashPlastic' , 'assets/graphics/sprite_trash_plastic_e1.png');
        game.load.image('spriteTrashPaper' , 'assets/graphics/sprite_trash_paper_e1.png');
        game.load.image('spriteTrashGlass' , 'assets/graphics/sprite_trash_glass_e1.png');

        //Sprite projectiles
        game.load.image('spriteProjMetal' , 'assets/graphics/sprite_projectile_metal_e1.png');
        game.load.image('spriteProjPlastic' , 'assets/graphics/sprite_projectile_plastic_e1.png');
        game.load.image('spriteProjPaper' , 'assets/graphics/sprite_projectile_glass_e1.png');
        game.load.image('spriteProjGlass' , 'assets/graphics/sprite_projectile_paper_e1.png');
        
            

        game.load.image('spriteEnnemi' , 'assets/graphics/sprite_ennemi1_e1.png');
        game.load.image('spritePickup' , 'assets/graphics/sprite_pickup_e1.png');
        
        game.load.image('upArrowPic' , 'assets/graphics/up_arrow.png');
        game.load.image('downArrowPic' , 'assets/graphics/down_arrow.png');
        game.load.image('leftArrowPic' , 'assets/graphics/left_arrow.png');
        game.load.image('rightArrowPic' , 'assets/graphics/right_arrow.png');
        game.load.image('spaceBarPic' , 'assets/graphics/space_bar.png');

        //chargement des images liées aux succès
        game.load.image('achievementLocked' , 'assets/graphics/achievement_lock.png');
        game.load.image('achievementUnlocked' , 'assets/graphics/achievement_unlock.png');
        game.load.image('iconLock' , 'assets/graphics/icon_lock.png');
        for(var i=0, l = achievements.length; i<l; i++){
            game.load.image("icon"+achievements[i].id , 'assets/graphics/'+achievements[i].icon);
            
        }
        
        // Chargement des sons
        game.load.audio('explosion',['assets/audio/explosion.wav',]);
        game.load.audio('hit',['assets/audio/hit.wav',]);
        game.load.audio('death',['assets/audio/death.wav',]);
        game.load.audio('shoot',['assets/audio/shoot.wav',]);
        game.load.audio('startup',['assets/audio/startup.wav',]);
        game.load.audio('bgm_menu',['assets/audio/gin_menu.mp3',]);    
        game.load.audio('pickup',['assets/audio/pickup.wav',]);    
    },
    
    create : function(){
        // On démarre l'état du menu
        game.state.start('menu');
    },
    
};
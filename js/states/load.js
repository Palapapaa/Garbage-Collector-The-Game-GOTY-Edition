var loadState = {
 
    preload : function(){
        console.log("Load state preload");
        
        // Affichage de l'image de fond
        var background = game.stage.backgroundColor = '#199BC4';

        // Affichage du texte de chargement
        var loadingLabel = game.add.text(game.world.centerX, 175, 'Chargement...',
        { font: '96px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);
        
        // Affichage de la progress bar
        //This is the bright blue bar that is hidden by the dark bar
        this.barBg = game.add.sprite(game.world.centerX, game.world.centerY + 80, 'progress_bar_bg');
        this.barBg.anchor.setTo(0.5, 0.5);
        //This bar will get cropped by the setPreloadSprite function as the game loads!
        this.bar = game.add.sprite(game.world.centerX - 240, game.world.centerY + 80, 'progress_bar');
        this.bar.anchor.setTo(0, 0.5);
        game.load.setPreloadSprite(this.bar);
        
        // Chargement des images
        game.load.image('menuBackground' , 'assets/graphics/background_menu.png');
        game.load.image('menuSelector' , 'assets/graphics/menu_selector.png');
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

        game.load.image('spriteProjPaper' , 'assets/graphics/sprite_projectile_paper_e1.png');
        game.load.image('spriteProjGlass' , 'assets/graphics/sprite_projectile_glass_e1.png');
        
        game.load.image('spriteBoss' , 'assets/graphics/sprite_boss.png');

        game.load.image('particleRed' , 'assets/graphics/pixel_red.png');
        game.load.image('particleGreen' , 'assets/graphics/pixel_green.png');

        game.load.image('spriteBarillet' , 'assets/graphics/sprite_barillet.png');

        game.load.image('spriteEnnemi' , 'assets/graphics/sprite_ennemi1_e1.png');

        //Pickup
        game.load.image('spritePickupGlass' , 'assets/graphics/sprite_pickup_glass_e1.png');
        game.load.image('spritePickupMetal' , 'assets/graphics/sprite_pickup_metal_e1.png');
        game.load.image('spritePickupPaper' , 'assets/graphics/sprite_pickup_paper_e1.png');
        game.load.image('spritePickupPlastique' , 'assets/graphics/sprite_pickup_plastic_e1.png');
        
        //images tuto
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
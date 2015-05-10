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
        game.load.image('menuTitle' , 'assets/graphics/menu_title.png');
        game.load.image('menuButton' , 'assets/graphics/menu_button.png');
        game.load.image('menuSelector' , 'assets/graphics/menu_selector.png');
        game.load.image('achievementsBackground' , 'assets/graphics/background_achievements.png');
        game.load.image('level1Background' , 'assets/graphics/background_level1.png');
        game.load.image('level2Background' , 'assets/graphics/background_level2.png');
        game.load.image('level3Background' , 'assets/graphics/background_level3.png');
        
        game.load.image('menuCiel' , 'assets/graphics/menu-ciel.png');
        game.load.image('menuNuages' , 'assets/graphics/menu-nuages.png');
        game.load.image('menuRoute' , 'assets/graphics/menu-route.png');
        
        game.load.image('achievementPopup' , 'assets/graphics/sprite_popup.png');

        game.load.image('spritePlayer' , 'assets/graphics/sprite_joueur_e1.png');
        game.load.spritesheet('spriteSheetPlayer' , 'assets/graphics/sprite_joueur.png', 144, 96);
        game.load.image('spriteAspirateur' , 'assets/graphics/sprite_aspirateur.png');

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
        
        game.load.image('spriteBoss1' , 'assets/graphics/sprite_boss1.png');
        game.load.image('spriteBoss1Damaged' , 'assets/graphics/sprite_boss1_damaged.png');

        //game.load.image('smoke', 'assets/smoke-puff.png');

        game.load.image('particleRed' , 'assets/graphics/pixel_red.png');
        game.load.image('particleGreen' , 'assets/graphics/pixel_green.png');
        game.load.image('particleBrown' , 'assets/graphics/pixel_brown.png');
        game.load.image('particleSmoke' , 'assets/graphics/smoke.png');
        game.load.image('particlePowerupSpeed' , 'assets/graphics/particle_speed.png');
        game.load.image('particlePowerupDamage' , 'assets/graphics/particle_damage.png');

        game.load.image('spriteEnnemi' , 'assets/graphics/sprite_ennemi1_e1.png');
        
        // Sprites UI
        // Vie
        game.load.image('spriteLifeHalf' , 'assets/graphics/sprite_life_half.png');
        game.load.image('spriteLifeFull' , 'assets/graphics/sprite_life_full.png');
        // Barillet
        game.load.spritesheet('spriteSheetBarillet' , 'assets/graphics/sprite_barillet.png', 128, 128);

        //Pickup
        game.load.image('spritePickupGlass' , 'assets/graphics/sprite_pickup_glass_e1.png');
        game.load.image('spritePickupMetal' , 'assets/graphics/sprite_pickup_metal_e1.png');
        game.load.image('spritePickupPaper' , 'assets/graphics/sprite_pickup_paper_e1.png');
        game.load.image('spritePickupPlastique' , 'assets/graphics/sprite_pickup_plastic_e1.png');
        game.load.image('spritePickupBulb' , 'assets/graphics/sprite_pickupBulb.png');
        game.load.image('spritePickupBattery' , 'assets/graphics/sprite_pickupBattery.png');
        


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
        
        //chargement des images liées aux niveaux
        game.load.image('levelSelector' , 'assets/graphics/level_selector.png');
        game.load.image('levelButton' , 'assets/graphics/level_button.png');
        game.load.image('iconCleared' , 'assets/graphics/icon_cleared.png');
        for(var i=0, l = levels.length; i<l; i++){
            game.load.image("icon"+levels[i].id , 'assets/graphics/'+levels[i].icon);
            
        }
        
        
        
        // Chargement des sons
        game.load.audio('explosion',['assets/audio/explosion.wav',]);
        game.load.audio('hit',['assets/audio/hit.wav',]);
        game.load.audio('death',['assets/audio/death.wav',]);
        game.load.audio('win',['assets/audio/win.wav',]);
        game.load.audio('powerup',['assets/audio/powerup.wav',]);
        game.load.audio('powerdown',['assets/audio/powerdown.wav',]);
        game.load.audio('shoot',['assets/audio/shoot.wav',]);
        game.load.audio('startup',['assets/audio/startup.wav',]);
        game.load.audio('bgm_menu',['assets/audio/gin_menu.mp3',]);    
        game.load.audio('pickup',['assets/audio/pickup.wav',]);
        game.load.audio('cleanSuccess',['assets/audio/clean_success.wav',]);
        game.load.audio('cleanFail',['assets/audio/clean_fail.wav',]);
        game.load.audio('bossTrashSpawn',['assets/audio/boss_trash_spawn.wav',]);
    },
    
    create : function(){
        // On démarre l'état du menu
        game.state.start('menu');
    },
    
};
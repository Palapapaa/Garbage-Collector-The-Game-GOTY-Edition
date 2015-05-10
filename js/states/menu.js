var menuState = {
 
    preload : function(){
        console.log("Menu state preload");       
        //this.bgm = game.add.audio("bgm_menu");
        this.pickupSound = game.add.audio("pickup");
        this.UP = -1;
        this.DOWN = 1;
        this.startUpSound = game.add.audio("startup");
        this.inputManager = new InputManager(game);
        this.menuItems = [
            {"id" : "worldmap", "y" : game.world.centerY-32},
            {"id" : "tutorial", "y" : game.world.centerY+64},
            {"id" : "achievement", "y" : game.world.centerY+160},
        ];
        this.selectedItem = 0;
        this.MENUSWITCHDELAY = 8;//temps entre chaque changement d'item dans le menu
        this.menuSwitchCooldown=0;//temps avant de changer d'item dans le menu à nouveau
    },
    
    
    create : function(){
        // Affichage du fond
        var background = game.stage.backgroundColor = '#199BC4';


        //
        this.backgroundCiel     = game.add.sprite(0,0,"menuCiel");
        this.backgroundRoute    = game.add.sprite(0,0,"menuRoute");
        this.backgroundNuages   = game.add.sprite(0,0,"menuNuages");
        this.backgroundNuages2   = game.add.sprite(1600,0,"menuNuages");

        
        //affichage du joueur
         // Création joueur
        this.player = new Player(10, 3, this.weapons, "spritePlayer");
        this.player.sprite.animations.play('move');
        //Ajout de l'aspirateur sur le joueur
        this.aspirateur = game.add.sprite(this.player.sprite.x+26, this.player.sprite.y-3, "spriteAspirateur");
        
        var title = game.add.sprite(0,0,"menuTitle");
        var playButton = game.add.text(game.world.centerX, game.world.centerY, 'Jouer',
        { font: 'bold 64px Arial', fill: '#FFA500' });
        playButton.anchor.setTo(0.5, 0.5);
        var tutorialButton = game.add.text(game.world.centerX, game.world.centerY+96, 'Tutoriel',
        { font: 'bold 64px Arial', fill: '#FFA500' });
        tutorialButton.anchor.setTo(0.5, 0.5);
        var achievementButton = game.add.text(game.world.centerX, game.world.centerY+192, 'Succès',
        { font: 'bold 64px Arial', fill: '#FFA500' });
        achievementButton.anchor.setTo(0.5, 0.5);
        var helpText = game.add.text(game.world.centerX, 560, 'Appuyez sur Espace pour valider',
        { font: 'italic 24px Arial', fill: '#FFA500'});
        helpText.anchor.setTo(0.5, 0.5);
        this.selector = game.add.sprite(180,this.menuItems[this.selectedItem].y,"menuSelector");
        this.startUpSound.play();
        
        //this.bgm.loop= true;
        //this.bgm.play();
        
    },
    
    update : function(){
        
        
        
        
        if(this.menuSwitchCooldown>0){
            this.menuSwitchCooldown--;   
        }

        if(this.inputManager.down.isDown === true){
            this.menuSwitch(this.DOWN);
        }

        if(this.inputManager.up.isDown === true){
            this.menuSwitch(this.UP);
        }
        
        // On lance l'état sélectionné
        if(this.inputManager.select.isDown){
            this.pickupSound.play();
            game.state.start(this.menuItems[this.selectedItem].id);
        }
        this.backgroundRoute.x  -= 4;
        this.backgroundNuages.x --;
        this.backgroundNuages2 --;
        if(this.backgroundRoute.x < -800){
            this.backgroundRoute.x = 0;
        }
        if(this.backgroundNuages2.x < 0){
            this.backgroundNuages.x = this.backgroundNuages2.width;
            this.backgroundNuages2.x = this.backgroundNuages2.width;

        }
        
        //suivi du curseur par le joueur
        var dy = (this.selector.y - this.player.sprite.y)/20;
        this.player.sprite.y+=dy;
        this.aspirateur.y+=dy;


    },
    
    //changement d'item dans le menu
    menuSwitch : function(direction){
        if(this.menuSwitchCooldown <= 0){
            
            this.selectedItem=(this.selectedItem+direction)%this.menuItems.length;
            game.global.selectedItem = this.selectedItem;
            if(this.selectedItem <0){
                this.selectedItem = this.menuItems.length-1;                
            }
            this.selector.y = this.menuItems[this.selectedItem].y;
            this.menuSwitchCooldown=this.MENUSWITCHDELAY;
        }
        
    },
};
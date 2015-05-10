var worldmapState = {
 
    preload : function(){
        console.log("WorldMap state preload");
        this.inputManager = new InputManager(game);
        this.UP = -1;
        this.DOWN = 1;
        this.selectedItem = 1;
        this.MENUSWITCHDELAY = 15;//temps entre chaque changement d'item dans le menu
        this.menuSwitchCooldown=0;//temps avant de changer d'item dans le menu à nouveau
    },
    
    create : function(){
        // Affichage du fond
        var background = game.stage.backgroundColor = '#199BC4';
        
        // Affichage du Titre du menu
        var loadingLabel = game.add.text(game.world.centerX, 100, 'Choix du niveau',
        { font: '64px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);
        
        this.selector = game.add.sprite(levels[this.selectedItem].x,levels[this.selectedItem].y,"levelSelector");
       this.selector.anchor.setTo(0,1);
        //affichage des différents niveaux + shop
        for(var i=0, l = levels.length; i<l; i++){
            
            
            var levelBgIcon = game.add.sprite(levels[i].x, levels[i].y, "levelButton");
            var levelFgIcon = game.add.sprite(levels[i].x, levels[i].y, "icon"+levels[i].id);
            
            //si le niveau est bloqué ou terminé
            if(game.global.clearedLevels.indexOf(levels[i].id)!=-1){
                var levelWidget = game.add.sprite(levels[i].x, levels[i].y, "iconCleared");
            }else if(game.global.lastLevel < levels[i].req){
                var levelWidget = game.add.sprite(levels[i].x, levels[i].y, "iconLock");
            }
            
        }
        this.pickupSound = game.add.audio("pickup");
        this.hitSound = game.add.audio("hit");
    },
    
    update : function(){
        if(this.menuSwitchCooldown>0){
            this.menuSwitchCooldown--;   
        }
        if(this.inputManager.esc.isDown){
            game.state.start('menu');
        }
        if(this.inputManager.right.isDown === true){
            this.menuSwitch(this.DOWN);
        }
        if(this.inputManager.left.isDown === true){
            this.menuSwitch(this.UP);
        }
        
        // On lance l'état sélectionné
        if(this.inputManager.select.isDown){
            this.levelSelect();
        }
        
        
    },
    
    //changement d'item dans le menu
    menuSwitch : function(direction){
        if(this.menuSwitchCooldown <= 0){
            
            this.selectedItem=(this.selectedItem+direction)%levels.length;
            if(this.selectedItem <0){
                this.selectedItem = levels.length-1;
                
            }
            this.selector.x = levels[this.selectedItem].x;
            this.selector.y = levels[this.selectedItem].y;
            this.menuSwitchCooldown=this.MENUSWITCHDELAY;
            
        }
        
    },
    levelSelect : function(){
        //on lance le niveau selectionné si débloqué
        if(game.global.lastLevel >= levels[this.selectedItem].req){
                game.state.start(levels[this.selectedItem].state, false, false,levels[this.selectedItem]);
            this.pickupSound.play();
        }else{
            this.hitSound.play();
        }
        
    }
    
};
var menuState = {
 
    preload : function(){
        console.log("Menu state preload");       
        this.bgm          = game.add.audio("bgm_menu");
        this.UP = -1;
        this.DOWN = 1;
        this.startUpSound = game.add.audio("startup");
        this.inputManager = new InputManager(game);
        this.menuItems = [
            {"id" : "worldmap", "y" : 300},
            {"id" : "tutorial", "y" : 400},
            {"id" : "achievement", "y" : 500},
        ];
        this.selectedItem = 0;
        this.MENUSWITCHDELAY = 15;//temps entre chaque changement d'item dans le menu
        this.menuSwitchCooldown=0;//temps avant de changer d'item dans le menu à nouveau
    },
    
    
    create : function(){
        // Affichage de l'image de fond
        var background = game.add.sprite(0,0,"menuBackground");
        
        this.selector = game.add.sprite(130,this.menuItems[this.selectedItem].y,"menuSelector");
        //this.startUpSound.play();
        
        this.bgm.loop= true;
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
            game.state.start(this.menuItems[this.selectedItem].id);
        }
        
        
    },
    
    //changement d'item dans le menu
    menuSwitch : function(direction){
        if(this.menuSwitchCooldown <= 0){
            
            this.selectedItem=(this.selectedItem+direction)%this.menuItems.length;
            if(this.selectedItem <0){
                this.selectedItem = this.menuItems.length-1;
                
            }
            this.selector.y = this.menuItems[this.selectedItem].y;
            this.menuSwitchCooldown=this.MENUSWITCHDELAY;
            
        }
        
    },
};
var gameoverState = {
 
    preload : function(){
        console.log("Gameover state preload");       
       
        this.inputManager = new InputManager(game);
        
        
        
        this.menuSwitchCooldown=30;//temps avant de valider la sélection
    },
    
    
    create : function(){
       
        
        // Affichage du fond
        var background = game.stage.backgroundColor = '#199BC4';
        
        var goTitle = game.add.text(game.world.centerX, 120, 'GAME OVER',
        { font: 'bold 64px Arial', fill: '#ffffff' });
        goTitle.anchor.setTo(0.5, 0.5);
        var screenTitle = game.add.text(game.world.centerX, 300, 'Appuyez sur la touche valider pour continuer...',
        { font: 'bold 32px Arial', fill: '#ffffff' });
        screenTitle.anchor.setTo(0.5, 0.5);
        
        
        
    },
    
    update : function(){
         if(this.menuSwitchCooldown>0){
            this.menuSwitchCooldown--;   
        }

        
        
        // On quitte le menu
        if(this.inputManager.select.isDown){
            this.select();
        }
        
        
    },
    
 
    //appui sur la touche select
    select : function(){
        if(this.menuSwitchCooldown <= 0){
            
            game.state.start("worldmap");
        }
    }
};
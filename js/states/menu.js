var menuState = {
 
    preload : function(){
        console.log("Menu state preload");       
        this.bgm          = game.add.audio("bgm_menu");  
        this.startUpSound = game.add.audio("startup");
        this.inputManager = new InputManager(game);
    },
    
    create : function(){
        // Affichage de l'image de fond
        var background = game.add.sprite(0,0,"menuBackground");
        
        this.startUpSound.play();
        
        this.bgm.loop= true;
        //this.bgm.play();
        
        
    },
    
    update : function(){
        //passage à l'état de jeu worldmap
        if(this.inputManager.select.isDown){
            console.log("Enter down : "+this.inputManager.select.isDown);
            game.state.start('worldmap');
        }
        
        
    },
    
};
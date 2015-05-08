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
        // Passage à l'état de jeu worldmap
        if(this.inputManager.select.isDown){
            game.state.start('worldmap');
        }// Passage à l'état de jeu tutorial
        else if(this.inputManager.tutorial.isDown){
            game.state.start('tutorial');
        }// Passage à l'état de jeu achievement
        else if(this.inputManager.achievement.isDown){
            game.state.start('achievement');
        }
        
        
    },
    
};
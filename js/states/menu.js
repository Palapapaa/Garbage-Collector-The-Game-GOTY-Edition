var menuState = {
 
    preload : function(){
        console.log("Menu state preload");       
        this.bgm          = game.add.audio("bgm_menu");
        
        this.startUpSound = game.add.audio("startup");
        this.enterKey     = this.game.input.keyboard.addKey(input.select);
    },
    
    create : function(){
        //mise en place du fond d'écran
        var background = game.add.sprite(0,0,"menuBackground");
        
        this.startUpSound.play();
        
        this.bgm.loop= true;
        //this.bgm.play();
        
        
    },
    
    update : function(){
        //passage à l'état de jeu worldmap
        if(this.enterKey.isDown != game.global.enterLastValue){
            game.global.enterLastValue = this.enterKey.isDown;
            console.log("Enter down : "+this.enterKey.isDown);
            game.state.start('worldmap');
        }
        
        
    },
    
};
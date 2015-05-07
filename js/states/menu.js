var menuState = {
 
    preload : function(){
        console.log("Menu state preload");       
        this.bgm= game.add.audio("bgm_menu");
        
        this.cursor = game.input.keyboard.createCursorKeys();
        this.startUpSound= game.add.audio("startup");
        
        this.lastValue =false;
        
    },
    
    create : function(){
        
        var background = game.add.sprite(0,0,"menuBackground");
        this.startUpSound.play();
        
        this.bgm.loop= true;
        this.bgm.play();
        
        
    },
    
    update : function(){
        
        //debug
        if(this.cursor.left.isDown != this.lastValue){
            this.lastValue= this.cursor.left.isDown;
            console.log("Left down : "+this.cursor.left.isDown);
        }
        
        
    },
    
};
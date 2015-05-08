var worldmapState = {
 
    preload : function(){
        console.log("WorldMap state preload");
        
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    },
    
    create : function(){
        var background = game.add.sprite(0,0,"worldmapBackground");

        var player = new Player();

        var ennemies = [];
    },
    
    update : function(){
        
        
         //passage à l'état de jeu shooter
        if(this.spaceKey.isDown ){
            game.state.start('shooter');
        }
        //passage à l'état de jeu shop
        if(this.sKey.isDown ){
            game.state.start('shop');
        }


        
        
    },
    
};
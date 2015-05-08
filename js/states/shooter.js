var shooterState = {
 
    preload : function(){
        console.log("Shooter state preload");
    },
    
    create : function(){
        var background = game.add.sprite(0,0,"shooterBackground");

        var weapon = new Weapon(10);
        var player = new Player(10, 0, weapon, "spritePlayer");
    },
    
    update : function(){
        
        //A voir si on fera vraiment comme ça ...
    },
};
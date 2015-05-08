var shooterState = {
    preload : function(){
        console.log("Shooter state preload");
        this.UP = -1;
        this.DOWN = 1;
        this.LEVELTOP=250;
        this.LEVELBOTTOM=game.global.gameHeight;
    },
    
    create : function(){
        var background = game.add.sprite(0,0,"shooterBackground");

        //Initialisation variablles
        this.weapon = new Weapon(10);
        this.player = new Player(10, 2, this.weapon, "spritePlayer");

		this.ennemies = [];

		this.nbEnnemies = 150;
		this.proba = 0.001;//Variable pour apparition ennemies (plus ellevé = moins d'ennemies)

		//Initialisation mouvements
        this.down  = this.game.input.keyboard.addKey(input.moveDown);
        this.up    = this.game.input.keyboard.addKey(input.moveUp);
        this.esc   = this.game.input.keyboard.addKey(input.esc);



    },
    
    update : function(){
        
        //A voir si on fera vraiment comme ça ...
        
        if(this.down.isDown){
    		this.movePlayer(this.DOWN)
    	}else if(this.up.isDown){
    		this.movePlayer(this.UP)
    	}


        if(Math.random() < this.proba){
            var ennemy = new Trash(10, "spriteTrash");
        	this.ennemies.push(ennemy);
        	this.nbEnnemies--;
        }



        var indexToDel = [];
        for(var i = 0, l = this.ennemies.length; i < l; i++){
        	var spriteEnnemy = this.ennemies[i].sprite;
        	spriteEnnemy.x--;

        	if(spriteEnnemy.x < (0 - spriteEnnemy.width)){
        		indexToDel.push(i);
        	}
        //	ennemies[i].sprite.y--;

        }
    },

    movePlayer : function(direction){
    	var newY = this.player.sprite.y + direction*(this.player.speed);
    	if(this.player.life > 0 && (newY>=this.LEVELTOP&&newY+this.player.sprite.height<=this.LEVELBOTTOM)){

    		this.player.sprite.y =newY;
        }
    }
};
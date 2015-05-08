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
		this.proba = 0.011;//Variable pour apparition ennemies (plus ellevé = moins d'ennemies)

		//Initialisation mouvements
        this.down  = this.game.input.keyboard.addKey(input.moveDown);
        this.up    = this.game.input.keyboard.addKey(input.moveUp);
        this.esc   = this.game.input.keyboard.addKey(input.esc);

        this.firstEnnemy = game.add.sprite(11, 261,"spriteTrash");
        game.physics.arcade.enable(this.firstEnnemy);
        game.physics.arcade.collide(this.player.sprite, this.firstEnnemy);
        game.physics.arcade.overlap(this.player.sprite, this.firstEnnemy, this.takeDamage, null, this);

    },
    
    update : function(){
        
        //A voir si on fera vraiment comme ça ...
        
        if(this.down.isDown){
    		this.movePlayer(this.DOWN)
    	}else if(this.up.isDown){
    		this.movePlayer(this.UP)
    	}
        if(Math.random() < this.proba){
	    	this.addEnnemy();
        }


        var indexToDel = [];
        for(var i = 0, l = this.ennemies.length; i < l; i++){
        	var spriteEnnemy = this.ennemies[i].sprite;
        	spriteEnnemy.x--;

        	if(spriteEnnemy.x < (0 - spriteEnnemy.width)){
        		indexToDel.push(i);
        	}
        	game.physics.arcade.overlap(this.player.sprite, this.ennemies[i].sprite, this.takeDamage, null, this);
        //	ennemies[i].sprite.y--;

        }

        if(indexToDel.length != 0){
	        for(var i = indexToDel.length-1; i !== 0; i--){
	        	this.ennemies[indexToDel[i]].sprite.kill();
	        	this.ennemies.splice(this.ennemies[indexToDel[i]], 1);
	        }
        }
    },

    movePlayer : function(direction){
    	var newY = this.player.sprite.y + direction*(this.player.speed);
    	if(this.player.life > 0 && (newY>=this.LEVELTOP&&newY+this.player.sprite.height<=this.LEVELBOTTOM)){

    		this.player.sprite.y =newY;
        }
    },

    addEnnemy : function(){
        var ennemy = new Trash(10, "spriteTrash");
        this.ennemies.push(ennemy);
        this.nbEnnemies--;
        game.physics.arcade.collide(this.player.sprite, ennemy.sprite);

    },

    takeDamage : function(player, ennemy){
    	ennemy.kill();
    	this.player.life--;
    }
};
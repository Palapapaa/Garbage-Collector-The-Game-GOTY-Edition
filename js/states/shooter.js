var shooterState = {
    preload : function(){
        console.log("Shooter state preload");
        this.UP = -1;
        this.DOWN = 1;
        this.LEVELTOP=250;
        this.LEVELBOTTOM=game.global.gameHeight;
        this.nbEnnemies = 150;
        this.proba = 0.011;//Variable pour apparition ennemies (plus elevé = plus d'ennemis)
    },
    
    create : function(){
        var background = game.add.sprite(0,0,"shooterBackground");

        //Initialisation variablles
        this.availableTypes = ["metal", "glass", "plastic", "paper"];



        
        //création des armes du joueur
        var weapons = [];
        for(var i = 0, l= this.availableTypes.length;i< l; i++){
            weapons.push(new Weapon(10,this.availableTypes[i] ));
        }

        //création joueur
        this.player = new Player(10, 2, weapons, "spritePlayer");
        

		this.ennemies = [];
        this.projectiles =[];

		

		//Initialisation mouvements
        this.down  = this.game.input.keyboard.addKey(input.moveDown);
        this.up    = this.game.input.keyboard.addKey(input.moveUp);
        this.esc   = this.game.input.keyboard.addKey(input.esc);
        this.fireKey  = this.game.input.keyboard.addKey(input.fire);


        console.log("shooter state create() finished");

    },
    
    update : function(){
        
        
        if(this.down.isDown){
    		this.movePlayer(this.DOWN)
    	}else if(this.up.isDown){
    		this.movePlayer(this.UP)
    	}
        
        //mise à jour du cooldown des armes du joueur
        for(var i =0, l = this.player.weapons.length; i< l;i++){
            if(this.player.weapons[i].cooldown >0){
                this.player.weapons[i].cooldown--;
            }
        }
        
        if(this.fireKey.isDown){
            this.fire();
            
        }
        
        //gestion de l'apparition des ennemis
        if(Math.random() < this.proba){
	    	this.addEnnemy();
        }

        
        var indexToDelEnnemies = [];
        var indexToDelProj = [];
        for(var i = 0, l = this.ennemies.length; i < l; i++){
        	var spriteEnnemy = this.ennemies[i].sprite;
        	spriteEnnemy.x--;

        	if(spriteEnnemy.x < (0 - spriteEnnemy.width)){
        		indexToDelEnnemies.push(i);
        	}
        	game.physics.arcade.overlap(this.player.sprite, this.ennemies[i].sprite, this.takeDamage, null, this);
        //	ennemies[i].sprite.y--;

        }

        if(indexToDelEnnemies.length != 0){
	        for(var i = indexToDelEnnemies.length-1; i !== 0; i--){
	        	this.ennemies[indexToDelEnnemies[i]].sprite.kill();
	        	this.ennemies.splice(this.ennemies[indexToDelEnnemies[i]], 1);
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
        var ennemy = new Trash(10, "metal");
        this.ennemies.push(ennemy);
        this.nbEnnemies--;
        //game.physics.arcade.collide(this.player.sprite, ennemy.sprite);

    },

    takeDamage : function(player, ennemy){
    	ennemy.kill();
    	this.player.life--;
    },
    fire : function(){
        //si l'arme selectionnée est dispo, on tire
        if(this.player.weapons[this.player.selectedWeapon].cooldown === 0){
            console.log("FIRE");

            //Création d'un projectile
            var x = this.player.sprite.x+this.player.sprite.width;
            var y = this.player.sprite.y+this.player.sprite.height/2;
            var p=this.player.weapons[this.player.selectedWeapon].fire(x,y);
            this.projectiles.push(p);

        }

    },
};
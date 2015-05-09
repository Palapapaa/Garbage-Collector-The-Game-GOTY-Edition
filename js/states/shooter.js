var shooterState = {
    preload : function(){
        console.log("Shooter state preload");
        this.UP = -1;
        this.DOWN = 1;
        this.LEVELTOP=250;
        this.LEVELBOTTOM=game.global.gameHeight;
        this.nbEnnemies = 150;
        this.proba = 0.011;//Variable pour apparition ennemies (plus elevé = plus d'ennemis)
        this.levelSpeed = 3;
        this.inputManager = new InputManager(game);
        
        this.shootSound = game.add.audio("shoot");
        this.hitSound = game.add.audio("hit");
        this.deathSound = game.add.audio("death");
    },
    
    create : function(){
        // Affichage de l'image de fond
        var background = game.add.sprite(0,0,"shooterBackground");

        //Initialisation variablles
        this.availableTypes = ["metal", "glass", "plastic", "paper"];



        
        //création des armes du joueur
        var weapons = [];
        for(var i = 0, l= this.availableTypes.length;i< l; i++){
            weapons.push(new Weapon(30,this.availableTypes[i] ));
        }

        //création joueur
        this.player = new Player(10, 2, weapons, "spritePlayer");
        

		this.ennemies = [];
        this.projectiles =[];

        console.log("shooter state create() finished");

		this.nbEnnemies = 150;
		this.proba = 0.011;//Variable pour apparition ennemies (plus ellevé = moins d'ennemies)
    },
    
    update : function(){
        

        //A voir si on fera vraiment comme ça ...
        // Passage à l'état de jeu world map
        if(this.inputManager.esc.isDown){
            game.state.start('worldmap');
        }
        if(this.inputManager.down.isDown){
    		this.movePlayer(this.DOWN)
    	}else if(this.inputManager.up.isDown){
    		this.movePlayer(this.UP)
    	}
        
        //mise à jour du cooldown des armes du joueur
        for(var i =0, l = this.player.weapons.length; i< l;i++){
            if(this.player.weapons[i].cooldown >0){
                this.player.weapons[i].cooldown--;
            }
        }
        
        if(this.inputManager.fire.isDown){
            this.fire();
            
        }
        
        //gestion de l'apparition des ennemis
        if(Math.random() < this.proba){
	    	this.addEnnemy();
        }

        
        var indexToDelEnnemies = [];
        var indexToDelProj = [];
        //mise à jour des projectiles
        for(var i = 0, l = this.projectiles.length; i < l; i++){
            var spriteProj = this.projectiles[i].sprite;
            spriteProj.x+=this.projectiles[i].speed;
            if(spriteProj.x > game.global.gameWidth){
                indexToDelProj.push(i);
            }
        }
        //mise à jour des ennemis
        for(var i = 0, l = this.ennemies.length; i < l; i++){
        	var spriteEnnemy = this.ennemies[i].sprite;
        	spriteEnnemy.x-=this.levelSpeed;

            //l'ennemi arrive à gauche de l'écran
        	if(spriteEnnemy.x < (0 - spriteEnnemy.width)){
        		indexToDelEnnemies.push(i);
        	}
            //test de collision avec le joueur
        	game.physics.arcade.overlap(this.player.sprite, this.ennemies[i].sprite, this.takeDamage, null, this);

            /*
            //test de collision avec les projectiles
            for(var i = 0, l = this.projectiles.length; i < l; i++){
                var spriteProj = this.projectiles[i].sprite;
                
                
            }
            */

        //	ennemies[i].sprite.y--;

        }

        if(indexToDelEnnemies.length != 0){
	        for(var i = indexToDelEnnemies.length-1; i !== 0; i--){
	        	this.ennemies[indexToDelEnnemies[i]].sprite.kill();
	        	this.ennemies.splice(this.ennemies[indexToDelEnnemies[i]], 1);
	        }
        }
        if(indexToDelProj.length != 0){
            for(var i = indexToDelProj.length-1; i !== 0; i--){
                this.projectiles[indexToDelProj[i]].sprite.kill();
                this.projectiles.splice(this.projectiles[indexToDelProj[i]], 1);
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
        if(this.player.life > 0 ){
            this.hitSound.play();
            ennemy.kill();
            this.player.life--;
            //mort du joueur
            if(this.player.life <= 0){                
                this.deathSound.play();
            }
        }
    	
    },
    fire : function(){
        //si l'arme selectionnée est dispo, on tire
        if(this.player.weapons[this.player.selectedWeapon].cooldown === 0){
            console.log("FIRE");
            this.shootSound.play();
            //Création d'un projectile
            var x = this.player.sprite.x+this.player.sprite.width;
            var y = this.player.sprite.y+this.player.sprite.height/2;
            var p=this.player.weapons[this.player.selectedWeapon].fire(x,y);
            this.projectiles.push(p);

        }

    },
};
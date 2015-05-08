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
    },
    
    create : function(){
        // Affichage de l'image de fond
        this.background  = game.add.sprite(0,0,"shooterBackground");
        console.log(game.global.width)
        this.background2 = game.add.sprite(game.global.gameWidth,0,"shooterBackground");


        //Initialisation variablles
        this.availableTypes = ["metal", "glass", "plastic", "paper"];
        
        //création des armes du joueur
        var weapons = [];
        for(var i = 0, l= this.availableTypes.length;i< l; i++){
            weapons.push(new Weapon(30,this.availableTypes[i] ));
        }

        //création joueur
        this.player = new Player(10, 2, weapons, "spritePlayer");
        

		this.ennemies    = game.add.group();
        this.ennemies.enableBody = true;
        this.projectiles = game.add.group();
        this.projectiles.enableBody = true;

        //this.ennemies.enableBody(true);
        this.ennemies.createMultiple(25, "spriteTrashPlastic");
        game.physics.arcade.collide(this.player, this.ennemies);

        this.projectiles.createMultiple(25, "spriteProjMetal");
        game.physics.arcade.collide(this.player, this.projectiles);


        console.log("shooter state create() finished");

		this.nbEnnemies = 150;
		this.proba = 0.011;//Variable pour apparition ennemies (plus ellevé = moins d'ennemies)

        game.time.events.loop(1000, this.addEnnemy, this);
    },
    
    update : function(){
        
        //Déplacement du background
        this.background.x  -= this.player.speed;
        this.background2.x -= this.player.speed;

        if(this.background2.x < 0){
            this.background.x += game.global.gameWidth;
            this.background2.x += game.global.gameWidth;

        }

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
        
        //mise à jour des projectiles
        for(var i = 0, l = this.projectiles.children.length; i < l; i++){
            var spriteProj = this.projectiles.children[i];
            spriteProj.x+= spriteProj.speed;
        }
        game.physics.arcade.overlap(this.ennemies, this.projectiles, this.todoTrouverNomCarJaiLaFlemme, null, this);


        //mise à jour des ennemis
        for(var i = 0, l = this.ennemies.children.length; i < l; i++){
        	var spriteEnnemy = this.ennemies.children[i];
        	spriteEnnemy.x-=this.levelSpeed;
            //test de collision avec le joueur
        game.physics.arcade.overlap(this.player.sprite, this.ennemies.children[i], this.takeDamage, null, this);

        }

        
    },

    movePlayer : function(direction){
    	var newY = this.player.sprite.y + direction*(this.player.speed);
    	if(this.player.life > 0 && (newY>=this.LEVELTOP - (this.player.sprite.height/2) &&newY+(this.player.sprite.height/2)<=this.LEVELBOTTOM)){
    		this.player.sprite.y =newY;
        }
    },

    addEnnemy : function(){
        //var ennemy = new Trash(10, "metal");
        var ennemy = this.ennemies.getFirstDead();

        if(!ennemy)
            return;

        ennemy.trashType = "plastic";

        ennemy.life   = 10;
        var type= "plastic";
        var sprite = "spriteTrashPlastic";
        if(type === "metal"){
            sprite = "spriteTrashMetal";
        }else if(type === "glass"){
            sprite = "spriteTrashGlass";
        }else if(type === "paper"){
            sprite = "spriteTrashPaper";
        }else if(type === "plastic"){
            sprite = "spriteTrashPlastic";

        }else {
            console.log("olala un bug, faut p'tetre faire quelque chose");
        }
        ennemy.loadTexture(sprite);
        ennemy.checkWorldBounds = true;
        ennemy.outOfBoundsKill = true;
        ennemy.reset(((Math.random()*100) + 700) , ((Math.random() * 328)+250));


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

            var projectile = this.projectiles.getFirstDead();

            if(!projectile)
                return;

            projectile.damage   = 10;
            var type= "plastic";

            var sprite = "spriteProjPlastic";
            projectile.speed = 2;
            if(type === "metal"){
                sprite = "spriteProjMetal";
            }else if(type === "glass"){
                sprite = "spriteProjGlass";
            }else if(type === "paper"){
                sprite = "spriteProjPaper";
            }else if(type === "plastic"){
                sprite = "spriteProjPlastic";

            }else {
                console.log("olala un bug, faut p'tetre faire quelque chose")
            }

            var x = this.player.sprite.x+this.player.sprite.width;
            var y = this.player.sprite.y+this.player.sprite.height/2;
            //this.sprite = game.add.sprite(x ,y,sprite);
            projectile.loadTexture(sprite);
            projectile.checkWorldBounds = true;
            projectile.outOfBoundsKill = true;
            projectile.reset(x, y);

            this.player.weapons[this.player.selectedWeapon].reloadCooldown();

        }

    },

    todoTrouverNomCarJaiLaFlemme: function(ennemy, projectile){
        console.log("pouet")
        ennemy.kill();
        projectile.kill();
    }
};
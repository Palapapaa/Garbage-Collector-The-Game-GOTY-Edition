var shooterState = {
    preload : function(){
        console.log("Shooter state preload");
        this.UP = -1;
        this.DOWN = 1;
        this.LEVELTOP=250;

        this.LEVELBOTTOM=game.global.gameHeight;

        this.WEAPONSWITCHDELAY = 20;//temps entre chaque changement d'arme
        this.weaponSwitchCooldown=0;//temps avant de tirer à nouveau

        this.levelSpeed = 3;
        this.inputManager = new InputManager(game);

        this.nbEnnemies  = 25;
        this.stop        = false;
        this.bossAdded   = false;

        this.score       = 0;

        //Sons
        this.shootSound  = game.add.audio("shoot");
        this.hitSound    = game.add.audio("hit");
        this.deathSound  = game.add.audio("death");
        this.winSound    = game.add.audio("win");
        this.pickupSound = game.add.audio("pickup");
        this.cleanSuccessSound = game.add.audio("cleanSuccess");
        this.cleanFailSound = game.add.audio("cleanFail");

        this.playerBlink     = false;
        this.playerBlinkCpt  = 60;
        this.playerDisplayed = true;


        this.spriteProjType = {
            "metal"   : "spriteProjMetal", 
            "glass"   : "spriteProjGlass",
            "paper"   : "spriteProjPaper", 
            "plastic" : "spriteProjPlastic"
        };

        this.spriteTrashType = {
            "metal"   : "spriteTrashMetal", 
            "glass"   : "spriteTrashGlass",
            "paper"   : "spriteTrashPaper", 
            "plastic" : "spriteTrashPlastic"
        };

        this.spritePickupType = {
            "metal"   : "spritePickupMetal", 
            "glass"   : "spritePickupGlass",
            "paper"   : "spritePickupPaper", 
            "plastic" : "spritePickupPlastique"
        };

    },
    
    create : function(){


        // Affichage de l'image de fond
        this.background  = game.add.sprite(0,0,"shooterBackground");
        this.background2 = game.add.sprite(this.background.width,0,"shooterBackground");

        this.scoreLabel = game.add.text(game.world.centerX, 50, "Score : "+this.score,
        { font: '32px Arial', fill: '#FFFF00' });
        this.scoreLabel.anchor.setTo(0.5, 0.5);

        // Initialisation variables
        this.availableTypes = ["plastic","metal", "glass", "paper"];
        
        // Création des armes du joueur
        var weapons = [];
        for(var i = 0, l= this.availableTypes.length;i< l; i++){
            weapons.push(new Weapon(30,this.availableTypes[i], 5, 2));
        }
        
        // Définition du barillet
        this.barillet = game.add.sprite(704, 96, 'spriteSheetBarillet');
        this.barillet.anchor.setTo(0.5, 0.5);
        this.barillet.alpha = 0.75;
        this.barillet.labelWeapon0 = game.add.text(704, 55, game.global.inputLabel[0],
        { font: '28px Arial', fill: '#ffffff' }).anchor.setTo(0.5, 0.5);
        this.barillet.labelWeapon0 = game.add.text(747, 98, game.global.inputLabel[1],
        { font: '28px Arial', fill: '#ffffff' }).anchor.setTo(0.5, 0.5);
        this.barillet.labelWeapon0 = game.add.text(704, 140, game.global.inputLabel[2],
        { font: '28px Arial', fill: '#ffffff' }).anchor.setTo(0.5, 0.5);
        this.barillet.labelWeapon0 = game.add.text(662, 98, game.global.inputLabel[3],
        { font: '28px Arial', fill: '#ffffff' }).anchor.setTo(0.5, 0.5);
        
        this.barillet.animations.add('idle', 0, 8, true);
        this.barillet.animations.add('weapon0', [0,1,0,1,0], 8, false);
        this.barillet.animations.add('weapon1', [0,2,0,2,0], 8, false);
        this.barillet.animations.add('weapon2', [0,3,0,3,0], 8, false);
        this.barillet.animations.add('weapon3', [0,4,0,4,0], 8, false);
        
        // Groupe ennemi
		this.ennemies    = game.add.group();
        this.ennemies.enableBody = true;
        this.boss         = null;
        this.deplacementX = 0;
        this.dirX         = 1;//Direction du déplacement (-1 ou 1)
        this.deplacementY = 0;
        this.dirY         = 1;//Direction du déplacement (-1 ou 1)

        // Groupe projectiles
        this.projectiles = game.add.group();
        this.projectiles.enableBody = true;

        // Groupe pickups
        this.pickups = game.add.group();
        this.pickups.enableBody = true;

        this.pickups.createMultiple(25, "spritePickupMetal");
        game.physics.arcade.collide(this.aspirateur, this.pickups);

        this.ennemies.createMultiple(25, "spriteTrashPlastic");
        game.physics.arcade.collide(this.player, this.ennemies);

        this.projectiles.createMultiple(25, "spriteProjMetal");
        game.physics.arcade.collide(this.player, this.projectiles);

        // Création joueur
        this.player = new Player(10, 2, weapons, "spritePlayer");
        this.player.sprite.animations.play('move');

        //Ajout de l'aspirateur sur le joueur
        this.aspirateur = game.add.sprite(this.player.sprite.x+26, this.player.sprite.y-3, "spriteAspirateur");
        game.physics.arcade.enable(this.aspirateur);

        
        // Définition de la barre de vie
        this.lifeTab = [];
        this.updatePlayerLife(this.player.life);
        
        // Particules rouges
        this.emitterRed = game.add.emitter(0, 0 , 30);
        this.emitterRed.setXSpeed(-150, 150);
        this.emitterRed.setYSpeed(-150, 150);
        this.emitterRed.gravity = 0;
        this.emitterRed.makeParticles('particleRed');

        // Particules vertes
        this.emitterGreen = game.add.emitter(0, 0 , 30);
        this.emitterGreen.setXSpeed(-150, 150);
        this.emitterGreen.setYSpeed(-150, 150);
        this.emitterGreen.gravity = 0;
        this.emitterGreen.makeParticles('particleGreen');

        //Particules marrons
        this.emitterBrown = game.add.emitter(0, 0 , 15);
        this.emitterBrown.setXSpeed(-250, 250);
        this.emitterBrown.setYSpeed(-250, 250);
        this.emitterBrown.gravity = 0;
        this.emitterBrown.makeParticles('particleBrown');


        console.log("shooter state create() finished");

        this.loopEnnemies = game.time.events.loop(1000, this.addEnnemy, this);
    },
    
    update : function(){

        // Déplacement du background
        this.background.x  -= this.levelSpeed;
        this.background2.x -= this.levelSpeed;

        if(this.background2.x < 0){
            this.background.x += this.background.width;
            this.background2.x += this.background.width;

        }

        // A voir si on fera vraiment comme ça ...
        // Passage à l'état de jeu world map
        if(this.inputManager.esc.isDown === true){
            game.state.start('worldmap');
        }

        if(this.inputManager.down.isDown === true){
            this.movePlayer(this.DOWN);
        }
        if(this.inputManager.up.isDown === true){
            this.movePlayer(this.UP);
        }

        if(this.inputManager.weapon1.isDown === true){
            this.switchWeapon(0);
            this.fire();
        }else if(this.inputManager.weapon2.isDown === true){
            this.switchWeapon(1);
            this.fire();
        }else if(this.inputManager.weapon3.isDown === true){
            this.switchWeapon(2);
            this.fire();
        }else if(this.inputManager.weapon4.isDown === true){
            this.switchWeapon(3);
            this.fire();
        }
        
        //cooldown changement d'arme
        if(this.weaponSwitchCooldown > 0){            
            --this.weaponSwitchCooldown;
        }
        
        
        //mise à jour du cooldown des armes du joueur
        for(var i =0, l = this.player.weapons.length; i< l;++i){
            if(this.player.weapons[i].cooldown >0){
                --this.player.weapons[i].cooldown;
            }
        }
        
        //mise à jour des projectiles
        var nbProj = this.projectiles.children.length;
        if(nbProj > 0){
            for(var i = 0; i < nbProj; ++i){
                this.projectiles.children[i].x+= this.projectiles.children[i].speed;
            }
            game.physics.arcade.overlap(this.ennemies, this.projectiles, this.collisionEnnemyProjectile, null, this);
        }


        //mise à jour des pickups
        var nbPickup = this.pickups.children.length;
        if(nbPickup > 0){
            for(var i = 0; i < nbPickup; ++i){
                this.pickups.children[i].x-= this.levelSpeed;
            }
            game.physics.arcade.overlap(this.aspirateur, this.pickups, this.takePickup, null, this);
        }

        //mise à jour des ennemis
        var nbEnnemies = this.ennemies.children.length;
        if(nbEnnemies > 0){
            for(var i = 0, l = nbEnnemies; i < l; ++i){
                this.ennemies.children[i].x-=this.levelSpeed;
            }
            game.physics.arcade.overlap(this.player.body, this.ennemies, this.takeDamage, null, this);
        }


        //Les ennemies ont été butés, apparition du boss
        if(this.nbEnnemies < 0 && this.bossAdded === false){
            //On stop l'apparition des ennemies
            game.time.events.remove(this.loopEnnemies);
            //Affichage du boss
            this.boss = new Boss(42, "spriteBoss1", null);
            this.bossAdded = true;
            game.physics.arcade.collide(this.boss ,this.projectiles);
            game.physics.arcade.collide(this.boss, this.player);

            game.time.events.loop(1000, this.bossAddEnnemy, this);

        }else if(this.bossAdded === true){

            if(this.boss.sprite.x > 300){
                --this.boss.sprite.x;
            }

            //Les déplacements de boss c'est chiant --""
            //Si boss n'est pas en déplacement
            if(this.deplacementY <= 0){
                //Proba de déplacement du boss
                if(Math.random() < 0.05){
                    this.deplacementY = Math.round(Math.random()*50);
                    this.dirY         = (Math.round(Math.random())-0.5)*2;
                }
            //Si boss en déplacement, on le fait
            }else{
                var currentDepY =  Math.round(Math.random());

                this.deplacementY -= currentDepY;

                var newPosY = this.boss.sprite.y + (currentDepY * this.dirY);

                if(newPosY > 250 && newPosY < (game.global.gameHeight - this.boss.sprite.height)){
                    this.boss.sprite.y = newPosY;
                }else{
                    this.dirY = -this.dirY;

                }
            }
            game.physics.arcade.overlap(this.boss.sprite, this.projectiles, this.damageBoss, null, this);
        }

        if(this.playerBlink === true){
            if(this.playerBlinkCpt < 0){
                this.playerBlink = false;
                this.player.sprite.revive();
                this.playerBlinkCpt = 60;
            }else if(this.playerBlinkCpt%2 === 0){
                if(this.playerDisplayed === true){
                    this.player.sprite.kill();
                    this.playerDisplayed = false;
                }else{
                    this.player.sprite.revive();
                    this.playerDisplayed = true;
                }
            }
            --this.playerBlinkCpt;
        }

    },
    
    movePlayer : function(direction){
    	var newY = this.player.sprite.y + direction*(this.player.speed);
        var midHeight = (this.player.sprite.height/2);
    	if(this.player.life > 0 && (newY>=this.LEVELTOP - midHeight &&newY+midHeight<=this.LEVELBOTTOM)){
    		this.player.sprite.y = newY;
            this.player.body.y += direction*(this.player.speed);
            this.aspirateur.y += direction*(this.player.speed);
        }
    },

    // Changement de l'arme du joueur
    switchWeapon : function(weapon){
        if(this.weaponSwitchCooldown <= 0){
            this.player.selectedWeapon = weapon;
            this.barillet.animations.play('weapon'+weapon);
            this.weaponSwitchCooldown = this.WEAPONSWITCHDELAY;
        }
        
    },
    
    addEnnemy : function(){

        var ennemy = this.ennemies.getFirstDead();

        if(!ennemy)
            return;
        
        var  enemyTypeId = Math.floor(Math.random()*this.availableTypes.length);
        ennemy.type = this.availableTypes[enemyTypeId];

        ennemy.life   = 10;
        
        
        var sprite = this.spriteTrashType[ennemy.type];
        if(typeof sprite === "undefined"){
            console.log("Mauvais type d'ennemi : "+type);
            sprite = "spriteTrashPlastic";
        }

        ennemy.loadTexture(sprite);
        ennemy.checkWorldBounds = true;
        ennemy.outOfBoundsKill = true;
        ennemy.reset(((Math.random()*100) + 700) , ((Math.random() * 328)+250));

        --this.nbEnnemies;   

    },

    takeDamage : function(player, ennemy){
        if(this.player.life > 0 ){
            this.hitSound.play();
            ennemy.kill();
            if(this.playerBlink === false){
                --this.player.life;
                this.updatePlayerLife(this.player.life);
                this.playerBlink = true;
            }

            //mort du joueur
            if(this.player.life <= 0){                
                this.deathSound.play();
                game.state.start('gameover');
            }
        }
    	
    },

    fire : function(){
        //si l'arme selectionnée est dispo, on tire
        var playerWeapon = this.player.weapons[this.player.selectedWeapon];
        if(playerWeapon.cooldown === 0){
            var projectile = this.projectiles.getFirstDead();

            if(!projectile)
                return;
            this.shootSound.play();

            projectile.damage   = playerWeapon.damage;            
            projectile.speed = playerWeapon.projectileSpeed;
            
            var type = playerWeapon.type;
            projectile.type = type;

            var sprite = this.spriteProjType[type];
            if(typeof sprite === "undefined") {
                projectile.type = "plastic";
                console.log("Mauvais type de projectile : "+type)
            }

            //Création d'un projectile
            var x = this.player.sprite.x+this.player.sprite.width;
            var y = this.player.sprite.y+this.player.sprite.height/2;
            //this.sprite = game.add.sprite(x ,y,sprite);
            projectile.loadTexture(sprite);
            projectile.checkWorldBounds = true;
            projectile.outOfBoundsKill = true;
            projectile.reset(x, y);

            playerWeapon.reloadCooldown();
        }

    },
    
    updatePlayerLife: function(life) {
        // Suppression de la barre de vie
        for(var i=this.lifeTab.length-1; i>=0; --i) {
            this.lifeTab[i].kill();
        }
        this.lifeTab = [];
        // Affichage de la barre de vie
        for(var i=0; i<life; i+=2) {
            var sprite = "spriteLifeFull";
            if(life%2 == 1 && i+2 >= life)
                sprite = "spriteLifeHalf";
            this.lifeTab.push(game.add.sprite(32+i*20,32,sprite));

        }
    },

    //Fonction de collision entre projectile et ennemis
    collisionEnnemyProjectile: function(ennemy, projectile){
        if(ennemy.type === projectile.type){
            this.cleanSuccessSound.play();
            //Parametrage particule
            this.emitterGreen.x = ennemy.x;
            this.emitterGreen.y = ennemy.y;
            this.emitterGreen.start(true, 100, null, 15);

            //Destruction ennemi
            ennemy.kill();
            this.score += 10;
            this.updateTextScore();

            //création pickup
            this.addPickup(ennemy.x, ennemy.y, ennemy.type);
        }else{
            this.cleanFailSound.play();
            this.emitterRed.x = ennemy.x;
            this.emitterRed.y = ennemy.y;
            this.emitterRed.start(true, 100, null, 15);
        }
        projectile.kill();

    },

    addPickup : function(x, y, type){
        //var ennemy = new Trash(10, "metal");
        var pickup = this.pickups.getFirstDead();

        if(pickup){
            pickup.type = type;

            var sprite = this.spritePickupType[pickup.type];
            if(typeof sprite === "undefined"){
                sprite = "spritePickupMetal";
                console.log("Mauvais type de pickup : "+type);
            }
            pickup.loadTexture(sprite);
            pickup.checkWorldBounds = true;
            pickup.outOfBoundsKill = true;

            pickup.reset(x , y);

            game.add.tween(pickup).to({"y" : y-10}).easing(Phaser.Easing.Bounce.Out).start();
        }
    },

    takePickup : function(player, pickup){

        game.global.totalTrash++;
        if(pickup.type === "metal"){
            ++game.global.totalMetal;
            ++game.global.stockMetal;
        }else if(pickup.type === "glass"){
            ++game.global.totalGlass;
            ++game.global.stockGlass;
        }else if(pickup.type === "paper"){
            ++game.global.totalPaper;
            ++game.global.stockPaper;
        }else if(pickup.type === "plastic"){
            ++game.global.totalPlastic;
            ++game.global.stockPlastic;
        }
        this.score += 15;
        this.updateTextScore();

        pickup.kill();
        this.pickupSound.play();
    },

    damageBoss : function(boss, projectile){
        this.boss.life -= projectile.damage;

        if(this.boss.life < (this.boss.initialLife /2) && this.boss.damaged === false){
            this.boss.sprite.loadTexture("spriteBoss1Damaged");
        }
        if(this.boss.life <= 0){
            boss.kill();
            this.score += 100;
            this.updateTextScore();
            this.winSound.play();
            game.state.start('quizz');
        }

        //Parametrage particule
        this.emitterBrown.x = this.boss.sprite.x;
        this.emitterBrown.y = this.boss.sprite.y;
        this.emitterBrown.start(true, 100, null, 15);

        projectile.kill();

    },

    bossAddEnnemy : function(){
        var ennemy = this.ennemies.getFirstDead();

        if(!ennemy)
            return;

        
        var  enemyTypeId = Math.floor(Math.random()*this.availableTypes.length);
        ennemy.type = this.availableTypes[enemyTypeId];

        ennemy.life   = 10;

        var sprite = this.spriteTrashType[ennemy.type];
        if(typeof sprite === "undefined"){
            sprite = "spriteTrashPlastic";
            console.log("Mauvais type d'ennemi : "+type);
        }
        ennemy.loadTexture(sprite);
        ennemy.checkWorldBounds = true;
        ennemy.outOfBoundsKill = true;
        ennemy.reset(this.boss.sprite.x  -10, this.boss.sprite.y);  
    },

    updateTextScore : function(){
        this.scoreLabel.setText("Score : "+this.score);
    }
}; 

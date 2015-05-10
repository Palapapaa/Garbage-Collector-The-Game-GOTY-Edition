var shooterState = {
    preload : function(){
        console.log("Shooter state preload");
        this.UP = -1;
        this.DOWN = 1;
        this.LEVELTOP=250;

        this.LEVELBOTTOM=game.global.gameHeight;
        this.proba = 0.011;//Variable pour apparition ennemies (plus elevé = plus d'ennemis)

        this.WEAPONSWITCHDELAY = 20;//temps entre chaque changement d'arme
        this.weaponSwitchCooldown=0;//temps avant de tirer à nouveau

        this.levelSpeed = 3;
        this.inputManager = new InputManager(game);

        this.nbEnnemies  = 15;
        this.stop        = false;
        this.bossAdded   = false;

        this.score       = 0;

        //Sons
        this.shootSound  = game.add.audio("shoot");
        this.hitSound    = game.add.audio("hit");
        this.deathSound  = game.add.audio("death");
        this.winSound  = game.add.audio("win");
        this.pickupSound = game.add.audio("pickup");
        this.cleanSuccessSound = game.add.audio("cleanSuccess");
        this.cleanFailSound = game.add.audio("cleanFail");
        this.bossTrashSpawnSound = game.add.audio("bossTrashSpawn");

        this.playerBlink = false;
        this.playerBlinkCpt = 60;
        this.playerDisplayed = true;

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

        // Création joueur
        this.player = new Player(10, 2, weapons, "spritePlayer");
        this.player.sprite.animations.play('move');

        //Ajout de l'aspirateur sur le joueur
        this.aspirateur = game.add.sprite(this.player.sprite.x+26, this.player.sprite.y-3, "spriteAspirateur");

        game.physics.arcade.enable(this.aspirateur);

        
        // Définition de la barre de vie
        this.lifeTab = [];
        this.updatePlayerLife(this.player.life);
        
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

        //Particules fumée
        this.emitterSmoke = game.add.emitter(0, 0 , 45);
        this.emitterSmoke.setXSpeed(-100, -80);
        this.emitterSmoke.setYSpeed(-25, 25);
        this.emitterSmoke.gravity = 0;
        this.emitterSmoke.minParticleScale = 0.7;
        this.emitterSmoke.maxParticleScale = 1.9;
        this.emitterSmoke.makeParticles('particleSmoke');

        console.log("shooter state create() finished");

		this.proba = 0.011;//Variable pour apparition ennemies (plus ellevé = moins d'ennemies)

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

        if(this.inputManager.weapon1.isDown){
            this.switchWeapon(0);
            this.fire();
        }else if(this.inputManager.weapon2.isDown){
            this.switchWeapon(1);
            this.fire();
        }else if(this.inputManager.weapon3.isDown){
            this.switchWeapon(2);
            this.fire();
        }else if(this.inputManager.weapon4.isDown){
            this.switchWeapon(3);
            this.fire();
        }
        
        //cooldown changement d'arme
        if(this.weaponSwitchCooldown > 0){            
            this.weaponSwitchCooldown--;
        }
        
        
        //mise à jour du cooldown des armes du joueur
        for(var i =0, l = this.player.weapons.length; i< l;i++){
            if(this.player.weapons[i].cooldown >0){
                this.player.weapons[i].cooldown--;
            }
        }
        
        //mise à jour des projectiles
        for(var i = 0, l = this.projectiles.children.length; i < l; i++){
            var spriteProj = this.projectiles.children[i];
            spriteProj.x+= spriteProj.speed;
        }

        //mise à jour des pickups
        for(var i = 0, l = this.pickups.children.length; i < l; i++){
            var spritePickup = this.pickups.children[i];
            spritePickup.x-= this.levelSpeed;
        }

        //mise à jour des ennemis
        for(var i = 0, l = this.ennemies.children.length; i < l; i++){
            var spriteEnnemy = this.ennemies.children[i];
            spriteEnnemy.x-=this.levelSpeed;
            //test de collision avec le joueur

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

        }
        //maj du BOSS
        if(this.bossAdded === true){

            if(this.boss.sprite.x > 300){
                this.boss.sprite.x--;
            }

            //Les déplacements de boss c'est chiant --""
            //Si boss n'est pas en déplacement
            if( this.deplacementY <= 0){
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
            //particules de fumée du camion
            //Parametrage particule
            this.emitterSmoke.x = this.boss.sprite.x;
            this.emitterSmoke.y = this.boss.sprite.y+3*this.boss.sprite.height/4;
            this.emitterSmoke.start(true, 800, null, 0.1);

        }

        //Vérification collision
        game.physics.arcade.overlap(this.aspirateur, this.pickups, this.takePickup, null, this);
        game.physics.arcade.overlap(this.player.sprite, this.ennemies, this.takeDamage, null, this);
        game.physics.arcade.overlap(this.ennemies, this.projectiles, this.collisionEnnemyProjectile, null, this);
        //game.physics.arcade.overlap(this.ennemies, this.projectiles, this.todoTrouverNomCarJaiLaFlemme, null, this);
        if(this.bossAdded === true){
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
            this.playerBlinkCpt--;

           
        }

    },
    
    movePlayer : function(direction){
    	var newY = this.player.sprite.y + direction*(this.player.speed);
    	if(this.player.life > 0 && (newY>=this.LEVELTOP - (this.player.sprite.height/2) &&newY+(this.player.sprite.height/2)<=this.LEVELBOTTOM)){
    		this.player.sprite.y = newY;
            this.aspirateur.y += direction*(this.player.speed);
        }
    },

    // Changement de l'arme du joueur
    switchWeapon : function(weapon){
        if(this.weaponSwitchCooldown <= 0){
            this.player.selectedWeapon = weapon;
            this.barillet.animations.play('weapon'+weapon);
            console.log('weapon'+weapon);
            this.weaponSwitchCooldown=this.WEAPONSWITCHDELAY;
        }
        
    },
    
    addEnnemy : function(){

        var ennemy = this.ennemies.getFirstDead();

        if(!ennemy)
            return;
        
        var  enemyTypeId = Math.floor(Math.random()*this.availableTypes.length);
        ennemy.type = this.availableTypes[enemyTypeId];

        ennemy.life   = 10;
        
        
        var sprite = "spriteTrashPlastic";
        if(ennemy.type === "metal"){
            sprite = "spriteTrashMetal";
        }else if(ennemy.type === "glass"){
            sprite = "spriteTrashGlass";
        }else if(ennemy.type === "paper"){
            sprite = "spriteTrashPaper";
        }else if(ennemy.type === "plastic"){
            sprite = "spriteTrashPlastic";

        }else {
            console.log("Mauvais type d'ennemi : "+type);
        }
        ennemy.loadTexture(sprite);
        ennemy.checkWorldBounds = true;
        ennemy.outOfBoundsKill = true;
        ennemy.reset(800 , ((Math.random() * 328)+250));

        this.nbEnnemies--;   

    },

    takeDamage : function(player, ennemy){
        if(this.player.life > 0 ){
            this.hitSound.play();
            ennemy.kill();
            if(this.playerBlink === false){
                this.player.life--;
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
        if(this.player.weapons[this.player.selectedWeapon].cooldown === 0){
            this.shootSound.play();
            var projectile = this.projectiles.getFirstDead();

            if(!projectile)
                return;

            projectile.damage   = this.player.weapons[this.player.selectedWeapon].damage;            
            projectile.speed = this.player.weapons[this.player.selectedWeapon].projectileSpeed;
            
            var type= this.player.weapons[this.player.selectedWeapon].type;
            projectile.type = type;
            var sprite = "spriteProjPlastic";
            if(type === "metal"){
                sprite = "spriteProjMetal";
            }else if(type === "glass"){
                sprite = "spriteProjGlass";
            }else if(type === "paper"){
                sprite = "spriteProjPaper";
            }else if(type === "plastic"){
                sprite = "spriteProjPlastic";

            }else {
                projectile.type = "plastic";
                console.log("Mauvais type de projectile : "+type)
            }

            //Création d'un projectile
            var x = this.player.sprite.x+3*this.player.sprite.width/4;
            var y = this.player.sprite.y+this.player.sprite.height/3;
            //this.sprite = game.add.sprite(x ,y,sprite);
            projectile.loadTexture(sprite);
            projectile.checkWorldBounds = true;
            projectile.outOfBoundsKill = true;
            projectile.reset(x, y);

            this.player.weapons[this.player.selectedWeapon].reloadCooldown();

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
            if(life%2 == 1 && i+2 >= life)
                this.lifeTab.push(game.add.sprite(32+i*20,32,"spriteLifeHalf"));
            else
                this.lifeTab.push(game.add.sprite(32+i*20,32,"spriteLifeFull"));
        }
    },

    //Fonction de collision entre projectile et ennemis
    collisionEnnemyProjectile: function(ennemy, projectile){
        if(ennemy.type === projectile.type){
            this.cleanSuccessSound.play();
            //Parametrage particule
            this.emitterGreen.x = projectile.x+ projectile.width;
            this.emitterGreen.y = projectile.y+ projectile.height /2;
            this.emitterGreen.start(true, 100, null, 15);

            //Destruction ennemi
            ennemy.kill();
            this.score += 10;
            this.updateTextScore();


            //création pickup
            this.addPickup(ennemy.x, ennemy.y, ennemy.type);


        }else{
            this.cleanFailSound.play();
            this.emitterRed.x = projectile.x+ projectile.width;
            this.emitterRed.y = projectile.y+ projectile.height /2;
            this.emitterRed.start(true, 100, null, 15);
        }
        projectile.kill();

    },

    addPickup : function(x, y, type){
        //var ennemy = new Trash(10, "metal");
        var pickup = this.pickups.getFirstDead();

        if(pickup){
            pickup.type = type;

            var sprite = "spritePickupMetal";
            if(type === "metal"){
                sprite = "spritePickupMetal";
            }else if(type === "glass"){
                sprite = "spritePickupGlass";
            }else if(type === "paper"){
                sprite = "spritePickupPaper";
            }else if(type === "plastic"){
                sprite = "spritePickupPlastique";

            }else {
                console.log("Mauvais type de pickup : "+type);
            }
            pickup.loadTexture(sprite);
            pickup.checkWorldBounds = true;
            pickup.outOfBoundsKill = true;

            pickup.reset(x , y);

            game.add.tween(pickup).to({"y" : y-10}).easing(Phaser.Easing.Bounce.Out).start();
           // game.add.tween(pickup).to({"y" : y}).easing(Phaser.Easing.Bounce.Out).start();

            //sprite.body.bounce.set(0.8);
        }
    },

    takePickup : function(player, pickup){

        game.global.totalTrash++;
        if(pickup.type === "metal"){
            game.global.totalMetal++;
            game.global.stockMetal++;
        }else if(pickup.type === "glass"){
            game.global.totalGlass++;
            game.global.stockGlass++;
        }else if(pickup.type === "paper"){
            game.global.totalPaper++;
            game.global.stockPaper++;
        }else if(pickup.type === "plastic"){
            game.global.totalPlastic++;
            game.global.stockPlastic++;
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
        this.emitterBrown.x = projectile.x+ projectile.width;
        this.emitterBrown.y = projectile.y+ projectile.height /2;
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
        
        
        var sprite = "spriteTrashPlastic";
        if(ennemy.type === "metal"){
            sprite = "spriteTrashMetal";
        }else if(ennemy.type === "glass"){
            sprite = "spriteTrashGlass";
        }else if(ennemy.type === "paper"){
            sprite = "spriteTrashPaper";
        }else if(ennemy.type === "plastic"){
            sprite = "spriteTrashPlastic";

        }else {
            console.log("Mauvais type d'ennemi : "+type);
        }
        ennemy.loadTexture(sprite);
        ennemy.checkWorldBounds = true;
        ennemy.outOfBoundsKill = true;
        ennemy.reset(this.boss.sprite.x  +10, this.boss.sprite.y+1*this.boss.sprite.height/4 ); 
        game.add.tween(ennemy).to({"y" : this.boss.sprite.y+3*this.boss.sprite.height/4}).easing(Phaser.Easing.Bounce.Out).start();
        this.bossTrashSpawnSound.play();
    },

    updateTextScore : function(){
        this.scoreLabel.setText("Score : "+this.score);
    }
}; 

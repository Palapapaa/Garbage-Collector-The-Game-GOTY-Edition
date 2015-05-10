var shooterState = {
    
    //chargement des params du niveau
    init : function(level){
        console.log("Shooter state init");
        this.levelConfig = level;
        
    },
    
    preload : function(){
        console.log("Shooter state preload");
        this.UP = -1;
        this.DOWN = 1;
        this.LEVELTOP=250;

        this.LEVELBOTTOM=game.global.gameHeight;

        this.WEAPONSWITCHDELAY = 20;//temps entre chaque changement d'arme
        this.weaponSwitchCooldown=0;//temps avant de tirer à nouveau

        this.levelSpeed = this.levelConfig.levelSpeed;
        this.inputManager = new InputManager(game);

        this.nbEnnemies  = this.levelConfig.ennemies;
        this.stop        = false;
        this.bossAdded   = false;

        this.score       = 0;

        //Sons
        this.shootSound  = game.add.audio("shoot");
        this.hitSound    = game.add.audio("hit");
        this.deathSound  = game.add.audio("death");
        this.winSound    = game.add.audio("win");
        this.pickupSound = game.add.audio("pickup");
        this.powerupSound = game.add.audio("powerup");
        this.powerdownSound = game.add.audio("powerdown");
        this.cleanSuccessSound = game.add.audio("cleanSuccess");
        this.cleanFailSound = game.add.audio("cleanFail");
        this.bossTrashSpawnSound = game.add.audio("bossTrashSpawn");

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

        this.isBonused = false;
        this.timeBonus = 300;//Nombre de frame
        this.bonusIsSpeed = false;
        this.bonusIsDamage = false;
    },
    
    create : function(){


        // Affichage de l'image de fond
        this.background  = game.add.sprite(0,0,this.levelConfig.background);
        this.background2 = game.add.sprite(this.background.width,0,this.levelConfig.background);

        this.scoreLabel = game.add.text(game.world.centerX, 50, "Score : "+this.score,
        { font: '32px Arial', fill: '#FFFF00' });
        this.scoreLabel.anchor.setTo(0.5, 0.5);

        // Initialisation variables
        this.availableTypes = ["plastic","metal", "glass", "paper"];
        
        // Création des armes du joueur
        this.weapons = [];
        for(var i = 0, l= this.availableTypes.length;i< l; i++){
            this.weapons.push(new Weapon(30,game.global.possibleTypes[i], 5, 2));
        }

        // Définition du barillet
        var barilletStyle = { font: '28px Arial', fill: '#ffffff' };
        this.barillet = game.add.sprite(704, 96, 'spriteSheetBarillet');
        this.barillet.anchor.setTo(0.5, 0.5);
        this.barillet.alpha = 0.75;
        this.barillet.labelWeapon0 = game.add.text(704, 55, game.global.inputLabel[0], barilletStyle).anchor.setTo(0.5, 0.5);
        this.barillet.labelWeapon0 = game.add.text(747, 98, game.global.inputLabel[1], barilletStyle).anchor.setTo(0.5, 0.5);
        this.barillet.labelWeapon0 = game.add.text(704, 140, game.global.inputLabel[2], barilletStyle).anchor.setTo(0.5, 0.5);
        this.barillet.labelWeapon0 = game.add.text(662, 98, game.global.inputLabel[3], barilletStyle).anchor.setTo(0.5, 0.5);
        
        this.barillet.animations.add('idle', 0, 8, true);
        this.barillet.animations.add('weapon0', [0,1,0,1,0], 8, false);
        this.barillet.animations.add('weapon1', [0,2,0,2,0], 8, false);
        this.barillet.animations.add('weapon2', [0,3,0,3,0], 8, false);
        this.barillet.animations.add('weapon3', [0,4,0,4,0], 8, false);
        
        // Groupe ennemi
		this.ennemies    = game.add.group();
        this.ennemies.enableBody = true;
        this.boss         = null;
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
        this.player = new Player(10, 3, this.weapons, "spriteSheetPlayer");
        this.player.sprite.animations.play('move');

        //Ajout de l'aspirateur sur le joueur
        this.aspirateur = game.add.sprite(this.player.sprite.x+26, this.player.sprite.y-3, "spriteAspirateur");
        game.physics.arcade.enable(this.aspirateur);

        
        // Définition de la barre de vie
        this.lifeTab = [];
        this.initPlayerLife(this.player.life);
        
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
        
        
        // Particules powerup-speed
        this.emitterPowerupSpeed = game.add.emitter(0, 0 , 5);
        this.emitterPowerupSpeed.setXSpeed(-25, 25);
        this.emitterPowerupSpeed.setYSpeed(0, 0);
        this.emitterPowerupSpeed.gravity = -100;        
        this.emitterPowerupSpeed.minParticleScale = 0.3;
        this.emitterPowerupSpeed.maxParticleScale = 1.5;        
        this.emitterPowerupSpeed.minRotation=0;
        this.emitterPowerupSpeed.maxRotation=0;
        this.emitterPowerupSpeed.makeParticles('particlePowerupSpeed');

        // Particules powerup-damage
        this.emitterPowerupDamage = game.add.emitter(0, 0 , 5);
        this.emitterPowerupDamage.setXSpeed(-25, 25);
        this.emitterPowerupDamage.setYSpeed(0, 0);
        this.emitterPowerupDamage.gravity = -100;
        this.emitterPowerupDamage.minParticleScale = 0.3;
        this.emitterPowerupDamage.maxParticleScale = 1.5;
        this.emitterPowerupDamage.minRotation=0;
        this.emitterPowerupDamage.maxRotation=0;
        this.emitterPowerupDamage.makeParticles('particlePowerupDamage');

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

        this.loopEnnemies    = game.time.events.loop(this.levelConfig.ennemySpawnInterval, this.addEnnemy, this);
        this.loopPickupBonus = game.time.events.loop(this.levelConfig.powerupSpawnInterval, this.addPickupBonus, this);

        this.availableBonusType = ['battery','bulb'];

        // Création de la popup d'achivements
        this.popup = game.add.sprite(580,600,"achievementPopup");
        this.popup.alpha = 0.5;
        this.popupTitle = game.add.text(680, 630, "Succès débloqué",
        { font: 'bold 20px Arial', fill: '#ffffff' });
        this.popupTitle.anchor.setTo(0.5, 0.5);
        this.achUnlock = false;

        console.log("shooter state create() finished");

    },
    
    update : function(){

        // Déplacement du background
        this.background.x  -= this.levelSpeed;
        this.background2.x -= this.levelSpeed;

        if(this.background2.x < 0){
            this.background.x += this.background.width;
            this.background2.x += this.background.width;

        }

        if(this.isBonused === true){
            if(this.timeBonus > 0){
                 //particules powerup
                if(this.timeBonus%30===0){
                   if(this.bonusIsDamage === true){
                        this.emitterPowerupDamage.x = this.player.sprite.x+2*this.player.sprite.width/3;;
                    this.emitterPowerupDamage.y = this.player.sprite.y;
                    this.emitterPowerupDamage.start(true, 1800, null, 1);
                    }else if(this.bonusIsSpeed === true){
                        this.emitterPowerupSpeed.x = this.player.sprite.x+2*this.player.sprite.width/3;;
                    this.emitterPowerupSpeed.y = this.player.sprite.y;
                    this.emitterPowerupSpeed.start(true, 1800, null, 1);
                    } 
                }
                --this.timeBonus;
            }else{
                this.stopBonus();
            }
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

            this.loopBoss = game.time.events.loop(1000, this.bossAddEnnemy, this);

        //maj du BOSS
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
            //particules de fumée du camion
            this.emitterSmoke.x = this.boss.sprite.x;
            this.emitterSmoke.y = this.boss.sprite.y+3*this.boss.sprite.height/4;
            this.emitterSmoke.start(true, 800, null, 0.1);

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
            var deplacementY = direction*(this.player.speed);
            this.player.body.y += deplacementY;
            this.aspirateur.y  += deplacementY;
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

        if(ennemy){
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
            ennemy.reset(game.global.gameWidth , ((Math.random() * 328)+250));

            --this.nbEnnemies;
        } 
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
            var x = this.player.sprite.x+3*this.player.sprite.width/4;
            var y = this.player.sprite.y+this.player.sprite.height/3;
            //this.sprite = game.add.sprite(x ,y,sprite);
            projectile.loadTexture(sprite);
            projectile.checkWorldBounds = true;
            projectile.outOfBoundsKill = true;
            projectile.reset(x, y);

            playerWeapon.reloadCooldown();
        }

    },
    initPlayerLife: function(life){
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
    
    updatePlayerLife: function() {
        //Nombre de coeurs
        var nbLife = this.lifeTab.length;
        if(nbLife > 0){
            //Index du dernier élément
            var lastElem = this.lifeTab[(nbLife - 1)];
            //Si coeur plein, on le remplace par un demi coeur
            if(lastElem.key === "spriteLifeFull"){
                lastElem.loadTexture("spriteLifeHalf");
            //Sinon, suppresion du sprite
            }else{
                lastElem.kill();
                this.lifeTab.splice((nbLife - 1), 1);
            }
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

            var sprite = this.spritePickupType[pickup.type];
            if(typeof sprite === "undefined"){
                sprite = "spritePickupMetal";
                console.log("Mauvais type de pickup : "+type);
            }
            pickup.loadTexture(sprite);
            pickup.checkWorldBounds = true;
            pickup.outOfBoundsKill = true;

            pickup.reset(x , y-20);

            game.add.tween(pickup).to({"y" : y}).easing(Phaser.Easing.Bounce.Out).start();
        }
    },

    takePickup : function(player, pickup){

        if(pickup.type === "bulb"){
            //On double les dégats
            for(var i = 0, l = this.weapons.length; i <l ; ++i){
                this.weapons[i].delay = this.weapons[i].delay/2;
            }
            this.isBonused = true;
            this.score += 20;
            this.timeBonus = 480;
            this.powerupSound.play();
            this.bonusIsDamage = true;
        }else if(pickup.type === "battery"){
            //PIMP MY PLAYER
            this.player.speed = this.player.speed*2;
            this.isBonused = true;
            this.score += 20;
            this.timeBonus = 480;
            this.powerupSound.play();
            this.bonusIsSpeed = true;
        }else{
            ++game.global.totalTrash;
            if(pickup.type === "metal"){
                ++game.global.totalMetal;
                ++game.global.stockMetal;
 //TODO BOUGER SSA               //Achievement Unlock
                if(!this.achUnlock && game.global.totalMetal === 8)
                {
                    this.achUnlock = true;
                    this.showPopup('Heavy and Metal');
                }
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
            this.pickupSound.play();
        }

        this.updateTextScore();

        pickup.kill();
    },

    damageBoss : function(boss, projectile){
        this.boss.life -= projectile.damage;

        //le boss est mort, on termine le niveau
        if(this.boss.life <= 0){
            game.time.events.remove(this.loopBoss);
            boss.kill();
            this.score += 100;
            if(game.global.clearedLevels.indexOf(this.levelConfig.id) === -1){
                game.global.clearedLevels.push(this.levelConfig.id);
            }
            game.global.lastLevel = Math.max(game.global.lastLevel, this.levelConfig.reward);
            this.updateTextScore();
            this.winSound.play();
            game.state.start('quizz');
        }

        if(this.boss.life < (this.boss.initialLife /2) && this.boss.damaged === false){
            this.boss.sprite.loadTexture("spriteBoss1Damaged");
        }
        //Parametrage particule
        this.emitterBrown.x = projectile.x+ projectile.width;
        this.emitterBrown.y = projectile.y+ projectile.height /2;
        this.emitterBrown.start(true, 100, null, 15);

        projectile.kill();

    },

    bossAddEnnemy : function(){
        var ennemy = this.ennemies.getFirstDead();

        if(ennemy){
            var enemyTypeId = Math.floor(Math.random()*this.availableTypes.length);
            ennemy.type = this.availableTypes[enemyTypeId];

            ennemy.life   = 10;

            var sprite = this.spriteTrashType[ennemy.type];
            if(typeof sprite === "undefined"){
                sprite = "spriteTrashPlastic";
                console.log("Mauvais type d'ennemi : "+type);
            }
            ennemy.loadTexture(sprite);
            ennemy.checkWorldBounds = true;
            ennemy.outOfBoundsKill  = true;
            var quaterBossHeight   = this.boss.sprite.height/4,
            ennemy.reset(this.boss.sprite.x  +10, this.boss.sprite.y+1*quaterBossHeight ); 
            game.add.tween(ennemy).to({"y" : this.boss.sprite.y+3*quaterBossHeight}).easing(Phaser.Easing.Bounce.Out).start();
            this.bossTrashSpawnSound.play();
        }
    },

    updateTextScore : function(){
        this.scoreLabel.setText("Score : "+this.score);
    },

    addPickupBonus : function(){
        var pickup = this.pickups.getFirstDead();

        if(pickup){
            pickup.type = this.availableBonusType[Math.round(Math.random())];

            var sprite = this.spritePickupType[pickup.type];
            if(pickup.type === "bulb"){
                pickup.loadTexture("spritePickupBulb");
            }else if(pickup.type === "battery"){
                pickup.loadTexture("spritePickupBattery");
            }
            pickup.checkWorldBounds = true;
            pickup.outOfBoundsKill  = true;

            pickup.reset(game.global.gameWidth , ((Math.random() * 328)+250));
        }
    },

    stopBonus : function(){
        this.powerdownSound.play();
        this.isBonused = false;
        if(this.bonusIsDamage === true){
            for(var i = 0, l = this.weapons.length; i <l ; ++i){
                this.weapons[i].delay = this.weapons[i].delay*2;
            }
            this.bonusIsDamage = false;
        }else if(this.bonusIsSpeed === true){
            this.player.speed = this.player.speed/2;
            this.bonusIsSpeed = false;
        }
    },
    
    showPopup : function(text){
        // Achievement Popup animation
        this.popupLabel = game.add.text(680, 670, text,
        { font: '18px Arial', fill: '#ffffff' });
        this.popupLabel.anchor.setTo(0.5, 0.5);
        tweenShow = game.add.tween(this.popup).to({"y" : this.popup.y-100}, 2000, Phaser.Easing.Linear.None, true);
        game.add.tween(this.popupTitle).to({"y" : this.popupTitle.y-100}, 2000, Phaser.Easing.Linear.None, true);
        game.add.tween(this.popupLabel).to({"y" : this.popupLabel.y-100}, 2000, Phaser.Easing.Linear.None, true);
        tweenShow.onComplete.addOnce(this.hidePopup, this);
    },
    
    hidePopup : function(){
        // Achievement Popout animation
        tweenHide = game.add.tween(this.popup).to({"y" : this.popup.y+100}, 2000, Phaser.Easing.Linear.None, true, 2000);
        game.add.tween(this.popupTitle).to({"y" : this.popupTitle.y+100}, 2000, Phaser.Easing.Linear.None, true, 2000);
        game.add.tween(this.popupLabel).to({"y" : this.popupLabel.y+100}, 2000, Phaser.Easing.Linear.None, true, 2000);
    }
}; 

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

        this.nbEnnemies  = 25;
        this.stop        = false;
        this.bossAdded   = false;

        //Sons
        this.shootSound  = game.add.audio("shoot");
        this.hitSound    = game.add.audio("hit");
        this.deathSound  = game.add.audio("death");
        this.pickupSound = game.add.audio("pickup");
    },
    
    create : function(){
        // Affichage de l'image de fond
        this.background  = game.add.sprite(0,0,"shooterBackground");
        this.background2 = game.add.sprite(game.global.gameWidth,0,"shooterBackground");
        
        // Définition du Barillet
        this.barillet = game.add.sprite(704, 96, 'spriteBarillet');
        this.barillet.anchor.setTo(0.5, 0.5);
        this.barillet.alpha = 0.75;
        
        // Initialisation variablles
        this.availableTypes = ["metal", "glass", "plastic", "paper"];
        
        // Création des armes du joueur
        var weapons = [];
        for(var i = 0, l= this.availableTypes.length;i< l; i++){
            weapons.push(new Weapon(30,this.availableTypes[i], 5, 2));
        }

        // Création joueur
        this.player = new Player(10, 2, weapons, "spritePlayer");
        
        // Définition de la barre de vie
        this.lifeTab = [];
        this.updatePlayerLife(this.player.life);
        
        // Groupe ennemi
		this.ennemies    = game.add.group();
        this.ennemies.enableBody = true;
        this.boss        = null;
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

        this.pickups.createMultiple(25, "spritePickup");
        game.physics.arcade.collide(this.player, this.pickups);

        this.ennemies.createMultiple(25, "spriteTrashPlastic");
        game.physics.arcade.collide(this.player, this.ennemies);

        this.projectiles.createMultiple(25, "spriteProjMetal");
        game.physics.arcade.collide(this.player, this.projectiles);

        // Particules rouges
        this.emitterRed = game.add.emitter(0, 0 , 15);
        this.emitterRed.setXSpeed(-150, 150);
        this.emitterRed.setYSpeed(-150, 150);
        this.emitterRed.gravity = 0;
        this.emitterRed.makeParticles('particleRed');


        // Particules vertes
        this.emitterGreen = game.add.emitter(0, 0 , 15);
        this.emitterGreen.setXSpeed(-150, 150);
        this.emitterGreen.setYSpeed(-150, 150);
        this.emitterGreen.gravity = 0;
        this.emitterGreen.makeParticles('particleGreen');

        console.log("shooter state create() finished");

		this.proba = 0.011;//Variable pour apparition ennemies (plus ellevé = moins d'ennemies)

        this.loopEnnemies = game.time.events.loop(1000, this.addEnnemy, this);
    },
    
    update : function(){

        // Déplacement du background
        this.background.x  -= this.levelSpeed;
        this.background2.x -= this.levelSpeed;

        if(this.background2.x < 0){
            this.background.x += game.global.gameWidth;
            this.background2.x += game.global.gameWidth;

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

        if(this.inputManager.right.isDown){
            this.switchWeapon(this.DOWN);
        }else if(this.inputManager.left.isDown){
            this.switchWeapon(this.UP);
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
        
        if(this.inputManager.fire.isDown){
            this.fire();
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
            console.log("ajout boss")
            this.boss = new Boss(42, "spriteBoss", null);
            this.bossAdded = true;
            game.physics.arcade.collide(this.boss ,this.projectiles);
            game.physics.arcade.collide(this.boss, this.player);

            game.time.events.loop(1000, this.bossAddEnnemy, this);

        }

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

        }

        //Vérification collision
        game.physics.arcade.overlap(this.player.sprite, this.pickups, this.takePickup, null, this);
        game.physics.arcade.overlap(this.player.sprite, this.ennemies, this.takeDamage, null, this);
        game.physics.arcade.overlap(this.ennemies, this.projectiles, this.collisionEnnemyProjectile, null, this);
        //game.physics.arcade.overlap(this.ennemies, this.projectiles, this.todoTrouverNomCarJaiLaFlemme, null, this);
        if(this.bossAdded === true){
            game.physics.arcade.overlap(this.boss.sprite, this.projectiles, this.damageBoss, null, this);
        }

    },
    
    movePlayer : function(direction){
    	var newY = this.player.sprite.y + direction*(this.player.speed);
    	if(this.player.life > 0 && (newY>=this.LEVELTOP - (this.player.sprite.height/2) &&newY+(this.player.sprite.height/2)<=this.LEVELBOTTOM)){
    		this.player.sprite.y = newY;
        }
    },

    //changement de l'arme du joueur
    switchWeapon : function(direction){
        if(this.weaponSwitchCooldown <= 0){
             this.player.selectedWeapon=(this.player.selectedWeapon+direction)%this.player.weapons.length;
            if(this.player.selectedWeapon <0){
                this.player.selectedWeapon = this.player.weapons.length-1;
            }

            // Sprite rotate Right
            this.barillet.angle += direction*90;
            console.log(this.barillet.angle);

            console.log(this.player.selectedWeapon);
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
        ennemy.reset(((Math.random()*100) + 700) , ((Math.random() * 328)+250));

        this.nbEnnemies--;   

    },

    takeDamage : function(player, ennemy){
        if(this.player.life > 0 ){
            this.hitSound.play();
            ennemy.kill();
            this.player.life--;
            this.updatePlayerLife(this.player.life);
            //mort du joueur
            if(this.player.life <= 0){                
                this.deathSound.play();
                game.state.start('menu');
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
            //Parametrage particule
            this.emitterGreen.x = ennemy.x;
            this.emitterGreen.y = ennemy.y;
            this.emitterGreen.start(true, 100, null, 15);

            //Destruction ennemi
            ennemy.kill();

            //création pickup
            this.addPickup(ennemy.x, ennemy.y, ennemy.type);


        }else{
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
        }
    },

    takePickup : function(player, pickup){

        game.global.totalTrash++;
        if(pickup.type === "metal"){
            game.global.totalMetal++;
        }else if(pickup.type === "glass"){
            game.global.totalVerre++;
        }else if(pickup.type === "paper"){
            game.global.totalPaper++;
        }else if(pickup.type === "plastic"){
            game.global.totalPlastic++;
        }

        pickup.kill();
        this.pickupSound.play();
    },

    damageBoss : function(boss, projectile){
        this.boss.life -= projectile.damage;

        if(this.boss.life <= 0){
            boss.kill();
            game.state.start('menu');
        }

        projectile.kill();

    },

    bossAddEnnemy : function(){
        console.log("boss add ennem")
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
        ennemy.reset(this.boss.sprite.x  -10, this.boss.sprite.y);  
    }
}; 

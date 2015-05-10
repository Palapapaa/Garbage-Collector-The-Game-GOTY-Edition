function Player(life, speed, weapons, sprite) {
	this.life           = life;
	this.speed          = speed;
	this.weapons        = weapons;
	this.selectedWeapon = 0;
	this.sprite = game.add.sprite(10, 260, 'spriteSheetPlayer');
    
    // Définition de la HitBox
    this.body = game.add.sprite(0, 0, null);
    game.physics.arcade.enable(this.body);
    this.body.body.setSize(this.sprite.width, this.sprite.height/3, 
                             this.sprite.x, this.sprite.y+this.sprite.height*2/3);
    

  	this.sprite.animations.add('move', [1,2,3,4], 8, true);
}
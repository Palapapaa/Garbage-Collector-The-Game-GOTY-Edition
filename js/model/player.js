function Player(life, speed, weapons, sprite) {
	this.life           = life;
	this.speed          = speed;
	this.weapons        = weapons;
	this.selectedWeapon = 0;
	//this.sprite = game.add.sprite(10, 260,sprite);
	this.sprite = game.add.sprite(10, 260, 'spriteSheetPlayer');

    game.physics.arcade.enable(this.sprite);
  
  	//this.sprite.enableBody=true;
  	this.sprite.animations.add('move', [1,2,3,4], 8, true);
}
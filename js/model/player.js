function Player(life, speed, weapons, sprite) {
	this.life           = life;
	this.speed          = speed;
	this.weapons        = weapons;
	this.selectedWeapon = 0;
	this.sprite = game.add.sprite(10, 260,sprite);
    game.physics.arcade.enable(this.sprite);
  	//this.sprite.enableBody=true;


}
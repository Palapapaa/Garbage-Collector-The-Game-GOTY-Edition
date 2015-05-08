function Player(life, speed, weapon, sprite) {
	this.life   = life;
	this.speed  = speed;
	this.weapon = weapon;

	this.sprite = game.add.sprite(10, 260,sprite);
}
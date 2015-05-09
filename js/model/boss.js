function Boss(life, sprite, pattern){

	this.life      = life;
	this.sprite    = sprite;

	this.sprite = game.add.sprite(600, 260,sprite);
    game.physics.arcade.enable(this.sprite);

    this.j = 0;
}
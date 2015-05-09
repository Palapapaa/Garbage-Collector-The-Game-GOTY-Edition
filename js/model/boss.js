function Boss(life, sprite, pattern){

	this.life      = life;
	this.sprite    = sprite;

	//Le boss apparait en dehors de l'écran
	this.sprite = game.add.sprite(900, 260,sprite);
    game.physics.arcade.enable(this.sprite);

    this.j = 0;
}
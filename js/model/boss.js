function Boss(life, sprite, pattern){

	this.life      = life;
	this.sprite    = sprite;

	this.initialLife = life;
	this.damaged   = false;
	//Le boss apparait en dehors de l'écran
	this.sprite = game.add.sprite(900, 260,sprite);
    game.physics.arcade.enable(this.sprite);

    this.j = 0;

    //Gestion fumée d boss
    this.emitter = game.add.emitter(this.sprite.x, 200, 200);


    this.emitter.setXSpeed(0, 0);
    this.emitter.setYSpeed(0, 0);

    this.emitter.setRotation(0, 0);
    this.emitter.setAlpha(0.1, 1, 3000);
    this.emitter.setScale(0.4, 2, 0.4, 2, 6000, Phaser.Easing.Quintic.Out);
    this.emitter.gravity = -100;

    this.emitter.start(false, 4000, 20);

    this.emitter.emitX = 64;
    this.emitter.emitY = 500;

    game.add.tween(this.emitter).to( { emitX: 800-64 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, Number.MAX_VALUE, true);
    game.add.tween(this.emitter).to( { emitY: 200 }, 4000, Phaser.Easing.Sinusoidal.InOut, true, 0, Number.MAX_VALUE, true);
}
function Trash(life, sprite){
	this.life   = life;
	this.sprite = game.add.sprite((Math.random()*100) + 700 ,(Math.random() * 328)+250,sprite);
	//this.sprite.anchor.setTo(0,0);
    game.physics.arcade.enable(this.sprite);
   // this.sprite.enableBody=true;

}
function Trash(life, sprite){
	this.life   = life;
	this.sprite = game.add.sprite((Math.random()*100) + 700 ,(Math.random() * 350)+250,sprite);
}
function Trash(life, type){
	this.life   = life;
	//this.sprite.anchor.setTo(0,0);
    
   // this.sprite.enableBody=true;
   var sprite = "spriteTrashPlastic";
	if(type === "metal"){
		sprite = "spriteTrashMetal";
	}else if(type === "glass"){
		sprite = "spriteTrashGlass";
	}else if(type === "paper"){
		sprite = "spriteTrashPaper";
	}else if(type === "plastic"){
		sprite = "spriteTrashPlastic";

	}else {
		console.log("olala un bug, faut p'tetre faire quelque chose");
	}
	this.sprite = game.add.sprite((Math.random()*100) + 700 ,(Math.random() * 328)+250,sprite);
	game.physics.arcade.enable(this.sprite);


}
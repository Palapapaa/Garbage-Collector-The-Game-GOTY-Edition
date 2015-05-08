function Projectile(x,y,speed, damage, type){
	this.speed  = speed;
	this.damage = damage;
	this.type   = type;
	
	var sprite = "spriteProjPlastic";

	if(type === "metal"){
		sprite = "spriteProjMetal";
	}else if(type === "glass"){
		sprite = "spriteProjGlass";
	}else if(type === "paper"){
		sprite = "spriteProjPaper";
	}else if(type === "plastic"){
		sprite = "spriteProjPlastic";

	}else {
		console.log("olala un bug, faut p'tetre faire quelque chose")
	}

	this.sprite = game.add.sprite(x ,y,sprite);

}
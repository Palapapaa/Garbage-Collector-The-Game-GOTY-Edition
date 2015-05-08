function Weapon(delay, type){
	
	this.delay      = delay; //temps entre chaque tir
	this.cooldown   = 0; //temps avant le prochain tir
	//vérification de la validité du type
	if(game.global.possibleTypes.indexOf(type) === -1 ){
		console.log("pas bien");
		this.type = "metal";
	}else{
		this.type = type;
	}

	this.reloadCooldown = function(){
        this.cooldown = this.delay;
	}
}
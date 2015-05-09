function Weapon(delay, type, projectileSpeed, damage){
	
	this.delay      = delay; //temps entre chaque tir
	this.cooldown   = 0; //temps avant le prochain tir
    this.projectileSpeed = projectileSpeed;
    this.damage     = damage;
    
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
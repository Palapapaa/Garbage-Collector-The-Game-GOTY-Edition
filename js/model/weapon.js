function Weapon(delay, projectile){
	this.projectile = projectile;
	this.delay      = delay;
	if(typeof projectile === "undefined"){
		projectile = new Projectile(1, 1, "todo");
	}
}
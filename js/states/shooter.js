var shooterState = {
    preload : function(){
        console.log("Shooter state preload");
    },
    
    create : function(){
        var background = game.add.sprite(0,0,"shooterBackground");

        this.weapon = new Weapon(10);
        this.player = new Player(10, 0, this.weapon, "spritePlayer");

		this.ennemies = [];

		this.proba = 0.001;//Variable pour apparition ennemies (plus ellevé = moins d'ennemies)



    },
    
    update : function(){
        
        //A voir si on fera vraiment comme ça ...

        if(Math.random() < this.proba){
            var ennemy = new Trash(10, "spriteTrash");
        	this.ennemies.push(ennemy); 	
        }



        var indexToDel = [];
        for(var i = 0, l = this.ennemies.length; i < l; i++){
        	var spriteEnnemy = this.ennemies[i].sprite;
        	spriteEnnemy.x--;

        	if(spriteEnnemy.x < (0 - spriteEnnemy.width)){
        		indexToDel.push(i);
        	}
        //	ennemies[i].sprite.y--;

        }
        //Suppression des sprites hors écrans
        for(var i = 0, l = indexToDel; i < l; i++){
        	if (i > -1) {
			    this.ennemies.splice(indexToDel[i], 1);
			}
        }


    },
};
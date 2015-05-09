var achievementState = {
 
    preload : function(){
        console.log("Achievement state preload");
        this.inputManager = new InputManager(game);
    },
    
    create : function(){
        // Affichage de l'image de fond
        var background = game.add.sprite(0,0,"achievementsBackground");
        
        // Affichage du Titre du menu
        var titleLabel = game.add.text(game.world.centerX, 100, 'Succès',
        { font: '96px Arial', fill: '#ffffff' });
        titleLabel.anchor.setTo(0.5, 0.5);
        
        var scores = {
            "total" : game.global.totalTrash,
            "metal" : game.global.totalMetal,
            "plastic" : game.global.totalPlastic,
            "paper" : game.global.totalPaper,
            "glass" : game.global.totalGlass,
            
        }
        
        //Affichages des succès
        var achY = 195;
        for(var i=0, l = achievements.length; i<l; i++){
            
            var desc = "???";
            var color = "#888888";
            var spriteBg = "achievementLocked";
            var spriteFg = "iconLock";
            //le succès est validé
            if(scores[achievements[i].type] >= achievements[i].req ){
                color = "#229922";
                spriteBg = "achievementUnlocked";
                desc = achievements[i].desc;
                spriteFg = "icon"+achievements[i].id;
                
            }
            var achievementLabel = game.add.text(125,
                                             achY,
                                             achievements[i].name+ " - "+ desc ,
                                             { font: '15px Arial', fill: color });
            var achievementBgIcon = game.add.sprite(92, achY-5, spriteBg);
            var achievementFgIcon = game.add.sprite(92, achY-5, spriteFg);
            
            achY+=48;
        }
    },
    
    update : function(){
        // Passage à l'état de jeu world map
        if(this.inputManager.esc.isDown){
            game.state.start('menu');
        }
    },

};
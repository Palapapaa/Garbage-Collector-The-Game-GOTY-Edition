var achievementState = {
 
    preload : function(){
        console.log("Achievement state preload");
        this.inputManager = new InputManager(game);
    },
    
    create : function(){
        // Affichage du fond
        var background = game.stage.backgroundColor = '#199BC4';
        var block = game.add.sprite(0,0,"achievementsBackground");
        
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
        
        //affichage des totaux
        var totalsY = 520;
         game.add.text(90, totalsY-35, 'Déchets traités : '+game.global.totalTrash,
        { font: '22px Arial', fill: '#888888' });
        game.add.sprite(90, totalsY,"spritePickupMetal");
        game.add.text(125, totalsY+10, ": " +game.global.totalMetal,
        { font: '22px Arial', fill: '#888888' });
        game.add.sprite(180, totalsY,"spritePickupPaper");
        game.add.text(215, totalsY+10, ": " +game.global.totalPaper,
        { font: '22px Arial', fill: '#888888' });
        game.add.sprite(270, totalsY,"spritePickupGlass");
         game.add.text(305, totalsY+10, ": " +game.global.totalGlass,
        { font: '22px Arial', fill: '#888888' });
        game.add.sprite(360, totalsY,"spritePickupPlastique");
        game.add.text(395, totalsY+10, ": " +game.global.totalPlastic,
        { font: '22px Arial', fill: '#888888' });
        
        
        
    },
    
    update : function(){
        // Passage à l'état de jeu world map
        if(this.inputManager.esc.isDown){
            game.state.start('menu');
        }
    },

};
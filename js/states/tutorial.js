var tutorialState = {
 
    preload : function(){
        console.log("Tutorial state preload");
        this.inputManager = new InputManager(game);
    },
    
    create : function(){
        // Affichage du fond
        var background = game.stage.backgroundColor = '#199BC4';
        
        
        
        // Affichage du Titre du menu
        var titleLabel = game.add.text(game.world.centerX, 100, 'Tutoriel',
        { font: '96px Arial', fill: '#ffffff' });
        titleLabel.anchor.setTo(0.5, 0.5);
        
        
        
      // Définition du barillet
        var baX = 120,
            baY = 475;
        
        this.barillet = game.add.sprite(baX, baY, 'spriteSheetBarillet');
        this.barillet.anchor.setTo(0.5, 0.5);
        var styleBarillet = { font: '28px Arial', fill: '#ffffff' };
        //plastique
        game.add.text(baX, baY-40, game.global.inputLabel[0], styleBarillet).anchor.setTo(0.5, 0.5);
        game.add.sprite(baX+10, baY-85, 'spriteTrashPlastic').anchor.setTo(0.5, 0.5);
        //metal
        game.add.text(baX+43, baY+4, game.global.inputLabel[1], styleBarillet).anchor.setTo(0.5, 0.5);
        game.add.sprite(baX+85, baY+4, 'spriteTrashMetal').anchor.setTo(0.5, 0.5);
        //verre
        game.add.text(baX, baY+45, game.global.inputLabel[2], styleBarillet).anchor.setTo(0.5, 0.5);
        game.add.sprite(baX+10, baY+85, 'spriteTrashGlass').anchor.setTo(0.5, 0.5);
        //papier
        game.add.text(baX-43, baY+4, game.global.inputLabel[3], styleBarillet).anchor.setTo(0.5, 0.5);
        game.add.sprite(baX-85, baY+4, 'spriteTrashPaper').anchor.setTo(0.5, 0.5);
        
        this.barillet.animations.add('idle', [0,1,0,2,0,3,0,4], 3, true);
        this.barillet.animations.play('idle');
        
        
        var touches = game.global.inputLabel[0]+", "+game.global.inputLabel[1]+", "+game.global.inputLabel[2]+","+game.global.inputLabel[3];
        var fireLabel = game.add.text(240, 475, 'Appuyez sur les touches '+ touches +'\npour tirer le type projectile permettant de recycler chaque déchet',
        { font: '18px Arial', fill: '#ffffff' });
        // Affichage des images des touches
        var upArrow = game.add.sprite(baX,250,"upArrowPic").scale.setTo(0.2, 0.2);
        var downArrow = game.add.sprite(baX,300,"downArrowPic").scale.setTo(0.2, 0.2);
        
        
        // Affichage du texte pour les touches
        var moveLabel = game.add.text(240, 300, 'Appuyez sur les touches\nhaut et bas pour vous\ndéplacer verticalement',
        { font: '22px Arial', fill: '#ffffff' });
        moveLabel.anchor.setTo(0.0, 0.5);
        fireLabel.anchor.setTo(0.0, 0.5);
    },
    
    update : function(){
        // Passage à l'état de jeu world map
        if(this.inputManager.esc.isDown){
            game.state.start('menu');
        }
    },

};
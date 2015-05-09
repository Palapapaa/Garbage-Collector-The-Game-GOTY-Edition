var tutorialState = {
 
    preload : function(){
        console.log("Tutorial state preload");
        this.inputManager = new InputManager(game);
    },
    
    create : function(){
        // Affichage du fond
        var background = game.stage.backgroundColor = '#199BC4';
        
        // Affichage des images des touches
        var upArrow = game.add.sprite(25,250,"upArrowPic").scale.setTo(0.2, 0.2);
        var downArrow = game.add.sprite(25,300,"downArrowPic").scale.setTo(0.2, 0.2);
        var leftArrow = game.add.sprite(400,275,"leftArrowPic").scale.setTo(0.2, 0.2);
        var rightArrow = game.add.sprite(450,275,"rightArrowPic").scale.setTo(0.2, 0.2);
        var spaceBar = game.add.sprite(100,450,"spaceBarPic").scale.setTo(0.2, 0.2);
        
        // Affichage du Titre du menu
        var titleLabel = game.add.text(game.world.centerX, 100, 'Tutoriel',
        { font: '96px Arial', fill: '#ffffff' });
        titleLabel.anchor.setTo(0.5, 0.5);
        
        // Affichage du texte pour les touches
        var moveLabel = game.add.text(100, 300, 'Appuyez sur les touches\nhaut et bas pour vous\ndéplacer verticalement',
        { font: '24px Arial', fill: '#ffffff' });
        moveLabel.anchor.setTo(0.0, 0.5);
        
        var weaponLabel = game.add.text(525, 300, 'Appuyez sur les touches\ngauche et droite pour\nchanger d\'arme',
        { font: '24px Arial', fill: '#ffffff' });
        weaponLabel.anchor.setTo(0.0, 0.5);
        
        var fireLabel = game.add.text(300, 475, 'Appuyez sur la touche espace pour tirer',
        { font: '24px Arial', fill: '#ffffff' });
        fireLabel.anchor.setTo(0.0, 0.5);
    },
    
    update : function(){
        // Passage à l'état de jeu world map
        if(this.inputManager.esc.isDown){
            game.state.start('menu');
        }
    },

};
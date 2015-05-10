var quizzState = {
 
    preload : function(){
        console.log("Quizz state preload");       
        this.UP = -1;
        this.DOWN = 1;
        this.inputManager = new InputManager(game);
        
        
        
        this.selectedItem = 0;
        this.MENUSWITCHDELAY = 15;//temps entre chaque changement d'item dans le menu
        this.menuSwitchCooldown=0;//temps avant de changer d'item dans le menu à nouveau
    },
     
     
    
    create : function(){
        this.rep = false;
        
        // Affichage du fond
        var background = game.stage.backgroundColor = '#199BC4';
        
        var screenTitle = game.add.text(game.world.centerX, 96, 'Niveau terminé!',
        { font: 'bold 64px Arial', fill: '#ffffff' });
        screenTitle.anchor.setTo(0.5, 0.5);
         var bonusTitle = game.add.text(game.world.centerX, 156, 'Bonus écologique : ',
        { font: 'bold 32px Arial', fill: '#ffffff' });
        bonusTitle.anchor.setTo(0.5, 0.5);
        
        //choix de la question
        var questionId = Math.floor(Math.random()*questions.length); 
        this.question = questions[questionId];
        
        //affichage de la question
        var questionTitle = game.add.text(game.world.centerX, 200, this.question.title,
        { font: '26px Arial', fill: '#ffffff' });
        questionTitle.anchor.setTo(0.5, 0.5);
        
        for(var i =0, l = this.question.choices.length;i<l;i++){
            var choiceLabel = game.add.text(165, 250+i*45, this.question.choices[i],
        { font: '24px Arial', fill: '#CCCCCC' });
        
        }

        this.selector = game.add.sprite(150,250+this.selectedItem*45,"menuSelector");
        this.selector.anchor.setTo(1,0.25);
        
    },
    
    update : function(){
         if(this.menuSwitchCooldown>0){
            this.menuSwitchCooldown--;   
        }

        if(this.inputManager.down.isDown === true){
            this.menuSwitch(this.DOWN);
        }

        if(this.inputManager.up.isDown === true){
            this.menuSwitch(this.UP);
        }
        
        // On choisit la réponse sélectionnée
        if(this.inputManager.select.isDown){
            this.select();
            //game.state.start(this.menuItems[this.selectedItem].id);
        }
        
        
    },
    
    //changement d'item dans le menu
    menuSwitch : function(direction){
        if(this.menuSwitchCooldown <= 0 && (!this.rep)){
            
            this.selectedItem=(this.selectedItem+direction)%this.question.choices.length;
            if(this.selectedItem <0){
                this.selectedItem = this.question.choices.length-1;                
            }
            this.selector.y = 250+this.selectedItem*45;
            this.menuSwitchCooldown=this.MENUSWITCHDELAY;
        }
        
    },
    //appui sur la touche select
    select : function(){
        if(this.menuSwitchCooldown <= 0){
            //validation de la question
            if(!this.rep){
                this.rep=true;  
                var responseLabel;
                if(this.selectedItem === this.question.answer){
                    responseLabel = "Bravo! Votre score est augmenté de 10%!\n";
                }else{
                    responseLabel = "Raté! La réponse était "+ this.question.choices[this.question.answer] +"\n";
                }
                //affichage de la question
                var response = game.add.text(game.world.centerX, 550, responseLabel+"Appuyez sur la touche valider pour continuer.",
                { font: '32px Arial', fill: '#ffffff' });
                response.anchor.setTo(0.5, 0.5);
                
            }else{
                game.state.start("worldmap");
            }
            this.menuSwitchCooldown=this.MENUSWITCHDELAY;
        }
    }
};
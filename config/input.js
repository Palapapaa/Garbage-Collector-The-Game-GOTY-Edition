var InputManager = function(game){
	// Initialisation des touches
    
    // Touches pour le PC
    if(!game.device.mobile) {
        //console.log(game);
        this.up         = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.down       = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.left       = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right      = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.achievement= game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.fire       = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.select     = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.shop       = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.tutorial   = game.input.keyboard.addKey(Phaser.Keyboard.T);
        this.esc        = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        
    } else {
    // Touches pour le Mobile
        this.up         = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.down       = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.left       = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right      = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.achievement= game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.fire       = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.select     = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.shop       = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.tutorial   = game.input.keyboard.addKey(Phaser.Keyboard.T);
        this.esc        = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    }
}
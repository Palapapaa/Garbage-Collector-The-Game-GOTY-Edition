var InputManager = function(game){
	// Initialisation des touches
    // Touches pour le PC
    if(!game.device.mobile) {
        // Binding des touches du clavier
        this.up         = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.down       = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.left       = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right      = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.select     = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.shop       = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.esc        = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.weapon1    = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.weapon2    = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.weapon3    = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.weapon4    = game.input.keyboard.addKey(Phaser.Keyboard.Q);

        game.global.inputLabel = ['Z','D','S','Q'];

        // Gestion de la manette
        game.input.gamepad.start();
        pad = game.input.gamepad.pad1;
        pad.addCallbacks(this, { onConnect: addButtons });
    } else {
    // Touches pour le Mobile <TODO>
        this.up         = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.down       = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.left       = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right      = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.select     = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.shop       = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.esc        = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.weapon1    = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.weapon2    = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.weapon3    = game.input.keyboard.addKey(Phaser.Keyboard.E);
        this.weapon4    = game.input.keyboard.addKey(Phaser.Keyboard.R);

        game.global.inputLabel = ['Y','B','A','X'];
    }
}

function addButtons() {

    //  We can't do this until we know that the gamepad has been connected and is started
    this.weapon3 = pad.getButton(Phaser.Gamepad.XBOX360_A);
    this.weapon2 = pad.getButton(Phaser.Gamepad.XBOX360_B);
    this.weapon4 = pad.getButton(Phaser.Gamepad.XBOX360_X);
    this.weapon1 = pad.getButton(Phaser.Gamepad.XBOX360_Y);

    this.weapon3.onDown.add(onDown, this);
    this.weapon2.onDown.add(onDown, this);
    this.weapon4.onDown.add(onDown, this);
    this.weapon1.onDown.add(onDown, this);

    this.weapon3.onUp.add(onUp, this);
    this.weapon2.onUp.add(onUp, this);
    this.weapon4.onUp.add(onUp, this);
    this.weapon1.onUp.add(onUp, this);

    game.global.inputLabel = ['Y','B','A','X']

    // <TODO> Avec le Left Stick
    //  These won't work in Firefox, sorry! It uses totally different button mappings
    /*buttonDPadLeft = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_LEFT);
    buttonDPadRight = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_RIGHT);
    buttonDPadUp = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_UP);
    buttonDPadDown = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_DOWN);

    buttonDPadLeft.onDown.add(onDown, this);
    buttonDPadRight.onDown.add(onDown, this);
    buttonDPadUp.onDown.add(onDown, this);
    buttonDPadDown.onDown.add(onDown, this);

    buttonDPadLeft.onUp.add(onUp, this);
    buttonDPadRight.onUp.add(onUp, this);
    buttonDPadUp.onUp.add(onUp, this);
    buttonDPadDown.onUp.add(onUp, this);*/
}
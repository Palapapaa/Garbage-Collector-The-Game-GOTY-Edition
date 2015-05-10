var InputManager = function(game){
    if(!game.device.mobile) {
        // Initialisation des touches
        this.mode = [] ;
        this.inputMode = 1;
        // Touches pour le PC
        this.mode[0] = new InputClass();
        this.mode[0].up         = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.mode[0].down       = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.mode[0].left       = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.mode[0].right      = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.mode[0].select     = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.mode[0].shop       = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.mode[0].esc        = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.mode[0].weapon1    = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.mode[0].weapon2    = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.mode[0].weapon3    = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.mode[0].weapon4    = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.mode[0].inputLabel = ['Z','D','S','Q'];
        // Gestion de la manette     
        game.input.gamepad.start();
        pad = game.input.gamepad.pad1;
        console.log(game.input.gamepad.pad1);
        this.mode[1] = new InputClass();
        this.mode[1].up         = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_UP);
        this.mode[1].down       = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_DOWN);
        this.mode[1].left       = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_LEFT);
        this.mode[1].right      = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_RIGHT);
        this.mode[1].select     = pad.getButton(Phaser.Gamepad.XBOX360_START);
        this.mode[1].shop       = pad.getButton(Phaser.Gamepad.XBOX360_RIGHT_BUMPER);
        this.mode[1].esc        = pad.getButton(Phaser.Gamepad.XBOX360_BACK);
        this.mode[1].weapon3    = pad.getButton(Phaser.Gamepad.XBOX360_A);
        this.mode[1].weapon2    = pad.getButton(Phaser.Gamepad.XBOX360_B);
        this.mode[1].weapon4    = pad.getButton(Phaser.Gamepad.XBOX360_X);
        this.mode[1].weapon1    = pad.getButton(Phaser.Gamepad.XBOX360_Y);
        this.mode[1].inputLabel = ['Y','B','A','X'];
        //pad.onConnectCallback(this.inputMode = 1);
        //pad.onDisconnectCallback(this.inputMode = 0);
    } else {
    // Touches pour le Mobile <TODO>
    }
}

var InputClass = function(){
    this.up = null;
    this.down = null;
    this.left = null;
    this.right = null;
    this.select = null;
    this.shop = null;
    this.esc = null;
    this.inputLabel = null;
    this.weapon1 = null;
    this.weapon2 = null;
    this.weapon3 = null;
    this.weapon4 = null;
}
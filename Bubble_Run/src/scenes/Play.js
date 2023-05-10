class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    AddPlat1(x) {
        this.plat1 = this.physics.add.sprite(x, 400, 'Platform');
        this.plat1.body.immovable = true;
        this.plat1.body.setAllowGravity(false).setVelocityX(-100);
        this.physics.add.collider(this.player, this.plat1);
    }

    AddPlat2(x) {
        this.plat2 = this.physics.add.sprite(x, 400, 'Platform');
        this.plat2.body.immovable = true;
        this.plat2.body.setAllowGravity(false).setVelocityX(-100);
        this.physics.add.collider(this.player, this.plat2);
    }

    create() {
        this.JUMP_VELOCITY = -700;
        this.velocity = 150;
        this.SCROLL_SPEED = 4;
        //currentScene = 3;
        this.physics.world.gravity.y = 2600;

        // add tile sprite
        // this.talltrees = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'talltrees').setOrigin(0);
        this.plat1 = this.physics.add.sprite(256, 400, 'Platform');
        this.plat1.body.immovable = true;
        this.plat1.body.setAllowGravity(false).setVelocityX(-100);

        this.plat2 = this.physics.add.sprite(768, 400, 'Platform');
        this.plat2.body.immovable = true;
        this.plat2.body.setAllowGravity(false).setVelocityX(-100);

        // set up my alien son 👽
        this.player = this.physics.add.sprite(256, 300, 'Player').setScale(1);
        // this.player.body.setVelocityX(100);
        this.player.setFlip(true, false);

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        this.physics.add.collider(this.player, this.plat1);
        this.physics.add.collider(this.player, this.plat2);
    }

    update() {
        // this.talltrees.tilePositionX += this.SCROLL_SPEED;
        // this.groundScroll.tilePositionX += this.SCROLL_SPEED;

        if(cursors.left.isDown) {
            this.player.body.setVelocityX(this.velocity * -1);
            this.player.resetFlip();
        } else if(cursors.right.isDown) {
            this.player.body.setVelocityX(this.velocity);
            this.player.setFlip(true, false);
        } else {
            // set acceleration to 0 so DRAG will take over
            this.player.body.setVelocityX(0);
        }

        if(this.player.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.player.body.setVelocityY(this.JUMP_VELOCITY);
        }

		// check if alien is grounded
	    //this.player.isGrounded = this.player.body.touching.down;

	    if(this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }

        if(this.plat1.x <= 256) {
            this.AddPlat1(1280);
        }

        if(this.plat2.x <= 256) {
            this.AddPlat2(1280);
        }
    }
}
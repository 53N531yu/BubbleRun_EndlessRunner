class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    AddPlat1(x) {
        this.plat1 = this.physics.add.sprite(x, 448, 'Platform');
        this.plat1.body.immovable = true;
        this.plat1.body.setAllowGravity(false).setVelocityX(-100);
        this.physics.add.collider(this.player, this.plat1);
    }

    AddPlat2(x) {
        this.plat2 = this.physics.add.sprite(x, 320, 'Platform');
        this.plat2.body.immovable = true;
        this.plat2.body.setAllowGravity(false).setVelocityX(-100);
        this.physics.add.collider(this.player, this.plat2);
    }

    AddPlat3(x) {
        this.plat3 = this.physics.add.sprite(x, 576, 'Platform');
        this.plat3.body.immovable = true;
        this.plat3.body.setAllowGravity(false).setVelocityX(-100);
        this.physics.add.collider(this.player, this.plat3);
    }

    create() {
        this.JUMP_VELOCITY = -1000;
        this.velocity = 150;
        this.SCROLL_SPEED = 4;
        this.physics.world.gravity.y = 2600;

        this.bgm = this.sound.add('BackMusic', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        this.bgm.play();

        // add tile sprite
        // this.talltrees = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'talltrees').setOrigin(0);
        this.plat1 = this.physics.add.sprite(256, 448, 'Platform');
        this.plat1.body.immovable = true;
        this.plat1.body.setAllowGravity(false).setVelocityX(-100);

        this.plat2 = this.physics.add.sprite(768, 320, 'Platform');
        this.plat2.body.immovable = true;
        this.plat2.body.setAllowGravity(false).setVelocityX(-100);
        
        this.plat3 = this.physics.add.sprite(768, 576, 'Platform');
        this.plat3.body.immovable = true;
        this.plat3.body.setAllowGravity(false).setVelocityX(-100);

        // set up my alien son 👽
        this.player = this.physics.add.sprite(256, 300, 'Player').setScale(1);
        this.player.setFlip(true, false);
        this.player.destroyed = false;
        this.playerX = this.player.body.x;
        this.playerY = this.player.body.y;

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        this.physics.add.collider(this.player, this.plat1);
        this.physics.add.collider(this.player, this.plat2);
        this.physics.add.collider(this.player, this.plat3);
    }

    update() {
        // this.talltrees.tilePositionX += this.SCROLL_SPEED;
        // this.groundScroll.tilePositionX += this.SCROLL_SPEED;
        if (!this.player.destroyed) {
            if (cursors.left.isDown) {
                this.player.body.setVelocityX(this.velocity * -1);
                this.player.resetFlip();
            } else if (cursors.right.isDown) {
                this.player.body.setVelocityX(this.velocity);
                this.player.setFlip(true, false);
            } else {
                this.player.body.setVelocityX(0);
            }
            
            if (this.player.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
                this.player.body.setVelocityY(this.JUMP_VELOCITY);
            }
        }
        

		// check if alien is grounded
	    //this.player.isGrounded = this.player.body.touching.down;

	    if (this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }

        if (this.plat1.x <= 256) {
            this.AddPlat1(1280);
        }

        if (this.plat2.x <= 256 && this.plat3.x <= 256) {
            this.AddPlat2(1280);
            this.AddPlat3(1280);
        }

        if (this.player.y >= 1088 || this.player.x <= -64) {
            this.playerDeath();
        }
    }

    playerDeath() {
        this.player.destroyed = true;
        this.tweens.add({
            targets: this.bgm,
            volume: 0,
            ease: 'Linear',
            duration: 1500,
        });

        this.player.destroy();
        this.time.delayedCall(4000, () => { this.bgm.stop(); });
        this.time.delayedCall(4000, () => { this.scene.start('gameOverScene'); });
    }
}
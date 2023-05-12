class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    AddPlat1() {
        this.plat1 = this.physics.add.sprite(1280, 448, 'Platform');
        this.plat1.body.immovable = true;
        this.plat1.body.setAllowGravity(false).setVelocityX(-100);
        this.physics.add.collider(this.player, this.plat1);
    }

    AddPlat2() {
        this.plat2 = this.physics.add.sprite(1280, 256, 'Platform');
        this.plat2.body.immovable = true;
        this.plat2.body.setAllowGravity(false).setVelocityX(-100);
        this.physics.add.collider(this.player, this.plat2);
    }

    AddPlat3() {
        this.plat3 = this.physics.add.sprite(1280, 576, 'Platform');
        this.plat3.body.immovable = true;
        this.plat3.body.setAllowGravity(false).setVelocityX(-100);
        this.physics.add.collider(this.player, this.plat3);
    }

    AddBounce1() {
        this.bounce1 = this.physics.add.sprite(1280, 400, 'Bounce');
        this.bounce1.body.immovable = true;
        this.bounce1.body.setAllowGravity(false).setVelocityX(-100);
        //this.physics.add.collider(this.player, this.plat1);
    }

    AddBounce2() {
        this.bounce2 = this.physics.add.sprite(1280, 528, 'Bounce');
        this.bounce2.body.immovable = true;
        this.bounce2.body.setAllowGravity(false).setVelocityX(-100);
        //this.physics.add.collider(this.player, this.plat3);
    }

    AddSpike() {
        this.spikeSpawn = Math.floor(Math.random() * 2);

        if (this.spikeSpawn === 0) {
            this.spike = this.physics.add.sprite(1280, 192, 'Spike');
        }
        else if (this.spikeSpawn === 1) {
            this.spike = this.physics.add.sprite(1280, 528, 'Spike');
        }
        this.spike.body.immovable = true;
        this.spike.body.setAllowGravity(false).setVelocityX(-100);
    }

    AddJumpPiece() {
        this.jumpPieceSpawn = Math.floor(Math.random() * 3);
        if (this.jumpPieceSpawn === 0) {
            this.jumpPiece = this.physics.add.sprite(1280, 192, 'JumpPiece');
        }
        else if (this.jumpPieceSpawn === 1) {
            this.jumpPiece = this.physics.add.sprite(1280, 528, 'JumpPiece');
        }
        else {
            this.jumpPiece = this.physics.add.sprite(1280, 1100, 'JumpPiece');
        }
        this.jumpPiece.body.immovable = true;
        this.jumpPiece.body.setAllowGravity(false).setVelocityX(-100);
    }

    create() {
        this.JUMP_VELOCITY = -1300;
        this.velocity = 250;
        this.SCROLL_SPEED = 4;
        this.physics.world.gravity.y = 2600;

        this.bgm = this.sound.add('BackMusic', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        this.bgm.play();

        this.ignore = false;
        
        this.jump = 0;
        this.jumpbool = true;

        // add tile sprite
        // this.talltrees = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'talltrees').setOrigin(0);
        this.plat1 = this.physics.add.sprite(256, 448, 'Platform');
        this.plat1.body.immovable = true;
        this.plat1.body.setAllowGravity(false).setVelocityX(-100);

        this.plat2 = this.physics.add.sprite(768, 256, 'Platform');
        this.plat2.body.immovable = true;
        this.plat2.body.setAllowGravity(false).setVelocityX(-100);
        
        this.plat3 = this.physics.add.sprite(768, 576, 'Platform');
        this.plat3.body.immovable = true;
        this.plat3.body.setAllowGravity(false).setVelocityX(-100);

        this.bounce1 = this.physics.add.sprite(416, 400, 'Bounce');
        this.bounce1.body.immovable = true;
        this.bounce1.body.setAllowGravity(false).setVelocityX(-100);

        this.bounce2 = this.physics.add.sprite(928, 528, 'Bounce');
        this.bounce2.body.immovable = true;
        this.bounce2.body.setAllowGravity(false).setVelocityX(-100);

        this.spikeSpawn = Math.floor(Math.random() * 2);

        if (this.spikeSpawn === 0) {
            this.spike = this.physics.add.sprite(768, 192, 'Spike');
        }
        else if (this.spikeSpawn === 1) {
            this.spike = this.physics.add.sprite(768, 528, 'Spike');
        }
        this.spike.body.immovable = true;
        this.spike.body.setAllowGravity(false).setVelocityX(-100);

        this.jumpPieceSpawn = Math.floor(Math.random() * 3);
        if (this.jumpPieceSpawn === 0) {
            this.jumpPiece = this.physics.add.sprite(896, 192, 'JumpPiece');
        }
        else if (this.jumpPieceSpawn === 1) {
            this.jumpPiece = this.physics.add.sprite(896, 528, 'JumpPiece');
        }
        else {
            this.jumpPiece = this.physics.add.sprite(896, 1100, 'JumpPiece');
        }
        this.jumpPiece.body.immovable = true;
        this.jumpPiece.body.setAllowGravity(false).setVelocityX(-100);

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
            if (cursors.down.isDown) {
                this.ignore = true;
            } else {
                this.ignore = false;
            }
            if (!this.ignore && this.player.body.touching.down && (this.bounceCollision(this.player, this.bounce1) || this.bounceCollision(this.player, this.bounce2))) {
                this.player.body.setVelocityY(this.JUMP_VELOCITY);
            }
            if (this.jumpbool && this.bounceCollision(this.player, this.jumpPiece)) {
                this.jump ++;
                this.jumpbool = false;
                this.jumpPiece.destroy();
                console.log(this.jump);
            }
            if (this.jump === 4) {
                this.tempJump(this.player);
            }
        }
        
        //Phaser.Input.Keyboard.JustDown(cursors.up)

		// check if alien is grounded
	    //this.player.isGrounded = this.player.body.touching.down;

	    if (this.jumping && Phaser.Input.Keyboard.UpDuration(cursors.up)) {
	    	this.jumps--;
	    	this.jumping = false;
	    }

        if (this.plat1.x <= 256) {
            this.AddPlat1();
        }

        if (this.plat2.x <= 256) {
            this.AddPlat2();
            this.AddPlat3();
            this.jumpbool = true;
        }
        
        if (this.bounce1.x <= 256) {
            this.AddBounce1();
        }

        if (this.bounce2.x <= 256) {
            this.AddBounce2();
        }

        if (this.spike.x <= 256) {
            this.AddSpike();
        }

        if (this.jumpPiece.x <= 256) {
            this.AddJumpPiece();
        }

        if (this.player.y >= 1088 || this.player.x <= -64 || this.bounceCollision(this.player, this.spike)) {
            this.playerDeath();
        }
    }

    bounceCollision(player, bounce) {
        if (player.x < bounce.x + bounce.width && 
            player.x + player.width / 16 > bounce.x && 
            player.y < bounce.y + bounce.height &&
            player.height + player.y > bounce.y) {
            return true;
          } else {
            return false;
          }
    }

    tempJump(player) {
        if (player.body.touching.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            player.body.setVelocityY(this.JUMP_VELOCITY);
        }
        this.time.delayedCall(5000, () => { this.jump = 0; });

    }

    playerDeath() {
        this.player.destroyed = true;
        this.tweens.add({
            targets: this.bgm,
            volume: 0,
            ease: 'Linear',
            duration: 2000,
        });

        this.player.destroy();
        this.time.delayedCall(3000, () => { this.bgm.stop(); });
        this.time.delayedCall(3000, () => { this.scene.start('gameOverScene'); });
    }
}
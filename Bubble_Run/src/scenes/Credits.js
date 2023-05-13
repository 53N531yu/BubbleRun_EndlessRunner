class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        // add title screen text
        this.credits = this.add.tileSprite(0, 0, 0, 0, 'Credits').setOrigin(0, 0);
        console.log("credits");
        
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update() {
        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
            console.log(this);
            this.scene.stop('creditsScene');
            this.scene.start('titleScene');
        }
    }
}
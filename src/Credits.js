class Credits extends Phaser.Scene {
    constructor() {
        super('creditScene');
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.add.text(width/2, height/2, "Credits");

        // menu button
        this.menuButton = this.physics.add.image(centerX + (64), height/2 + (height/2.4), 'buttons', 2).setScale(5).setOrigin(0.5);
        this.menuButton.body.setSize(42, 16);
        this.menuButton.setOffset(0, 0);

        this.menuButton.setInteractive();
        this.menuButton.on('pointerdown', () => {
            this.menuButton.setTexture('buttons', 3);
            this.time.delayedCall(150, () => {
                this.scene.start('menuScene');
            });
        });
    }
}
class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // load background
        this.add.tileSprite(width, height, width, height + 8, 'background', 1).setScale(15);
        this.add.sprite(width/2, height - 180, 'ground').setScale(25).setOrigin(0.5, 0);
        if (killedBy == 'monster') {
            this.add.sprite((width / 2) + (centerX/5), groundLevel + 30,'Saitama').setScale(15).setOrigin(.5, 1).setFrame('Saitama_Fall000').setAngle(-90);
        }
        if (killedBy == 'cone') {
            this.add.sprite((width / 2) - (centerX/5), groundLevel + 30,'Saitama').setScale(15).setOrigin(.5, 1).setFrame('Saitama_Fall001').setAngle(90);
        }
        this.add.tileSprite(width, height, width, height, 'background', 2).setScale(15);

        // load "GAME OVER"
        this.header = this.add.image(centerX, height/4, 'headers', 1).setScale(10);
        this.scoreDisplay = this.add.text(width/2, height/2 - (height/7), 'Score: ' + time).setScale(2).setColor('black').setFontFamily('Arial').setOrigin(0.5, 0);

        // load click sound
        this.clicksfx = this.sound.add('click');

        // replay button
        this.replayButton = this.physics.add.image(centerX + (64), height/2 + (height/20), 'buttons', 0).setScale(5).setOrigin(0, 1);
        this.replayButton.body.setSize(42, 16);
        this.replayButton.setOffset(0, 0);

        this.replayButton.setInteractive();
        this.replayButton.on('pointerdown', () => {
            this.clicksfx.play();
            this.replayButton.setTexture('buttons', 1);
            this.time.delayedCall(150, () => {
                this.scene.start('playScene');
            });
        });

        // menu button
        this.menuButton = this.physics.add.image(centerX + (64) - 16, height/2 + (height/20), 'buttons', 2).setScale(5).setOrigin(1, 1);
        this.menuButton.body.setSize(42, 16);
        this.menuButton.setOffset(0, 0);

        this.menuButton.setInteractive();
        this.menuButton.on('pointerdown', () => {
            this.clicksfx.play();
            this.menuButton.setTexture('buttons', 3);
            this.time.delayedCall(150, () => {
                this.scene.start('menuScene');
            });
        });

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
}
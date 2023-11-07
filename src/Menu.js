class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.header = this.add.image(centerX, height/10, 'headers', 0).setScale(10);

        // load click sound
        this.clicksfx = this.sound.add('click');

        // play button
        this.playButton = this.physics.add.image(centerX + (64) - 16, height/2 - (height/5), 'buttons', 4).setScale(5).setOrigin(1, 1);
        this.playButton.body.setSize(42, 16);
        this.playButton.setOffset(0, 0);

        this.playButton.setInteractive();
        this.playButton.on('pointerdown', () => {
            this.clicksfx.play();
            this.playButton.setTexture('buttons', 5);
            this.time.delayedCall(150, () => {
                this.scene.start('playScene');
            });
        });

        // menu button
        this.howToButton = this.physics.add.image(centerX + (64), height/2 - (height/5), 'buttons', 8).setScale(5).setOrigin(0, 1);
        this.howToButton.body.setSize(42, 16);
        this.howToButton.setOffset(0, 0);

        this.howToButton.setInteractive();
        this.howToButton.on('pointerdown', () => {
            this.clicksfx.play();
            this.howToButton.setTexture('buttons', 9);
            this.time.delayedCall(150, () => {
                this.scene.start('instructionsScene');
            });
        });

        // credits button
        this.creditButton = this.physics.add.image(centerX + (64), height/2 + (height/2.4), 'buttons', 6).setScale(5).setOrigin(0.5);
        this.creditButton.body.setSize(42, 16);
        this.creditButton.setOffset(0, 0);

        this.creditButton.setInteractive();
        this.creditButton.on('pointerdown', () => {
            this.clicksfx.play();
            this.creditButton.setTexture('buttons', 7);
            this.time.delayedCall(150, () => {
                this.scene.start('creditScene');
            });
        });

        this.skyBorder = this.add.graphics();
        this.rectangleBorder = new Phaser.Geom.Rectangle((width/4) - 3, (height/3) - 3, (width/2) + 6, (height/2) + 6);
        this.skyBorder.fillStyle(0xffffff, 1);
        this.skyBorder.fillRectShape(this.rectangleBorder);

        this.sky = this.add.graphics();
        this.rectangle = new Phaser.Geom.Rectangle(width/4, height/3, width/2, height/2);
        this.sky.fillStyle(0xb5e3ea, 1);
        this.sky.fillRectShape(this.rectangle);

        this.player = this.add.sprite((width / 2) - (centerX/5), groundLevel + 30,'Saitama').setScale(15).setOrigin(.5, 1).setFrame('Saitama_Run000');
        this.player.play('run_attack');
        this.sprayAttack = this.add.image(this.player.x * 1.25, this.player.y / 1.25, 'spray').setScale(4);
        this.sprayAttack.setAlpha(0);

        this.mosquito = this.add.sprite((width/2) * 1.25, centerY + 50, 'mosquito', 0).setScale(2);
        this.mosquito.anims.play('mosquito_fly');

        this.mosquitoFlying = false;
        this.spraying = false

    }

    update() {  
        if (!(this.mosquitoFlying)) {
            this.mosquitoFlying = true;
            this.tweens.add({
                targets: this.mosquito,
                y: (Phaser.Math.Between(this.mosquito.y -50, this.mosquito.y + 50)),
                duration: 5000,
                yoyo: true,
            })
            this.time.delayedCall(500, () => {
                this.mosquitoFlying = false;
            }, null, this);
        }

        if (!(this.spraying)) {
            this.spraying = true;
            this.sprayAttack.setAlpha(1);
            this.time.delayedCall(1000, () => {
                this.sprayAttack.setAlpha(0);
            }, null, this);
            this.time.delayedCall(3000, () => {
                this.spraying = false;
            }, null, this);
        }
    }
}
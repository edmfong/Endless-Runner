class Instructions extends Phaser.Scene {
    constructor() {
        super('instructionsScene');
    }

    create() {
        console.log('instruct');
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.header = this.add.image(centerX, height/10, 'headers', 3).setScale(10);

        // load click sound
        this.clicksfx = this.sound.add('click');
        this.clicksfx.setVolume(0.3);

        // play button
        this.playButton = this.physics.add.image((centerX) + (centerX/12), height/2 - (height/5), 'buttons', 4).setScale(5).setOrigin(0.5, 0.5);
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

        // rectangle displays
        this.rectangleBorder = new Phaser.Geom.Rectangle(-3, -3, (width/3) + 6, (height/3) + 6);
        this.rectangle = new Phaser.Geom.Rectangle(0, 0, width/3, height/3);

        this.skyBorder = this.add.graphics();
        this.skyBorder.fillStyle(0xffffff, 1);
        this.skyBorder.fillRectShape(this.rectangleBorder);
        this.skyBorder.x = width/2;
        this.skyBorder.x += 20;
        this.skyBorder.y = (height/2);

        this.sky2Border = this.add.graphics();
        this.sky2Border.fillStyle(0xffffff, 1);
        this.sky2Border.fillRectShape(this.rectangleBorder);
        this.sky2Border.x = width/2;
        this.sky2Border.x -= width/3 + 20;
        this.sky2Border.y = (height/2);

        this.sky = this.add.graphics();
        this.sky.fillStyle(0xb5e3ea, 1);
        this.sky.fillRectShape(this.rectangle);
        this.sky.x = width/2;
        this.sky.x += 20;
        this.sky.y = (height/2);

        this.sky2 = this.add.graphics();
        this.sky2.fillStyle(0xb5e3ea, 1);
        this.sky2.fillRectShape(this.rectangle);
        this.sky2.x = width/2;
        this.sky2.x -= width/3 + 20;
        this.sky2.y = (height/2);

        // attack demonstration
        this.player1 = this.add.sprite((width / 3.5), groundLevel + 30,'Saitama').setScale(10).setOrigin(.5, 1).setFrame('Saitama_Run000');
        this.player1.play('run_attack');
        this.sprayAttack1 = this.add.image(this.player1.x * 1.3, this.player1.y / 1.18, 'spray').setScale(4);
        this.sprayAttack1.setAlpha(0);

        // jump demonstration
        this.player2 = this.physics.add.sprite(width - (width / 3.5), groundLevel + 30,'Saitama').setScale(10).setOrigin(.5, 1).setFrame('Saitama_Run000');
        this.player2.play('run_attack');
        this.player2.setGravityY(1200);
        this.ground = this.physics.add.staticGroup();
        this.ground.create(width - (width/3.5), groundLevel+30, 'ground').setScale(1).setOrigin(0.5, 0).refreshBody().setAlpha(0);
        this.physics.add.collider(this.player2, this.ground);

        this.attackButton = this.add.image(325, 85, 'buttons', 11).setScale(5).setOrigin(1, 1);
        this.jumpButton = this.add.image(410, 85, 'buttons', 13).setScale(5).setOrigin(1, 1);

        this.attackButton.x = width/2;
        this.attackButton.x += 48;
        this.attackButton.y = height/2 + (height/2.15);

        this.jumpButton.x = width/2;
        this.jumpButton.x += width/2 - (128);
        this.jumpButton.y = height/2 + (height/2.15);

        this.jumpText = this.add.text(width/2 - (width/5.5), height/2 - 30, "Press [Space] to Attack").setOrigin(0.5, 0.5).setScale(3).setFont('bold').setColor('black');
        this.jumpText = this.add.text(width/2 + (width/5.5), height/2 - 30, "Press [ Up ] to Jump").setOrigin(0.5, 0.5).setScale(3).setFont('bold').setColor('black');

        this.spraying = false

    }

    update() {  
        // spray animation, change button, jump
        if (!(this.spraying)) {
            this.spraying = true;
            this.sprayAttack1.setAlpha(1);
            this.player2.setVelocityY(-330);
            this.attackButton.setTexture('buttons', 10);
            this.time.delayedCall(1000, () => {
                this.sprayAttack1.setAlpha(0);
                this.attackButton.setTexture('buttons', 11);
            }, null, this);
            this.time.delayedCall(3000, () => {
                this.spraying = false;
            }, null, this);
        }

        // jump button change
        if (!(this.player2.body.touching.down)) {
            this.jumpButton.setTexture('buttons', 12);
        }
        else {
            this.jumpButton.setTexture('buttons', 13);
        }
    }
}
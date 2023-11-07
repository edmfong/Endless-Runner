// Link to credited sfx:
// Insect Squish: LeguiDust     - https://samplefocus.com/samples/insect-squish-sfx
// Bone Crack: UNIVERSFIELD     - https://pixabay.com/sound-effects/bone-crack-121580/
// Spray Paint: PixaBay         - https://pixabay.com/sound-effects/spray-paint-86162/
// Cartoon Jump: PixaBay        - https://pixabay.com/sound-effects/cartoon-jump-6462/
// Mouse Click: SoundReality    - https://pixabay.com/sound-effects/mouse-click-153941/
// Punch: UNIVERSFIELD          - https://pixabay.com/sound-effects/punch-140236/
// Cyborg Ninja: Kevin MacLeod  - https://uppbeat.io/track/kevin-macleod/cyborg-ninja
class Credits extends Phaser.Scene {
    constructor() {
        super('creditScene');
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // background
        this.skyBorder = this.add.graphics();
        this.rectangleBorder = new Phaser.Geom.Rectangle((width/4) - 3, (height/3) - 3, (width/2) + 6, (height/2) + 6);
        this.skyBorder.fillStyle(0xffffff, 1);
        this.skyBorder.fillRectShape(this.rectangleBorder);

        this.sky = this.add.graphics();
        this.rectangle = new Phaser.Geom.Rectangle(width/4, height/3, width/2, height/2);
        this.sky.fillStyle(0xb5e3ea, 1);
        this.sky.fillRectShape(this.rectangle);

        // load "Credit"
        this.header = this.add.image(centerX, height/4, 'headers', 2).setScale(10);

        this.add.text(width/2, height/3 + (height / 30)*3, "sfx").setOrigin(0.5);
        this.add.text(width/2, height/3 + (height / 30)*4, "Squish: LeguiDust").setOrigin(0.5);
        this.add.text(width/2, height/3 + (height / 30)*5, "Crunch: UNIVERSFIELD").setOrigin(0.5);
        this.add.text(width/2, height/3 + (height / 30)*6, "Thud: UNIVERSFIELD").setOrigin(0.5);
        this.add.text(width/2, height/3 + (height / 30)*7, "Spray: Pixabay").setOrigin(0.5);
        this.add.text(width/2, height/3 + (height / 30)*8, "Jump: Pixabay").setOrigin(0.5);
        this.add.text(width/2, height/3 + (height / 30)*9, "Click: SoundReality").setOrigin(0.5);
        this.add.text(width/2, height/3 + (height / 30)*10, "bgm: Kevin").setOrigin(0.5);


        // load click sound
        this.clicksfx = this.sound.add('click');
        this.clicksfx.setVolume(0.3);
        

        // menu button
        this.menuButton = this.physics.add.image(centerX + (64), height/2 + (height/2.4), 'buttons', 2).setScale(5).setOrigin(0.5);
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
    }
}
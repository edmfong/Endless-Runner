class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar from
        // https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/#:~:text=In%20Phaser%2C%20before%20you%20can,preloader%20really%20makes%20a%20difference
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(centerX - (320/2), centerY - 5 - (50/2), 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(centerX - (320/2) + 10, centerY - 5 - (50/2) + 10, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        // load assets
        this.load.atlas('Saitama', './assets/Saitama.png', './assets/Saitama.json');

        this.load.spritesheet('background', './assets/spritesheets/background.png', {
            frameWidth: 128,
            frameHeight: 72,
        });
        this.load.spritesheet('Kabuto', './assets/spritesheets/Kabuto.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet('Kamakyuri', './assets/spritesheets/Kamakyuri.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet('Slugrus', './assets/spritesheets/Slugrus.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet('mosquito', './assets/spritesheets/mosquito.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet('buttons', './assets/spritesheets/buttons.png', {
            frameWidth: 64,
            frameHeight: 16,
        });
        this.load.spritesheet('headers', './assets/spritesheets/headers.png', {
            frameWidth: 128,
            frameHeight: 8,
        });
        this.load.image('ground', './assets/spritesheets/ground.png');
        this.load.image('spray', './assets/spritesheets/spray.png');
        this.load.image('cone', './assets/spritesheets/cone.png');

        // load sfx + bgm
        this.load.audio('bgm', './assets/sfx/bgm.mp3');
        this.load.audio('click', './assets/sfx/click.mp3');
        this.load.audio('crunch', './assets/sfx/crunch.mp3');
        this.load.audio('jump', './assets/sfx/jump.mp3');
        this.load.audio('spray', './assets/sfx/spray.mp3');
        this.load.audio('squish', './assets/sfx/squish.wav');
        this.load.audio('thud', './assets/sfx/thud.mp3');
    }

    create() {
        // animation
        //this.textures.addSpriteSheetFromAtlas()
        this.anims.create({
            key: 'run',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNames('Saitama', {
                prefix: 'Saitama_Run00',
                end: 3,
            }),
        });

        this.anims.create({
            key: 'run_attack',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNames('Saitama', {
                prefix: 'Saitama_Attack00',
                end: 3,
            }),
        });

        this.anims.create({
            key: 'Kabuto_idle',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('Kabuto', {
                start: 0,
                end: 1,
            }),
        });

        this.anims.create({
            key: 'Kamakyuri_idle',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('Kamakyuri', {
                start: 0,
                end: 1,
            }),
        });

        this.anims.create({
            key: 'Slugrus_idle',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('Slugrus', {
                start: 0,
                end: 1,
            }),
        });

        this.anims.create({
            key: 'mosquito_fly',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('mosquito', {
                start: 0,
                end: 1,
            }),
        });

        // this.scene.start('gameOverScene');
        // this.scene.start('instructionsScene');
        this.scene.start('menuScene');
    }
}
class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    preload() {
        this.load.spritesheet('character', './assets/spritesheets/Character_002.png', {
            frameWidth: 48,
            frameHeight: 48,
        });
    }

    create() {
        // set background color
        this.cameras.main.setBackgroundColor(0xdddddd);

        // initialize player
        this.player = this.physics.add.sprite(width / 2, height / 2, 'character', 1).setScale(2);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setSize(32, 32).setOffset(8, 16);
        this.PLAYER_VELOCITY = 350;

        // initialize controls
        cursors = this.input.keyboard.createCursorKeys();

        // animation
        this.anims.create({
            key: 'idle-down',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 1,
                end: 1,
            }),
        });

        this.anims.create({
            key: 'walk-down',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 0,
                end: 2,
            }),
        });

        this.anims.create({
            key: 'idle-up',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 10,
                end: 10,
            }),
        });

        this.anims.create({
            key: 'walk-up',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 9,
                end: 11,
            }),
        });

        this.anims.create({
            key: 'idle-left',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 4,
                end: 4,
            }),
        });

        this.anims.create({
            key: 'walk-left',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 3,
                end: 5,
            }),
        });

        this.anims.create({
            key: 'idle-right',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 7,
                end: 7,
            }),
        });

        this.anims.create({
            key: 'walk-right',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 6,
                end: 8,
            }),
        });

        // test animation
        //this.player.play('walk-down');
    }

    update() {
        // instances for two movement keys being pressed
        let playerVector = new Phaser.Math.Vector2(0, 0);

        

        // check for movement keys
        if(cursors.left.isDown) {
            playerVector.x = -1;
            playerDirection = 'left';
        }
        else if(cursors.right.isDown) {
            playerVector.x = 1;
            playerDirection = 'right';
        }

        if(cursors.up.isDown) {
            playerVector.y = -1;
            playerDirection = 'up';
        }
        else if(cursors.down.isDown) {
            playerVector.y = 1;
            playerDirection = 'down';
        }

        playerVector.normalize();

        // move player
        // this.player.x += playerVector.x * this.PLAYER_VELOCITY;
        // this.player.y += playerVector.y * this.PLAYER_VELOCITY;
        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

        let playerMovement;
        playerVector.length() ? playerMovement = 'walk' : playerMovement = 'idle'; // if touching something, length will be false
        this.player.play(playerMovement + '-' + playerDirection, true); // true is for retriggering animation when done
    }
}
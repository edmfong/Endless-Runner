class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
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
        this.load.image('ground', './assets/spritesheets/ground.png');
        this.load.image('spray', './assets/spritesheets/spray.png');
        this.load.image('cone', './assets/spritesheets/cone.png');
    }

    create() {
        // initialize sky
        this.sky = this.add.tileSprite(width/2, width/2, width, height, 'background', 0).setScale(10);

        // initialize buildings
        this.buildings = this.add.tileSprite(width, height, width, height, 'background', 1).setScale(10);

        // initialize ground
        this.ground = this.physics.add.staticGroup();
        this.ground.create(width/2, height - 82, 'ground').setScale(10).setOrigin(0.5, 0).refreshBody();

        // initialize bushes
        this.bushes = this.add.tileSprite(width, height, width, height, 'background', 2).setScale(10);

        // initialize player
        this.player = this.physics.add.sprite(width / 10, groundLevel,'Saitama').setScale(5).setOrigin(.5, 1);
        this.player.body.setSize(16, 16).setOffset(8, 16);
        this.player.setBounce(0.2);
        this.player.setGravityY(1000);

        // initialize spray
        this.sprayAttack = this.physics.add.image(this.player.x*1.6 , this.player.y*1.05, 'spray').setScale(3);
        this.sprayAttack.setAlpha(0);
        this.sprayAttack.setImmovable(true);

        // initialize monster obstacles
        this.monsterGroup = this.add.group({
            runChildUpdate: true
        });

        this.coneGroup = this.add.group({
            runChildUpdate: true
        });

        // delay for spawning after scene starts
        this.time.delayedCall(0, () => {
            this.addMonster();
        });

        // initialize controls
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

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

        // test animation
        this.player.play('run');

        // cooldowns
        this.onCooldown = false;
        this.clockRunning = false;

        // gameOver
        this.gameOver = false;

        // movespeed
        this.moveSpeed = 10;

        // dead
        this.dead = false;

        
    }

    addMonster() {
        this.rand = Phaser.Math.Between(0, 2);
        let texture;
        if (this.rand == 0) {
            texture = 'Kabuto'
        }
        else if (this.rand == 1) {
            texture = 'Kamakyuri'
        }
        else {
            texture = 'Slugrus'
        }
        let monster = new Obstacle(this, -(velocity), texture);
        monster.setScale(5);
        monster.play(texture + '_idle');
        this.monsterGroup.add(monster);

        
    }

    addCone() {
        let cone = new Obstacle(this, -(velocity), 'cone');
        cone.setScale(5);
        cone.body.setSize(8, 8).setOffset(12, 24);
        this.coneGroup.add(cone);

                // initialize cone
                // this.cone = this.physics.add.image(width, groundLevel, 'cone').setScale(5);
                // this.cone.body.setSize(8, 8).setOffset(12, 24);
    }

    update() {
        if (!(this.gameOver)) {
            // attack cooldown
            if (this.onCooldown && !(this.clockRunning)) {
                this.clockRunning = true;
                this.clock2 = this.time.delayedCall(300, () => {
                    this.sprayAttack.setAlpha(0);
                    this.player.stop('run_attack');
                    this.player.play('run');
                }, null, this);
                this.clock = this.time.delayedCall(700, () => {
                    this.onCooldown = false;
                    this.clockRunning = false;
                }, null, this);
            }

            this.physics.add.collider(this.player, this.ground);
            this.physics.world.collide(this.sprayAttack, this.monsterGroup, this.sprayCollision, null, this);
            if (!(this.dead)) {
                this.monsterCollided = this.physics.world.overlap(this.player, this.monsterGroup, this.monsterCollision, null, this);
            }
            if (!(this.dead)) {
                this.coneCollided = this.physics.world.overlap(this.player, this.coneGroup, this.coneCollision, null, this);
            }
            
            // move background
            this.sky.tilePositionX += skySpeed;
            this.buildings.tilePositionX += 1;
            this.bushes.tilePositionX += 1;
    
            // check for attack key
            if (Phaser.Input.Keyboard.JustDown(spaceBar) && !(this.onCooldown)) {
                this.onCooldown = true;
                this.sprayAttack.setAlpha(1);
                this.player.stop('run');
                this.player.play('run_attack');
                
            }

            // check for jump key
            if (Phaser.Input.Keyboard.JustDown(keyUP) && this.player.body.touching.down) {
                this.player.setVelocityY(-400);
            }

            // move spray with player
            if (this.sprayAttack.alpha == 1) {
            this.sprayAttack.x = this.player.x*1.6;
            this.sprayAttack.y = this.player.y - this.player.y/14;
            }
            else {
                this.sprayAttack.x = 0;
                this.sprayAttack.y = 0;
            }

        }

        else {
            velocity = 0;
            skySpeed = 0;
            buildingSpeed = 0;
        }
    }

    // collider w/ monsters
    monsterCollision(monster) {
        this.dead = true;
        this.player.stop('run');
        this.player.stop('run_attack');
        this.player.setFrame('Saitama_Fall000');
        //this.player.y += 70;
        this.tweens.add({
            targets: this.player,
            angle: -90,
            duration: 500,
        })
        this.gameOver = true;
    }

    // collider w/ cone
    coneCollision(cone) {
        this.dead = true;
        this.player.stop('run');
        this.player.stop('run_attack');
        this.player.setFrame('Saitama_Fall001');
        //this.player.y += 70;
        this.tweens.add({
            targets: this.player,
            angle: 90,
            duration: 500,
        })
        this.gameOver = true;
    }

    // collider w/ spray
    sprayCollision(spray, monster) {
        monster.setTexture(monster.texture, 2);
        this.clock = this.time.delayedCall(20, () => {
            monster.destroy();
        }, null, this);
        // 10% to increase speed
        this.rand = Phaser.Math.Between(1, 9);
        if (this.rand == 5) {
            velocity += 10;
            skySpeed = 3;
            buildingSpeed = 1;
            console.log("velocity +5\nvelocity is now " + velocity);
        }
    }
    
}

// hits cone
// this.player.setOrigin(.5, 1);
//             this.player.stop('run');
//             this.player.setFrame('Saitama_Fall001');
//             this.player.y += 70;
//             this.tweens.add({
//                 targets: this.player,
//                 angle: 90,
//                 duration: 500,
//             })



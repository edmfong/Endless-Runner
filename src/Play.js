class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
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
        this.player = this.physics.add.sprite(width / 10, groundLevel,'Saitama').setScale(7).setOrigin(.5, 1).setDepth(99);
        this.player.body.setSize(8, 16).setOffset(12, 16);
        this.player.setGravityY(1200);
        
        // initialize moosquito
        this.mosquito = this.add.sprite(width/1.05, height/1.2, 'mosquito', 0);

        // initialize spray
        this.sprayAttack = this.physics.add.image(this.player.x*1.6 , this.player.y*1.05, 'spray').setScale(4);
        this.sprayAttack.setAlpha(0);
        this.sprayAttack.setImmovable(true);

        // initialize buttons
        this.attackButton = this.add.image(325, 85, 'buttons', 11).setScale(5).setOrigin(1, 1);
        this.jumpButton = this.add.image(410, 85, 'buttons', 13).setScale(5).setOrigin(1, 1);

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

        // test animation
        this.player.play('run');
        this.mosquito.anims.play('mosquito_fly');

        // cooldowns
        this.onCooldown = false;
        this.clockRunning = false;

        // gameOver
        gameOver = false;

        // movespeed
        this.moveSpeed = 10;

        // dead
        this.dead = false;
        killedBy = '';

        // mosquito fly
        this.mosquitoFlying = false;

        // set velocities
        velocity = 450;
        skySpeed = 3;
        buildingSpeed = 1;

        this.cameras.main.fadeIn(1000, 0, 0, 0);        
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
        monster.setScale(7);
        monster.play(texture + '_idle');
        this.monsterGroup.add(monster);

        
    }

    addCone() {
        let cone = new Obstacle(this, -(velocity), 'cone');
        cone.setScale(7);
        cone.body.setSize(8, 8).setOffset(12, 24);
        this.coneGroup.add(cone);
    }

    update() {
        if (!(gameOver)) {
            // attack cooldown
            if (this.onCooldown && !(this.clockRunning)) {
                this.clockRunning = true;
                this.attackButton.setTexture('buttons', 10);
                this.clock2 = this.time.delayedCall(300, () => {
                    this.sprayAttack.setAlpha(0);
                    this.player.stop('run_attack');
                    if (!(this.dead)) {
                        this.player.play('run');
                    }
                }, null, this);
                this.clock = this.time.delayedCall(700, () => {
                    this.attackButton.setTexture('buttons', 11);
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
            this.buildings.tilePositionX += buildingSpeed;
            this.bushes.tilePositionX += buildingSpeed;
    
            // check for attack key
            if (Phaser.Input.Keyboard.JustDown(spaceBar) && !(this.onCooldown)) {
                this.onCooldown = true;
                this.sprayAttack.setAlpha(1);
                this.player.stop('run');
                this.player.play('run_attack');
                
            }

            // check for jump key
            if (Phaser.Input.Keyboard.JustDown(keyUP) && this.player.body.touching.down) {
                this.player.setVelocityY(-500);
            }
            if (!(this.player.body.touching.down)) {
                this.jumpButton.setTexture('buttons', 12);
            }
            else {
                this.jumpButton.setTexture('buttons', 13);
            }

            // move spray with player
            if (this.sprayAttack.alpha == 1) {
            this.sprayAttack.x = this.player.x*1.75;
            this.sprayAttack.y = this.player.y - this.player.y/10;
            }
            else {
                this.sprayAttack.x = 0;
                this.sprayAttack.y = 0;
            }

            if (!(this.mosquitoFlying)) {
                this.mosquitoFlying = true;
                this.tweens.add({
                    targets: this.mosquito,
                    y: (Phaser.Math.Between(this.mosquito.y -30, this.mosquito.y + 30)),
                    duration: 500,
                    yoyo: true,
                })
                this.time.delayedCall(500, () => {
                    this.mosquitoFlying = false;
                }, null, this);
            }

        }

        else {
            velocity = 0;
            skySpeed = 0;
            buildingSpeed = 0;
            this.sprayAttack.setAlpha(0);
            this.monsterGroup.velocity = 0;
            this.coneGroup.velocity = 0;
                this.time.delayedCall(1000, () => {
                    this.scene.start('gameOverScene');
                });
        }
    }

    // collider w/ monsters
    monsterCollision(monster) {
        this.dead = true;
        killedBy = 'monster';
        this.player.stop('run');
        this.player.stop('run_attack');
        this.player.setFrame('Saitama_Fall000');
        this.tweens.add({
            targets: this.player,
            angle: -90,
            duration: 500,
        })
        gameOver = true;
    }

    // collider w/ cone
    coneCollision(cone) {
        this.dead = true;
        killedBy = 'cone';
        this.player.stop('run');
        this.player.stop('run_attack');
        this.player.setFrame('Saitama_Fall001');
        this.tweens.add({
            targets: this.player,
            angle: 90,
            duration: 500,
        })
        gameOver = true;
    }

    // collider w/ spray
    sprayCollision(spray, monster) {
        monster.setTexture(monster.texture, 2);
        this.clock = this.time.delayedCall(20, () => {
            monster.destroy();
        }, null, this);
    }
}

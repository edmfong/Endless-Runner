class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, texture) {
        super(scene, game.config.width, groundLevel, texture, 0);

        this.parentScene = scene;

        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.newObstacle = true;
    }

    update() {
        if (this.newObstacle && this.x < centerX) {
            // 20% to increase speed
            this.randVelocity = Phaser.Math.Between(1, 10);
            if (this.randVelocity == 5) {
                velocity += 10;
                skySpeed = 3;
                buildingSpeed = 1;
                console.log("velocity +5\nvelocity is now " + velocity);
            }
            this.rand = Phaser.Math.Between(0, 1);
            if (this.rand == 0) {
                this.parentScene.addMonster(this.parent, this.velocity, this.texture);
            }
            else {
                this.parentScene.addCone(this.parent, this.velocity, this.texture);
            }
            this.newObstacle = false;
        }

        if (this.x < -this.width) {
                this.destroy();           
        }

        if (gameOver) {
            this.setVelocityX(0);
        }
    }
}
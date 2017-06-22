/**
 * Created by Leen on 20/06/2017.
 */
var game = new Phaser.Game(1080, 720, Phaser.AUTO,null, {
   preload: preload, create: create, update: update });
var cursors;

function preload() {
    // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // game.pageAlignHorizontally = true;
    // game.pageAlignVertically = true;
    game.load.image('hikkie',"/images/hikkie.png");
    game.load.image('astrid',"/images/astrid.png");
    game.load.image('brick',"/images/brick_PNG3320.png");
}

function create() {
    game.stage.backgroundColor = "#e6ffff";
    game.physics.startSystem(Phaser.Physics.arcade);

    //players
    players = game.add.group();
    players.enableBody = true;
    createPlayer(0,10,'hikkie');
    createPlayer(200,30,'astrid');

    //floor
    platforms = game.add.group();
    platforms.enableBody = true;
    createPlatform();

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    playerUpdate();
}

function createPlayer(x,y,f) {
   var player = players.create(x,y,f);
   player.body.bounce.y = 0.2;
   player.body.gravity.y = 300;
   player.body.collideWorldBounds = true;
}

function playerUpdate() {
    game.physics.arcade.collide(players,players);
    game.physics.arcade.collide(players,platforms);
    players.forEach(function(p) {
        p.body.velocity.x = 0;
        if(cursors.left.isDown){
            p.body.velocity.x = -150;
        }else if (cursors.right.isDown){
            p.body.velocity.x = 150;
        }
    });
}
function createPlatform() {
    for(var i = 0; i<game.world.width; i+=60){
        var ground = platforms.create(i,game.world.height-60,'brick');
        ground.body.immovable = true;
    }
    ground.anchor.set(-1,1);
}
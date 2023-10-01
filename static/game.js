// Plagiarism
// how to find an index of an item in a list: https://www.w3schools.com/jsref/jsref_obj_array.asp
// tracking the mouse postion: https://stackoverflow.com/questions/7790725/javascript-track-mouse-position
// rotating an image on canvas: https://stackoverflow.com/questions/7496674/how-to-rotate-one-image-in-a-canvas
// text on a canvas: https://www.w3schools.com/tags/ref_canvas.asp
// detecting mouse clicks: https://stackoverflow.com/questions/2405771/is-right-click-a-javascript-event
// how to hide an element: https://stackoverflow.com/questions/6242976/javascript-hide-show-element


// #######################################################################################################################################
// Global variables
let menu = false;

// canvas
let canvas;
canvas = document.querySelector('canvas');
let context;
// Fps timing
let fpsInterval = 1000 / 30;
let now;
let then = Date.now();
// animation id
let request_id;
// images

// map
let backgroundImage = new Image();
// characters
let gawainImage = new Image();
let percivalImage = new Image();
let lancelotImage = new Image();
let mordredImage = new Image();
let fungantImage = new Image();
let fungiantImage = new Image();
let gnomeImage = new Image();
let golemImage = new Image();
let trollImage = new Image();
let ogreImage = new Image();

let playerImage = new Image();
let enemyImage = new Image();
// weapons
let excaliburImage = new Image();
let staffImage = new Image();
let staffMagicImage = new Image();
let magicImage = new Image();
let boulderImage = new Image();
let ogreSwordImage = new Image();
// items
let itemsImage = new Image();
let redMushroomImage = new Image();
let brownMushroomImage = new Image();
let excaliburPointerImage = new Image();
let magicFireImage = new Image();

// audio
let swordAttackAudio = new Audio();
let swordHitAudio = new Audio();
let playerRunAudio = new Audio();
let playerRollAudio = new Audio();
let playerHitAudio = new Audio();
let playerDeathAudio = new Audio();
let enemyRunAudio = new Audio();
let enemyHitAudio = new Audio();
let enemyDeathAudio = new Audio();
let magicAudio = new Audio()

let idleAudio = new Audio();
let bossAudio = new Audio();
let mordredAudio = new Audio();

let character_info = [];
let gawain = {
    name: 'gawain',
    image: gawainImage,
    max_health: 1000,
    acceleration: 12,
    level_offset: -0.2,
    width: 128,
    height: 128,
    game_width: 60,
    game_height: 100,
    sprite_offset: 64,
    spawn: -1,
    idle: 0,
    run: [1, 2],
    roll: [5, 6],
    hit: 8,
    death: 9,
    // character special abilities
}
character_info.push(gawain);
let lancelot = {
    name: 'lancelot',
    image: lancelotImage,
    max_health: 1000,
    acceleration: 10,
    level_offset: 0,
    width: 128,
    height: 128,
    game_width: 60,
    game_height: 100,
    sprite_offset: 64,
    spawn: -1,
    idle: 0,
    run: [1, 2],
    roll: [5, 6],
    hit: 8,
    death: 9,
    // character special abilities
}
character_info.push(lancelot);

let percival = {
    name: 'percival',
    image: percivalImage,
    level_offset: 0.2,
    max_health: 1000,
    acceleration: 8,
    width: 128,
    height: 128,
    game_width: 60,
    game_height: 100,
    sprite_offset: 64,
    spawn: -1,
    idle: 0,
    run: [1, 2],
    roll: [5, 6],
    hit: 8,
    death: 9,
    // character special abilities
}
character_info.push(percival);

let mordred = {
    name: 'mordred',
    image: mordredImage,
    max_health: 1000,
    acceleration: [0, 0],
    follow_radius: 100000,
    width: 128,
    height: 128,
    game_width: 60,
    game_height: 100,
    sprite_offset: 64,
    spawn: 0,
    idle: 1,
    run: [2, 3],
    roll: [6, 7],
    hit: 9,
    death: 10,
}
character_info.push(mordred);

let fungant = {
    name: 'fungant',
    image: fungantImage,
    max_health: 1000,
    acceleration: [4, 6],
    follow_radius: 500,
    width: 96,
    height: 96,
    game_width: 60,
    game_height: 90,
    sprite_offset: 48,
    spawn: 0,
    idle: 1,
    run: [2, 3],
    roll: -1,
    hit: 5,
    death: 6,
}
character_info.push(fungant);

let fungiant = {
    name: 'fungiant',
    image: fungiantImage,
    max_health: 1000,
    acceleration: [4, 4],
    follow_radius: 600,
    width: 112,
    height: 112,
    game_width: 60,
    game_height: 90,
    sprite_offset: 56,
    spawn: 0,
    idle: 1,
    run: [2, 3],
    roll: -1,
    hit: 5,
    death: 6,
}
character_info.push(fungiant);

let gnome = {
    name: 'gnome',
    image: gnomeImage,
    max_health: 1000,
    acceleration: [3, 5],
    follow_radius: 700,
    width: 96,
    height: 96,
    game_width: 60,
    game_height: 100,
    sprite_offset: 48,
    spawn: -1,
    idle: 0,
    run: [1, 2],
    roll: -1,
    hit: 4,
    death: 5,
}
character_info.push(gnome);

let golem = {
    name: 'golem',
    image: golemImage,
    max_health: 1000,
    acceleration: [4, 4],
    follow_radius: 800,
    width: 112,
    height: 112,
    game_width: 60,
    game_height: 100,
    sprite_offset: 56,
    spawn: -1,
    idle: 0,
    run: [1, 2],
    roll: -1,
    hit: 4,
    death: 5,
}
character_info.push(golem);

let troll = {
    name: 'troll',
    image: trollImage,
    max_health: 1000,
    acceleration: [7, 9],
    follow_radius: 800,
    width: 96,
    height: 96,
    game_width: 60,
    game_height: 100,
    sprite_offset: 48,
    spawn: -1,
    idle: 0,
    run: [1, 2],
    roll: -1,
    hit: 4,
    death: 5,
}
character_info.push(troll);
let ogre = {
    name: 'ogre',
    image: ogreImage,
    max_health: 1000,
    acceleration: [8, 8],
    follow_radius: 900,
    width: 112,
    height: 112,
    game_width: 80,
    game_height: 100,
    sprite_offset: 56,
    spawn: -1,
    idle: 0,
    run: [1, 2],
    roll: -1,
    hit: 4,
    death: 5,
}
character_info.push(ogre);


let weapons = [];
let item_info = [];
let red_mushroom = {
    name: 'red_mushroom',
    image: redMushroomImage,
    width: 24,
    height: 36,
    game_height: 36,
    game_width: 24,
    health: [20, 60],
    spells: 0,
}
item_info.push(red_mushroom);
let brown_mushroom = {
    name: 'brown_mushroom',
    image: brownMushroomImage,
    width: 24,
    height: 36,
    game_height: 36,
    game_width: 24,
    health: [15, 30],
    spells: 0,
}
item_info.push(brown_mushroom)
let magic_fire = {
    name: 'magic_fire',
    image: magicFireImage,
    width: 64,
    height: 60,
    game_height: 60,
    game_width: 64,
    health: [40, 80],
    spells: [10, 15],
}
item_info.push(magic_fire)


let items = [];

// background sprite information
let tilesPerRow = 8;
let tilesSize = 64;
// map_inforamtion
// I can adjust the size of the canvas in html by finding out the size of the screen
let screen_width = screen.width;
let screen_height = screen.height;
let map_info = {
    rows: 6 * 20,
    cols: 6 * 32,
    canvas_rows: Math.floor(screen_height / tilesSize),
    canvas_cols: Math.floor(screen_width / tilesSize),
    canvas_width: Math.floor(screen_width / tilesSize) * tilesSize,
    canvas_height: Math.floor(screen_height / tilesSize) * tilesSize,
    map_height: 6 * 20 * tilesSize,
    map_width: 6 * 32 * tilesSize,
}

// defining a player

// AJAX
let xhttp;

let player = {
    // position
    x: 0,
    y: 0,
    canvas_x: Math.floor((canvas.width) / 2 - 160),
    canvas_y: Math.floor((canvas.height) / 2 - 160), // used to find the center of the canvas, but instead it is off by 160, so we need to load in more 4 tiles
    // attributes
    game_width: 60,
    game_height: 100,
    xChange: 15,
    yChange: 15,
    friction: 0.5,
    max_health: 1000,
    acceleration: 12,
    // animation frame
    frameX: 0,
    frameY: 0,
    x_offset: 0,
    y_offset: 0,
    animation_counter: 0,
    animation_length: 3,
    // status
    score: 0,
    level: 1,
    running: false,
    rolling: false,
    health: 1000,
    spells: 0,
    weapon: 'excalibur',
    attacking: false,
    taking_damage: false,
    dying: false,
    spawned: true,
    spawning: false,
    // Instructions 
    spawn: true,
    moveLeft: false,
    moveUp: false,
    moveDown: false,
    moveRight: false,
    roll: false,
    attack: false,
    shoot: false,
    take_damage: false,
    die: false,
    // I will have to write a request to the server to give me the character picture
    character: 'lancelot',
    // weapon animation 
    weapon_frameX: 0,
    weapon_frameY: 0,
    weapon_animation_counter: 0,
    weapon_animation_length: 3,
}
get_character();
update_player_character();
function update_player_health() {
    player.max_health = 100 * (10 ** player.level)
    player.health = player.max_health;

}
update_player_health();

function update_player_character() {
    let player_character_info = character_info[character_info.findIndex(is_character, player.character)]
    player.level += player_character_info.level_offset;
    player.acceleration = player_character_info.acceleration;
}

function get_character() {
    xhttp = new XMLHttpRequest();
    xhttp.addEventListener("readystatechange", handle_character_response, false);
    let pathname = ''
    if (window.location.pathname.split('run.py').length > 1) { // how to find the pathname of the current website taken from here: https://www.w3schools.com/js/js_window_location.asp
        pathname = window.location.pathname.split('run.py')[0] + 'run.py'
    }
    xhttp.open("POST", pathname + "/get_character", false); // I need to get the character before we move on 
    xhttp.send();
}

function store_score() {

    let data = new FormData();
    data.append('score', player.score);

    xhttp = new XMLHttpRequest();
    xhttp.addEventListener("readystatechange", handle_store_score_response, false);
    let pathname = ''
    if (window.location.pathname.split('run.py').length > 1) {
        pathname = window.location.pathname.split('run.py')[0] + 'run.py'
    }
    xhttp.open("POST", pathname + "/store_score", true);
    xhttp.send(data);
}

function handle_store_score_response() {
    // check that the response has fully arrived
    if (xhttp.readyState === 4) {
        // check that the request was successful
        if (xhttp.status === 200) {
            console.log('stored')
        }
    }
}

function handle_character_response() {

    // check that the response has fully arrived
    if (xhttp.readyState === 4) {
        // check that the request was successful
        if (xhttp.status === 200) {
            let character_resp = xhttp.responseText;
            player.character = character_resp;
        }
    }
}
// list of all npcs
let npcs = [];

// list of projectiles
let projectiles = [];

let projectile_info = []

let magic_projectile = {
    image: magicImage,
    name: 'magic',
    width: 24,
    height: 28,
    damage: 8,
    speed_max: 100,
    speed_min: 60,
}
projectile_info.push(magic_projectile);

let boulder_projectile = {
    image: boulderImage,
    name: 'boulder',
    width: 60,
    height: 60,
    damage: 12,
    speed_max: 30,
    speed_min: 20,
}
projectile_info.push(boulder_projectile);
// weapons 
let excalibur = {
    name: 'excalibur',
    image: excaliburImage,
    // sprite attributes
    width: 128,
    height: 128,
    sprite_offset: 64,
    // attributes
    damage: 20,
}
weapons.push(excalibur)
let ogre_sword = {
    name: 'ogre_sword',
    image: ogreSwordImage,
    // sprite attributes
    width: 128,
    height: 128,
    sprite_offset: 64,
    // attributes
    damage: 20,
}
weapons.push(ogre_sword);
let fists = {
    name: 'fists',
    image: null,
    width: 50,
    height: 50,
    damage: 5,
}
weapons.push(fists)
let staff = {
    name: 'staff',
    image: staffImage,
    width: 128,
    height: 128,
    sprite_offset: 64,
    damage: 15,
}
weapons.push(staff)

// mouse
let mouse = {
    canvas_x: 0,
    canvas_y: 0,
    x: 0,
    y: 0,
}

// soundtrack
let game_started = false;
// Generate a map
// base
let base_map = generate_base_map(map_info.rows, map_info.cols);
// Grass
let grass_map = generate_grass_map(map_info.rows, map_info.cols);
// Border
let border_map = generate_border_map(map_info.rows, map_info.cols, grass_map);

let start_time = Date.now();
// #######################################################################################################################################
// Start of the program
document.addEventListener("DOMContentLoaded", init, false);

function init() {

    // assigning the canvas element to the variable
    canvas.width = screen_width;
    canvas.height = screen_height;
    // I should make it full screen
    // creating context for canvas (painter) 
    context = canvas.getContext('2d');

    // event driven programming, listening for key presses 
    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);
    // listening for mouse clicks
    window.addEventListener('mousedown', mouse_activate, false);
    window.addEventListener('mouseUp', deactivate, false);

    // creating all npcs currently, later it will be done with chance when they are close to the player
    create_items();
    create_bosses();
    create_random_npcs();
    // Loading the assets of the game, after that calling draw
    load_assets([
        { 'var': playerImage, "url": "../static/" + player.character + "__scaled_4x.png" },
        { 'var': backgroundImage, "url": '../static/Tileset_scaled.png' },
        { 'var': excaliburImage, 'url': "../static/excalibur__scaled_4x.png" },
        { 'var': staffImage, 'url': '../static/staff__scaled_4x.png' },
        { 'var': redMushroomImage, 'url': '../static/mushroom_red.png' },
        { 'var': brownMushroomImage, 'url': '../static/mushroom_brown.png' },
        { 'var': staffMagicImage, 'url': '../static/staff__scaled_4x_magic.png' },
        { 'var': magicImage, 'url': '../static/magic_ball.png' },
        { 'var': excaliburPointerImage, 'url': '../static/pointer_scaled_4x.png' },
        { 'var': gawainImage, 'url': '../static/gawain__scaled_4x.png' },
        { 'var': mordredImage, 'url': '../static/mordred__scaled_4x.png' },
        { 'var': lancelotImage, 'url': '../static/lancelot__scaled_4x.png' },
        { 'var': percivalImage, 'url': '../static/percival__scaled_4x.png' },
        { 'var': fungantImage, 'url': '../static/fungant__scaled_4x.png' },
        { 'var': fungiantImage, 'url': '../static/fungiant__scaled_4x.png' },
        { 'var': gnomeImage, 'url': '../static/gnome__scaled_4x.png' },
        { 'var': golemImage, 'url': '../static/golem__scaled_4x.png' },
        { 'var': trollImage, 'url': '../static/troll__scaled_4x.png' },
        { 'var': ogreImage, 'url': '../static/ogre__scaled_4x.png' },
        { 'var': boulderImage, 'url': '../static/boulder_v1.png' },
        { 'var': magicFireImage, 'url': '../static/magic_fire_scaled_4x.png' },
        { 'var': ogreSwordImage, 'url': '../static/ogre_sword_4x.png' },
        { 'var': swordAttackAudio, 'url': '../static/swordAttackAudio.wav' },
        { 'var': swordHitAudio, 'url': '../static/swordHitAudio.wav' },
        { 'var': playerRunAudio, 'url': '../static/playerRunAudio.wav' },
        { 'var': playerRollAudio, 'url': '../static/playerRollAudio.wav' },
        { 'var': playerHitAudio, 'url': '../static/playerHitAudio.wav' },
        { 'var': playerDeathAudio, 'url': '../static/playerDeathAudio.wav' },
        { 'var': enemyRunAudio, 'url': '../static/enemyRunAudio.wav' },
        { 'var': enemyHitAudio, 'url': '../static/enemyHitAudio.wav' },
        { 'var': enemyDeathAudio, 'url': '../static/enemyDeathAudio.wav' },
        { 'var': magicAudio, 'url': '../static/magicAudio.wav' },
        { 'var': idleAudio, 'url': '../static/idleAudio.wav' },
        { 'var': bossAudio, 'url': '../static/bossAudio.wav' },
        { 'var': mordredAudio, 'url': '../static/mordredAudio.wav' },

    ], draw);

}

function boss_close(npc) {
    if (npc.character === 'golem' || npc.character === 'ogre' || npc.character === 'fungiant') {
        if (distance(npc, player) < 1500) {
            return true;
        }
    }
}

function mordred_close(npc) {
    if (npc.character === 'mordred') {
        if (distance(npc,player) < 2000) {
            return true;
        }
    }
}

function manage_soundtrack() {
    if (npcs.findIndex(mordred_close) >= 0) {
        mordredAudio.play();
        bossAudio.pause();
        idleAudio.pause();
    }
    else if (npcs.findIndex(boss_close) >= 0) {
        bossAudio.play();
        idleAudio.pause();
        mordredAudio.pause();
    }
    else {
        idleAudio.play();
        bossAudio.pause();
        mordredAudio.pause();
    }
}


// #######################################################################################################################################
// Animation

function draw() {
    // id for animation
    request_id = window.requestAnimationFrame(draw);

    // code for waiting until the fps passes
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);

    // soundtrack
    if (player.running) {
        manage_soundtrack();
    }



    // clearing the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // position of the mouse

    onmousemove = function (e) { mouse.canvas_x = e.clientX; mouse.canvas_y = e.clientY }
    mouse.x = mouse.canvas_x - player.canvas_x + player.x;
    mouse.y = mouse.canvas_y - player.canvas_y + player.y;

    print_maps();
    manage_items();
    manage_npcs();

    // animate the player
    if (player.weapon === 'staff' && player.shoot === true) {
        shoot(player, mouse);
        player.shoot = false;
        player.attacking = true;
    }
    check_entity(player);
    animate_entity(player);
    move_entity(player);
    print_player_health_bar()
    print_mordred_distance();
    player.score = Math.floor((Date.now() - start_time) / 1000);

    // projectiles
    manage_projectiles();

    if (npcs[0] !== undefined) {
        let target = npcs[npcs.findIndex(find_next_boss)]
        if (target !== undefined) {
            print_compas(target);
        }
    }

}



function find_next_boss(npc) {
    if ((npc.character === 'fungiant' || npc.character === 'golem' || npc.character === 'ogre' || npc.character === 'mordred') && npc.level >= player.level && npc.level < player.level + 1) {
        return true
    }
}
// #######################################################################################################################################
// managing draw


function print_maps() {
    // draw background on canvas
    // the player will always be in the center of the screen, but he will keep the coordinates in relation to the whole map
    // there will be essentially 2 maps, one that is the full map and the other one is just a cut out of that one with a specified length and width to fit the canvas
    // when the player moves, he will never go out of the window, simply the cutout of the map will change in relation to his coordinates
    // enemies will have the canvas coordinated calculated in relation to the player coordinates, essentially saying that the player is (0,0)

    // the maps will be just cutouts of the complete map, specified by the corner of the section. These corners will be the player coords - half the canvas 
    let canvas_map_x = Math.floor((player.x) / tilesSize);// - Math.floor(canvas.width/2)-2*tilesSize
    let canvas_map_y = Math.floor((player.y) / tilesSize);//  - Math.floor(canvas.height/2)-2*tilesSize
    // Because the player will have to move by pixels and not sections of the map, there have to be off sets which will move the map around the canvas based on how far is the next section change in relation to the player
    let x_offset = (player.x) % tilesSize;// - Math.floor(canvas.height/2)
    let y_offset = (player.y) % tilesSize; //- Math.floor(canvas.width/2)



    // The full map will have multiple layer, consisting of different things drawn on top of each other
    // 1. dirt base, everything filled out
    // 2. grass
    // 3. lakes and rocks
    // 4. decorations

    // base (dirt)
    print_section_map(base_map, map_info.canvas_rows, map_info.canvas_cols, x_offset, y_offset, canvas_map_x, canvas_map_y);

    // grass
    print_section_map(grass_map, map_info.canvas_rows, map_info.canvas_cols, x_offset, y_offset, canvas_map_x, canvas_map_y);

    // border 
    print_section_map(border_map, map_info.canvas_rows, map_info.canvas_cols, x_offset, y_offset, canvas_map_x, canvas_map_y);
}

// #######################################################################################################################################
// entitites
function manage_npcs() {
    for (let npc of npcs) {
        npc.canvas_x = coordinates_respective_to_player(npc, 'x') + player.canvas_x;
        npc.canvas_y = coordinates_respective_to_player(npc, 'y') + player.canvas_y;
        if (!(npc.dying || npc.dead)) {
            if (npc.character === 'fungant' || npc.character === 'fungiant') {
                if (distance(player, npc) < 500 && !npc.spawned) {
                    npc.spawn = true;
                }
                else if (npc.spawn && distance(player, npc) > 500) {
                    npc.spawn = false;
                }

            }
            else if (npc.character === 'gnome') {

            }
            else if (npc.character === 'golem') {
                if (randint(1, 30) === 1 && npc.spawned && npc.spells > 0 && distance(npc, player) < 2000 && distance(npc, player) > 250) {
                    npc.shoot = true;
                }
            }
            else if (npc.character === 'troll' || npc.character === "ogre") {

            }
            else if (npc.character === 'mordred') {
                if (randint(1, 50) === 1) {
                    npc.roll = true;
                }
                if (randint(1, 50) === 1 && npc.spawned && npc.spells > 0 && distance(npc, player) < 800 && distance(npc, player) > 300) {
                    npc.shoot = true;
                }
            }


            if (distance(player, npc) < 100) {
                npc.attack = true;
            }
            if (npc.spawned) {
                move_entity(npc);
                print_npc_health_bar(npc);
            }

            if (npc.shoot === true && !npc.attacking) {
                shoot(npc, player);
            }
            manage_movement(npc, player);

        }
        animate_entity(npc);
        check_entity(npc);

    }
}

function manage_movement(follower, followed) {
    let follower_info = character_info[character_info.findIndex(is_character, follower.character)]
    if (distance(follower, followed) < follower_info.follow_radius) {
        follow(follower, followed);
    }
    else {
        follower.moveDown = false;
        follower.moveLeft = false;
        follower.moveRight = false;
        follower.moveUp = false;
    }
}

function is_npc(npc) {
    return npc.character === this;
}

function spawn_boss(boss_name, minion_name, boss_weapon, boss_level, boss_x, boss_y) {
    let boss_spells = 0;
    if (boss_name === 'golem') {
        boss_spells = 50;
    }
    create_npc(boss_name, boss_x, boss_y, boss_spells, boss_weapon, boss_level + 0.2);
    for (let i = 0; i < 10; i += 1) {
        create_npc(minion_name, randint(Math.max(0, boss_x - 800), Math.min(map_info.map_width, boss_x + 800)), randint(Math.max(0, boss_y - 800), Math.min(map_info.map_height, boss_y + 800)), 0, 'fists', boss_level - 0.2);
    }
}

function create_bosses() {
    let boss_names = ['fungiant', 'golem', 'ogre'];
    let minion_names = ['fungant', 'gnome', 'troll'];
    let boss_weapons = ['fists', 'fists', 'ogre_sword'];
    spawn_bosses(boss_names, minion_names, boss_weapons);
}

function create_random_npcs(){
    for (let i = 0; i < 60; i += 1){
        create_npc('fungant', randint(100, map_info.map_width), randint(100, map_info.map_height), 0, 'fists', 0.9);
    }
}

function spawn_bosses(boss_names, minion_names, boss_weapons) {
    // spawn them in diagonals further away from mordred in increasing levels
    // diagonals can be easily represented by adding together x and y coordiantes, so i will simply choose 3 sums that x and y have to sum up to relating to 3 bosses and then randomly divide them, using them as input to randint
    // sums: 3000, 6000, 9000
    for (let i = 1; i < 4; i += 1) {
        let sum = ((map_info.map_height + map_info.map_width) / 4) * i;
        let boss_x = randint(Math.max(100, sum - map_info.map_height), Math.min(sum, map_info.map_width) - 100); // smallest possible such that y is still possible (sum - sum*height_ratio)
        let boss_y = sum - boss_x;


        spawn_boss(boss_names[i - 1], minion_names[i - 1], boss_weapons[i - 1], i, boss_x, boss_y);
    }

}

function create_npc(npc_name, npc_x, npc_y, npc_spells, npc_weapon, npc_level) {
    let npc_info = character_info[character_info.findIndex(is_character, npc_name)];


    let npc = {
        character: npc_name, // from the create_entity function call
        // position
        x: npc_x,
        y: npc_y,
        canvas_x: 0,
        canvas_y: 0,
        // attributes
        game_width: npc_info.game_width,
        game_height: npc_info.game_height,
        xChange: 0,
        yChange: 0,
        friction: 0.5,
        max_health: npc_info.max_health,
        acceleration: randint(npc_info.acceleration[0], npc_info.acceleration[1]),
        // animation frame
        frameX: 0,
        frameY: 0,
        x_offset: 0,
        y_offset: 0,
        animation_counter: 0,
        animation_length: 3,
        // status
        level: npc_level,
        running: false,
        rolling: false,
        health: 1000,
        spells: npc_spells,
        weapon: npc_weapon,
        attacking: false,
        taking_damage: false,
        dying: false,
        died: false,
        spawned: false,
        spawning: false,
        // Instructions 
        moveLeft: false,
        moveUp: false,
        moveDown: false,
        moveRight: false,
        roll: false,
        attack: false,
        take_damage: false,
        die: false,
        shoot: false,
        spawn: false,
        // weapon animation 
        weapon_frameX: 0,
        weapon_frameY: 0,
        weapon_animation_counter: 0,
        weapon_animation_length: 3,
    }
    // coordinates
    npc.canvas_x = coordinates_respective_to_player(npc, 'x') + player.canvas_x;
    npc.canvas_y = coordinates_respective_to_player(npc, 'y') + player.canvas_y;
    // spawn state
    if (npc_info.spawn < 0 || npc_info.name === 'mordred') {
        npc.spawn = true;
        npc.spawned = true;
    }
    // max health calculate
    npc.max_health = 100 * (10 ** npc.level);
    npc.health = npc.max_health;

    npcs.push(npc);
}


// #######################################################################################################################################
// shooting

// if player presses 's' as shoot, and he is also holding a staff, the shoot function will be activated
// shoot function will create a projectile with a starting velocity(xchange and change) and friction, plus its own coordinates and some animation stuff
// the direction of this projectile will be calculated either with the mouse position if the player shoots or the rough location of the player if it is an npc
// the projectile will deal damage and knockabck also based on its current velocity (with a lower maximum of damage then the sword)
// the projectile will deal damage to whoever touches it

function shoot(entity, target) {
    if (entity.spells > 0) {
        magicAudio.play();
        if (entity.character === 'golem') {
            create_projectile(entity, target, 'boulder');

        }
        else {
            create_projectile(entity, target, 'magic');
        }
        entity.spells -= 1;
    }
}

function manage_projectiles() {
    for (let projectile of projectiles) {
        projectile.canvas_x = coordinates_respective_to_player(projectile, 'x') + player.canvas_x + player.xChange;
        projectile.canvas_y = coordinates_respective_to_player(projectile, 'y') + player.canvas_y + player.yChange;
        draw_projectile(projectile);
        move_projectile(projectile);
    }
}

function draw_projectile(projectile) {
    let proj_info = projectile_info[projectile_info.findIndex(is_projectile, projectile.name)];
    context.save(),
        context.translate(projectile.canvas_x, projectile.canvas_y);
    context.rotate(projectile.rotation);
    context.drawImage(proj_info.image,
        0, 0, projectile.width, projectile.height,
        -projectile.width / 2, -projectile.height / 2, projectile.width, projectile.height,)
    context.restore();
    if (projectile.xChange > 0) {
        projectile.rotation = (projectile.rotation + Math.PI / 16) % 6.28;
    }
    else {
        projectile.rotation = (projectile.rotation - Math.PI / 16) % 6.28;
    }


}

function move_projectile(projectile) {


    // changing the coords
    projectile.x += projectile.xChange;
    projectile.y += projectile.yChange;

    // following player
    if (projectile.name === 'boulder' && Math.abs(projectile.xChange) < 10 && Math.abs(projectile.yChange) < 10) {
        if (player.x - player.game_width / 2 < projectile.x) {
            projectile.xChange = -10;
        }
        else if (player.x + player.game_width / 2 > projectile.x) {
            projectile.xChange = 10;
        }
        if (player.y + player.game_height / 2 < projectile.y) {
            projectile.yChange = -10;
        }
        else if (player.y - player.game_height / 2 > projectile.y) {
            projectile.yChange = 10;
        }
    }

    // Friction
    projectile.xChange *= projectile.friction;
    projectile.yChange *= projectile.friction;


    if (projectile_stopped(projectile)) {
        projectiles.splice(projectiles.findIndex(projectile_stopped), 1);
    }

}


function projectile_stopped(projectile) {
    return (Math.abs(projectile.xChange) < 0.5) && (Math.abs(projectile.yChange) < 0.5)
}

function is_projectile(projectile_info) {
    return projectile_info.name === this;
}

function create_projectile(shooter, target, projectile_name) {
    let proj_info = projectile_info[projectile_info.findIndex(is_projectile, projectile_name)];
    let projectile = {
        name: projectile_name,
        image: proj_info.image,
        xChange: 0,
        yChange: 0,
        friction: 0.9,
        damage: proj_info.damage,
        level: shooter.level + 1,
        x: shooter.x,
        y: shooter.y,
        canvas_x: 0,
        canvas_y: 0,
        width: proj_info.width,
        height: proj_info.height,
        // add animated projectiles
        rotation: 0,
    }
    let trajectory_info = calculate_trajectory(shooter, target, proj_info)
    projectile.xChange = trajectory_info[0];
    projectile.yChange = trajectory_info[1];
    projectile.x = projectile.x + projectile.xChange * 2;
    projectile.y = projectile.y + projectile.yChange * 2;
    projectiles.push(projectile);
}

function calculate_trajectory(shooter, target, proj_info) {
    let xChange;
    let yChange;
    let speed_max = proj_info.speed_max;
    let speed_min = proj_info.speed_min;
    let x_diff = (target.x - shooter.x);
    let y_diff = (target.y - shooter.y);
    let ratio = x_diff / y_diff;

    xChange = x_diff / 5
    yChange = y_diff / 5

    if (xChange ** 2 + yChange ** 2 > speed_max ** 2) {
        xChange = Math.sqrt((speed_max ** 2) / (1 + 1 / (ratio ** 2))) * Math.sign(x_diff);
        yChange = xChange / ratio;
    }
    else if (xChange ** 2 + yChange ** 2 < speed_min ** 2) {
        xChange = Math.sqrt((speed_min ** 2) / (1 + 1 / (ratio ** 2))) * Math.sign(x_diff);
        yChange = xChange / ratio;
    }
    return [xChange, yChange];

}

// #######################################################################################################################################
// items
// item collision
function player_collected(item) {
    let outcome = false;
    // check for collision
    if (player.attack) {
        let weapon_info = create_weapon_hitbox(player);
        if (check_hitbox(item, weapon_info[0])) {
            outcome = true;
            if (item.name === 'magic_fire' && !item.burning) {
                outcome = false;
            }
        }
    }
    return outcome;
}
// item creation

function manage_items() {
    for (let item of items) {
        item.canvas_x = coordinates_respective_to_player(item, 'x') + player.canvas_x;
        item.canvas_y = coordinates_respective_to_player(item, 'y') + player.canvas_y;
        if (item.name === 'magic_fire') {
            if (randint(1, 200) === 1) {
                item.burning = true;
            }
        }
        draw_item(item);
        if (player_collected(item)) {
            player.health = Math.min(player.health + player.max_health * item.health / 100, player.max_health);
            player.spells += item.spells
            if (item.name === 'red_mushroom' || item.name === 'brown_mushroom') {
                items.splice(items.indexOf(item), 1);
            }
            else if (item.name === 'magic_fire') {
                item.burning = false;
            }
        }

    }
}

function draw_item(item) {
    if (item.name === 'red_mushroom' || item.name === 'brown_mushroom') {
        context.drawImage(item.image,
            0, 0, item.width, item.height,
            item.canvas_x, item.canvas_y, item.width, item.height)
    }
    else if (item.name === 'magic_fire') {
        let x_offset_fire = 0;
        if (item.burning) {
            x_offset_fire = 1;
            if (item.animation_counter >= item.animation_length) {
                item.frameX = (item.frameX + 1) % 4;
                item.animation_counter = 0;
            }
            item.animation_counter += 1;

        }
        else {
            item.frameX = 0;
        }
        context.drawImage(item.image,
            (item.frameX + x_offset_fire) * item.width, 0, item.width, item.height,
            item.canvas_x, item.canvas_y, item.width, item.height);
    }

}

function create_item(item_name, item_x, item_y) {
    let item_properties = item_info[item_info.findIndex(find_item, item_name)];
    let item;
    if (item_name === 'magic_fire') {
        item = {
            x: item_x,
            canvas_x: 0,
            canvas_y: 0,
            y: item_y,
            health: randint(item_properties.health[0], item_properties.health[1]),
            spells: randint(item_properties.spells[0], item_properties.spells[1]),
            width: item_properties.width,
            height: item_properties.height,
            game_height: item_properties.game_height,
            game_width: item_properties.game_width,
            name: item_name,
            image: item_properties.image,
            frameX: 0,
            animation_counter: 0,
            animation_length: 8,
            burning: true,
        }
    }
    else {
        item = {
            x: item_x,
            canvas_x: 0,
            canvas_y: 0,
            y: item_y,
            health: randint(item_properties.health[0], item_properties.health[1]),
            spells: item_properties.spells,
            width: item_properties.width,
            height: item_properties.height,
            game_height: item_properties.game_height,
            game_width: item_properties.game_width,
            name: item_name,
            image: item_properties.image,
        }
    }

    items.push(item);
}

function find_item(item) {
    return item.name === this;
}

function create_items() {
    for (let i = 0; i < 15; i += 1) {

        create_item('red_mushroom', randint(50, map_info.map_width - 50), randint(50, map_info.map_height - 50));
    }
    for (let i = 0; i < 70; i += 1) {
        create_item('brown_mushroom', randint(50, map_info.map_width - 50), randint(50, map_info.map_height - 50));
    }
    for (let i = 0; i < 10; i += 1) {
        create_item('magic_fire', randint(50, map_info.map_width - 50), randint(50, map_info.map_height - 50));
    }
}

// #######################################################################################################################################
// GUI

// mordred distance
function print_mordred_distance() {
    if (npcs.findIndex(is_npc, 'mordred') > 0) {
        let mordred_npc = npcs[npcs.findIndex(is_npc, 'mordred')]
        context.fillStyle = '#446350';
        context.fillRect(50, 60, 400 * (Math.max(Math.floor(distance(player, mordred_npc) / tilesSize) / Math.ceil(Math.sqrt(map_info.rows ** 2 + map_info.cols ** 2)), 0)), 20)
    }
}

// compas
function print_compas(target) {
    if (distance(player, target) > 500) {
        let angle;
        let x_diff = Math.abs(player.x - target.x);
        let y_diff = Math.abs(player.y - target.y);
        angle = Math.atan(x_diff / y_diff);

        if (player.x > target.x && player.y < target.y) {
            angle = Math.atan(x_diff / y_diff) + Math.PI * 3 / 2;
        }
        else if (player.x < target.x && player.y < target.y) {
            angle = Math.atan(y_diff / x_diff) + Math.PI;
        }
        else if (player.x < target.x && player.y > target.y) {
            angle = Math.atan(x_diff / y_diff) + Math.PI / 2;
        }
        else {
            angle = Math.atan(y_diff / x_diff);
        }

        context.save();
        context.translate(player.canvas_x, player.canvas_y);
        context.rotate(angle);
        // draw an image of an arrow
        context.drawImage(excaliburPointerImage,
            0, 0, 72, 24,
            -200, -4, 72, 24);
        context.restore();
    }


}

// Health Bars
function print_player_health_bar() {

    context.fillStyle = 'black';
    context.fillRect(50, 20, 400, 20)
    context.fillStyle = 'red';
    context.fillRect(50, 20, 400 * (Math.max(player.health / player.max_health, 0)), 20)
}

function print_npc_health_bar(entity) {
    context.fillStyle = 'red';
    context.fillRect(entity.canvas_x - 25, entity.canvas_y - entity.game_height / 2, 48 * (Math.max(entity.health / entity.max_health, 0)), 10)
}


// #######################################################################################################################################
// hitboxes

// Check entity
function calculate_knockback(attacker, attacked) {
    // Knockback
    // the direction can be derived from the the coordinates between npc and entity
    // magnitude will be the same, but the ratio of the xChange and yChange will be the same like the ratio of x and y between the entity and npc
    // there also has to be time for which this force will be applied
    let knockback = {
        xChange: 0,
        yChange: 0,
    }
    // based just on the entities direction not the coordinates of the entities
    if ((attacker.x_offset === 0 && attacker.xChange > 0)
        || (attacker.x_offset === 4 && attacker.xChange < 0)) {
        knockback.xChange = Math.min((Math.abs(attacker.xChange) ** 1.7), 600) * Math.sign(attacker.xChange);
    }
    else {
        knockback.xChange = 10 * Math.sign(attacked.x - attacker.x);
    }

    if ((attacker.yChange > 0 && attacked.y > attacker.y)
        || (attacker.yChange < 0 && attacked.y < attacker.y)) {
        knockback.yChange = Math.min((Math.abs(attacker.yChange) ** 1.7), 600) * Math.sign(attacker.yChange);
    }
    else {
        knockback.yChange = 10 * Math.sign(attacked.y - attacker.y);
    }

    return knockback
}

function calculate_damage(attacker, weapon_damage) {
    // It should be much large if the attacker has a high speed in the direction he was hitting
    let damage = 0;
    if ((attacker.x_offset === 0 && attacker.xChange > 0)
        || (attacker.x_offset === 4 && attacker.xChange < 0)) {
        damage = (Math.abs(attacker.xChange) + Math.abs(attacker.yChange) + weapon_damage) * (8 ** (attacker.level));
    }
    else {
        damage = weapon_damage * (5 ** (attacker.level));
    }

    return Math.min(damage, 50 * (10 ** (attacker.level)));
}

function is_dead(entity) {
    return entity.died;
}

function check_entity(entity) {
    // check if the entity was hit
    let hit_info = was_hit(entity);
    if (hit_info[0]) {
        entity.health -= hit_info[1]; // have to get the appropriate damage from a weapon here + extra for the speed
        entity.take_damage = true;
        // Knockback
        // the direction can be derived from the the coordinates between npc and entity
        // magnitude will be the same, but the ratio of the xChange and yChange will be the same like the ratio of x and y between the entity and npc
        // there also has to be time for which this force will be applied
        let knockback = hit_info[2];

        entity.xChange += knockback.xChange;
        entity.yChange += knockback.yChange;
    }
    // check if the entity has health under 0
    if (entity.health < 0) {
        entity.die = true;
    }
    if (entity.died) {
        npcs.splice(npcs.findIndex(is_dead), 1); // deleting the entity from the npcs list // actually just deleting the first npc in the list that is dead, 
        if (entity.character === 'mordred') {
            stop("YOU WON!");
            store_score();
        }
        else if (entity.character === 'fungiant') {
            player.level += 1;
            update_player_health();
            create_npc('mordred', 500, 500, 20, 'staff', 4.3);
            let mordred_npc = npcs[npcs.findIndex(is_npc, 'mordred')]
            mordred_npc.acceleration = player.acceleration / 14;
            for (let i = 0; i < 10; i += 1) {
                create_item('red_mushroom', randint(Math.max(entity.x - 400, 0), Math.min(entity.x + 400, map_info.map_width)), randint(Math.max(entity.y - 400, 0), Math.min(entity.y + 400, map_info.map_height)));
            }

        }
        else if (entity.character === 'golem') {
            player.level += 1;
            update_player_health();
            let mordred_npc = npcs[npcs.findIndex(is_npc, 'mordred')]
            mordred_npc.acceleration = player.acceleration / 4;
            create_item('magic_fire', entity.x, entity.y)
            player.weapon = 'staff';
            player.spells = 0;
        }
        else if (entity.character === 'ogre') {
            player.level += 1;
            update_player_health();
            let mordred_npc = npcs[npcs.findIndex(is_npc, 'mordred')]
            mordred_npc.acceleration = player.acceleration + 1;
            player.acceleration += 2;
        }
        else if (entity.character === 'fungant') {
            create_item('red_mushroom', entity.x, entity.y);
        }
    }

}

// create a function that will check if an entity is hit
function was_hit(entity) {
    let outcome = false;
    let weapon_info = [];
    let knockback = 0;
    let damage = 0;
    // currently checking if any entities were attacking and then if the hitbox the entity being checked was in it
    for (let npc of npcs) {

        // check if they are attacking
        if (entity !== npc && npc.attack && !npc.dying && !npc.dead) {
            // check for collision
            weapon_info = create_weapon_hitbox(npc);
            knockback = calculate_knockback(npc, entity);
            damage = calculate_damage(npc, weapon_info[1]); // there is a problem when I hit the enemy and thus give it juge knockback on the first frame, the damage he would deal if the hit me that frame is astronomical
            if (check_hitbox(entity, weapon_info[0])) {
                outcome = true;
            }
        }

    }
    // check if they are attacking
    // check for collision
    if (entity !== player && player.attack) {
        weapon_info = create_weapon_hitbox(player);
        if (check_hitbox(entity, weapon_info[0])) {
            damage = calculate_damage(player, weapon_info[1]);
            knockback = calculate_knockback(player, entity);
            outcome = true;

        }
    }

    // check for projectiles 
    for (let projectile of projectiles) {
        let hitboxes = create_projectile_hitbox(projectile);
        let hit = false;
        for (let hitbox of hitboxes) {
            if (check_hitbox(entity, hitbox) && entity.character !== 'golem') {
                hit = true;
            }
        }
        if (hit) {
            damage = Math.min((projectile.damage + Math.abs(projectile.xChange) + Math.abs(projectile.yChange)) * (5 ** projectile.level), (10 ** projectile.level) - 5);
            knockback = calculate_projectile_knockback(projectile);
            // delete the projectile
            projectiles.splice(projectiles.indexOf(projectile), 1);
            outcome = true;

        }
    }

    if (entity.taking_damage || entity.rolling) { // if the player is being hit, he cannot be hit again, he also cannot be hit when he is rolling
        outcome = false;
    }

    return [outcome, damage, knockback];
}

function calculate_projectile_knockback(projectile) {
    let knockback = {
        xChange: 0,
        yChange: 0,
    }
    knockback.xChange = (Math.abs(projectile.xChange)) * Math.sign(projectile.xChange);
    knockback.yChange = (Math.abs(projectile.yChange)) * Math.sign(projectile.yChange);
    knockback.xChange = Math.min(knockback.xChange, 100)
    knockback.yChange = Math.min(knockback.yChange, 100)
    return knockback

}

function create_projectile_hitbox(projectile) {
    // I need to create more hitboxes since sometimes the frames do not line up to hit him
    let hitboxes = [];
    for (let i = -3; i < 4; i += 1) {
        let hitbox = {
            x1: projectile.x + (projectile.xChange / 7) * i, // upper left corner
            y1: projectile.y + (projectile.yChange / 7) * i,
            x2: projectile.x + (projectile.xChange / 7) * i + projectile.width, // down right corner
            y2: projectile.y + (projectile.yChange / 7) * i + projectile.height,
        }
        hitboxes.push(hitbox);
    }
    return hitboxes;
}

function is_weapon(weapon) {
    return weapon.name === this
}

function create_weapon_hitbox(entity) {
    // I should have a list of weapons and find the one the player is holding, then get the hitbox dimensions from it
    // a rectangle specified by the corners
    let hitbox = {
        x1: 0, // upper left corner
        y1: 0,
        x2: 0, // down right corner
        y2: 0,
    }
    let weapon = weapons[weapons.findIndex(is_weapon, entity.weapon)];
    // based on the weapon they have and the orientation
    hitbox.x1 = entity.x;
    hitbox.y1 = entity.y - weapon.height / 2;
    hitbox.x2 = entity.x + weapon.width;
    hitbox.y2 = entity.y + weapon.height / 2;
    if (entity.x_offset === 4) {
        hitbox.x1 -= weapon.width;
        hitbox.x2 -= weapon.width;
    }

    return [hitbox, weapon.damage];

}

function check_hitbox(entity, hitbox) {
    if ((entity.x + entity.game_width / 2 > hitbox.x1
        && entity.y + entity.game_height / 2 > hitbox.y1
        && entity.x - entity.game_width / 2 < hitbox.x2
        && entity.y - entity.game_height / 2 < hitbox.y2)) {
        return true;
    }
}


// #######################################################################################################################################
// animation

// Design of the animation
// animation just needs to know in which state the animation is and what state the entity is in, if all of this is stored in the entity, we just need to supply the function with the entity and it will animate the appropriate thing

// Have a large if statement that is sorting based on the action that is being currently performed, 
// there will be only one action possible at one time
// getting the correct frame will be separated from actually moving the player
// Inputs will be accepted only if a certain action is not being performed, so once an action gets set off, nothing will change in the animation until 
// Do not worry about the direction we are facing, it is the same, just in the end there is a piece of code to change the direction if it is wrong

function is_character(character_info) {
    return character_info.name === this;
}



function animate_entity(entity) {
    let entity_info = character_info[character_info.findIndex(is_character, entity.character)];
    // Draw Player
    let reverse = 0;

    // context.drawImage(entity_info.image,
    //     entity_info.width * (Math.abs(entity.frameX - reverse) + entity.x_offset), entity_info.height * (entity.frameY + entity.y_offset), entity_info.width, entity_info.height,
    //     entity.canvas_x - entity_info.sprite_offset, entity.canvas_y - entity_info.sprite_offset, entity_info.width, entity_info.height);

    // Starting the animations

    // death animation
    if (entity.died) {
        entity.frameY = entity_info.death; //9;
        entity.frameX = 3;
        entity.animation_counter = 0;
    }
    else if (entity.die || entity.dying) {
        entity.frameY = entity_info.death; //9;
        if (!entity.dying) {
            if (entity === player) {
                playerDeathAudio.play();
            }
            else {
                enemyDeathAudio.play();
            }
            entity.frameX = 0; // starting rather from the second frame, because the first one looks like a normal stand, which looks weird chained with a run
            entity.animation_length = 20; // how fast
            entity.y_offset = 0; // making sure there is no offset
            entity.dying = true; // updating the player status
        } // checking for the end of an animation row, because roll has 2 rows of animation, first we have to go to the next row and then end animation
        else if (entity.frameX === 3 && entity.animation_counter === entity.animation_length) {
            if (entity === player) {
                stop('YOU DIED');
            }
            else {
                entity.died = true;
            }
        }
    }
    // spawn and despawn animation
    // spawn
    else if ((entity.spawn && !entity.spawned)) {
        entity.frameY = entity_info.spawn;
        if (!entity.spawning) {
            entity.frameX = 0; // starting rather from the second frame, because the first one looks like a normal stand, which looks weird chained with a run
            entity.animation_length = 4; // how fast
            entity.y_offset = 0; // making sure there is no offset
            entity.spawning = true; // updating the player status
        } // checking for the end of an animation row, because roll has 2 rows of animation, first we have to go to the next row and then end animation
        else if (entity.frameX === 3 && entity.animation_counter === entity.animation_length) {
            entity.spawned = true;
            entity.spawning = false;
            entity.animation_length = 4;
        }
    }
    // despawn
    else if ((!entity.spawn && entity.spawned)) {
        entity.frameY = entity_info.spawn;
        reverse = 3;
        if (!entity.spawning) {
            entity.frameX = 0; // starting rather from the second frame, because the first one looks like a normal stand, which looks weird chained with a run
            entity.animation_length = 4; // how fast
            entity.y_offset = 0; // making sure there is no offset
            entity.spawning = true; // updating the player status
        } // checking for the end of an animation row, because roll has 2 rows of animation, first we have to go to the next row and then end animation
        else if (entity.frameX === 3 && entity.animation_counter === entity.animation_length) {
            entity.spawned = false;
            entity.spawning = false;
            reverse = 0;
        }
    }
    // stay despawned
    else if ((!entity.spawn && !entity.spawned)) {
        entity.frameY = entity_info.spawn;
        entity.frameX = 0;
        entity.animation_counter = 0;
    }
    // damage animation
    else if (entity.take_damage || entity.taking_damage) {
        entity.frameY = entity_info.hit;
        if (!entity.taking_damage) {
            if (entity === player) {
                playerHitAudio.currentTime = 0;
                playerHitAudio.play();
            }
            else {
                enemyHitAudio.currentTime = 0;
                enemyHitAudio.play();
            }
            entity.frameX = 0; // starting rather from the second frame, because the first one looks like a normal stand, which looks weird chained with a run
            entity.animation_length = 1; // how fast
            entity.y_offset = 0; // making sure there is no offset
            entity.taking_damage = true; // updating the player status
        } // checking for the end of an animation row, because roll has 2 rows of animation, first we have to go to the next row and then end animation
        else if (entity.frameX === 3 && entity.animation_counter === entity.animation_length) {
            entity.take_damage = false;
            entity.taking_damage = false;
        }
    }
    // rolling
    else if (entity.roll || entity.rolling) {

        entity.frameY = entity_info.roll[0]; // 5;
        if (!entity.rolling) {
            playerRollAudio.currentTime = 0;
            playerRollAudio.play();
            // start rolling
            entity.frameY = entity_info.roll[0]; //5; // setting it to the correct starting row
            entity.frameX = 1; // starting rather from the second frame, because the first one looks like a normal stand, which looks weird chained with a run
            entity.animation_length = 1; // how fast
            entity.y_offset = 0; // making sure there is no offset
            entity.rolling = true; // updating the player status
            entity.xChange = entity.xChange * 2; // changing the speed of the player
            entity.yChange = entity.yChange * 2;
            entity.friction = 0.7;
        } // checking for the end of an animation row, because roll has 2 rows of animation, first we have to go to the next row and then end animation
        else if (entity.frameX === 3 && entity.animation_counter === entity.animation_length) {
            if (entity.y_offset === 0) {
                entity.y_offset = entity.y_offset + 1;
            }// end rolling
            else {
                entity.roll = false;
                entity.rolling = false;
                entity.xChange = entity.xChange / 2;
                entity.yChange = entity.yChange / 2;
                entity.y_offset = 0;
                entity.friction = 0.5;
            }
        }
    }
    // running
    else if (((entity.moveLeft || entity.moveRight || entity.moveUp || entity.moveDown) &&
        !(entity.moveRight && entity.moveLeft) && !(entity.moveUp && entity.moveDown)) || entity.running) {
        // making sure the frames are correct
        entity.frameY = entity_info.run[0];
        if (entity === player) {
            playerRunAudio.play();
        }
        else {
            enemyRunAudio.play();
        }
        playerRunAudio.play();
        // start running
        if (!entity.running) {
            entity.animation_length = 1;
            entity.running = true;
            if (entity === player) {
                playerRunAudio.currentTime = 0;
                playerRunAudio.play();
            }
            else {
                enemyRunAudio.currentTime = 0;
                enemyRunAudio.play();
            }
        }
        // move tot he second one
        else if (entity.frameX === 3 && entity.animation_counter === entity.animation_length) {
            entity.y_offset = (entity.y_offset + 1) % 2;
        }
        // ending the running
        else if (!(entity.moveLeft || entity.moveRight || entity.moveUp || entity.moveDown) && entity.running) {
            entity.running = false;
        }

    }
    // idle
    else if (!entity.running && !entity.rolling) {
        // serves as default, because it runs every time something is not happening rather then when something is happening
        entity.frameY = entity_info.idle;
        entity.y_offset = 0;
        entity.animation_length = 2;
    }

    // attack animation (separate from this tree)
    if (entity.weapon !== null && (!entity.dying && !entity.dead && entity.spawned)) {
        let weapon = weapons[weapons.findIndex(is_weapon, entity.weapon)]
        if (weapon.image !== null) {
            // moiving the weapon to the correct side of the character
            let weapon_x_offset_1 = entity.game_width / 2
            if (entity.x_offset === 4) {
                weapon_x_offset_1 = -weapon_x_offset_1;
            }

            context.save(); // save current state
            context.translate(entity.canvas_x + weapon_x_offset_1, entity.canvas_y)
            if (entity.attack || entity.attacking || entity.shoot) {
                if (entity.x_offset === 0) {
                    context.translate(32, 32) // offsetting the center of the rotation
                    context.rotate(Math.PI / 2); // rotate

                }
                if (entity.x_offset === 4) {
                    context.translate(-32, 32)
                    context.rotate(-Math.PI / 2); // rotate
                }
            }
            if (entity.weapon === 'staff' && entity.spells > 0) {
                weapon.image = staffMagicImage;
            }
            else if (entity.weapon === 'staff') {
                weapon.image = staffImage;
            }
            context.drawImage(weapon.image,
                weapon.width * (entity.weapon_frameX), weapon.height * (entity.weapon_frameY), weapon.width, weapon.height,
                -weapon.sprite_offset, -weapon.sprite_offset, weapon.width, weapon.height);
            context.restore(); // restore original states (no rotation etc)
        }

        entity.weapon_animation_counter += 1;
        if (entity.weapon_animation_counter > entity.weapon_animation_length) {
            entity.weapon_frameX = (entity.weapon_frameX + 1) % 4;
            entity.weapon_animation_counter = 0;
        }
        if ((entity.attack || entity.attacking || entity.shoot) && !(entity.rolling && (!entity.attack && !entity.attacking && !entity.shoot))) { // the player can attack from a roll, which results in increased knockback and the ability to end a roll
            if (entity.x_offset === 0) {
                entity.weapon_frameY = 1;
            }
            if (entity.x_offset === 4) {
                entity.weapon_frameY = 2;
            }
            if (!entity.attacking) {
                swordAttackAudio.currentTime = 0
                swordAttackAudio.play();
                entity.weapon_frameX = 0; // starting rather from the second frame, because the first one looks like a normal stand, which looks weird chained with a run
                entity.weapon_animation_length = 1; // how fast
                entity.weapon_y_offset = 0; // making sure there is no offset
                entity.attacking = true; // updating the player status
                entity.xChange = Math.floor(entity.xChange / 2);
                entity.yChange = Math.floor(entity.yChange / 2);
            } // checking for the end of an animation row, because roll has 2 rows of animation, first we have to go to the next row and then end animation
            else if (entity.weapon_frameX === 3 && entity.weapon_animation_counter === entity.weapon_animation_length) {
                entity.attack = false;
                entity.shoot = false;
                entity.attacking = false;
                entity.xChange = entity.xChange * 2;
                entity.yChange = entity.yChange * 2
            }
        }
        else if (entity.roll || entity.rolling) {
            // hide the weapon
            entity.weapon_frameY = 0;
            entity.weapon_frameX = 1;
        }
        // running
        else if (((entity.moveLeft || entity.moveRight || entity.moveUp || entity.moveDown) &&
            !(entity.moveRight && entity.moveLeft) && !(entity.moveUp && entity.moveDown)) || entity.running) {
            // making sure the frames are correct
            entity.weapon_frameY = 0;
            entity.weapon_frameX = 0;
        }
        // idle
        else if (!entity.running && !entity.rolling) {
            entity.weapon_frameY = 0;
            entity.weapon_frameX = 0;
        }

    }

    // Player is always animated, so we always increase animation counter by 1

    entity.animation_counter += 1
    if (entity.animation_counter > entity.animation_length) {
        entity.frameX = (entity.frameX + 1) % 4;
        entity.animation_counter = 0;
    }

    // turning around no matter what
    if (!entity.rolling)
        if (entity === player) {
            if (entity.x_offset === 0 && entity.canvas_x > mouse.canvas_x) {
                entity.x_offset = 4;

            }
            if (entity.x_offset === 4 && entity.canvas_x < mouse.canvas_x) {
                entity.x_offset = 0;
            }
        }
        else {
            if (entity.x_offset === 0 && entity.moveLeft) {
                entity.x_offset = 4;

            }
            if (entity.x_offset === 4 && entity.moveRight) {
                entity.x_offset = 0;
            }
        }
    context.drawImage(entity_info.image,
        entity_info.width * (Math.abs(entity.frameX - reverse) + entity.x_offset), entity_info.height * (entity.frameY + entity.y_offset), entity_info.width, entity_info.height,
        entity.canvas_x - entity_info.sprite_offset, entity.canvas_y - entity_info.sprite_offset, entity_info.width, entity_info.height);

}

// #######################################################################################################################################
// movement of entities



function move_entity(entity) {
    // #########################################################################
    // Physics
    // if entity is supposed to move right, it will add velocity to a certain direction
    // the final movement will be just the result of all forces acting on the object
    // friction will have to act on all forces individually, so for example knock back will just be a force applied at start and progressively getting smaller

    // Handle Movement
    // if statement for whe nI do not want the character to move (dying etc.)
    if (!entity.dying && entity.spawned && !entity.spawning) {
        if (entity.moveRight || (entity.rolling && entity.x_offset === 0 && !(entity.moveUp || entity.moveDown))) { // prevents rolling without moving
            // entity.x = entity.xChange + entity.x;
            entity.xChange += entity.acceleration;
        }
        if (entity.moveUp) {
            // entity.y = entity.y - entity.yChange;
            entity.yChange -= entity.acceleration;
        }
        if (entity.moveLeft || (entity.rolling && entity.x_offset === 4 && !(entity.moveUp || entity.moveDown))) { // prevents rolling without moving
            // entity.x = entity.x - entity.xChange;
            entity.xChange -= entity.acceleration;
        }
        if (entity.moveDown) {
            // entity.y = entity.y + entity.yChange;
            entity.yChange += entity.acceleration;
        }
    }

    // Friction
    entity.xChange *= entity.friction;
    entity.yChange *= entity.friction;

    // changing the coords
    entity.x += entity.xChange;
    entity.y += entity.yChange;



    // Collisions
    // I have to work on the model itself, this is not accurate
    for (let npc of npcs) {
        if (npc !== entity) {
            // if entity collides with npc
            if (entity.x + entity.game_width / 2 > npc.x - npc.game_width / 2
                && entity.x - entity.game_width / 2 < npc.x + npc.game_width / 2
                && entity.y + entity.game_height / 2 > npc.y - npc.game_height / 2
                && entity.y - entity.game_height / 2 < npc.y + npc.game_height / 2) {
                // push the entity back
                entity.xChange += 10 * Math.sign(entity.x - npc.x);
                entity.yChange += 10 * Math.sign(entity.y - npc.y);
            }
        }
    }

    // Edges of the map
    // edge of the map will be implemented as an ocean, so the map is going to be an island 
    if (entity.x - entity.game_width < 0) {
        entity.x = entity.game_width;
    }
    if (entity.y - entity.game_height < 0) {
        entity.y = entity.game_height;
    }
    if (entity.y + entity.game_height > map_info.map_height) {
        entity.y = map_info.map_height - entity.game_height;
    }
    if (entity.x + entity.game_width > map_info.map_width) {
        entity.x = map_info.map_width - entity.game_width;
    }

}

function randint(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

// #######################################################################################################################################
// keys

function activate(event) {
    let key = event.key;
    if (key === 'ArrowLeft' || key === 'a') {
        player.moveLeft = true;
    }
    if (key === 'ArrowRight' || key === "d") {
        player.moveRight = true;
    }
    if (key === "ArrowDown" || key === "s") {
        player.moveDown = true;
    }
    if (key === 'ArrowUp' || key === "w") {
        player.moveUp = true;
    }
    if (key === ' ') {
        player.roll = true; // for some reason it does not activate when pressing up and left
    }
    // handling menu
    if (key === "m") {
        if (!menu) {
            show_menu("", "");
            menu = true;
        }
        else {
            hide_menu();
            menu = false;
        }

    }

}

function mouse_activate(event) {
    if (event.button === 0) {
        player.attack = true;
    }
    if (event.button === 2) {
        player.shoot = true;
    }
    if (event.button === 1) {
        player.roll = true;
    }
}

function deactivate(event) {
    // handling movement
    let key = event.key;
    if (key === 'ArrowLeft' || key === 'a') {
        player.moveLeft = false;
    }
    if (key === 'ArrowRight' || key === "d") {
        player.moveRight = false;
    }
    if (key === 'ArrowDown' || key === "s") {
        player.moveDown = false;
    }
    if (key === 'ArrowUp' || key === "w") {
        player.moveUp = false;
    }
    if (key === " ") {
        player.roll = false;
    }
    if (key === 'a') {
        player.attack = false;
    }
}


// #######################################################################################################################################
// coord funcs
function player_collides(a, b) {
    if (b.x + b.width < a.x ||
        a.x + a.width < b.x ||
        b.y > a.y + a.height ||
        a.y > b.y + b.height) {
        return false;
    }
    else {
        return true;
    }
}

// running away from a player
function run_away(chased, chaser) {

}

// moving randomly
function move_around(entity) {

}

// there has to be a leeway in the coordinates, otherwise we get jitters
function follow(follower, followed) {
    let follow_margin = 20;
    if (followed.x > follower.x + follow_margin) {
        follower.moveRight = true;
        follower.moveLeft = false;
    }
    else if (followed.x + follow_margin < follower.x) {
        follower.moveLeft = true;
        follower.moveRight = false;
    }
    else {
        follower.moveLeft = false;
        follower.moveRight = false;
    }

    if (followed.y > follower.y + follow_margin) {
        follower.moveDown = true;
        follower.moveUp = false;
    }
    else if (followed.y + follow_margin < follower.y) {
        follower.moveDown = false;
        follower.moveUp = true;
    }
    else {
        follower.moveUp = false;
        follower.moveDown = false;
    }
}
// #######################################################################################################################################
// funcs
function stop(outcome) {
    window.removeEventListener('keydown', activate, false);
    window.removeEventListener('keyup', deactivate, false);
    window.cancelAnimationFrame(request_id);
    show_menu(outcome, player.score)
}

// functions to load assets

function load_assets(assets, callback) {
    let num_assets = assets.length;
    let loaded = function () {
        console.log('loaded');
        num_assets = num_assets - 1
        if (num_assets === 0) {
            callback();
        }
    };
    for (let asset of assets) {
        let element = asset.var;
        if (element instanceof HTMLImageElement) {
            console.log("img");
            element.addEventListener('load', loaded, false);
        }
        else if (element instanceof HTMLAudioElement) {
            console.log('audio');
            element.addEventListener('canplaythrough', loaded, false);
        }
        element.src = asset.url;
    }
}

// #######################################################################################################################################
// Functions for coordinates
function distance(entity1, entity2) {
    return ((entity1.x - entity2.x) ** 2 + (entity1.y - entity2.y) ** 2) ** 0.5;
}

function coordinates_respective_to_player(entity, coordinate) {
    if (coordinate === 'x') {
        return entity.x - player.x;
    }
    else if (coordinate === 'y') {
        return entity.y - player.y;
    }

}

// #######################################################################################################################################
// map functions

function check_borders(r, c, rows, cols, offset) {
    let tile;
    if (r === 0 && c === 0) {
        tile = 86;
    }
    else if (r === 0 && c === cols - 1) {
        tile = 87;
    }
    else if (r === rows - 1 && c === 0) {
        tile = 94;
    }
    else if (r === rows - 1 && c === cols - 1) {
        tile = 95;
    }
    else if (r === 0) {
        tile = 97 + offset;
    }
    else if (r === rows - 1) {
        tile = 81 + offset;
    }
    else if (c === 0) {
        tile = 90 + offset;
    }
    else if (c === cols - 1) {
        tile = 88 + offset;
    }
    else {
        tile = -10 + offset;
    }

    return tile;
}

// Generate a map
// base
function generate_base_map(rows, cols) {
    let base_map = []

    for (let r = 0; r < rows; r += 1) {
        let row = []
        for (let c = 0; c < cols; c += 1) {
            let tile = 6;
            if (randint(1, 4) === 1) {
                let random_x = randint(6, 7);
                let random_y = randint(0, 2);
                tile = random_x + (random_y * tilesPerRow);
            }
            row.push(tile);
        }
        base_map.push(row);
    }
    return base_map;
}

// ##################################################
// Grass
// This could be generated from a seed, but maybe the placement of grass is not worth saving

function generate_crystal_grass(rows, cols) {
    let crystal_grass_map = []
    let tile = -1;
    // first generate full grass crystals
    for (let r = 0; r < rows; r += 1) {
        let row = []
        for (let c = 0; c < cols; c += 1) {
            tile = -1;
            // let random_number = semi_random(r, c); // on average there should be around 20 crystal points now
            if (randint(1, 32) === 1) {
                let random_x = 5;
                let random_y = randint(0, 2);
                tile = random_x + (random_y * tilesPerRow);
            }
            row.push(tile);
        }
        crystal_grass_map.push(row);
    }
    return crystal_grass_map;

}

// idea is to generate crystalization cells, then we draw other patches around them for a certain time

// generate empty map
function generate_map(rows, columns) {
    let map = [];
    for (let r = 0; r < rows; r += 1) {
        let row = []
        for (let c = 0; c < columns; c += 1) {
            let tile = -1;
            row.push(tile);
        }
        map.push(row);
    }
    return map;
}

// adds a layer around a patch
function crystalize_map(rows, columns, map) {
    let iter_map = generate_map(rows, columns);
    let tile = -1;
    for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < columns; c += 1) {
            // check the sides
            let surroundings = test_surroundings(map, r, c);
            tile = -1;
            if (surroundings.counter > 0) {
                tile = generate_random_grass_tile()
            }
            iter_map[r][c] = tile;
        }
    }

    // merge them together

    let new_map = [];
    for (let r = 0; r < rows; r += 1) {
        let row = [];
        for (let c = 0; c < columns; c += 1) {
            let tile = -1;
            if (iter_map[r][c] > 0) {
                tile = iter_map[r][c];
            }
            else if (map[r][c] > 0) {
                tile = map[r][c];
            }
            row.push(tile);
        }
        new_map.push(row);
    }

    return new_map;
}

// test surroundings

function test_surroundings(map, r, c) {
    let surroundings = {
        left: false,
        right: false,
        up: false,
        down: false,
        counter: 0,
    }
    if (r > 0) {
        if (map[r - 1][c] > 0) {
            surroundings.up = true;
            surroundings.counter += 1;
        }
    }
    if (c > 0) {
        if (map[r][c - 1] > 0) {
            surroundings.left = true;
            surroundings.counter += 1;
        }
    }
    if (r < map.length - 1) {
        if (map[r + 1][c] > 0) {
            surroundings.down = true;
            surroundings.counter += 1;
        }
    }
    if (c < map[0].length - 1) {
        if (map[r][c + 1] > 0) {
            surroundings.right = true;
            surroundings.counter += 1;
        }
    }
    return surroundings;
}

// this will eliminate the option where there are 3 or 4 neighbouring grass patches next to an empty patch 
function smooth_map(rows, cols, map) {
    let smooth = false;
    let changed = false;
    let counter = 0;
    while (!smooth) {
        changed = false;
        for (let r = 0; r < rows; r += 1) {
            for (let c = 0; c < cols; c += 1) {
                // add a random tile no an edge, so they do not look like a staircase
                let current_tile = map[r][c];
                let surroundings = test_surroundings(map, r, c);
                if (current_tile < 0 && surroundings.counter === 2 && randint(1, 4) === 1) { // 
                    map[r][c] = generate_random_grass_tile()
                }
                surroundings = test_surroundings(map, r, c);
                current_tile = map[r][c];

                // adding the patch if there are 3 or 4 patches of grass next to this one
                if (surroundings.counter > 2 && current_tile < 0) {
                    map[r][c] = generate_random_grass_tile()
                    changed = true;
                }
                // if the grass patch has only one or none(technically should not happen but just to be sure) patches next to it, then it is deleted
                else if (surroundings.counter < 2 && current_tile > 0) {
                    map[r][c] = -1;
                    changed = true;
                }

            }
        }
        // checking if the map is done or if the counter exceeded a 100 preventing an infinite loop

        if (!changed || counter > 100) {
            smooth = true;
        }
        counter += 1;
    }
    return map;
}

// add border around the grass patches

function add_borders(rows, cols, map) {
    let iter_map = generate_map(rows, cols);
    let tile = -1;
    for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
            // check the sides
            tile = -1;
            let current_tile = map[r][c]
            // add the borders
            let surroundings = test_surroundings(map, r, c);
            if (surroundings.counter === 3 && current_tile > 0) {
                if (!surroundings.right) {
                    tile = 10;
                }
                else if (!surroundings.left) {
                    tile = 8;
                }
                else if (!surroundings.down) {
                    tile = 17;
                }
                else if (!surroundings.up) {
                    tile = 1
                }
            }
            else if (surroundings.counter === 2 && current_tile > 0) {
                if (!surroundings.right && !surroundings.down) {
                    tile = 18;
                }
                else if (!surroundings.right && !surroundings.up) {
                    tile = 2;
                }
                else if (!surroundings.left && !surroundings.down) {
                    tile = 16;
                }
                else if (!surroundings.left && !surroundings.up) {
                    tile = 0;
                }

            }
            iter_map[r][c] = tile;
        }
    }

    // merge them together

    let new_map = [];
    for (let r = 0; r < rows; r += 1) {
        let row = [];
        for (let c = 0; c < cols; c += 1) {
            let tile = -1;
            if (iter_map[r][c] >= 0) { // && !(r ===0 || r > rows -2 || c === 0 || c > cols -2)
                tile = iter_map[r][c];
            }
            else if (map[r][c] >= 0) {
                tile = map[r][c];
            }
            row.push(tile);
        }
        new_map.push(row);
    }

    return new_map;
}

// function to generate a semi random number from coordinates and then check
function semi_random(x, y) {
    return (x + y + seed - ((x ** 3 / y) >> 5) ** 2)
}

// function to generate a random grass tile

function generate_random_grass_tile() {
    let tile = 9;
    if (randint(1, 4) === 1) {
        let random_x = 5;
        let random_y = randint(0, 2);
        tile = random_x + (random_y * tilesPerRow);
    }

    return tile;
}

// Main function generating the final grass map

function generate_grass_map(rows, cols) {
    let crystal_map = generate_crystal_grass(rows, cols);
    for (let i = 0; i < 6; i += 1) {
        crystal_map = crystalize_map(rows, cols, crystal_map);
    }
    let s_map = smooth_map(rows, cols, crystal_map);
    let f_map = add_borders(rows, cols, s_map);
    return f_map;
}

// ##################################################
// border map

function generate_border_map(rows, cols, grass_map) {
    let border_map = [];
    for (let r = 0; r < rows; r += 1) {
        let row = []
        for (let c = 0; c < cols; c += 1) {
            let offset = 3;
            if (grass_map[r][c] > 0) {
                offset = 0
            }

            let tile = check_borders(r, c, rows, cols, offset)
            row.push(tile);
        }
        border_map.push(row);
    }
    return border_map;
}

function generate_random_water_tile() {
    let tile = 110;
    if (randint(1, 4) === 1) {
        let random_x = randint(0, 1) + 6;
        let random_y = randint(0, 1) + 13;
        tile = random_x + (random_y * tilesPerRow);
    }

    return tile;
}

// ##################################################
// Other functions for maps

// Create a portion of the canvas from the map


function get_canvas_map(rows, cols, x, y, map) {
    let canvas_map = [];
    let tile = -1;
    for (let r = 0; r < rows; r += 1) {
        let row = [];
        for (let c = 0; c < cols; c += 1) {

            if ((y + r) < map_info.rows && (y + r) > -1 && (x + c) < map_info.cols && (x + c) > -1) {
                tile = map[y + r][x + c];
            }
            else {
                tile = -1;
            }
            row.push(tile);
        }
        canvas_map.push(row);
    }
    return canvas_map;
}


// printing a map
function print_map(map, rows, cols, x_offset, y_offset) {
    for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
            let tile = map[r][c];
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tilesPerRow);
                context.drawImage(backgroundImage, tileCol * tilesSize, tileRow * tilesSize, tilesSize, tilesSize,
                    (c) * tilesSize - x_offset, (r) * tilesSize - y_offset, tilesSize, tilesSize);
            }
        }
    }
}

// immedeatly printing the new map

function print_section_map(map, rows, cols, x_offset, y_offset, x, y) {
    let tile;
    for (let r = -rows / 2 - 4; r < rows / 2 + 4; r += 1) { // +4 nad -4 to accommodate for the leeway between the size of the loaded map and the canvas
        for (let c = -cols / 2 - 4; c < cols / 2 + 4; c += 1) {
            tile = 110; // I could make an easy animation of water here <----
            if ((y + r) < map_info.rows && (y + r) > -1 && (x + c) < map_info.cols && (x + c) > -1) {
                tile = map[y + r][x + c];

            }
            let tileRow = Math.floor(tile / tilesPerRow);
            let tileCol = Math.floor(tile % tilesPerRow);
            context.drawImage(backgroundImage, tileCol * tilesSize, tileRow * tilesSize, tilesSize, tilesSize,
                (c) * tilesSize - x_offset + player.canvas_x, (r) * tilesSize - y_offset + player.canvas_y, tilesSize, tilesSize);
        }
    }
}

// #######################################################################################################################################
// Function for menus, event driven progamming

function show_menu(menu_title) {
    let menu = document.querySelector("#menu");
    let menu_title_element = document.querySelector("#menu_title");
    let score_element = document.querySelector("#score");
    menu_title_element.innerHTML = menu_title;
    score_element.innerHTML = player.score;
    menu.style.display = 'block';
}

function hide_menu() {
    let menu = document.querySelector("#menu");
    let menu_title_element = document.querySelector("#menu_title");
    let score_element = document.querySelector("#score");
    menu_title_element.innerHTML = '';
    score_element.innerHTML = '';
    menu.style.display = 'none';
}

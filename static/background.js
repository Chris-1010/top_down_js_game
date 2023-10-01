// Plagiarism
// how to find an index of an item in a list: https://www.w3schools.com/jsref/jsref_obj_array.asp
// tracking the mouse postion: https://stackoverflow.com/questions/7790725/javascript-track-mouse-position
// rotating an image on canvas: https://stackoverflow.com/questions/7496674/how-to-rotate-one-image-in-a-canvas
// text on a canvas: https://www.w3schools.com/tags/ref_canvas.asp
// detecting mouse clicks: https://stackoverflow.com/questions/2405771/is-right-click-a-javascript-event
// how to hide an element: https://stackoverflow.com/questions/6242976/javascript-hide-show-element

// #######################################################################################################################################
// Global variables
let menu=false;

// canvas
let canvas = document.querySelector('canvas');
let page_height = Math.max(screen.height, document.body.scrollHeight);
// if (screen.height > document.body.scrollHeight){
//     let body_element = document.querySelector("body");
//     body_element.style.overflow('hidden')
// }
let page_width = screen.width;
canvas.width = page_width;
canvas.height = page_height;
let context;
// Fps timing
let fpsInterval = 1000 / 30;
let now;
let then = Date.now();
// animation id
let request_id;
// images
let backgroundImage = new Image();
let playerImage = new Image();
let gawainImage = new Image();
let percivalImage = new Image();
let lancelotImage = new Image();
// background sprite information
let tilesPerRow = 8;
let tilesSize = 64;
// map_inforamtion

let map_info = {
    rows: Math.ceil(page_height/tilesSize)+2,
    cols: Math.ceil(page_width/tilesSize),
    map_height: (Math.ceil(page_height/tilesSize)+2)*tilesSize,
    map_width: (Math.ceil(page_width/tilesSize))*tilesSize,
}


canvas.height = map_info.map_height;
// list of all npcs
let npcs = [];

let mouse ={ 
    canvas_x:0,
    canvas_y:0,
}


let xhttp;
// only if the user is logged in, otherwise it returns the login required default page, so register page
// console.log(get_character_request())

// Generate a map
let base_map = generate_base_map(map_info.rows, map_info.cols);

// #######################################################################################################################################
// Start of the program
document.addEventListener("DOMContentLoaded", init, false);

get_character_request();

function init() {
    // assigning the canvas element to the variable
    canvas = document.querySelector('canvas');
    // creating context for canvas (painer)
    context = canvas.getContext('2d');

    // listening for escape buttons

    // creating all npcs currently, later it will be done with chance when they are close to the player
    for (let i = 0; i < 1; i+=1){
        let npc = {
            image: lancelotImage,
            // position
            canvas_x: 500, // Coordinates for the 
            canvas_y: 500,
            // attributes
            width: 128,
            height: 128,
            xChange: 15,
            yChange: 15,
            // animation frame
            frameX: 0,
            frameY: 0,
            x_offset: 0,
            y_offset: 0,
            animation_counter: 0,
            animation_length: 3,
            // status
            running: false,
            rolling: false,
            health: 100,
            // Instructions 
            moveLeft: false,
            moveUp: false,
            moveDown: false,
            moveRight: false,
            roll: false,
            // I could include the information about their sprite sheets in here as well (how many rows for run etc.)
        }
        npcs.push(npc);
    }

    get_character_request();

    // Loading the assets of the game, after that calling draw
    load_assets([
        // { 'var': playerImage, "url": "../static/"+ 'lancelot' +"__scaled_4x.png" },
        { 'var': backgroundImage, "url": '../static/Tileset_scaled.png' },
        { 'var': gawainImage, 'url': '../static/gawain__scaled_4x.png' },
        { 'var': lancelotImage, 'url': '../static/lancelot__scaled_4x.png' },
        { 'var': percivalImage, 'url': '../static/percival__scaled_4x.png' },

    ], draw);

    
}


function manage_characters(character){
    if (character === 'lancelot'){
        playerImage = lancelotImage;
    }
    else if (character === 'gawain'){
        playerImage = gawainImage;
    }
    else{
        playerImage = percivalImage;
    }
}

function get_character_request() {
    xhttp = new XMLHttpRequest();
    xhttp.addEventListener("readystatechange", handle_character_response, false);
    // need to change the url
    let pathname = ''
    if (window.location.pathname.split('run.py').length > 1){
            pathname = window.location.pathname.split('run.py')[0] + 'run.py'
    }
    xhttp.open("POST", pathname + "/get_character", false); // I need to get the character before we move on 
    xhttp.send();
}

function handle_character_response() {
    // check that the response has fully arrived
    if (xhttp.readyState === 4) {
        // check that the request was succesfull
        if (xhttp.status === 200) {
            manage_characters(xhttp.responseText);
        }

    }
}

function get_character_register(){
    if (location.href.split("/").includes('register')){
        let character_choice_element = document.querySelector("#character");
        manage_characters(character_choice_element.value);
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
    get_character_register();
    // clearing the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    onmousemove = function(e){mouse.canvas_x= e.clientX;mouse.canvas_y= e.clientY + window.scrollY}


    print_map(base_map, map_info.rows, map_info.cols);

    // animate entities
    for (let npc of npcs){
        if (randint(1, 50) === 1) {
            npc.roll = true;
        }
        follow(npc, mouse);
        animate_entity(npc);
        move_entity(npc);
    }
}



// Design of the animation
// animation just needs to know in which state the animation is and what state the entity is in, if all of this is stored in the entity, we just need to supply the function with the entity and it will animate the appropriate thing

// Have a large if statement that is sorting based on the action that is being currently performed, 
// there will be only one action possible at one time
// getting the correct frame will be separated from actually moving the player
// Inputs will be accepted only if a certain action is not being performed, so once an action gets set off, nothing will change in the animation until 
// Do not worry about the direction we are facing, it is the same, just in the end there is a piece of code to change the direction if it is wrong

function animate_entity(entity) {
    // Draw Player

    context.drawImage(playerImage,
        entity.width * (entity.frameX + entity.x_offset), entity.height * (entity.frameY + entity.y_offset), entity.width, entity.height,
        entity.canvas_x - 64, entity.canvas_y-64, entity.width, entity.height);

    // Starting the animations

    // death animation

    // damage animation

    // rolling
    if (entity.roll || entity.rolling) {
        entity.frameY = 5;
        if (!entity.rolling) {
            // start rolling
            entity.frameY = 5; // setting it to the correct starting row
            entity.frameX = 1; // starting rather from the second frame, because the first one looks like a normal stand, which looks weird chained with a run
            entity.animation_length = 2; // how fast
            entity.y_offset = 0; // making sure there is no offset
            entity.rolling = true; // updating the player status
            entity.xChange = entity.xChange * 2; // changing the speed of the player
            entity.yChange = entity.yChange * 2;
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
            }
        }
    }
    // running
    else if (((entity.moveLeft || entity.moveRight || entity.moveUp || entity.moveDown) &&
        !(entity.moveRight && entity.moveLeft) && !(entity.moveUp && entity.moveDown)) || entity.running) {
        // making sure the frames are correct
        entity.frameY = 1;
        // start running
        if (!entity.running) {
            entity.animation_length = 1;
            entity.running = true;
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
        entity.frameY = 0;
        entity.y_offset = 0;
        entity.animation_length = 2;
    }

    // attack animation (separate from this tree)


    // Player is always animated, so we always increase animation counter by 1

    entity.animation_counter += 1
    if (entity.animation_counter > entity.animation_length) {
        entity.frameX = (entity.frameX + 1) % 4;
        entity.animation_counter = 0;
    }

    // turning around no matter what
    if (entity.x_offset === 0 && entity.moveLeft && !entity.rolling && !entity.turning) {
        entity.x_offset = 4;

    }
    if (entity.x_offset === 4 && entity.moveRight && !entity.rolling && !entity.turning) {
        entity.x_offset = 0;
    }


}

function move_entity(entity) {
    // Handle Movement

    if (entity.moveRight || (entity.rolling && entity.x_offset === 0 && !(entity.moveUp || entity.moveDown))) { // prevents rolling without moving
        entity.canvas_x = entity.xChange + entity.canvas_x;
    }
    if (entity.moveUp) {
        entity.canvas_y = entity.canvas_y - entity.yChange;
    }
    if (entity.moveLeft || (entity.rolling && entity.x_offset === 4 && !(entity.moveUp || entity.moveDown))) { // prevents rolling without moving
        entity.canvas_x = entity.canvas_x - entity.xChange;
    }
    if (entity.moveDown) {
        entity.canvas_y = entity.canvas_y + entity.yChange;
    }

    // Collisions
    // I have to work on the model itself, this is not accurate
    
    // Edges of the map
    // edge of the map will be implemented as an ocean, so the map is going to be an island 
    if (entity.canvas_x < 0){
        entity.canvas_x = 0;
    }
    if (entity.canvas_y < 0){
        entity.canvas_y = 0;
    }
    if (entity.canvas_y + entity.height>map_info.map_height){
        entity.canvas_y = map_info.map_height - entity.height; 
    }
    if (entity.canvas_x + entity.width > map_info.map_width){
        entity.canvas_x = map_info.map_width - entity.height;
    }
    
}

function randint(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}


// direct entity
    // there has to be a leeway in the coordinates, otherwise we get jitters
function follow(follower, followed) {
    let follow_margin = 20;
    if (followed.canvas_x > follower.canvas_x + follow_margin) {
        follower.moveRight = true;
        follower.moveLeft = false;
    }
    else if (followed.canvas_x + follow_margin < follower.canvas_x) {
        follower.moveLeft = true;
        follower.moveRight = false;
    }
    else {
        follower.moveLeft = false;
        follower.moveRight = false;
    }

    if (followed.canvas_y > follower.canvas_y + follow_margin) {
        follower.moveDown = true;
        follower.moveUp = false;
    }
    else if (followed.canvas_y + follow_margin < follower.canvas_y) {
        follower.moveDown = false;
        follower.moveUp = true;
    }
    else {
        follower.moveUp = false;
        follower.moveDown = false;
    }
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
// map functions

// Generate a map
function generate_base_map(rows, cols) {
    let base_map = []
    for (let r = 0; r < rows; r += 1) {
        let row = []
        for (let c = 0; c < cols; c += 1) {
            let tile = generate_random_grass_tile()
            row.push(tile);
        }
        base_map.push(row);
    }
    return base_map;
}

// ##################################################

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

// ##################################################


function print_map(map, rows, cols) {
    let tile;
    for (let r = 0; r < rows; r += 1) { // +4 to accommodate for the leeway between the size of the loaded map and the canvas
        for (let c = 0; c < cols; c += 1) {
            tile = map[r][c];
            let tileRow = Math.floor(tile / tilesPerRow);
            let tileCol = Math.floor(tile % tilesPerRow);
            context.drawImage(backgroundImage, tileCol * tilesSize, tileRow * tilesSize, tilesSize, tilesSize,
                (c) * tilesSize, (r) * tilesSize, tilesSize, tilesSize);
        }
    }
}

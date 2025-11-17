// Tracks the current room, the username, if user is able to win, and time remaining
const state = {
    "currentRoom": null,
    "username": null,
    "win": false,
    "time": 100
};

const site = document.getElementById("main");

// Wires buttons to functions
site.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;   // If a button was not pressed, return

    // Continues to next question when the continue button is pressed
    if (btn.name === "action" && btn.value === "start") begin();
    if (btn.name === "action" && btn.value === "go") nextRoom();
});

// Room class with name, dialog, linkedRooms stores surrounding rooms in dictionary, items, background saves URL of png from images file
class Room {
    #name;
    #dialog;
    #linkedRooms;
    #items;
    #background;

    constructor(name, dialog, linkedRooms, items, background) {
        this.#name = name;
        this.#dialog = dialog;
        this.#linkedRooms = linkedRooms;
        this.#items = items;
        this.#background = background;
    }

    get name() {
        return this.#name;
    }

    get dialog() {
        return this.#dialog;
    }

    get linkedRooms() {
        return this.#linkedRooms;
    }

    get items() {
        return this.#items;
    }

    get background() {
        return this.#background;
    }

    set name(name) {
        this.#name = name;
    }

    set dialog(dialog) {
        this.#dialog = dialog;
    }

    set linkedRooms(linkedRooms) {
        this.#linkedRooms = linkedRooms;
    }
}

// Renders HTML for the titleScreen with a start button
function titleScreen() {
    startButton = `<button type="button"
                name="action" value="start"
                class="w-full
                        px-8 py-6 transition
                        hover:shadow-xl textarea">Start
        </button>`
    
    return `<div class="bg-[url(/images/heartspace.png)] rounded-lg shadowlg p-6">
                <h1 class="header">It's time to get a job!</h1>
                <div id="details" class="space-y-4">
                    <div class="bg-gray-200 border-2 border-b-black border-r-black border-t-gray-300 border-l-gray-300">
                        <div class="border-[3px] border-b-gray-400 border-r-gray-400 border-t-white border-l-white">
                            <div class="bg-gray-300 p-1">
                                <div class="min-h-2 p-1 bg-blue-900">
                                    <p class="blueBannerText pl-2 py-1">Alert</p>
                                </div>
                                <p id="textarea" class="textarea">Hello there<br><br>Welcome to the game "Get a Job!" where the goal is to arrive at your interview on time. The problem is, you cannot remember where on earth the job interview is taking place and time is ticking.
                                <br><br>
                                Explore University of Sheffield buildings to look for clues and seek advice from familiar faces to arrive at your job interview before time runs out.
                                If you are late, you are bound to lose the job to someone who bothered to show up.
                                <br><br>
                                Hurry, enter your name and begin!</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-200 border-2 border-b-black border-r-black border-t-gray-300 border-l-gray-300">
                        <div class="border-[3px] border-b-gray-400 border-r-gray-400 border-t-white border-l-white">
                            <div class="bg-gray-300 p-1">
                                <div class="min-h-2 p-1 bg-blue-900">
                                    <p class="blueBannerText pl-2 py-1">Alert</p>
                                </div>
                                <div class="px-12 py-6">
                                    <label for="username" class="textarea">Enter your name:</label>
                                    <div class="pt-2">
                                        <div class="bg-gray-200 border-2 border-b-black border-r-black border-t-gray-300 border-l-gray-300">
                                            <div class="border-[3px] border-b-gray-400 border-r-gray-400 border-t-white border-l-white flex flex-col">
                                                <input type="text" id="username" class="textarea flex-1 py-1 pl-4 bg-gray-200
                                                focus:outline-none focus:ring-2 focus:ring-gray-800"
                                                placeholder="Please enter your name"/>
                                            </div>     
                                            
                                        </div>                        
                                    </div>
                                </div>
                                <div class="px-12">
                                    <div class="pb-6">
                                        <div class="bg-gray-200 border-2 border-b-black border-r-black border-t-gray-300 border-l-gray-300">
                                            <div class="border-[3px] border-b-gray-400 border-r-gray-400 border-t-white border-l-white flex flex-col">
                                                ${startButton}
                                            </div>                                                
                                        </div>                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}

// Creates dialog for the current rooms linked room options
function linkedRoomDialog() {
    let roomOptions = ``;
    const currentRoom = state["currentRoom"];
    const linked = currentRoom.linkedRooms;

    if (linked['north']) {
        roomOptions += `North: ${linked['north'].name}<br>`
    }
    if (linked['east']) {
        roomOptions += `East: ${linked['east'].name}<br>`
    }
    if (linked['south']) {
        roomOptions += `South: ${linked['south'].name}<br>`
    }
    if (linked['west']) {
        roomOptions += `West: ${linked['west'].name}<br>`
    }

    return roomOptions

}

// Sets the first room after user enters a username
function begin() {
    const input = document.getElementById("username");
    const username = (input?.value || "").trim();
    if (!username) {
        return;
    }

    state.username = username;

    setRoom();
}

// Renders current room HTML with correct dialog and room names
function setRoom() {
    // Create the go button HTML
    goButton = `<button type="button"
                    name="action" value="go"
                    class="w-full px-8 py-6 transition
                        hover:shadow-xl textarea">Enter
                </button>`

    // Load attributes of the current room to render
    const roomOptions = linkedRoomDialog();
    const dialog = state["currentRoom"].dialog;
    const roomName = state["currentRoom"].name;
    const timeRemaining = state["time"]
    const bannerText = `${roomName} - ${timeRemaining} minutes remaining`
    const background = state["currentRoom"].background;

    console.log(dialog)

    if (roomName === "Regent Court") {
        Regent.dialog = "Back at my apartment. Now is not the time to have a nap. I got to get out of here!";   // Changes original room dialog after first entry
    } else if (roomName === "The Diamond" && state["win"]) {
        const win = true;
        showPopUp(win);     // If win is true and you re-enter the diamond then it renders the win pop up
    } else if (roomName === "The Diamond") {
        Heartspace.dialog = "You skid to the desk, wheeze 'KEYCARD PLEASE', and the receptionist prints one like a hero. Access granted. Now sprint before your future evaporates.";    // Change dialog of the Heartspace when getting intel from the Diamond
        Diamond.items.push("Knowledge");    // Add the Knowledge item to the Diamond to allow checking of already visiting the diamond
    } else if (roomName === "The Heartspace" && (Diamond.items).includes("Knowledge")) {
        Diamond.dialog = `Bleep. Door opens. You stumble in, breathless. The panel of interviewers looks up and says, "You showed up on time under pressure? You're hired". Well that was easy.`;   // Change the Diamond dialog to winning text when you re-enter after getting the keycard from the Heartspace
        state["win"] = true;    // Change win condition to true so win pop up is triggered when re-entering the Diamond
    }

    // Render loss pop up if time reaches 0
    if (state["time"] <= 0) {
        const win = false;
        showPopUp(win);
    }

    // Render HTML of current room
    site.innerHTML = `<div class="bg-[url(${background})] rounded-lg shadowlg p-6">
                <h1 class="header pb-80">It's time to get a job!</h1>
                <div id="details" class="space-y-4">
                    <div class="bg-gray-200 border-2 border-b-black border-r-black border-t-gray-300 border-l-gray-300">
                        <div class="border-[3px] border-b-gray-400 border-r-gray-400 border-t-white border-l-white">
                            <div class="bg-gray-300 p-1">
                                <div class="min-h-2 p-1 bg-blue-900">
                                    <p class="blueBannerText pl-2 py-1">${bannerText}</p>
                                </div>
                                <p id="textarea" class="textarea">${dialog}</p>
                                <p id="textarea" class="textarea"><br>${roomOptions}</p>
                                <div class="px-12 py-6">
                                    <label for="direction" class="textarea">Choose a direction:</label>
                                    <div class="pt-2">
                                        <div class="bg-gray-200 border-2 border-b-black border-r-black border-t-gray-300 border-l-gray-300">
                                            <div class="border-[3px] border-b-gray-400 border-r-gray-400 border-t-white border-l-white flex flex-col">
                                                <input type="text" id="direction" class="textarea flex-1 py-1 pl-4 bg-gray-200
                                                focus:outline-none focus:ring-2 focus:ring-gray-800"
                                                placeholder="type a direction"/>
                                            </div>     
                                            
                                        </div>                        
                                    </div>
                                </div>
                                <div class="px-12">
                                    <div class="pb-6">
                                        <div class="bg-gray-200 border-2 border-b-black border-r-black border-t-gray-300 border-l-gray-300">
                                            <div class="border-[3px] border-b-gray-400 border-r-gray-400 border-t-white border-l-white flex flex-col">
                                                ${goButton}
                                            </div>                                                
                                        </div>                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}

// Loads the room of the new direction entered by the user
function nextRoom() {
    // Retrieve direction from user input and standardise its value to lowercase
    const input = document.getElementById("direction");
    const direction = (input?.value || "").trim().toLowerCase();
    
    // Fetch all linked rooms
    const currentRoom = state["currentRoom"];
    const linked = currentRoom.linkedRooms;

    // Load new room if direction exists in linked rooms dictionary
    if (linked[direction]) {
        state["time"] -= 5;
        console.log("thatn");
        state["currentRoom"] = linked[direction];
        setRoom();
    }
}

// Renders win pop up
function showPopUp(win) {
    // Create overlay container
    const overlay = document.createElement("div");
    overlay.id = "win-overlay";
    overlay.className = "fixed inset-0 z-50 flex items-center justify-center bg-black/60";
    let title = "";
    let message = "";

    if (win === true) {
        title = `Well done ${state["username"]}... YOU WIN!`    // Gives custom win message to the user
        message = "You got the job. They hired you for showing up under pressure!";
    } else {
        title = `Too bad ${state.username}... YOU LOSE :(`      // Gives custom loss message to the user
        message = "OH NO. You ran out of time. The employers decided to go with somebody who bothers to show up to the job. Use this as a learning opportunity!";
    } 

    // HTML content
    overlay.innerHTML = `
        <div class="max-w-md w-[90%] overflow-hidden">
        <div class="bg-gray-200 border-2 border-b-black border-r-black border-t-gray-300 border-l-gray-300">
            <div class="border-[3px] border-b-gray-400 border-r-gray-400 border-t-white border-l-white">
                <div class="bg-gray-300 p-1">
                    <div class="min-h-2 p-1 bg-blue-900">
                        <p class="blueBannerText pl-2 py-1">Alert</p>
                    </div>
                    <p class="textarea text-center mt-4 text-2xl font-bold">${title}</p>
                    <p class="textarea text-center mt-2">
                    ${message}
                    </p>
                    <div class="flex gap-3 mt-6 justify-center">
                        <button id="restart" class="textarea px-4 py-2 bg-gray-200 mb-6 border-2 border-b-black border-r-black border-t-gray-300 border-l-gray-300 hover:shadow">
                            Restart
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>`;

    document.body.appendChild(overlay);

    // Reloads page on restart
    overlay.querySelector("#restart").onclick = () => {
        window.location.reload();
    };
}

// Renders the title screen when the web page is loaded
function startGame() {
    site.innerHTML = titleScreen();
}

// Room initialisation
const Mappin = new Room(
    "The Mappin Building", "Oh yeah, I've found the centre of campus. You can get practically anywhere from here. Unfortunately, I need to get to exactly one place, and fast. Which way feels like employment awaits?",
    {}, null, "images/mappin.png");
const Heartspace = new Room(
    "The Heartspace", "You spot a receptionist with a 'can solve your life in 30 seconds' energy. Might be handy later. Mental note for future me.",
    {}, null, "images/heartspace.png");
const BroadLane = new Room(
    "Broad Lane Court", "Mate: Didn't you say last week it was at The Diamond? Great. Diamond. Ooo shiny. RUN!",
    {}, null, "images/broad_lane.png");
const Diamond = new Room(
    "The Diamond", "Darn the doors are locked and I spot a stern scanner requiring a keycard. I must find a competent member of staff who can print one. Tick, tock!",
    {}, [], "images/diamond.png");
const Regent = new Room(
    "Regent Court", "OH NO. I overslept! Interview in… somewhere? Grab shoes, grab dignity, and sprint to find the building before they hire someone who can read a calendar.",
    {}, null, "images/regent.png");
const WestCourt = new Room(
    "West Court", "A group of students laugh: 'Mate, this is a flat block. No interviews here unless you're applying to be a pool table'. Right. Wrong place. Rude people. Keep moving.",
    {}, null, "images/west_court.png");
const StGeorges = new Room(
    "St George's", "It's absolute chaos. Bags, coffees, and existential dread flying everywhere. Everyone's rushing to lectures while I speedrun a life decision. Out of my way people!",
    {}, null, "images/st_georges.png");
const GeorgePorter = new Room(
    "The George Porter Building", "This place feels… abandoned. Echoes, peeling posters, one lonely pigeon doing security. Pretty sure no interviews are happening in this liminal space.",
    {}, null, "images/george_porter.png");

// Linking rooms together
Diamond.linkedRooms = {"east": StGeorges};
StGeorges.linkedRooms = {"east": Mappin, "west": Diamond};
Mappin.linkedRooms = {"north": BroadLane, "east": Heartspace, "south": Regent, "west": StGeorges};
Heartspace.linkedRooms = {"north": GeorgePorter, "south": WestCourt, "west": Mappin};
BroadLane.linkedRooms = {"east": GeorgePorter, "south": Mappin};
Regent.linkedRooms = {"north": Mappin, "east": WestCourt};
GeorgePorter.linkedRooms = {"south": Heartspace, "west": BroadLane};
WestCourt.linkedRooms = {"north": Heartspace, "west": Regent};

// Set first room as Regent, the users apartment
state["currentRoom"] = Regent;

// Run startGame() when site loads
window.onload = startGame();
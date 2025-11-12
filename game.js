const state = {
    "currentRoom": null
}

// Wires buttons to functions
site.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;   // If a button was not pressed, return

    // Continues to next question when the continue button is pressed
    // if (btn.name === "action" && btn.value === "start") continueAfterSelection();
});

class Room {
    #name;
    #dialog;
    #linkedRooms;
    #character;
    #items;
    #background;

    constructor(name, dialog, linkedRooms, character, items, background) {
        this.#name = name;
        this.#dialog = dialog;
        this.#linkedRooms = linkedRooms;
        this.#character = character;
        this.#items = items;
        this.#background = this.#background;
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

    get character() {
        return this.#character;
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

    printCharacter() {
        console.log(`${this.#character.name} says ${this.#character.dialog}`)
    }
}

class Character {
    #name;
    #description;
    #dialog;

    constructor(name, description, dialog) {
        this.#name = name;
        this.#description = description;
        this.#dialog = description;
    }

    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    get dialog() {
        return this.#dialog;
    }

    set name(name) {
        this.#name = name;
    }

    speak() {
        return "You are talking with me, " + this.#name;
    }
}

function titleScreen() {
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
                                    <div class="pt-6">
                                        <div class="bg-gray-200 border-2 border-b-black border-r-black border-t-gray-300 border-l-gray-300">
                                            <div class="border-[3px] border-b-gray-400 border-r-gray-400 border-t-white border-l-white flex flex-col">
                                                <input type="text" id="username" class="flex-1 py-1 pl-4 bg-gray-200
                                                focus:outline-none focus:ring-2 focus:ring-gray-800"
                                                placeholder="Please enter your name"/>
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

function linkedRoomDialog() {
    roomOptions = ``;
    const currentRoom = state["currentRoom"];
    const linked = currentRoom.linkedRooms;

    if (linked['north']) {
        roomOptions += `North: ${linked['north'].name}<br><br>`
    }
    if (linked['east']) {
        roomOptions += `East: ${linked['east'].name}<br><br>`
    }
    if (linked['south']) {
        roomOptions += `South: ${linked['south'].name}<br><br>`
    }
    if (linked['west']) {
        roomOptions += `West: ${linked['west'].name}<br><br>`
    }

    console.log(roomOptions)

}

function startGame() {
    const site = document.getElementById("main");
    site.innerHTML = titleScreen();

    // Character initialisation
    const Mark = new Character("Mark", "Welcome to the Mappin Building! I would like to assist you", "Leave");

    // Room initialisation
    const Mappin = new Room("The Mappin Building", "This can't be the right place, there is no laboratory", {}, Mark, null, "/images/mappin.png");
    const Heartspace = new Room("The Heartspace", "No seats left, it is packed!", {}, null, null, "/images/heartspace.png");
    const BroadLane = new Room("Broad Lane Court", "Just another student accom", {}, null, null, "/images/broad_lane.png");
    const Diamond = new Room("The Diamond", "The enigneering building sounds close", {}, null, null, "/images/diamond.png");
    const Regent = new Room("Regent Court", "This is my accomodation", {}, null, null, "/images/regent.png");
    const WestCourt = new Room("West Court", "Not sure where to go from here", {}, null, null, "/images/west_court.png");
    const StGeorges = new Room("St George's", "I cannot believe this is a lecture theatre", {}, null, null, "/images/st_georges.png");
    const GeorgePorter = new Room("The George Porter Building", "This is quite far away from The Diamond", {}, null, null, "/images/george_porter.png");

    // Linking rooms together
    Diamond.linkedRooms = {"east": StGeorges};
    StGeorges.linkedRooms = {"east": Mappin, "west": Diamond};
    Mappin.linkedRooms = {"north": BroadLane, "east": Heartspace, "south": Regent, "west": StGeorges};
    Heartspace.linkedRooms = {"north": GeorgePorter, "south": WestCourt, "west": Mappin};
    BroadLane.linkedRooms = {"east": GeorgePorter, "south": Mappin};
    Regent.linkedRooms = {"north": Mappin, "east": WestCourt};
    GeorgePorter.linkedRooms = {"south": Heartspace, "west": BroadLane}
    WestCourt.linkedRooms = {"north": Heartspace, "west": Regent}

    

    Mappin.printCharacter();
    console.log(Heartspace.dialog);
    console.log(Mappin.linkedRooms);
    console.log(StGeorges.linkedRooms);
    console.log("here")
    console.log(StGeorges.linkedRooms['east'])
    console.log("he")


    state["currentRoom"] = Mappin
    linkedRoomDialog()
}

window.onload = startGame;
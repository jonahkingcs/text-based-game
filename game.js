class Room {
    #name;
    #dialog;
    #linkedRooms;
    #character;
    #items;

    constructor(name, dialog, linkedRooms, character, items) {
        this.#name = name;
        this.#dialog = dialog;
        this.#linkedRooms = linkedRooms;
        this.#character = character;
        this.#items = items;
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

    set name(name) {
        this.#name = name;
    }

    set dialog(dialog) {
        this.#dialog = dialog;
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



function startGame() {
    main.innerHTML = titleScreen();

    const Mark = new Character("Mark", "Hello", "Leave");

    console.log(Mark.speak());

    Mark.name = "Helen";

    console.log(Mark.speak());
}

window.onload = startGame;
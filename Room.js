import { tagTwo } from "./htmlUtils.js";

class Room
{
    #getHTML;

    constructor(north, south, west, east)
    {
        this.north = north;
        this.south = south;
        this.west = west;
        this.east = east;
        this.#getHTML = () => {
            const HTML = tagTwo("div", { class: "room" }, [
                tagTwo("div", { class: `north${this.#setActive(north)}` }),
                tagTwo("div", { class: "horizontal" }, [
                    tagTwo("div", { class: `west${this.#setActive(west)}` }),
                    tagTwo("div", { class: "floor" }),
                    tagTwo("div", { class: `east${this.#setActive(east)}` })
                ]),
                tagTwo("div", { class: `south${this.#setActive(south)}` })
            ]);
            this.#getHTML = () => HTML;
            return HTML;
        };
    }

    get html()
    {
        return this.#getHTML();
    }

    #setActive(dir)
    {
        return dir ? " active" : "";
    }
}

export default Room;
import { FIELD } from "./main.js";

class DirectionGuide
{
    #coords;

    constructor(coords, getDirection)
    {
        this.#coords = coords;
        this.hasConnection = (() => {
            const ROOM = FIELD.get(coords);
            return ROOM !== undefined ? getDirection(ROOM) : undefined;
        })();
    }

    get coords()
    {
        return this.#coords;
    }
}

export default DirectionGuide;
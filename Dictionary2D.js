class Dictionary2D
{
    #elements;

    constructor()
    {
        this.#elements = {};
    }

    add(x, y, element)
    {
        this.#elements[this.#coordsToString(x, y)] = element;
    }

    get([x, y])
    {
        return this.#elements[this.#coordsToString(x, y)];
    }

    #coordsToString(x, y)
    {
        return x + "," + y;
    }
}

export default Dictionary2D;
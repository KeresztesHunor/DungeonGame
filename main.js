import Dictionary2D from "./Dictionary2D.js";
import DirectionGuide from "./DirectionGuide.js";
import Room from "./Room.js";
import { tagTwo } from "./htmlUtils.js";

export const FIELD = new Dictionary2D();

const BODY_ELEMENT = $("body");

const COORDS_TO_GENERATE_AT = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0]
];

let numRoomsToGenerate = 16;

let currentRoomCoords = [0, 0];

$(() => {
    numRoomsToGenerate -= COORDS_TO_GENERATE_AT.length + 1;
    FIELD.add(0, 0, new Room(true, true, true, true));
    generateRooms(COORDS_TO_GENERATE_AT.shift());
    switchRooms();
});

function generateRooms([x, y])
{
    const DIRECTION_GUIDES = {
        north: new DirectionGuide([x, y - 1], otherRoom => otherRoom.south),
        south: new DirectionGuide([x, y + 1], otherRoom => otherRoom.north),
        west: new DirectionGuide([x - 1, y], otherRoom => otherRoom.east),
        east: new DirectionGuide([x + 1, y], otherRoom => otherRoom.west)
    };
    const POTENTIAL_ROOMS = [];
    for (const KEY in DIRECTION_GUIDES)
    {
        const DIRECTION_GUIDE = DIRECTION_GUIDES[KEY];
        if (DIRECTION_GUIDE.hasConnection === undefined)
        {
            const coordsMatch = (coords, index) => coords[index] === DIRECTION_GUIDE.coords[index];
            if (COORDS_TO_GENERATE_AT.some(coords => coordsMatch(coords, 0) && coordsMatch(coords, 1)))
            {
                DIRECTION_GUIDE.hasConnection = Math.random() < 0.5;
            }
            else
            {
                DIRECTION_GUIDE.hasConnection = false;
                POTENTIAL_ROOMS.push(DIRECTION_GUIDE);
            }
        }
    }
    const addPotentialRoomToBeGenerated = index => {
        const POTENTIAL_ROOM = POTENTIAL_ROOMS[index];
        POTENTIAL_ROOM.hasConnection = true;
        COORDS_TO_GENERATE_AT.push(POTENTIAL_ROOM.coords);
        numRoomsToGenerate--;
    };
    if (POTENTIAL_ROOMS.length > 0)
    {
        let hasGeneratedNewPath = false;
        for (let i = 0; i < POTENTIAL_ROOMS.length - 1; i++)
        {
            if (numRoomsToGenerate > 0 && Math.random() < 0.5)
            {
                addPotentialRoomToBeGenerated(i);
                hasGeneratedNewPath = true;
            }
        }
        if (numRoomsToGenerate > 0 && (!hasGeneratedNewPath || Math.random() < 0.5))
        {
            addPotentialRoomToBeGenerated(POTENTIAL_ROOMS.length - 1);
        }
    }
    FIELD.add(x, y, new Room(
        DIRECTION_GUIDES.north.hasConnection,
        DIRECTION_GUIDES.south.hasConnection,
        DIRECTION_GUIDES.west.hasConnection,
        DIRECTION_GUIDES.east.hasConnection
    ));
    if (COORDS_TO_GENERATE_AT.length > 0)
    {
        generateRooms(COORDS_TO_GENERATE_AT.shift());
    }
}

function switchRooms()
{
    BODY_ELEMENT.html(FIELD.get(currentRoomCoords).html);
    const DOORWAYS = $(`
        .room > .north[class~="active"],
        .room > .south[class~="active"],
        .room > .horizontal > .west[class~="active"],
        .room > .horizontal > .east[class~="active"]
    `);
    DOORWAYS.html(tagTwo("button", {}, ["This way"]));
    DOORWAYS.toArray().forEach(doorway => {
        const DOORWAY_BUTTON = $(doorway).children("button");
        switch (doorway.classList[0])
        {
            case "north":
                DOORWAY_BUTTON.on("click", () => {
                    setNewCurrentRoomCoords([currentRoomCoords[0], currentRoomCoords[1] - 1]);
                });
                break;
            case "south":
                DOORWAY_BUTTON.on("click", () => {
                    setNewCurrentRoomCoords([currentRoomCoords[0], currentRoomCoords[1] + 1]);
                });
                break;
            case "west":
                DOORWAY_BUTTON.on("click", () => {
                    setNewCurrentRoomCoords([currentRoomCoords[0] - 1, currentRoomCoords[1]]);
                });
                break;
            case "east":
                DOORWAY_BUTTON.on("click", () => {
                    setNewCurrentRoomCoords([currentRoomCoords[0] + 1, currentRoomCoords[1]]);
                });
                break;
        }
    });
}

function setNewCurrentRoomCoords(coords)
{
    currentRoomCoords = coords;
    switchRooms();
}
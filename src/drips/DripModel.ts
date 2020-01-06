export default class DripModel {
    constructor(
        id: number,
        xPos: number,
        yPos: number
    ) {
        this.id = id;
        this.xPos = xPos;
        this.yPos = yPos;
    }

    id: number;
    xPos: number;
    yPos: number;
}
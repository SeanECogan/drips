export default class DripModel {
    constructor(
        id: number,
        xPos: number,
        yPos: number
    ) {
        this.id = id;
        this.createdAt = new Date();
        this.xPos = xPos;
        this.yPos = yPos;
    }

    id: number;
    createdAt: Date;
    xPos: number;
    yPos: number;
}
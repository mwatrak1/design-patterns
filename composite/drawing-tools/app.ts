interface Graphic {
    draw();
    move(x: number, y: number);
    filColor(color: string);
    isLocated(x: number, y: number);
}

class Circle implements Graphic {
    draw() {

    }

    move(x: number, y: number) {

    }

    filColor(color: string) {

    }

    isLocated(x: number, y: number) {

    }
}

class Triangle implements Graphic {
    draw() {

    }

    move(x: number, y: number) {

    }

    filColor(color: string) {

    }

    isLocated(x: number, y: number) {

    }
}

class Group implements Graphic {
    private shapes: Graphic[] = [];

    add(shape: Graphic) {

    }

    draw() {

    }

    filColor(color: string) {

    }

    isLocated(x: number, y: number) {

    }

    move(x: number, y: number) {

    }

}

class ShapeManager {
    private shapes: Graphic[] = [];
    private groups: Group[] = [];

    addGraphic(shape: Graphic) {
        this.shapes.push(shape);
    }

    draw(shape: Graphic) {
        shape.draw();
    }

    getSelectedGraphic(x: number, y: number) {
        for (const shape of this.shapes) {
            if (shape.isLocated(x, y)) {
                return shape;
            }
        }
        return null;
    }
}

class Controller {
    shapeManager: ShapeManager;

    handleUserInput() {}

    drawShape() {

    }

    selectGraphic() {

    }

    fillGraphic() {

    }

    groupGraphics() {

    }
}
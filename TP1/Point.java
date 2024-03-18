package TP1;

public class Point extends Coordinate {
    public Point() {
        super();
    };

    public Point(double x, double y) {
        super(x, y);
    }

    public Point(Point source) {
        super(source);
    }

    public void move(Vector vector) {
        this.set(vector.getX(), vector.getY());
    }
}

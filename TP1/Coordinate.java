package TP1;

public class Coordinate {
    private double x;
    private double y;

    public Coordinate() {};

    public Coordinate(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public Coordinate(Coordinate source) {
        source = this;
    }

    @Override
    public String toString() {
        return String.format("(%s;%s)", x,y);
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public void set(double x, double y) {
        this.x = x;
        this.y = y;
    }
}

package models;

public record CardType() {
    public static final String BLUE = "blue";
    public static final String BLACK = "black";
    public static final String NEUTRAL = "neutral";

    public static String randomType() {
        int random = (int) (Math.random() * 3);
        switch (random) {
            case 0:
                return BLUE;
            case 1:
                return BLACK;
            case 2:
                return NEUTRAL;
            default:
                return null;
        }
    }
}

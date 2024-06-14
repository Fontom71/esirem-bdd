package models;

public record PlayerRole() {
    // Maitre des mots, maitre de l'intuition
    public static final String WORDS = "Maitre des mots";
    public static final String INSIGHTS = "Maitre de l'intuition";

    public static String getRole(String role) {
        if (role.equals(WORDS)) {
            return WORDS;
        } else if (role.equals(INSIGHTS)) {
            return INSIGHTS;
        } else {
            return null;
        }
    }
}

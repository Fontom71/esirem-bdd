package models;

public record Clue(String gameId, int round, String clueText, int clueNum, int found, boolean isGuess) {}

package models;

public record Card(String gameId, int row, int col, int wordId, String typeCard, boolean isRevealed) {}
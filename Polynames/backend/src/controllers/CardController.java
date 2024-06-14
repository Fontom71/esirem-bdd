package controllers;

import java.util.ArrayList;

import dao.CardDao;
import dao.PlayerDAO;
import dao.WordDao;
import models.Card;
import models.Player;
import models.PlayerRole;
import webserver.WebServerContext;

public class CardController {
    // Récupère toutes les cartes d'un jeu pour un joueur spécifique
    public static void getCards(WebServerContext context) {
        String gameId = context.getRequest().getParam("gameId");
        String playerId = context.getRequest().getParam("playerId");
        try {
            ArrayList<Card> cards = CardDao.getInstance().get(gameId);

            Player player = PlayerDAO.getInstance().getId(playerId);

            // Renvoie les cartes en fonction du rôle du joueur
            StringBuilder cardsJson = new StringBuilder("[");
            for (Card c : cards) {
                String word = WordDao.getInstance().get(c.wordId()).text();
                if (player.playerRole().equals(PlayerRole.WORDS)) {
                    cardsJson.append("{\"gameId\": \"").append(c.gameId()).append("\", \"row\": \"").append(c.row())
                            .append("\", \"col\": \"").append(c.col()).append("\", \"word\": \"").append(word)
                            .append("\", \"typeCard\": \"").append(c.typeCard()).append("\", \"isRevealed\": \"")
                            .append(c.isRevealed()).append("\"},");
                } else {
                    if (c.isRevealed()) {
                        cardsJson.append("{\"gameId\": \"").append(c.gameId()).append("\", \"row\": \"").append(c.row())
                                .append("\", \"col\": \"").append(c.col()).append("\", \"word\": \"").append(word)
                                .append("\", \"typeCard\": \"").append(c.typeCard()).append("\", \"isRevealed\": \"")
                                .append(c.isRevealed()).append("\"},");
                    } else {
                        cardsJson.append("{\"gameId\": \"").append(c.gameId()).append("\", \"row\": \"").append(c.row())
                                .append("\", \"col\": \"").append(c.col()).append("\", \"word\": \"").append(word)
                                .append("\", \"typeCard\": \"").append("").append("\", \"isRevealed\": \"")
                                .append(c.isRevealed()).append("\"},");
                    }
                }
            }
            cardsJson.deleteCharAt(cardsJson.length() - 1);
            cardsJson.append("]");

            context.getResponse().json("{\"gameId\": \"" + gameId + "\", \"cards\": " + cardsJson.toString() + "}");
            return;

        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        }
    }

    // Récupère une carte spécifique d'un jeu
    public static void getCard(WebServerContext context) {
        String gameId = context.getRequest().getParam("gameId");
        int row = Integer.parseInt(context.getRequest().getParam("row"));
        int col = Integer.parseInt(context.getRequest().getParam("col"));
        try {
            Card card = CardDao.getInstance().get(gameId, row, col);

            // Renvoie la carte en JSON
            context.getResponse()
                    .json("{\"gameId\": \"" + card.gameId() + "\", \"row\": \"" + card.row() + "\", \"col\": \""
                            + card.col() + "\", \"wordId\": \"" + card.wordId() + "\", \"typeCard\": \""
                            + card.typeCard()
                            + "\", \"isRevealed\": \"" + card.isRevealed() + "\"}");
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        }
    }

    // Met à jour l'état d'une carte (révélée ou non)
    public static void updateCard(WebServerContext context) {
        String gameId = context.getRequest().getParam("gameId");
        int row = Integer.parseInt(context.getRequest().getParam("row"));
        int col = Integer.parseInt(context.getRequest().getParam("col"));
        boolean isRevealed = Boolean.parseBoolean(context.getRequest().getParam("isRevealed"));
        try {
            CardDao.getInstance().update(gameId, row, col, isRevealed);

            context.getResponse().json("{\"gameId\": \"" + gameId + "\", \"row\": \"" + row + "\", \"col\": \"" + col
                    + "\", \"isRevealed\": \"" + isRevealed + "\"}");
            context.getSSE().emit("cards-" + gameId,
                    "{\"type\": \"card-updated\", \"row\": \"" + row + "\", \"col\": \"" + col
                            + "\", \"isRevealed\": \""
                            + isRevealed + "\"}");
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        }
    }
}

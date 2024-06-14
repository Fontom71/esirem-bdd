package controllers;

import java.util.ArrayList;

import dao.PlayerDAO;
import models.Player;
import webserver.WebServerContext;

public class PlayerController {
    // Récupère tous les joueurs d'un jeu
    public static void getPlayers(WebServerContext context) {
        String gameId = context.getRequest().getParam("gameId");
        try {
            ArrayList<Player> players = PlayerDAO.getInstance().getCode(gameId);

            // Renvoie tous les joueurs en JSON
            StringBuilder playersJson = new StringBuilder("[");
            for (Player p : players) {
                playersJson.append("{\"playerId\": \"").append(p.playerId()).append("\", \"username\": \"")
                        .append(p.username()).append("\", \"role\": \"")
                        .append(p.playerRole()).append("\", \"username\": \"").append(p.username()).append("\"},");
            }
            playersJson.deleteCharAt(playersJson.length() - 1);
            playersJson.append("]");
            context.getResponse().json("{\"gameId\": \"" + gameId + "\", \"players\": " + playersJson.toString() + "}");
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        }
    }

    // Récupère les informations d'un joueur spécifique
    public static void getPlayer(WebServerContext context) {
        String playerId = context.getRequest().getParam("playerId");
        try {
            Player player = PlayerDAO.getInstance().getId(playerId);
            context.getResponse()
                    .json("{\"playerId\": \"" + player.playerId() + "\", \"username\": \"" + player.username()
                            + "\", \"role\": \"" + player.playerRole() + "\", \"isHost\": " + player.isHost() + "}");
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        }
    }
}

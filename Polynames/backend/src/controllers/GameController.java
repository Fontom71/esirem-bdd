package controllers;

import java.util.ArrayList;
import java.util.UUID;

import dao.CardDao;
import dao.GameDao;
import dao.PlayerDAO;
import dao.WordDao;
import models.Game;
import models.Player;
import models.PlayerRequest;
import models.PlayerRole;
import models.RoleRequest;
import models.Word;
import webserver.WebServerContext;

public class GameController {
    public static void createGame(WebServerContext context) {
        String gameId = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String playerId = UUID.randomUUID().toString().substring(0, 8);
        PlayerRequest request = context.getRequest().extractBody(PlayerRequest.class);
        if (request == null) {
            context.getResponse().serverError("Invalid request");
            return;
        }
        String username = request.username();

        try {
            GameDao.getInstance().create(gameId, playerId);
            PlayerDAO.getInstance().create(playerId, username, gameId, true);

            ArrayList<Player> players = PlayerDAO.getInstance().getCode(gameId);
            Player host = players.stream().filter(p -> p.isHost()).findFirst().get();
            if (host == null) {
                context.getResponse().notFound("Host not found");
                return;
            }

            ArrayList<Word> words = WordDao.getInstance().generate(25);

            CardDao.getInstance().createList(gameId, words);

            context.getResponse()
                    .json("{\"gameId\": \"" + gameId + "\", \"playerId\": \"" + playerId + "\", \"isHost\": true}");
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        }
    }

    public static void joinGame(WebServerContext context) {
        String gameId = context.getRequest().getParam("gameId");
        String playerId = UUID.randomUUID().toString().substring(0, 8);
        PlayerRequest request = context.getRequest().extractBody(PlayerRequest.class);
        if (request == null) {
            context.getResponse().serverError("Invalid request");
            return;
        }
        String username = request.username();

        try {
            Game game = GameDao.getInstance().get(gameId);
            if (game == null) {
                context.getResponse().notFound("Game not found");
                return;
            }
            ArrayList<Player> players = PlayerDAO.getInstance().getCode(gameId);

            if (players.size() >= 2) {
                context.getResponse().notFound("Game is full");
                return;
            }

            PlayerDAO.getInstance().create(playerId, username, gameId, false);

            // Attribue le role inverse du host
            Player host = players.stream().filter(p -> p.isHost()).findFirst().get();
            String role = host.playerRole().equals(PlayerRole.WORDS) ? PlayerRole.INSIGHTS : PlayerRole.WORDS;
            PlayerDAO.getInstance().setRole(playerId, role);

            // Renvoie tout les joueurs en JSON
            StringBuilder playersJson = new StringBuilder("[");
            for (Player p : players) {
                playersJson.append("{\"playerId\": \"").append(p.playerId()).append("\", \"role\": \"")
                        .append(p.playerRole()).append("\"},");
            }
            playersJson.deleteCharAt(playersJson.length() - 1);
            playersJson.append("]");
            context.getResponse()
                    .json("{\"gameId\": \"" + gameId + "\", \"playerId\": \"" + playerId + "\", \"role\": \"" + role
                            + "\", \"players\": " + playersJson.toString() + "}");
            context.getSSE().emit("join-" + gameId,
                    "{\"type\": \"player-joined\", \"playerId\": \"" + playerId + "\"}");
            // Vérifier si le nombre de joueurs est suffisant pour démarrer le jeu
            ArrayList<Player> newPlayers = PlayerDAO.getInstance().getCode(gameId);
            if (newPlayers.size() >= 2) { // Assurez-vous de définir la constante ou la configuration pour le nombre
                                          // minimum de joueurs
                context.getSSE().emit("ready-" + gameId,
                        "{\"type\": \"ready-to-start\", \"gameId\": \"" + gameId + "\"}");
            }
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        }
    }

    public static void chooseRole(WebServerContext context) {
        String gameId = context.getRequest().getParam("gameId");
        RoleRequest request = context.getRequest().extractBody(RoleRequest.class);
        if (request == null) {
            context.getResponse().serverError("Invalid request");
            return;
        }

        try {
            ArrayList<Player> players = PlayerDAO.getInstance().getCode(gameId);
            Player sender = players.stream().filter(p -> p.playerId().equals(request.playerId())).findFirst()
                    .orElse(null);
            Player receiver = players.stream().filter(p -> !p.playerId().equals(request.playerId())).findFirst()
                    .orElse(null);

            if (sender == null) {
                System.out.println("Player not found");
                context.getResponse().notFound("Player not found");
                return;
            } else if (!sender.isHost()) {
                System.out.println("Only host can choose role");
                context.getResponse().serverError("Only host can choose role");
                return;
            }

            String role = PlayerRole.getRole(request.role());
            if (role == null) {
                context.getResponse().serverError("Invalid role");
                return;
            }

            PlayerDAO.getInstance().setRole(sender.playerId(), role);

            if (receiver != null) {
                PlayerDAO.getInstance().setRole(receiver.playerId(),
                        role.equals(PlayerRole.WORDS) ? PlayerRole.INSIGHTS : PlayerRole.WORDS);
            }

            context.getResponse().json("{\"gameId\": \"" + gameId + "\", \"playerId\": \"" + sender.playerId()
                    + "\", \"role\": \"" + role + "\"}");
            context.getSSE().emit("role-" + gameId,
                    "{\"type\": \"role-chosen\", \"playerId\": \"" + sender.playerId() + "\", \"role\": \"" + role
                            + "\"}");
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        }
    }

    public static void startGame(WebServerContext context) {
        String gameId = context.getRequest().getParam("gameId");
        try {
            ArrayList<Player> players = PlayerDAO.getInstance().getCode(gameId);
            Player host = players.stream().filter(p -> p.isHost()).findFirst().get();
            if (host == null) {
                context.getResponse().notFound("Host not found");
                return;
            }

            GameDao.getInstance().startGame(gameId);

            context.getResponse().json("{\"gameId\": \"" + gameId + "\", \"isStarted\": true}");
            context.getSSE().emit("start-" + gameId, "{\"type\": \"game-started\"}");
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        }
    }

    public static void getGame(WebServerContext context) {
        String gameId = context.getRequest().getParam("gameId");
        try {
            Game game = GameDao.getInstance().get(gameId);
            context.getResponse().json("{\"gameId\": \"" + gameId + "\", \"isStarted\": " + game.isStarted()
                    + ", \"playing\": \"" + game.playing() + "\"}");
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        }
    }

    public static void getScore(WebServerContext context) {
        String gameId = context.getRequest().getParam("gameId");
        try {
            int score = GameDao.getInstance().getScore(gameId);
            context.getResponse().json("{\"gameId\": \"" + gameId + "\", \"value\": " + score + "}");
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        }
    }
}

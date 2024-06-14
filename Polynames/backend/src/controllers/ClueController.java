package controllers;

import java.util.ArrayList;

import dao.CardDao;
import dao.ClueDao;
import dao.GameDao;
import dao.PlayerDAO;
import models.Card;
import models.CardType;
import models.Clue;
import models.ClueRequest;
import models.GuessRequest;
import models.Player;
import models.PlayerRole;
import webserver.WebServerContext;

public class ClueController {
    public static void create(WebServerContext context) {
        String playerId = context.getRequest().getParam("playerId");
        String gameId = context.getRequest().getParam("gameId");
        ClueRequest clueRequest = context.getRequest().extractBody(ClueRequest.class);

        try {
            Player player = PlayerDAO.getInstance().getId(playerId);

            String role = player.playerRole();

            if (role.equals(PlayerRole.INSIGHTS)) {
                context.getResponse().notFound("You are not allowed to create a clue");
                return;
            }

            if (clueRequest.clueText().length() < 1 || clueRequest.clueText().length() > 25) {
                context.getResponse().notFound("Clue text must be between 1 and 25 characters");
                return;
            }

            Clue lastClue = ClueDao.getInstance().getLastClue(gameId);

            ArrayList<Player> players = PlayerDAO.getInstance().getCode(gameId);
            Player nextPlayer = players.stream().filter(p -> p.playerRole().equals(PlayerRole.INSIGHTS)).findFirst()
                    .get();
            GameDao.getInstance().setPlayer(gameId, nextPlayer.playerId());

            ClueDao.getInstance().create(gameId, lastClue != null ? lastClue.round() + 1 : 0, clueRequest.clueText(),
                    clueRequest.clueNumber());

            context.getResponse()
                    .json("{\"gameId\": \"" + gameId + "\", \"round\": " + (lastClue != null ? lastClue.round() + 1 : 0)
                            + ", \"clueText\": \"" + clueRequest.clueText() + "\", \"clueNum\": "
                            + clueRequest.clueNumber()
                            + "}");
            context.getSSE().emit("clue-" + gameId,
                    "{\"type\": \"clue-created\", \"round\": " + (lastClue != null ? lastClue.round() + 1 : 0)
                            + ", \"clueNum\": " + clueRequest.clueNumber()
                            + ", \"clueText\": \"" + clueRequest.clueText() + "\"}");
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        }
    }

    public static void getClue(WebServerContext context) {
        String gameId = context.getRequest().getParam("gameId");
        try {
            Clue clue = ClueDao.getInstance().getLastClue(gameId);
            context.getResponse()
                    .json("{\"gameId\": \"" + gameId + "\", \"round\": " + clue.round() + ", \"clueText\": \""
                            + clue.clueText() + "\", \"clueNum\": " + clue.clueNum() + "}");
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        }
    }

    public static void guess(WebServerContext context) {
        String playerId = context.getRequest().getParam("playerId");
        String gameId = context.getRequest().getParam("gameId");
        GuessRequest guessRequest = context.getRequest().extractBody(GuessRequest.class);
        try {
            Player player = PlayerDAO.getInstance().getId(playerId);

            String role = player.playerRole();

            if (role.equals(PlayerRole.WORDS)) {
                context.getResponse().notFound("You are not allowed to make a guess");
                return;
            }

            Clue lastClue = ClueDao.getInstance().getLastClue(gameId);

            ArrayList<Player> players = PlayerDAO.getInstance().getCode(gameId);
            Player nextPlayer = players.stream().filter(p -> p.playerRole().equals(PlayerRole.WORDS)).findFirst()
                    .get();
            int score = GameDao.getInstance().getScore(gameId);

            Card card = CardDao.getInstance().get(gameId, guessRequest.row(), guessRequest.col());

            if (lastClue.isGuess() || lastClue.clueNum() + 1 < lastClue.found()) {
                GameDao.getInstance().setPlayer(gameId, nextPlayer.playerId());
                context.getSSE().emit("guess-" + gameId,
                        "{\"type\": \"guess-made\", \"gameId\": \"" + gameId + "\", \"round\": " + lastClue.round()
                                + ", \"row\": " + guessRequest.row() + ", \"col\": " + guessRequest.col()
                                + ", \"found\": " + lastClue.found() + "}");
                return;
            }

            if (guessRequest.row() >= 5 || guessRequest.col() >= 5 || guessRequest.row() < 0
                    || guessRequest.col() < 0) {
                context.getResponse().notFound("Invalid row or column");
                return;
            }

            if (card.isRevealed()) {
                context.getResponse().notFound("Card already revealed");
                return;
            }

            int found = lastClue.found();
            boolean isGuess = lastClue.isGuess();
            boolean hasLost = false;

            if (card.typeCard().equals(CardType.BLUE)) {
                found++;
                isGuess = lastClue.clueNum() + 1 == found;
                int newScore = (int) Math.pow(score, found);
                GameDao.getInstance().updateScore(gameId, newScore);
            } else if (card.typeCard().equals(CardType.BLACK)) {
                hasLost = true;
                GameDao.getInstance().updateScore(gameId, 0);
            } else if (card.typeCard().equals(CardType.NEUTRAL)) {
                isGuess = true;
                GameDao.getInstance().setPlayer(gameId, nextPlayer.playerId());
            }

            CardDao.getInstance().update(gameId, guessRequest.row(), guessRequest.col(), true);
            ClueDao.getInstance().updateFound(gameId, lastClue.round(), found, isGuess);

            String guessResponse = "{\"type\": \"guess-made\", \"gameId\": \"" + gameId + "\", \"round\": "
                    + lastClue.round() + ", \"row\": "
                    + guessRequest.row() + ", \"col\": " + guessRequest.col() + ", \"found\": " + found
                    + ", \"hasLost\": "
                    + hasLost + ", \"isGuess\": " + isGuess + "}";
            context.getResponse().json(guessResponse);
            context.getSSE().emit("guess-" + gameId, guessResponse);
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        }
    }
}

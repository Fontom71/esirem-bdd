import controllers.ClueController;
import controllers.GameController;
import controllers.PlayerController;
import controllers.CardController;
import webserver.WebServer;
import webserver.WebServerContext;

public class App {
    private static final int PORT = 8080;
    public static void main(String[] args) throws Exception {
        try {
            WebServer webServer = new WebServer();
            webServer.listen(PORT);
            System.out.println("Server listening on port " + PORT);

            // Game routes
            webServer.getRouter().post("/create-game", GameController::createGame);
            webServer.getRouter().post("/join-game/:gameId", GameController::joinGame);
            webServer.getRouter().post("/choose-role/:gameId", GameController::chooseRole);
            webServer.getRouter().post("/start-game/:gameId", GameController::startGame);
            webServer.getRouter().get("/get-game/:gameId", GameController::getGame);
            webServer.getRouter().get("/get-score/:gameId", GameController::getScore);

            // Player routes
            webServer.getRouter().get("/get-players/:gameId", PlayerController::getPlayers);
            webServer.getRouter().get("/get-player/:playerId", PlayerController::getPlayer);

            // Card routes
            webServer.getRouter().get("/get-cards/:gameId/:playerId", CardController::getCards);

            // Clue routes
            webServer.getRouter().post("/create-clue/:gameId/:playerId", ClueController::create);
            webServer.getRouter().get("/get-clue/:gameId", ClueController::getClue);
            webServer.getRouter().post("/guess/:gameId/:playerId", ClueController::guess);

            // API status
            webServer.getRouter().get("/status", (WebServerContext context) -> {
                context.getResponse().send(200, "Hello World");
            });

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}

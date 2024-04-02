import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class WebServer {
    private final int port;

    public WebServer(int port) {
        this.port = port;
    }

    public void run() {
        ServerSocket serverSocket = null;

        try {
            serverSocket = new ServerSocket(port);
            System.out.println("Le serveur écoute sur le port " + port);

            while (true) {
                Socket clientSocket = serverSocket.accept();
                HttpContext context = new HttpContext(clientSocket);
                RequestProcessor processor = new RequestProcessor(context);

                // Créer un nouveau thread pour chaque connexion
                Thread thread = new Thread(processor);
                thread.start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (serverSocket != null) {
                try {
                    serverSocket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

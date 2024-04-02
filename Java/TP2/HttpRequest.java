import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;

public class HttpRequest {
    private String method;
    private String url;

    public HttpRequest(Socket socket) {
        try {
            readClientRequest(socket);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void readClientRequest(Socket socket) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));

        String requestLine = reader.readLine();
        if (requestLine != null) {
            String[] parts = requestLine.split("\\s+");
            if (parts.length >= 2) {
                method = parts[0];
                url = parts[1];
            }
        }
    }

    public String getMethod() {
        return method;
    }

    public String getUrl() {
        return url;
    }
}

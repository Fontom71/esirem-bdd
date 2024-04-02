import java.io.IOException;
import java.net.Socket;

public class HttpContext {
    private final Socket socket;
    private final HttpRequest request;
    private final HttpResponse response;

    public HttpContext(Socket socket) {
        this.socket = socket;
        this.request = new HttpRequest(socket);
        this.response = new HttpResponse(socket);
    }

    public HttpRequest getRequest() {
        return request;
    }

    public HttpResponse getResponse() {
        return response;
    }

    public void close() {
        try {
            socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

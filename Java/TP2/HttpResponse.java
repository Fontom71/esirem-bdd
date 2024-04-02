import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.Socket;

public class HttpResponse {
    private final BufferedWriter writer;
    private final OutputStream outputStream;

    public HttpResponse(Socket socket) {
        try {
            writer = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
            this.outputStream = socket.getOutputStream();
        } catch (IOException e) {
            throw new RuntimeException("Erreur à l'initialisation de HttpResponse", e);
        }
    }

    public void ok(String message) {
        sendResponse("HTTP/1.0 200 OK", "text/plain", message);
    }

    public void notFound(String message) {
        sendResponse("HTTP/1.0 404 Not Found", "text/plain", message);
    }

    public void sendContent(String contentType, String content) {
        sendResponse("HTTP/1.0 200 OK", contentType, content);
    }

    public void sendFile(String contentType, String fileName) throws IOException {
        File file = new File("public/" + fileName);
        if (!file.exists() || !file.isFile()) {
            notFound("La page n'a pas été trouvée");
            return;
        }

        FileInputStream input = null;
        sendResponse("HTTP/1.0 200 OK", contentType, "");
        
        try {
            input = new FileInputStream(file);
            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = input.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            outputStream.flush();
        } finally {
            if (input != null) {
                input.close();
            }
        }
    }

    private void sendResponse(String statusLine, String contentType, String content) {
        try {
            writer.write(statusLine);
            writer.write("\r\n");
            writer.write("Content-Type: " + contentType);
            writer.write("\r\n");
            writer.write("\r\n");
            writer.write(content);
            writer.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

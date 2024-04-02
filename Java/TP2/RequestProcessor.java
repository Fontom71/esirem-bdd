import java.io.IOException;

public class RequestProcessor implements Runnable {
    private final HttpContext context;

    public RequestProcessor(HttpContext context) {
        this.context = context;
    }

    @Override
    public void run() {
        try {
            process();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            context.close();
        }
    }

    private void process() throws IOException {
        HttpRequest request = context.getRequest();
        HttpResponse response = context.getResponse();

        String url = request.getUrl();
        String method = request.getMethod();

        System.out.println("Méthode de la requête: " + method);
        System.out.println("URL de la requête: " + url);

        if ("/".equals(url)) {
            response.sendFile("text/html", "index.html");
        } else {
            String filePath = "public" + url;
            String contentType = getContentType(filePath);
            response.sendFile(contentType, url);
        }
    }

    private String getContentType(String filePath) {
        if (filePath.endsWith(".html")) {
            return "text/html";
        } else if (filePath.endsWith(".css")) {
            return "text/css";
        } else if (filePath.endsWith(".png")) {
            return "image/png";
        } else if (filePath.endsWith(".svg")) {
            return "image/svg+xml";
        } else {
            return "text/plain";
        }
    }
}

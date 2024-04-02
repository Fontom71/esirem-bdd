public class WebServerApplication {
    public static void main(String[] args) {
        WebServer webServer = new WebServer(380);
        webServer.run();
    }
}

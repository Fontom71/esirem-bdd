public class PolySportsDatabase extends MYSQLDatabase {
    private static PolySportsDatabase instance = null;

    private PolySportsDatabase(String host, int port, String databaseName, String user, String password) {
        super(host, port, databaseName, user, password);
    }

    public static PolySportsDatabase getInstance(String host, int port, String databaseName, String user,
            String password) {
        if (instance == null) {
            instance = new PolySportsDatabase(host, port, databaseName, user, password);
        }
        return instance;
    }
}

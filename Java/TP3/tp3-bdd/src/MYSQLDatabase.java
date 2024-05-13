import java.sql.*;

public class MYSQLDatabase {
    private static boolean driverLoaded = false;
    private final String host;
    private final int port;
    private final String databaseName;
    private final String user;
    private final String password;
    private Connection connection;

    public MYSQLDatabase(String host, int port, String databaseName, String user, String password) {
        this.host = host;
        this.port = port;
        this.databaseName = databaseName;
        this.user = user;
        this.password = password;
        this.connection = null;
    }

    public static void loadDriver() throws ClassNotFoundException {
        if (!driverLoaded) {
            Class.forName("com.mysql.cj.jdbc.Driver");
            driverLoaded = true;
        }
    }

    public void connect() throws SQLException {
        this.connection = DriverManager.getConnection(
                "jdbc:mysql://" + host + ":" + port + "/" + databaseName + "?allowMultiQuerie=true", user,
                password);
    }

    public Statement createStatement() throws SQLException {
        if (connection == null) {
            throw new SQLException("La connexion à la base de données n'a pas été établie.");
        }
        return connection.createStatement();
    }

    public PreparedStatement prepareStatement(String query) throws SQLException {
        return connection.prepareStatement(query);
    }
}

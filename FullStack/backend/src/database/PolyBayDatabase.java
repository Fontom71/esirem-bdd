package database;

import java.sql.SQLException;

public class PolyBayDatabase extends MySQLDatabase {

    public PolyBayDatabase(String host, int port, String databaseName, String user, String password)
            throws SQLException {
        super(host, port, databaseName, user, password);
    }

}

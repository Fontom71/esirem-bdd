package dao;

import java.sql.SQLException;

import database.MySQLDatabase;
import database.PolyNamesDatabase;

public abstract class BaseDao {
    protected MySQLDatabase database;

    public BaseDao() throws SQLException {
        this.database = new PolyNamesDatabase("localhost", 3306, "polynames", "root", "");
    }
}

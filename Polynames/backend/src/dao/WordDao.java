package dao;

import java.sql.*;
import java.util.ArrayList;

import models.Word;

public class WordDao extends BaseDao {
    protected static WordDao instance;

    public WordDao() throws SQLException {
        super();
    }

    public static WordDao getInstance() throws SQLException {
        if (instance == null) {
            instance = new WordDao();
        }
        return instance;
    }

    public ArrayList<Word> generate(int nbWords) throws SQLException {
        String query = "SELECT * FROM word ORDER BY RAND() LIMIT ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setInt(1, nbWords);
        ResultSet resultSet = preparedStatement.executeQuery();
        ArrayList<Word> words = new ArrayList<>();
        while (resultSet.next()) {
            words.add(new Word(resultSet.getInt("id"), resultSet.getString("text")));
        }
        return words;
    }

    public Word get(int id) throws SQLException {
        String query = "SELECT * FROM word WHERE id = ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setInt(1, id);
        ResultSet resultSet = preparedStatement.executeQuery();
        if (resultSet.next()) {
            return new Word(resultSet.getInt("id"), resultSet.getString("text"));
        }
        return null;
    }
}

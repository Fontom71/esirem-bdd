package dao;

import java.sql.*;
import java.util.ArrayList;

import models.Clue;

public class ClueDao extends BaseDao {
    protected static ClueDao instance;

    public ClueDao() throws SQLException {
        super();
    }

    public static ClueDao getInstance() throws SQLException {
        if (instance == null) {
            instance = new ClueDao();
        }
        return instance;
    }

    public void create(String gameId, int round, String clueText, int clueNum) throws SQLException {
        String query = "INSERT INTO clue (game_id, round, clue_text, clue_num) VALUES (?, ?, ?, ?)";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setString(1, gameId);
        preparedStatement.setInt(2, round);
        preparedStatement.setString(3, clueText);
        preparedStatement.setInt(4, clueNum);
        preparedStatement.executeUpdate();
    }

    public void updateFound(String gameId, int round, int found, boolean isGuess) throws SQLException {
        String query = "UPDATE clue SET found = ?, is_guess = ? WHERE game_id = ? AND round = ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setInt(1, found);
        preparedStatement.setBoolean(2, isGuess);
        preparedStatement.setString(3, gameId);
        preparedStatement.setInt(4, round);
        preparedStatement.executeUpdate();
    }

    public ArrayList<Clue> get(String gameId) throws SQLException {
        String query = "SELECT * FROM clue WHERE game_id = ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setString(1, gameId);
        ResultSet resultSet = preparedStatement.executeQuery();
        ArrayList<Clue> clues = new ArrayList<>();
        while (resultSet.next()) {
            clues.add(new Clue(
                    resultSet.getString("game_id"),
                    resultSet.getInt("round"),
                    resultSet.getString("clue_text"),
                    resultSet.getInt("clue_num"),
                    resultSet.getInt("found"),
                    resultSet.getBoolean("is_guess")));
        }
        return clues;
    }

    public Clue getLastClue(String gameId) throws SQLException {
        String query = "SELECT * FROM clue WHERE game_id = ? ORDER BY round DESC LIMIT 1";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setString(1, gameId);
        ResultSet resultSet = preparedStatement.executeQuery();
        if (resultSet.next()) {
            return new Clue(
                    resultSet.getString("game_id"),
                    resultSet.getInt("round"),
                    resultSet.getString("clue_text"),
                    resultSet.getInt("clue_num"),
                    resultSet.getInt("found"),
                    resultSet.getBoolean("is_guess"));
        }
        return null;
    }

    public void deleteCluesGame(String gameId) throws SQLException {
        String query = "DELETE FROM clue WHERE game_id = ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setString(1, gameId);
        preparedStatement.executeUpdate();
    }
}

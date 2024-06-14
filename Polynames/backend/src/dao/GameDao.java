package dao;

import java.sql.*;

import models.Game;

public class GameDao extends BaseDao {
    protected static GameDao instance;

    public GameDao() throws SQLException {
        super();
    }

    public static GameDao getInstance() throws SQLException {
        if (instance == null) {
            instance = new GameDao();
        }
        return instance;
    }

    public void create(String code, String playerId) throws SQLException {
        String query = "INSERT INTO game (game_id, playing) VALUES (?, ?)";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setString(1, code);
        preparedStatement.setString(2, playerId);
        preparedStatement.executeUpdate();
    }

    public Game get(String code) throws SQLException {
        String query = "SELECT * FROM game WHERE game_id = ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setString(1, code);
        ResultSet resultSet = preparedStatement.executeQuery();
        if (resultSet.next()) {
            return new Game(resultSet.getString("game_id"),
                    resultSet.getBoolean("is_started"),
                    resultSet.getString("playing"),
                    resultSet.getInt("score"));
        }
        return null;
    }

    public void delete(String code) throws SQLException {
        String query = "DELETE FROM game WHERE game_id = ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setString(1, code);
        preparedStatement.executeUpdate();
    }

    public void startGame(String gameId) throws SQLException {
        String query = "UPDATE game SET is_started = true WHERE game_id = ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setString(1, gameId);
        preparedStatement.executeUpdate();
    }

    public void setPlayer(String gameId, String playerId) throws SQLException {
        String query = "UPDATE game SET playing = ? WHERE game_id = ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setString(1, playerId);
        preparedStatement.setString(2, gameId);
        preparedStatement.executeUpdate();
    }

    public void updateScore(String gameId, int score) throws SQLException {
        String query = "UPDATE game SET score = ? WHERE game_id = ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setInt(1, score);
        preparedStatement.setString(2, gameId);
        preparedStatement.executeUpdate();
    }

    public int getScore(String gameId) throws SQLException {
        String query = "SELECT score FROM game WHERE game_id = ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setString(1, gameId);
        ResultSet resultSet = preparedStatement.executeQuery();
        if (resultSet.next()) {
            return resultSet.getInt(1);
        }
        return 0;
    }
}

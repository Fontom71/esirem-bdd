package dao;

import java.sql.*;
import java.util.ArrayList;

import models.Player;

public class PlayerDAO extends BaseDao {
    protected static PlayerDAO instance;

    public PlayerDAO() throws SQLException {
        super();
    }

    public static PlayerDAO getInstance() throws SQLException {
        if (instance == null) {
            instance = new PlayerDAO();
        }
        return instance;
    }

    public Player getId(String id) throws SQLException {
        String query = "SELECT * FROM player WHERE player_id = ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setString(1, id);
        ResultSet resultSet = preparedStatement.executeQuery();
        if (resultSet.next()) {
            return new Player(
                    resultSet.getString("player_id"),
                    resultSet.getString("username"),
                    resultSet.getString("game_id"),
                    resultSet.getString("player_role"),
                    resultSet.getBoolean("is_host"));
        }
        return null;
    }

    public ArrayList<Player> getCode(String code) throws SQLException {
        String query = "SELECT * FROM player WHERE game_id = ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setString(1, code);
        ResultSet resultSet = preparedStatement.executeQuery();
        ArrayList<Player> players = new ArrayList<>();
        while (resultSet.next()) {
            players.add(new Player(
                    resultSet.getString("player_id"),
                    resultSet.getString("username"),
                    resultSet.getString("game_id"),
                    resultSet.getString("player_role"),
                    resultSet.getBoolean("is_host")));
        }
        return players;
    }

    public boolean create(String playerId, String username, String gameId, boolean isHost) throws SQLException {
        String query = "INSERT INTO player (player_id, username, game_id, is_host) VALUES (?, ?, ?, ?)";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setString(1, playerId);
        preparedStatement.setString(2, username);
        preparedStatement.setString(3, gameId);
        preparedStatement.setBoolean(4, isHost);
        return preparedStatement.executeUpdate() > 0;
    }

    public void setRole(String playerId, String role) throws SQLException {
        String query = "UPDATE player SET player_role = ? WHERE player_id = ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setString(1, role);
        preparedStatement.setString(2, playerId);
        preparedStatement.executeUpdate();
    }

    public void deletePlayersGame(String gameId) throws SQLException {
        String query = "DELETE FROM player WHERE game_id = ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setString(1, gameId);
        preparedStatement.executeUpdate();
    }
}

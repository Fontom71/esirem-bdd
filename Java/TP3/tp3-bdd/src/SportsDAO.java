import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class SportsDAO {
    private final MYSQLDatabase database;

    public SportsDAO(MYSQLDatabase database) {
        this.database = database;
    }

    public Sport findById(int id) throws SQLException {
        Sport sport = null;

        String query = "SELECT * FROM sport WHERE id = ?";
        try (PreparedStatement statement = database.prepareStatement(query)) {
            statement.setInt(1, id);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    int idSport = resultSet.getInt("id");
                    String nom = resultSet.getString("name");
                    int nombreJoueursRequis = resultSet.getInt("required_participants");
                    sport = new Sport(idSport, nom, nombreJoueursRequis);
                }
            }
        }

        return sport;
    }

    public List<Sport> findByName(String name) throws SQLException {
        List<Sport> sports = new ArrayList<>();

        String query = "SELECT * FROM sport WHERE name LIKE ? ORDER BY name";
        try (PreparedStatement statement = database.prepareStatement(query)) {
            statement.setString(1, "%" + name + "%");
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    int id = resultSet.getInt("id");
                    String nom = resultSet.getString("name");
                    int nombreJoueursRequis = resultSet.getInt("required_participants");
                    Sport sport = new Sport(id, nom, nombreJoueursRequis);
                    sports.add(sport);
                }
            }
        }

        return sports;
    }

    public List<Sport> findAll() throws SQLException {
        List<Sport> sports = new ArrayList<>();
        try (Statement statement = database.createStatement()) {
            try (ResultSet results = statement.executeQuery("SELECT * FROM sport")) {
                while (results.next()) {
                    int id = results.getInt("id");
                    String nom = results.getString("name");
                    int nombreJoueursRequis = results.getInt("required_participants");
                    Sport sport = new Sport(id, nom, nombreJoueursRequis);
                    sports.add(sport);
                }
            }
        }
        return sports;
    }

    public Boolean insert(Sport sport) throws SQLException {
        String query = "INSERT INTO sport (name, required_participants) VALUES (?, ?)";
        try (PreparedStatement statement = database.prepareStatement(query)) {
            statement.setString(1, sport.getName());
            statement.setInt(2, sport.getRequiredParticipants());
            return statement.executeUpdate() > 0;
        }
    }

    public Boolean update(int id, Sport sport) throws SQLException {
        String query = "UPDATE sport SET name = ?, required_participants = ? WHERE id = ?";
        try (PreparedStatement statement = database.prepareStatement(query)) {
            statement.setString(1, sport.getName());
            statement.setInt(2, sport.getRequiredParticipants());
            statement.setInt(3, id);
            return statement.executeUpdate() > 0;
        }
    }

    public Boolean delete(int id) throws SQLException {
        String query = "DELETE FROM sport WHERE id = ?";
        try (PreparedStatement statement = database.prepareStatement(query)) {
            statement.setInt(1, id);
            return statement.executeUpdate() > 0;
        }
    }
}

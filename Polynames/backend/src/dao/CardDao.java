package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.Collections;

import models.Card;
import models.CardType;
import models.Word;

public class CardDao extends BaseDao {
    protected static CardDao instance;

    private static final int COL_SIZE = 5;
    private static final int ROW_SIZE = 5;

    public CardDao() throws SQLException {
        super();
    }

    public static CardDao getInstance() throws SQLException {
        if (instance == null) {
            instance = new CardDao();
        }
        return instance;
    }

    public Card get(String gameId, int row, int col) throws SQLException {
        String query = "SELECT * FROM card WHERE game_id = ? AND row = ? AND col = ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setString(1, gameId);
        preparedStatement.setInt(2, row);
        preparedStatement.setInt(3, col);
        ResultSet resultSet = preparedStatement.executeQuery();
        if (resultSet.next()) {
            return new Card(
                    resultSet.getString("game_id"),
                    resultSet.getInt("row"),
                    resultSet.getInt("col"),
                    resultSet.getInt("word_id"),
                    resultSet.getString("type_card"),
                    resultSet.getBoolean("is_revealed"));
        }
        return null;
    }

    public ArrayList<Card> get(String gameId) throws SQLException {
        String query = "SELECT * FROM card WHERE game_id = ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setString(1, gameId);
        ResultSet resultSet = preparedStatement.executeQuery();
        ArrayList<Card> cards = new ArrayList<>();
        while (resultSet.next()) {
            cards.add(new Card(
                    resultSet.getString("game_id"),
                    resultSet.getInt("row"),
                    resultSet.getInt("col"),
                    resultSet.getInt("word_id"),
                    resultSet.getString("type_card"),
                    resultSet.getBoolean("is_revealed")));
        }
        return cards;
    }

    public void createList(String gameId, ArrayList<Word> words) throws SQLException {
        String query = "INSERT INTO card (game_id, row, col, word_id, type_card, is_revealed) VALUES (?, ?, ?, ?, ?, ?)";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);

        // Création des listes pour les types de cartes
        ArrayList<String> types = new ArrayList<>();
        for (int i = 0; i < 2; i++)
            types.add(CardType.BLACK);
        for (int i = 0; i < 8; i++)
            types.add(CardType.BLUE);
        for (int i = 0; i < 15; i++)
            types.add(CardType.NEUTRAL);
        Collections.shuffle(types); // Mélange des types pour l'aléatoire

        int index = 0;
        for (int row = 0; row < ROW_SIZE; row++) {
            for (int col = 0; col < COL_SIZE; col++) {
                if (index >= words.size())
                    break; // Précaution si le nombre de mots est inférieur à 25

                Word word = words.get(index);
                preparedStatement.setString(1, gameId);
                preparedStatement.setInt(2, row);
                preparedStatement.setInt(3, col);
                preparedStatement.setInt(4, word.id());
                preparedStatement.setString(5, types.get(index));
                preparedStatement.setBoolean(6, false); // Les cartes ne sont pas révélées initialement
                preparedStatement.addBatch();

                index++;
            }
        }
        preparedStatement.executeBatch();
    }

    public void update(String gameId, int row, int col, boolean isRevealed) throws SQLException {
        String query = "UPDATE card SET is_revealed = ? WHERE game_id = ? AND row = ? AND col = ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setBoolean(1, isRevealed);
        preparedStatement.setString(2, gameId);
        preparedStatement.setInt(3, row);
        preparedStatement.setInt(4, col);
        preparedStatement.executeUpdate();
    }

    public void updateType(String gameId, int row, int col, CardType type) throws SQLException {
        String query = "UPDATE card SET type_card = ? WHERE game_id = ? AND row = ? AND col = ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setString(1, type.toString());
        preparedStatement.setString(2, gameId);
        preparedStatement.setInt(3, row);
        preparedStatement.setInt(4, col);
        preparedStatement.executeUpdate();
    }

    public void delete(String gameId) throws SQLException {
        String query = "DELETE FROM card WHERE game_id = ?";
        PreparedStatement preparedStatement = this.database.prepareStatement(query);
        preparedStatement.setString(1, gameId);
        preparedStatement.executeUpdate();
    }
}

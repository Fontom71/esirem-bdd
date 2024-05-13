import java.sql.*;
import java.util.List;
import java.util.Scanner;

public class App {
    private static final String HOST = "localhost";
    private static final int PORT = 3306;
    private static final String DATABASE_NAME = "poly_sports";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    private static int lastInsertedId;

    public static void main(String[] args) {
        // Créer une instance de la classe Sport
        Sport football = new Sport(5, "Football", 11);

        // Afficher les attributs de l'instance créée
        System.out.println("Nom du sport : " + football.getName());
        System.out.println("Nombre de joueurs requis : " + football.getRequiredParticipants());

        try {
            // Charger dynamiquement le driver JDBC pour MySQL
            MYSQLDatabase.loadDriver();

            // Créer une instance de MYSQLDatabase avec les informations de connexion
            PolySportsDatabase database = PolySportsDatabase.getInstance(HOST, PORT, DATABASE_NAME, USER, PASSWORD);

            // Ouvrir une connexion avec la base de données
            database.connect();

            // Créer une instance de SportsDAO avec la base de données
            SportsDAO sportsDAO = new SportsDAO(database);

            // Récupérer tous les sports de la base de données
            List<Sport> sports = sportsDAO.findAll();

            // Afficher les sports récupérés
            for (Sport sport : sports) {
                System.out.println("Nom du sport : " + sport.getName() + ", Nombre de joueurs requis : "
                        + sport.getRequiredParticipants());
            }

            // Test de la méthode findById avec un id existant
            Sport sportById = sportsDAO.findById(1);
            if (sportById != null) {
                System.out.println("Sport trouvé par l'ID : " + sportById.getName() + ", Nombre de joueurs requis : "
                        + sportById.getRequiredParticipants());
            } else {
                System.out.println("Aucun sport trouvé pour l'ID donné.");
            }

            // Test de la méthode findById avec un id inexistant
            Sport sportByIdNotFound = sportsDAO.findById(100);
            if (sportByIdNotFound != null) {
                System.out.println("Sport trouvé par l'ID : " + sportByIdNotFound.getName()
                        + ", Nombre de joueurs requis : " + sportByIdNotFound.getRequiredParticipants());
            } else {
                System.out.println("Aucun sport trouvé pour l'ID donné.");
            }

            // Test de la méthode findByName avec un nom donné
            System.out.println("Recherche de sports contenant le mot 'bad' : ");
            List<Sport> sportsByName = sportsDAO.findByName("bad");
            for (Sport sport : sportsByName) {
                System.out.println("Sport trouvé : " + sport.getName() + ", Nombre de joueurs requis : "
                        + sport.getRequiredParticipants());
            }

            // Demander à l'utilisateur de saisir un nom de sport à rechercher
            Scanner myScanner = new Scanner(System.in);
            System.out.println("Veuillez saisir le nom du sport à rechercher : ");
            String input = myScanner.nextLine();
            System.out.println("Recherche de sports contenant le nom '" + input + "' : ");
            List<Sport> sportsByUserInput = sportsDAO.findByName(input);
            for (Sport sport : sportsByUserInput) {
                System.out.println("Sport trouvé : " + sport.getName() + ", Nombre de joueurs requis : "
                        + sport.getRequiredParticipants());
            }

            // Test de la méthode insert
            Sport newSport = new Sport(5, "Tennis", 2);
            boolean inserted = sportsDAO.insert(newSport);
            if (inserted) {
                System.out.println("Le sport a été inséré avec succès.");
            } else {
                System.out.println("Une erreur s'est produite lors de l'insertion du sport.");
            }

            // Récupère le dernier ID inséré dans la base de données
            try (Statement statement = database.createStatement()) {
                try (ResultSet resultSet = statement.executeQuery("SELECT LAST_INSERT_ID()")) {
                    if (resultSet.next()) {
                        int lastInsertedId = resultSet.getInt(1);
                        App.lastInsertedId = lastInsertedId;
                    }
                }
            }

            // Test de la méthode update
            Sport sportToUpdate = sportsDAO.findById(App.lastInsertedId);
            if (sportToUpdate != null) {
                sportToUpdate.setRequiredParticipants(10);
                boolean updated = sportsDAO.update(sportToUpdate.getId(), sportToUpdate);
                if (updated) {
                    System.out.println("Le sport a été mis à jour avec succès.");
                } else {
                    System.out.println("Une erreur s'est produite lors de la mise à jour du sport.");
                }
            } else {
                System.out.println("Aucun sport trouvé pour l'ID donné.");
            }

            // Test de la méthode delete
            boolean deleted = sportsDAO.delete(App.lastInsertedId);
            if (deleted) {
                System.out.println("Le sport a été supprimé avec succès.");
            } else {
                System.out.println("Une erreur s'est produite lors de la suppression du sport.");
            }
        } catch (ClassNotFoundException e) {
            System.err.println("Impossible de charger le driver JDBC : " + e.getMessage());
        } catch (SQLException e) {
            System.err.println("Erreur lors de l'opération sur la base de données : " + e.getMessage());
        }
    }
}

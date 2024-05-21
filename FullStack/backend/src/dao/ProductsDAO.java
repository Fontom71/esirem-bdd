package dao;


import database.PolyBayDatabase;
import models.Product;

import java.sql.*;
import java.util.ArrayList;

public class ProductsDAO {
    private PolyBayDatabase db;

    public ProductsDAO() throws SQLException {
        db = new PolyBayDatabase("localhost", 3306, "poly_bay", "root", "");
    }

    public ArrayList<Product> findAll() throws SQLException {
        ArrayList<Product> products = new ArrayList<>();
        String query = "SELECT * FROM product";
        Statement statement = db.prepareStatement(query);
        ResultSet resultSet = statement.executeQuery(query);

        while (resultSet.next()) {
            Product product = new Product(
                    resultSet.getInt("id"),
                    resultSet.getString("name"),
                    resultSet.getString("owner"),
                    resultSet.getFloat("bid"));
            products.add(product);
        }

        return products;
    }

    public Product findById(int id) throws SQLException {
        String query = "SELECT * FROM product WHERE id = ?";
        PreparedStatement preparedStatement = db.prepareStatement(query);
        preparedStatement.setInt(1, id);
        ResultSet resultSet = preparedStatement.executeQuery();
        if (resultSet.next()) {
            return new Product(
                    resultSet.getInt("id"),
                    resultSet.getString("name"),
                    resultSet.getString("owner"),
                    resultSet.getFloat("bid"));
        }
        return null;
    }

    public boolean bid(int productId) throws SQLException {
        String query = "UPDATE product SET bid = bid + 50 WHERE id = ?";
        PreparedStatement preparedStatement = db.prepareStatement(query);
        preparedStatement.setInt(1, productId);
        return preparedStatement.executeUpdate() > 0;
    }
}

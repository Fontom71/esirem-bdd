package controllers;

import dao.ProductsDAO;
import models.Product;
import webserver.WebServerContext;

public class ProductsController {
    public static void findAll(WebServerContext context) {
        try {
            ProductsDAO dao = new ProductsDAO();
            context.getResponse().json(dao.findAll());
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        }
    }

    public static void findById(WebServerContext context) {
        try {
            int productId = Integer.parseInt(context.getRequest().getParam("productId"));
            ProductsDAO dao = new ProductsDAO();
            Product product = dao.findById(productId);
            if (product != null) {
                context.getResponse().json(product);
            } else {
                context.getResponse().notFound("Product not found");
            }
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        }
    }

    public static void bid(WebServerContext context) {
        try {
            int productId = Integer.parseInt(context.getRequest().getParam("productId"));
            ProductsDAO dao = new ProductsDAO();
            if (dao.bid(productId)) {
                Product product = dao.findById(productId);
                context.getResponse().ok("Bid placed successfully");
                context.getSSE().emit("bids", "{\"productId\":" + productId + ", \"bid\":" + product.bid() + "}");
            } else {
                context.getResponse().serverError("Failed to place bid");
            }
        } catch (Exception e) {
            context.getResponse().serverError(e.getMessage());
        }
    }
}

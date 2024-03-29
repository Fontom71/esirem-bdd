package TP1;

import java.util.ArrayList;
import java.util.Scanner;

public class Application {
    public static void main(String[] args) {
        //intro();
        //partie1();
        //partie2();
        //partie3();
        liste();
    }

    private static void intro() {
        System.out.println("On fait du Java à Polytech Dijon !");
    }

    private static void partie1() {
        Coordinate coordinate = new Coordinate();
        System.out.println("Coordinate : " + coordinate.toString());

        Point point = new Point(1,2);
        System.out.println("Point : " + point);

        Vector vector = new Vector(3,2);
        point.move(vector);
        System.out.println("Vecteur : " + vector);
        System.out.println("Point déplacé : " + point);
    }

    private static void partie2() {
        Scanner keyboard = new Scanner(System.in);

        String stringLine = keyboard.nextLine();
        System.out.println("String : " + stringLine);

        int intLine = keyboard.nextInt();
        System.out.println("Int : " + intLine);

        double doubleLine = keyboard.nextDouble();
        System.out.println("Double : " + doubleLine);
    }

    private static void partie3() {
        ScannerTools scannerTools = new ScannerTools();

        int scanIntLine = scannerTools.nextInt();
        System.out.println(scanIntLine);

        double scanDoubleLine = scannerTools.nextDouble();
        System.out.println(scanDoubleLine);
    }

    private static void liste() {
        ScannerTools scanner = new ScannerTools();
        ArrayList<Point> points = new ArrayList<>();

        System.out.println("Combien de points souhaitez-vous saisir ?");
        int numPoints = scanner.nextInt();

        for (int i = 0; i < numPoints; i++) {
            System.out.println("Point " + (i + 1) + " - Entrez la coordonnée x :");
            int x = scanner.nextInt();
            System.out.println("Point " + (i + 1) + " - Entrez la coordonnée y :");
            int y = scanner.nextInt();

            Point point = new Point(x, y);
            points.add(point);
        }

        System.out.println("Liste des points saisis :");
        for (Point point : points) {
            System.out.println(String.format("Point n°%s %s", points.indexOf(point), point));
        }
    }
}
package TP1;

import java.util.Scanner;

public class ScannerTools {
    private Scanner scanner;

    public ScannerTools() {
        scanner = new Scanner(System.in);
    };

    public <T> T nextInput(Class<T> clazz) {
        T result = null;
        try {
            if (clazz == Integer.class) {
                result = clazz.cast(scanner.nextInt());
            } else if (clazz == Double.class) {
                result = clazz.cast(scanner.nextDouble());
            } else {
                System.out.println("Type non pris en charge");
            }
        } catch (Exception e) {
            System.out.println("Saisie incorrecte");
            scanner.nextLine();
            result = nextInput(clazz);
        }
        return result;
    }

    public int nextInt() {
        return nextInput(Integer.class);
    }

    public double nextDouble() {
        return nextInput(Double.class);
    }
}

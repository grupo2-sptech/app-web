package org.example;

public class FucionalidadeConsole {

    static void matarProcessos() {
        try {
            while (true) {
                String os = System.getProperty("os.name");
                if (os.contains("Windows")) {
                    new ProcessBuilder("cmd", "/c", "taskkill", "/f", "/im", "chrome.exe").inheritIO().start().waitFor();
                } else {
                    Runtime.getRuntime().exec("Erro");
                }
                Thread.sleep(5000);
            }
        } catch (final Exception exception) {
            System.out.println("Erro ao Limpar o console!");
        }
    }
    static void limparConsole() {
        try {
            String os = System.getProperty("os.name");
            if (os.contains("Windows")) {
                new ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor();
            } else {
                Runtime.getRuntime().exec("clear");
            }
        } catch (final Exception exception) {
            System.out.println("Erro ao Limpar o console!");
        }
    }
}

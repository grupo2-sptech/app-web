package org.example;

public class Utilitarios {

    void exibirMenu() throws InterruptedException {
        System.out.println("\n");
        for (int i = 0; i < 70; i++) {
            System.out.print("-");
            Thread.sleep(2);
        }
        System.out.println();
        for (int i = 0; i < 2; i++) {
            System.out.print("-");
            Thread.sleep(2);
        }
        for (int i = 0; i < 28; i++) {
            System.out.print(" ");
            Thread.sleep(2);
        }
        System.out.print("BEM VINDO!");
        for (int i = 0; i < 28; i++) {
            System.out.print(" ");
            Thread.sleep(2);
        }
        for (int i = 0; i < 2; i++) {
            System.out.print("-");
            Thread.sleep(2);
        }
        System.out.println();
        for (int i = 0; i < 70; i++) {
            System.out.print("-");
            Thread.sleep(2);
        }
        System.out.println("\n");

//        System.out.println("""
//                ----------------------------------------------------------------------
//                --                            BEM VINDO!                            --
//                ----------------------------------------------------------------------
//                """);
    }

    void centralizaTelaHorizontal(Integer espaco) {
        for (int i = 0; i < espaco; i++) {
            System.out.print(" ");
        }
    }

    void centralizaTelaVertical(Integer espaco) {
        for (int i = 0; i < espaco; i++) {
            System.out.println();
        }
    }

    public static void limparConsole() {
        try {
            final String os = System.getProperty("os.name");
            if (os.contains("Windows")) {
                new ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor();
            } else {
                Runtime.getRuntime().exec("clear");
            }
        } catch (final Exception exception) {
            System.out.println("Erro ao Limpar o console!");
        }
    }

    void barraLoad(Integer quantidade) throws InterruptedException {
        for (int i = 0; i < quantidade; i++) {
            centralizaTelaVertical(5);
            for (int j = 0; j < 70; j++) {
                System.out.print("/");
                Thread.sleep(10);
            }
            Thread.sleep(500);
            limparConsole();
        }
    }

    void matarProcessos() {
        try {
            while (true) {
                final String os = System.getProperty("os.name");
                if (os.contains("Windows")) {
                    new ProcessBuilder("cmd", "/c", "taskkill", "/f", "/im", "WhatsApp.exe").inheritIO().start().waitFor();
                } else {
                    Runtime.getRuntime().exec("Erro");
                }
                Thread.sleep(5000);
            }
        } catch (final Exception exception) {
            System.out.println("Erro ao Limpar o console!");
        }
    }
}

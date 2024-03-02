package org.example;

public class Utilitarios {

    FucionalidadeConsole func = new FucionalidadeConsole();

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

    void barraLoad(Integer quantidade) throws InterruptedException {
        for (int i = 0; i < quantidade; i++) {
            centralizaTelaVertical(5);
            for (int j = 0; j < 70; j++) {
                System.out.print("/");
                Thread.sleep(10);
            }
            Thread.sleep(500);
            FucionalidadeConsole.limparConsole();
        }
    }
}



package org.example;

public class Utilitarios {

    FucionalidadeConsole func = new FucionalidadeConsole();

    void exibirLogo() throws InterruptedException {
        System.out.println("\n\n             __  __                       __                                    ");
        Thread.sleep(90);
        System.out.println("            / / / /  ____ _   _____  ____/ / _      __  ____ _   _____  ___     ");
        Thread.sleep(90);
        System.out.println("           / /_/ /  / __  /  / ___/ / __  / | | /| / / / __  /  / ___/ / _ |    ");
        Thread.sleep(90);
        System.out.println("          / __  /  / /_/ /  / /    / /_/ /  | |/ |/ / / /_/ /  / /    /  __/    ");
        Thread.sleep(90);
        System.out.println("         /_/ /_/   |____/  /_/     |____/   |__/|__/  |____/  /_/     |___/     ");
        Thread.sleep(90);
        System.out.println();
        System.out.println("            _____                                  _    __                      ");
        Thread.sleep(90);
        System.out.println("           / ___/  ___    _____  __  __   _____   (_)  / /_   __  __            ");
        Thread.sleep(90);
        System.out.println("           |__ |  / _ |  / ___/ / / / /  / ___/  / /  / __/  / / / /            ");
        Thread.sleep(90);
        System.out.println("          ___/ / /  __/ / /__  / /_/ /  / /     / /  / /_   / /_/ /             ");
        Thread.sleep(90);
        System.out.println("         /____/  |___/  |___/  |____/  /_/     /_/   |__/   |___ /              ");
        Thread.sleep(90);
        System.out.println("                                                           /____/               ");

//        for (int i = 0; i < 70; i++) {
//            System.out.print("-");
//            Thread.sleep(2);
//        }
//        System.out.println();
//        for (int i = 0; i < 2; i++) {
//            System.out.print("-");
//            Thread.sleep(2);
//        }
//        for (int i = 0; i < 28; i++) {
//            System.out.print(" ");
//            Thread.sleep(2);
//        }
//        System.out.print("BEM VINDO!");
//        for (int i = 0; i < 28; i++) {
//            System.out.print(" ");
//            Thread.sleep(2);
//        }
//        for (int i = 0; i < 2; i++) {
//            System.out.print("-");
//            Thread.sleep(2);
//        }
//        System.out.println();
//        for (int i = 0; i < 70; i++) {
//            System.out.print("-");
//            Thread.sleep(2);
//        }


    }


    void exibirMenu(){
        System.out.println("""
                         
                         __________________________________________________________________
                         |                     B E M  V I N D O !                         |
                         |________________________________________________________________|
                         
                """);
        System.out.println("""
                    Faça login com suas credenciais para acessar nossa plataforma de monitoramento
                    e visualização de hardware. Nossa aplicação é projetada para otimizar e aumentar
                    a segurança no ambiente corporativo, fornecendo controle abrangente sobre os
                    recursos de hardware.
                """);
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



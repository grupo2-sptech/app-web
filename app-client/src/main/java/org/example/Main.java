package org.example;


import java.util.Scanner;

import static org.example.FucionalidadeConsole.limparConsole;

public class Main {
    public static void main(String[] args) throws InterruptedException {
//        System.out.println("Hello world!");
//        FramePrincipal framePrincipal = new FramePrincipal();
//        framePrincipal.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
//        framePrincipal.setSize( 325, 100 );
//        framePrincipal.setVisible( true );
        Utilitarios utils = new Utilitarios();
        Scanner sc = new Scanner(System.in);
        String emailValido = "fernanda.caramico@gmail.com";
        String senhaValida = "teste123";
        do {
            utils.exibirLogo();
//            utils.exibirMenu();
            utils.exibirMensagem();
            utils.centralizaTelaHorizontal(22);
            System.out.println("Email:");
            utils.centralizaTelaHorizontal(22);
            String email = sc.next();
            System.out.println();
            utils.centralizaTelaHorizontal(22);
            System.out.println("Senha: ");
            utils.centralizaTelaHorizontal(22);
            String senha = sc.next();
            if (emailValido.equals(email) && senhaValida.equals(senha)) {
                limparConsole();
                utils.exibirLogo();
                utils.centralizaTelaVertical(5);
                utils.centralizaTelaHorizontal(30);
                utils.exibirMenu();
                Thread.sleep(3000);
                limparConsole();
//                System.out.println("LOGADO!");
                utils.centralizaTelaVertical(1);
                utils.centralizaTelaHorizontal(60);
                System.out.println("Monitoramento ativo!");
                utils.centralizaTelaVertical(1);
                utils.centralizaTelaHorizontal(0);
                System.out.println("""
                                     
                         Este computador é monitorado em tempo real, incluindo o hardware, para assegurar conformidade com as políticas da empresa. 
                        Todas as atividades serão verificadas e, se necessário, medidas serão tomadas automaticamente pelo sistema.""");
                utils.centralizaTelaVertical(5);
                break;
            } else {
                limparConsole();
                utils.centralizaTelaVertical(5);
                utils.centralizaTelaHorizontal(25);
                System.out.println("SENHA OU EMAIL INCORRETO!");
                Thread.sleep(4000);
                limparConsole();
            }
        } while (true);

          FucionalidadeConsole.matarProcessos();

    }


}
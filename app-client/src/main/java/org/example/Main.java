package org.example;

import com.github.britooo.looca.api.core.Looca;

import java.util.Scanner;

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
            utils.exibirMenu();
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
                FucionalidadeConsole.limparConsole();
                utils.barraLoad(3);
                utils.centralizaTelaVertical(5);
                utils.centralizaTelaHorizontal(35);
                System.out.println("LOGADO!");
                utils.centralizaTelaVertical(5);
                break;
            } else {
                FucionalidadeConsole.limparConsole();
                utils.centralizaTelaVertical(5);
                utils.centralizaTelaHorizontal(25);
                System.out.println("SENHA OU EMAIL INCORRETO!");
                Thread.sleep(4000);
                FucionalidadeConsole.limparConsole();
            }
        } while (true);

          FucionalidadeConsole.matarProcessos();

    }


}
package org.example;

//import javax.swing.JFrame;
//
//import org.example.Frames.FramePrincipal;

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
        String senhavalida = "teste123";

        do {
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
            if (emailValido.equals(email) && senhavalida.equals(senha)) {
                Utilitarios.limparConsole();
                utils.barraLoad(3);
                utils.centralizaTelaVertical(5);
                utils.centralizaTelaHorizontal(35);
                System.out.println("LOGADO!");
                utils.centralizaTelaVertical(5);
                break;
            } else {
                Utilitarios.limparConsole();
                utils.centralizaTelaHorizontal(20);
                System.out.println("SENHA OU EMAIL INCORRETO!");
                Thread.sleep(2000);
                Utilitarios.limparConsole();
            }
        } while (true);

        utils.matarProcessos();
    }


}
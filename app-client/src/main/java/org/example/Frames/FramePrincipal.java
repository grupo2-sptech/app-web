package org.example.Frames;

import java.awt.*;
import javax.swing.*;


public class FramePrincipal extends JFrame {
    private JTextField textField1;
    private JLabel frame1;
    private JLabel frame2;
    private JPasswordField passwordField;

    public FramePrincipal() {
        super("Bem Vindo");
        setLayout(new FlowLayout());
        frame1 = new JLabel("Entre o nome de usuário", SwingConstants.LEFT);
        add(frame1);
        textField1 = new JTextField(10);
        add(textField1); // adiciona textField1 a JFrame
        frame2 = new JLabel("Entre com a Senha", SwingConstants.LEFT);
        add(frame2);
        passwordField = new JPasswordField(10);
        add(passwordField); // adiciona passwordField a JFrame
    }
}

package com.orientalSalad.troubleShot.forms;

import javax.swing.*;

public class Trouble {
	private JPanel panel;
	private JPanel troubleMain;

	private JLabel title;
	private JFormattedTextField titleInput;

	private JLabel troubleCode;
	private JTextArea troubleCodeInput;

	private JTextArea consoleLogInput;
	private JLabel consoleLog;

	private JLabel techStack;
	private JTextField techStackInput;

	private JLabel description;
	private JTextArea descriptionInput;


	// radio button group화
	ButtonGroup publicScopeGroup;
	private JLabel publicScope;
	private JRadioButton publicButton;
	private JRadioButton privateButton;
	private JRadioButton teamButton;
	private JButton cancleButton;
	private JButton shootButton;
	private JButton markDown복사Button;

	public Trouble() {
		panel = new JPanel();
		panel.add(troubleMain);
	}
	public void setPublicScope() {
		this.publicScopeGroup = new ButtonGroup();
		this.publicScopeGroup.add(publicButton);
		this.publicScopeGroup.add(privateButton);
		this.publicScopeGroup.add(teamButton);
	}

	public JPanel getPanel() {
		return panel;
	}

}

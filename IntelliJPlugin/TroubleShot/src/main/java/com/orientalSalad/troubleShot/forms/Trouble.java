package com.orientalSalad.troubleShot.forms;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

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
	private JComboBox teamComboBox;

	public Trouble() {

//		setRadioGroup();
		panel = new JPanel();
		panel.add(troubleMain);

		// 공개 범위 단일 선택
		publicScopeGroup = new ButtonGroup();
		publicScopeGroup.add(publicButton);
		publicScopeGroup.add(privateButton);
		publicScopeGroup.add(teamButton);

		// 팀 콤보 상자 비활성화
		teamComboBox.setEnabled(false);
		publicButton.addActionListener(e -> {
				teamComboBox.setEnabled(false);
		});
		privateButton.addActionListener(e -> {
			teamComboBox.setEnabled(false);
		});

		// teamButton 선택 시, 팀 콤보 상자 활성화
		teamButton.addActionListener(e -> {
			teamComboBox.setEnabled(true);
		});

	}

	public JPanel getPanel() {
		return panel;
	}

}

package com.orientalSalad.troubleShot.global.utill;

import java.util.Random;

import org.springframework.stereotype.Component;

@Component
public class CodeMaker {
	public String getRandomWordOrNum(int length) {
		String text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		Random random = new Random();

		StringBuilder sb = new StringBuilder();

		for(int i=0;i<length;i++){
			int idx = random.nextInt(text.length());
			sb.append(text.charAt(idx));
		}

		return sb.toString();
	}
}

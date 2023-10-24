package com.orientalSalad.troubleShot.global.utill;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.stereotype.Component;

@Component
public class HashEncrypt {
	public String hashWithSHA256(String textToHash) {
		try {
			// sha-256으로 메시지 다이제스트 생성기 객체 생성
			MessageDigest md = MessageDigest.getInstance("SHA-256");

			//해싱
			byte[] hash = md.digest(textToHash.getBytes());

			//16 진수로 변경
			StringBuilder sb = new StringBuilder();
			for (byte b : hash) {
				sb.append(String.format("%02x", b));
			}

			return sb.toString();
		} catch (NoSuchAlgorithmException e) {
			throw new RuntimeException("SHA-256 algorithm을 찾을 수 없습니다.", e);
		}
	}
}

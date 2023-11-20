package com.orientalSalad.troubleShot.login.dto;

import java.io.Serializable;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.log4j.Log4j2;

@Getter
@Setter
@Builder
@Log4j2
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO implements Serializable {
	@Schema(description = "이메일")
	String email;
	@Schema(description = "비밀번호")
	String password;
	@Schema(hidden = true)
	String ip;
	@Schema(description = "로그인 방식 (0 : 웹, 1 : intellij, 2 : vscode, 3: 크롬 확장)")
	Long type;
}

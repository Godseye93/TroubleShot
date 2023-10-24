package com.orientalSalad.troubleShot.login.dto;

import java.io.Serializable;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.log4j.Log4j2;

@Getter
@Setter
@Builder
@Log4j2
@ToString
public class LoginDTO implements Serializable {
	@Schema(description = "이메일")
	String email;
	@Schema(description = "비밀번호")
	String password;
}

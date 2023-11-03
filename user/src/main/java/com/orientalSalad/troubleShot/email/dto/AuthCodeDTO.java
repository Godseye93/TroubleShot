package com.orientalSalad.troubleShot.email.dto;

import java.io.Serializable;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AuthCodeDTO implements Serializable {
	@Schema(description = "본인 이메일")
	String email;
	@Schema(description = "인증 번호")
	String code;
}
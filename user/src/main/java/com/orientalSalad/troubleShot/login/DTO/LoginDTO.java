package com.orientalSalad.troubleShot.login.DTO;

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
public class LoginDTO {
	String email;
	String password;
}

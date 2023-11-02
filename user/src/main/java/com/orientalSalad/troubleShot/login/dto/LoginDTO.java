package com.orientalSalad.troubleShot.login.dto;

import java.io.Serializable;

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
	String email;
	String password;
}

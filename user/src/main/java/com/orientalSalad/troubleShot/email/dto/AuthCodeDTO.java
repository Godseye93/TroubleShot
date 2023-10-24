package com.orientalSalad.troubleShot.email.dto;

import java.io.Serializable;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class AuthCodeDTO implements Serializable {
	String email;
	String code;
}
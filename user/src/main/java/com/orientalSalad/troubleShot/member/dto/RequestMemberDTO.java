package com.orientalSalad.troubleShot.member.dto;

import com.orientalSalad.troubleShot.global.dto.BaseDTO;
import com.orientalSalad.troubleShot.global.dto.RequestDTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString
public class RequestMemberDTO extends RequestDTO {
	@Schema(description = "유저 데이터")
	private MemberDTO memberDTO;
}
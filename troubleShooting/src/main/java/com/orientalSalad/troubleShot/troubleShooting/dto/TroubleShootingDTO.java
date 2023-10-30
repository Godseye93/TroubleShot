package com.orientalSalad.troubleShot.troubleShooting.dto;

import com.orientalSalad.troubleShot.global.dto.BaseDTO;
import com.orientalSalad.troubleShot.member.dto.MemberDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TroubleShootingDTO extends BaseDTO {
	private String title;
	private String context;
	private MemberDTO writer;
	private boolean solved;
	private int views;
}
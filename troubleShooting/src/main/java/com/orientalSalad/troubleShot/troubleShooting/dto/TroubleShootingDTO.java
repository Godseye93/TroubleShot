package com.orientalSalad.troubleShot.troubleShooting.dto;

import com.orientalSalad.troubleShot.global.dto.BaseDTO;
import com.orientalSalad.troubleShot.member.dto.MemberDTO;
import com.orientalSalad.troubleShot.member.dto.SimpleMemberDTO;

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
	private SimpleMemberDTO writer;
	private boolean solved;
	private int viewCount;
	private int likeCount;
	private int replyCount;
}
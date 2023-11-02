package com.orientalSalad.troubleShot.member.dto;

import com.orientalSalad.troubleShot.global.dto.BaseDTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class SimpleMemberDTO{
	@Schema(description = "유저 pk")
	private long seq;
	@Schema(description = "이메일")
	private String email;
	@Schema(description = "프로필 사진")
	private String profileImg;
	@Schema(description = "닉네임")
	private String nickname;
}

package com.orientalSalad.troubleShot.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class SimpleMemberDTO{
	@Schema(description = "유저 pk")
	private long seq;
	@Schema(description = "이메일",hidden = true)
	private String email;
	@Schema(description = "프로필 사진",hidden = true)
	private String profileImg;
	@Schema(description = "닉네임",hidden = true)
	private String nickname;
}

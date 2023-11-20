package com.orientalSalad.troubleShot.member.dto;

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
public class SearchMemberDTO{
	@Schema(description = "페이지 크기")
	private int pageSize;
	@Schema(description = "페이지 번호")
	private int pageNo;
	@Schema(description = "닉네임")
	private String nickname;
}
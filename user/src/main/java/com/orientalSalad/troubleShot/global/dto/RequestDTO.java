package com.orientalSalad.troubleShot.global.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RequestDTO {
	@Schema(description = "로그인한 유저 pk")
	Long loginSeq;

	@Schema(description = "기기 종류 0: 웹, 1: intellij, 2: vscode")
	Long type;
}

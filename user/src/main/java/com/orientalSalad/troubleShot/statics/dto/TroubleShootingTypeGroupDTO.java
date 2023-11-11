package com.orientalSalad.troubleShot.statics.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.log4j.Log4j2;

@Getter
@Setter
@Builder
@Log4j2
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TroubleShootingTypeGroupDTO {
	@Schema(description = "포스트 이름")
	String name;
	@Schema(description = "포스트 타입(0: 웹, 1: intellih, 2: vscode)")
	int type;
	@Schema(description = "게시물 수")
	int count;
}

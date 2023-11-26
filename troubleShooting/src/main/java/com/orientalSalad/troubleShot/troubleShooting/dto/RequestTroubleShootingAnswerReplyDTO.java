package com.orientalSalad.troubleShot.troubleShooting.dto;

import com.orientalSalad.troubleShot.global.dto.RequestDTO;

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
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RequestTroubleShootingAnswerReplyDTO extends RequestDTO {
	@Schema(description = "솔루션 덧글")
	private TroubleShootingAnswerReplyDTO troubleShootingAnswerReply;
}
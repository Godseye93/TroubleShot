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
public class RequestTroubleShootingReplyDTO extends RequestDTO {
	@Schema(description = "트러블 슈팅 문서 덧글")
	private TroubleShootingReplyDTO troubleShootingReply;
}
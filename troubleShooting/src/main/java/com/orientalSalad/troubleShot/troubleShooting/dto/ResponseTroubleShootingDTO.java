package com.orientalSalad.troubleShot.troubleShooting.dto;

import java.util.List;

import com.orientalSalad.troubleShot.global.dto.ResultDTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseTroubleShootingDTO extends ResultDTO {
	@Schema(description = "트러블 슈팅 문서")
	TroubleShootingDTO troubleShooting;
}
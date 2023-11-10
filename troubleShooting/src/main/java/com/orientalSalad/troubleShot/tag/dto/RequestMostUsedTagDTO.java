package com.orientalSalad.troubleShot.tag.dto;

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
public class RequestMostUsedTagDTO{
	@Schema(description = "검색할 태그 개수")
	long count;
	@Schema(description = "유저 pk")
	long userSeq;
}

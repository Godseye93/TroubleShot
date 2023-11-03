package com.orientalSalad.troubleShot.troubleShooting.dto;

import java.util.List;

import com.orientalSalad.troubleShot.global.dto.ResultDTO;

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
public class ResponseTroubleShootingListDTO extends ResultDTO {
	List<TroubleShootingDTO> troubleShootingList;
	long totalCount;
}
package com.orientalSalad.troubleShot.GPTController.dto;

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
public class ResponseMessageDTO extends ResultDTO {
	String context;
}

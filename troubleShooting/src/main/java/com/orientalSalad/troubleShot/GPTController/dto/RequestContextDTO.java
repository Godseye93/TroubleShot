package com.orientalSalad.troubleShot.GPTController.dto;

import com.orientalSalad.troubleShot.global.dto.RequestDTO;

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
public class RequestContextDTO extends RequestDTO {
	String context;
}

package com.orientalSalad.troubleShot.tag.dto;

import com.orientalSalad.troubleShot.global.dto.BaseDTO;

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
public class TagDTO extends BaseDTO {
	String name;
}

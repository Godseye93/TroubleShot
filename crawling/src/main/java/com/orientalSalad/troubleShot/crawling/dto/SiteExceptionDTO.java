package com.orientalSalad.troubleShot.crawling.dto;

import java.io.Serializable;
import java.util.Set;

import com.orientalSalad.troubleShot.global.dto.ResultDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@SuperBuilder
public class SiteExceptionDTO extends ResultDTO {
	private Set<String> urls;
}
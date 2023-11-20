package com.orientalSalad.troubleShot.tag.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.orientalSalad.troubleShot.tag.dto.RequestMostUsedTagDTO;

@Mapper
public interface UserTagMapper {
	public List<String> selectMostUsedTag(@Param("request") RequestMostUsedTagDTO request);
}

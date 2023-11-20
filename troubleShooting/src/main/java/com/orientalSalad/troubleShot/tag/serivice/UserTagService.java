package com.orientalSalad.troubleShot.tag.serivice;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.tag.dto.RequestMostUsedTagDTO;
import com.orientalSalad.troubleShot.tag.mapper.UserTagMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserTagService {
	private final UserTagMapper userTagMapper;

	public List<String> findMostUsedTagByUserSeq(RequestMostUsedTagDTO requestMostUsedTagDTO){
		List<String> tagList = userTagMapper.selectMostUsedTag(requestMostUsedTagDTO);

		if(tagList == null){
			tagList = new ArrayList<>();
		}

		return tagList;
	}
}

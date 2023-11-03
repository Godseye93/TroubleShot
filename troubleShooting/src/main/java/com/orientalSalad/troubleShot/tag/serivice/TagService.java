package com.orientalSalad.troubleShot.tag.serivice;

import java.util.List;

import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.tag.converter.TagConverter;
import com.orientalSalad.troubleShot.tag.dto.TagDTO;
import com.orientalSalad.troubleShot.tag.entity.TagEntity;
import com.orientalSalad.troubleShot.tag.entity.TroubleTagEntity;
import com.orientalSalad.troubleShot.tag.repository.TagRepository;
import com.orientalSalad.troubleShot.tag.repository.TroubleTagRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagService {
	private final TagRepository tagRepository;
	private final TroubleTagRepository troubleTagRepository;
	private final TagConverter tagConverter;
	
	//트러블 슈팅에 태그를 다는 메소드
	public boolean attachTag(List<String> tagDTOList, Long troubleShootingSeq){
		for(String tagName : tagDTOList){
			TagEntity tagEntity = tagRepository.findByName(tagName);

			//없는 태그인 경우 생성
			if(tagEntity == null){
				TagDTO tagDTO = TagDTO.builder()
					.name(tagName)
					.build();

				tagEntity = tagConverter.toEntity(tagDTO);
				tagEntity = tagRepository.save(tagEntity);
			}
			//트러블 슈팅 - 태그 관계 생성
			TroubleTagEntity troubleTagEntity = TroubleTagEntity.builder()
				.tagSeq(tagEntity.getSeq())
				.troubleSeq(troubleShootingSeq)
				.build();

			troubleTagRepository.save(troubleTagEntity);
		}

		return true;
	}
}

package com.orientalSalad.troubleShot.tag.converter;

import org.springframework.stereotype.Component;

import com.orientalSalad.troubleShot.global.utill.ObjectConverter;
import com.orientalSalad.troubleShot.member.dto.SimpleMemberDTO;
import com.orientalSalad.troubleShot.tag.dto.TagDTO;
import com.orientalSalad.troubleShot.tag.entity.TagEntity;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingDTO;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingEntity;

@Component
public class TagConverter implements ObjectConverter<TagDTO, TagEntity> {
	@Override
	public TagEntity toEntity(TagDTO tagDTO) {
		return TagEntity.builder()
			.name(tagDTO.getName())
			.build();
	}

	@Override
	public TagDTO toDTO(TagEntity tagEntity) {
		return TagDTO.builder()
			.name(tagEntity.getName())
			.seq(tagEntity.getSeq())
			.createTime(tagEntity.getCreateTime())
			.updateTime(tagEntity.getUpdateTime())
			.deleteTime(tagEntity.getDeleteTime())
			.build();
	}
}

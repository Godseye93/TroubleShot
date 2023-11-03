package com.orientalSalad.troubleShot.troubleShooting.converter;

import org.springframework.stereotype.Component;

import com.orientalSalad.troubleShot.global.utill.ObjectConverter;
import com.orientalSalad.troubleShot.member.dto.SimpleMemberDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingReplyDTO;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingReplyEntity;

@Component
public class TroubleShootingReplyConverter implements ObjectConverter<TroubleShootingReplyDTO, TroubleShootingReplyEntity> {

	@Override
	public TroubleShootingReplyEntity toEntity(TroubleShootingReplyDTO troubleShootingReplyDTO) {
		return TroubleShootingReplyEntity.builder()
			.context(troubleShootingReplyDTO.getContext())
			.troubleSeq(troubleShootingReplyDTO.getTroubleSeq())
			.writerSeq(troubleShootingReplyDTO.getWriterSeq())
			.likeCount(troubleShootingReplyDTO.getLikeCount())
			.build();
	}

	@Override
	public TroubleShootingReplyDTO toDTO(TroubleShootingReplyEntity troubleShootingReplyEntity) {
		return TroubleShootingReplyDTO.builder()
			.context(troubleShootingReplyEntity.getContext())
			.troubleSeq(troubleShootingReplyEntity.getTroubleSeq())
			.writerSeq(troubleShootingReplyEntity.getWriterSeq())
			.likeCount(troubleShootingReplyEntity.getLikeCount())
			.createTime(troubleShootingReplyEntity.getCreateTime())
			.updateTime(troubleShootingReplyEntity.getUpdateTime())
			.build();
	}
}
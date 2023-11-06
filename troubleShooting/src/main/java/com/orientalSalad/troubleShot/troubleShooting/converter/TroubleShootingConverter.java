package com.orientalSalad.troubleShot.troubleShooting.converter;

import org.springframework.stereotype.Component;

import com.orientalSalad.troubleShot.global.utill.ObjectConverter;
import com.orientalSalad.troubleShot.member.dto.SimpleMemberDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingDTO;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingEntity;

@Component
public class TroubleShootingConverter implements ObjectConverter<TroubleShootingDTO, TroubleShootingEntity> {

	@Override
	public TroubleShootingEntity toEntity(TroubleShootingDTO troubleShootingDTO) {
		//유저가 없으면 알수없음 유저(0번 인덱스) 처리
		if(troubleShootingDTO.getWriter() == null){
			troubleShootingDTO.setWriter(new SimpleMemberDTO());
			troubleShootingDTO.getWriter().setSeq(0L);
		}

		return TroubleShootingEntity.builder()
			.title(troubleShootingDTO.getTitle())
			.context(troubleShootingDTO.getContext())
			.viewCount(troubleShootingDTO.getViewCount())
			.likeCount(troubleShootingDTO.getLikeCount())
			.replyCount(troubleShootingDTO.getReplyCount())
			.solved(troubleShootingDTO.isSolved())
			.writerSeq(troubleShootingDTO.getWriter().getSeq())
			.category(troubleShootingDTO.getCategory())
			.dependency(troubleShootingDTO.getDependency())
			.build();
	}

	@Override
	public TroubleShootingDTO toDTO(TroubleShootingEntity troubleShootingEntity) {
		return TroubleShootingDTO.builder()
			.seq(troubleShootingEntity.getSeq())
			.context(troubleShootingEntity.getContext())
			.title(troubleShootingEntity.getTitle())
			.likeCount(troubleShootingEntity.getLikeCount())
			.replyCount(troubleShootingEntity.getReplyCount())
			.viewCount(troubleShootingEntity.getViewCount())
			.solved(troubleShootingEntity.isSolved())
			.createTime(troubleShootingEntity.getCreateTime())
			.updateTime(troubleShootingEntity.getUpdateTime())
			.deleteTime(troubleShootingEntity.getDeleteTime())
			.category(troubleShootingEntity.getCategory())
			.dependency(troubleShootingEntity.getDependency())
			.build();
	}
}

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
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class TagService {
	private final TagRepository tagRepository;
	private final TroubleTagRepository troubleTagRepository;
	private final TagConverter tagConverter;
	//트러블 슈팅에 태그를 다는 메소드
	public boolean deleteTag(Long troubleShootingSeq){
		List<TroubleTagEntity> tagEntityList = troubleTagRepository.findByTroubleSeq(troubleShootingSeq);
		if(tagEntityList == null){
			return true;
		}
		for(TroubleTagEntity troubleTagEntity : tagEntityList){
			troubleTagRepository.delete(troubleTagEntity);
		}

		return true;
	}
	//트러블 슈팅에 태그를 다는 메소드
	public boolean attachTag(List<String> tagDTOList, Long troubleShootingSeq){
		if(tagDTOList == null){
			return true;
		}
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
	//트러블 슈팅에 태그를 수정하는 메소드
	public boolean updateTag(List<String> tagDTOList, Long troubleShootingSeq){
		//기존 태그 삭제
		deleteTag(troubleShootingSeq);
		//새로운 태그 달기
		if(tagDTOList == null){
			log.info("새롭게 달 태그가 없습니다.");
			return true;
		}
		for(String tagName : tagDTOList){
			log.info("새로운 태그 : "+tagName+" with "+troubleShootingSeq);
			TagEntity tagEntity = tagRepository.findByName(tagName);

			//없는 태그인 경우 생성
			if(tagEntity == null){
				log.info("없는 태그");
				TagDTO tagDTO = TagDTO.builder()
					.name(tagName)
					.build();

				tagEntity = tagConverter.toEntity(tagDTO);
				tagEntity = tagRepository.save(tagEntity);
			}

			TroubleTagEntity troubleTagEntity
				= troubleTagRepository.findByTroubleSeqAndTagSeq(troubleShootingSeq,tagEntity.getSeq());

			//트러블 슈팅 - 태그 관계 생성
			if(troubleTagEntity == null){
				log.info("태그 연결");
				troubleTagEntity = TroubleTagEntity.builder()
					.tagSeq(tagEntity.getSeq())
					.troubleSeq(troubleShootingSeq)
					.build();
				troubleTagRepository.save(troubleTagEntity);
			}
		}

		return true;
	}

}

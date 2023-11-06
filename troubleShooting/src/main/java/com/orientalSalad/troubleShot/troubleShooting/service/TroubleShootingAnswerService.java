package com.orientalSalad.troubleShot.troubleShooting.service;

import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.global.utill.ObjectConverter;
import com.orientalSalad.troubleShot.troubleShooting.dto.RequestTroubleShootingAnswerDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingAnswerDTO;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingAnswerEntity;
import com.orientalSalad.troubleShot.troubleShooting.mapper.TroubleShootingMapper;
import com.orientalSalad.troubleShot.troubleShooting.repository.TroubleShootingAnswerRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class TroubleShootingAnswerService {
	private final TroubleShootingMapper troubleShootingMapper;
	private final TroubleShootingAnswerRepository troubleShootingAnswerRepository;
	private final ObjectConverter<TroubleShootingAnswerDTO, TroubleShootingAnswerEntity> troubleShootingAnswerConverter;


	public boolean insertTroubleShootingAnswer(RequestTroubleShootingAnswerDTO requestTroubleShootingAnswerDTO){
		TroubleShootingAnswerEntity troubleShootingAnswerEntity = troubleShootingAnswerConverter.toEntity(
			requestTroubleShootingAnswerDTO.getTroubleShootingAnswerDTO());
		troubleShootingAnswerEntity = troubleShootingAnswerRepository.save(troubleShootingAnswerEntity);

		return true;
	}
	public boolean updateTroubleShootingAnswer(RequestTroubleShootingAnswerDTO requestTroubleShootingAnswerDTO) throws Exception{
		//작성자와 로그인 유저 확인
		if(requestTroubleShootingAnswerDTO.getLoginSeq() != requestTroubleShootingAnswerDTO.getTroubleShootingAnswerDTO().getWriter().getSeq()){
			throw new Exception("작성자와 로그인유저가 다릅니다.");
		}

		TroubleShootingAnswerDTO troubleShootingAnswerDTO = requestTroubleShootingAnswerDTO.getTroubleShootingAnswerDTO();

		TroubleShootingAnswerEntity troubleShootingAnswerEntity
			= troubleShootingAnswerRepository.findBySeq(troubleShootingAnswerDTO.getSeq());

		troubleShootingAnswerEntity.update(troubleShootingAnswerDTO);

		troubleShootingAnswerEntity = troubleShootingAnswerRepository.save(troubleShootingAnswerEntity);

		return true;
	}
	public boolean deleteTroubleShootingAnswer(RequestTroubleShootingAnswerDTO requestTroubleShootingAnswerDTO) throws Exception{
		TroubleShootingAnswerDTO troubleShootingAnswerDTO
			= troubleShootingMapper.selectTroubleShootingAnswerBySeq(
				requestTroubleShootingAnswerDTO.getTroubleShootingAnswerDTO().getSeq());

		//작성자와 로그인 유저 확인
		if(requestTroubleShootingAnswerDTO.getLoginSeq() != troubleShootingAnswerDTO.getWriter().getSeq()){
			throw new Exception("작성자와 로그인유저가 다릅니다.");
		}

		//문서 삭제
		TroubleShootingAnswerEntity troubleShootingAnswerEntity = troubleShootingAnswerRepository.findBySeq(troubleShootingAnswerDTO.getSeq());
		troubleShootingAnswerRepository.delete(troubleShootingAnswerEntity);

		return true;
	}
}

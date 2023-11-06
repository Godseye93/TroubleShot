package com.orientalSalad.troubleShot.troubleShooting.service;

import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.global.utill.ObjectConverter;
import com.orientalSalad.troubleShot.troubleShooting.dto.RequestTroubleShootingAnswerDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.RequestTroubleShootingAnswerReplyDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingAnswerDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingAnswerReplyDTO;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingAnswerEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingAnswerReplyEntity;
import com.orientalSalad.troubleShot.troubleShooting.mapper.TroubleShootingMapper;
import com.orientalSalad.troubleShot.troubleShooting.repository.TroubleShootingAnswerReplyRepository;
import com.orientalSalad.troubleShot.troubleShooting.repository.TroubleShootingAnswerRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class TroubleShootingAnswerService {
	private final TroubleShootingMapper troubleShootingMapper;
	private final TroubleShootingAnswerRepository answerRepository;
	private final TroubleShootingAnswerReplyRepository answerReplyRepository;
	private final ObjectConverter<TroubleShootingAnswerDTO, TroubleShootingAnswerEntity> answerConverter;
	private final ObjectConverter<TroubleShootingAnswerReplyDTO, TroubleShootingAnswerReplyEntity> answerReplyConverter;

	public boolean insertTroubleShootingAnswer(RequestTroubleShootingAnswerDTO requestTroubleShootingAnswerDTO){
		TroubleShootingAnswerEntity troubleShootingAnswerEntity = answerConverter.toEntity(
			requestTroubleShootingAnswerDTO.getTroubleShootingAnswer());
		troubleShootingAnswerEntity = answerRepository.save(troubleShootingAnswerEntity);

		return true;
	}
	public boolean updateTroubleShootingAnswer(RequestTroubleShootingAnswerDTO requestTroubleShootingAnswerDTO) throws Exception{
		TroubleShootingAnswerEntity answerEntity
			= answerRepository.findBySeq(requestTroubleShootingAnswerDTO.getTroubleShootingAnswer().getSeq());

		//작성자와 로그인 유저 확인
		if(requestTroubleShootingAnswerDTO.getLoginSeq() != answerEntity.getWriterSeq()){
			throw new Exception("작성자와 로그인유저가 다릅니다.");
		}

		answerEntity.update(requestTroubleShootingAnswerDTO.getTroubleShootingAnswer());

		answerEntity = answerRepository.save(answerEntity);

		return true;
	}
	public boolean deleteTroubleShootingAnswer(RequestTroubleShootingAnswerDTO requestTroubleShootingAnswerDTO) throws Exception{
		TroubleShootingAnswerEntity answerEntity
			= answerRepository.findBySeq(requestTroubleShootingAnswerDTO.getTroubleShootingAnswer().getSeq());

		//작성자와 로그인 유저 확인
		if(requestTroubleShootingAnswerDTO.getLoginSeq() != answerEntity.getWriterSeq()){
			throw new Exception("작성자와 로그인유저가 다릅니다.");
		}

		//문서 삭제
		answerRepository.delete(answerEntity);
		return true;
	}
	public boolean insertTroubleShootingAnswerReply(RequestTroubleShootingAnswerReplyDTO requestTroubleShootingAnswerReplyDTO){
		TroubleShootingAnswerReplyEntity troubleShootingAnswerReplyEntity = answerReplyConverter.toEntity(
			requestTroubleShootingAnswerReplyDTO.getTroubleShootingAnswerReply());

		troubleShootingAnswerReplyEntity = answerReplyRepository.save(troubleShootingAnswerReplyEntity);

		return true;
	}
	public boolean updateTroubleShootingAnswerReply(RequestTroubleShootingAnswerReplyDTO requestTroubleShootingAnswerReplyDTO) throws
		Exception {
		TroubleShootingAnswerReplyEntity answerReplyEntity
			= answerReplyRepository.findBySeq(requestTroubleShootingAnswerReplyDTO.getTroubleShootingAnswerReply().getSeq());

			//작성자와 로그인 유저 확인
		if(requestTroubleShootingAnswerReplyDTO.getLoginSeq() != answerReplyEntity.getWriterSeq()){
			throw new Exception("작성자와 로그인유저가 다릅니다.");
		}

		answerReplyEntity.update(requestTroubleShootingAnswerReplyDTO.getTroubleShootingAnswerReply());

		answerReplyEntity = answerReplyRepository.save(answerReplyEntity);

		return true;
	}
	public boolean deleteTroubleShootingAnswerReply(RequestTroubleShootingAnswerReplyDTO requestTroubleShootingAnswerReplyDTO) throws
		Exception {

		TroubleShootingAnswerReplyEntity answerReplyEntity
			= answerReplyRepository.findBySeq(requestTroubleShootingAnswerReplyDTO.getTroubleShootingAnswerReply().getSeq());

		//작성자와 로그인 유저 확인
		if(requestTroubleShootingAnswerReplyDTO.getLoginSeq() != answerReplyEntity.getWriterSeq()){
			throw new Exception("작성자와 로그인유저가 다릅니다.");
		}

		answerReplyRepository.delete(answerReplyEntity);

		return true;
	}
}

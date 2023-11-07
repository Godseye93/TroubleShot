package com.orientalSalad.troubleShot.troubleShooting.service;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.global.constant.Pagination;
import com.orientalSalad.troubleShot.global.dto.RequestDTO;
import com.orientalSalad.troubleShot.global.utill.ObjectConverter;
import com.orientalSalad.troubleShot.tag.serivice.TagService;
import com.orientalSalad.troubleShot.troubleShooting.dto.RequestTroubleShootingDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.RequestTroubleShootingReplyDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.SearchTroubleShootingDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingReplyDTO;
import com.orientalSalad.troubleShot.troubleShooting.entity.CategoryEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingAnswerEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingLikeEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingReplyEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingReplyLikeEntity;
import com.orientalSalad.troubleShot.troubleShooting.mapper.TroubleShootingMapper;
import com.orientalSalad.troubleShot.troubleShooting.repository.TroubleShootingLikeRepository;
import com.orientalSalad.troubleShot.troubleShooting.repository.TroubleShootingReplyLikeRepository;
import com.orientalSalad.troubleShot.troubleShooting.repository.TroubleShootingReplyRepository;
import com.orientalSalad.troubleShot.troubleShooting.repository.TroubleShootingRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class TroubleShootingService {
	private final TroubleShootingMapper troubleShootingMapper;
	private final TroubleShootingRepository troubleShootingRepository;
	private final TroubleShootingReplyRepository troubleShootingReplyRepository;
	private final TroubleShootingLikeRepository troubleShootingLikeRepository;
	private final TroubleShootingReplyLikeRepository troubleShootingReplyLikeRepository;
	private final ObjectConverter<TroubleShootingDTO, TroubleShootingEntity> troubleShootingConverter;
	private final ObjectConverter<TroubleShootingReplyDTO, TroubleShootingReplyEntity> troubleShootingReplyConverter;
	private final CategoryService categoryService;
	private final TagService tagService;

	public boolean insertTroubleShooting(RequestTroubleShootingDTO requestTroubleShootingDTO){
		TroubleShootingEntity troubleShootingEntity = troubleShootingConverter.toEntity(requestTroubleShootingDTO.getTroubleShooting());
		troubleShootingEntity = troubleShootingRepository.save(troubleShootingEntity);

		tagService.attachTag(requestTroubleShootingDTO.getTroubleShooting().getTags(),troubleShootingEntity.getSeq());

		return true;
	}
	public boolean updateTroubleShooting(RequestTroubleShootingDTO requestTroubleShootingDTO) throws Exception{
		//작성자와 로그인 유저 확인
		if(requestTroubleShootingDTO.getLoginSeq() != requestTroubleShootingDTO.getTroubleShooting().getWriter().getSeq()){
			throw new Exception("작성자와 로그인유저가 다릅니다.");
		}

		TroubleShootingDTO troubleShootingDTO = requestTroubleShootingDTO.getTroubleShooting();

		TroubleShootingEntity troubleShootingEntity = troubleShootingRepository.findBySeq(troubleShootingDTO.getSeq());
		troubleShootingEntity.update(troubleShootingDTO);

		troubleShootingEntity = troubleShootingRepository.save(troubleShootingEntity);

		tagService.updateTag(troubleShootingDTO.getTags(),troubleShootingDTO.getSeq());

		return true;
	}
	public boolean deleteTroubleShooting(RequestTroubleShootingDTO requestTroubleShootingDTO) throws Exception{
		TroubleShootingDTO troubleShootingDTO
			= this.findTroubleShootingBySeq(requestTroubleShootingDTO.getTroubleShooting().getSeq(),
			requestTroubleShootingDTO);
		//작성자와 로그인 유저 확인
		if(requestTroubleShootingDTO.getLoginSeq() != troubleShootingDTO.getWriter().getSeq()){
			throw new Exception("작성자와 로그인유저가 다릅니다.");
		}

		//문서 삭제
		TroubleShootingEntity troubleShootingEntity = troubleShootingRepository.findBySeq(troubleShootingDTO.getSeq());
		troubleShootingRepository.delete(troubleShootingEntity);
			
		//태그 삭제
		tagService.deleteTag(troubleShootingDTO.getSeq());

		return true;
	}
	public boolean insertTroubleShooingReply(RequestTroubleShootingReplyDTO requestTroubleShootingReplyDTO) throws
		Exception {
		//작성자와 로그인 유저 확인
		long writerSeq = requestTroubleShootingReplyDTO.getTroubleShootingReply().getWriterSeq();

		if(requestTroubleShootingReplyDTO.getLoginSeq() != writerSeq){
			throw new Exception("작성자와 로그인유저가 다릅니다.");
		}

		TroubleShootingReplyEntity troubleShootingReplyEntity
			= troubleShootingReplyConverter.toEntity(requestTroubleShootingReplyDTO.getTroubleShootingReply());

		troubleShootingReplyRepository.save(troubleShootingReplyEntity);

		return true;
	}
	public boolean updateTroubleShooingReply(RequestTroubleShootingReplyDTO requestTroubleShootingReplyDTO) throws Exception {
		//작성자와 로그인 유저 확인
		long writerSeq = requestTroubleShootingReplyDTO.getTroubleShootingReply().getWriterSeq();
		if(requestTroubleShootingReplyDTO.getLoginSeq() != writerSeq){
			throw new Exception("작성자와 로그인유저가 다릅니다.");
		}

		TroubleShootingReplyEntity replyEntity = troubleShootingReplyRepository.findById(
			requestTroubleShootingReplyDTO.getTroubleShootingReply().getSeq()).orElse(null);

		if(replyEntity == null){
			throw new Exception("잘못된 덧글입니다.");
		}

		replyEntity.update(requestTroubleShootingReplyDTO.getTroubleShootingReply());

		troubleShootingReplyRepository.save(replyEntity);

		return true;
	}
	public boolean deleteTroubleShooingReply(RequestTroubleShootingReplyDTO requestTroubleShootingReplyDTO) throws Exception {
		TroubleShootingReplyEntity replyEntity = troubleShootingReplyRepository.findById(
			requestTroubleShootingReplyDTO.getTroubleShootingReply().getSeq()).orElse(null);

		if(replyEntity == null){
			throw new Exception("잘못된 덧글입니다.");
		}

		//작성자와 로그인 유저 확인

		if(requestTroubleShootingReplyDTO.getLoginSeq() != replyEntity.getWriterSeq()){
			throw new Exception("작성자와 로그인유저가 다릅니다.");
		}

		troubleShootingReplyRepository.delete(replyEntity);

		return true;
	}
	public TroubleShootingDTO findTroubleShootingBySeq(long seq, RequestDTO requestDTO) throws Exception {
		SearchTroubleShootingDTO searchParam = SearchTroubleShootingDTO.builder()
			.troubleSeq(seq)
			.build();
		
		//로그인 좋아요 확인을위한 로그인 유저의 pk 넣기
		if(requestDTO != null){
			searchParam.setLoginSeq(requestDTO.getLoginSeq());
		}

		TroubleShootingDTO troubleShootingDTO = troubleShootingMapper.selectTroubleShootingBySeq(searchParam);

		if(troubleShootingDTO == null){
			throw new Exception(seq+"번 게시물은 없습니다.");
		}

		log.info(troubleShootingDTO.toString());
		troubleShootingDTO.setViewCount(troubleShootingDTO.getViewCount()+1);
		//조회수 증가
		troubleShootingMapper.updateTroubleShootingView(troubleShootingDTO.getSeq());
		
		return troubleShootingDTO;
	}
	public List<TroubleShootingDTO> findTroubleShootingList(
		SearchTroubleShootingDTO searchParam) throws Exception {
		//페이지 번호 기본값
		if(searchParam.getPageNo() == 0){
			searchParam.setPageNo(Pagination.PAGE_NO);
		}

		//페이지 크기 기본값
		if(searchParam.getPageSize() == 0){
			searchParam.setPageSize(Pagination.PAGE_SIZE);
		}

		if(searchParam.getTags() != null){
			Collections.sort(searchParam.getTags());
		}

		int tagSize = searchParam.getTags() !=null ? searchParam.getTags().size() : 0;

		log.info(searchParam.toString());

		List<TroubleShootingDTO> troubleShootingDTOList
			= troubleShootingMapper.selectTroubleShootingList(searchParam,searchParam.getTags(),tagSize);

		return troubleShootingDTOList;
	}
	public Long countTroubleShootingList(SearchTroubleShootingDTO searchParam) throws Exception {
		int tageSize = 0;

		if(searchParam.getTags() != null){
			Collections.sort(searchParam.getTags());
			tageSize = searchParam.getTags().size();
		}

		Long count = troubleShootingMapper.countTroubleShootingList(searchParam,searchParam.getTags(),tageSize);

		return count;
	}
	public boolean updateReplyLike(Long userSeq,Long troubleShootingSeq, Long replySeq) throws Exception {
		TroubleShootingReplyLikeEntity replyLike =
			troubleShootingReplyLikeRepository.findByTroubleSeqEqualsAndReplySeqAndUserSeq(
				troubleShootingSeq,replySeq,userSeq);
		//좋아요 하기
		if(replyLike == null){
			replyLike =	TroubleShootingReplyLikeEntity.builder()
				.troubleSeq(troubleShootingSeq)
				.replySeq(replySeq)
				.userSeq(userSeq)
				.build();
			troubleShootingReplyLikeRepository.save(replyLike);

			TroubleShootingReplyEntity replyEntity = troubleShootingReplyRepository.findById(replySeq).orElse(null);
			replyEntity.increaseLike();
			troubleShootingReplyRepository.save(replyEntity);
		}
		//좋아요 취소
		else{
			troubleShootingReplyLikeRepository.delete(replyLike);
			TroubleShootingReplyEntity replyEntity = troubleShootingReplyRepository.findById(replySeq).orElse(null);
			replyEntity.decreaseLike();
			troubleShootingReplyRepository.save(replyEntity);
		}

		return true;
	}
	public boolean updateTroubleShootingLike(Long userSeq,Long troubleShootingSeq) throws Exception {
		TroubleShootingLikeEntity troubleShootingLike =
			troubleShootingLikeRepository.findByTroubleSeqEqualsAndUserSeq(
				troubleShootingSeq,userSeq);
		//좋아요 하기
		if(troubleShootingLike == null){
			troubleShootingLike =	TroubleShootingLikeEntity.builder()
				.troubleSeq(troubleShootingSeq)
				.userSeq(userSeq)
				.build();
			troubleShootingLikeRepository.save(troubleShootingLike);

			TroubleShootingEntity troubleShootingEntity = troubleShootingRepository.findBySeq(troubleShootingSeq);
			troubleShootingEntity.increaseLike();
			troubleShootingRepository.save(troubleShootingEntity);
		}
		//좋아요 취소
		else{
			troubleShootingLikeRepository.delete(troubleShootingLike);

			TroubleShootingEntity troubleShootingEntity = troubleShootingRepository.findBySeq(troubleShootingSeq);
			troubleShootingEntity.decreaseLike();
			troubleShootingRepository.save(troubleShootingEntity);
		}

		return true;
	}
}

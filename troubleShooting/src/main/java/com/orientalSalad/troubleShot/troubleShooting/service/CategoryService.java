package com.orientalSalad.troubleShot.troubleShooting.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.global.constant.Pagination;
import com.orientalSalad.troubleShot.global.dto.RequestDTO;
import com.orientalSalad.troubleShot.global.utill.ObjectConverter;
import com.orientalSalad.troubleShot.tag.serivice.TagService;
import com.orientalSalad.troubleShot.troubleShooting.dto.CategoryDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.RequestCategoryDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.RequestTroubleShootingDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.RequestTroubleShootingReplyDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.SearchTroubleShootingDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingReplyDTO;
import com.orientalSalad.troubleShot.troubleShooting.entity.CategoryEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingLikeEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingReplyEntity;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingReplyLikeEntity;
import com.orientalSalad.troubleShot.troubleShooting.mapper.TroubleShootingMapper;
import com.orientalSalad.troubleShot.troubleShooting.repository.CategoryRepository;
import com.orientalSalad.troubleShot.troubleShooting.repository.TroubleShootingLikeRepository;
import com.orientalSalad.troubleShot.troubleShooting.repository.TroubleShootingReplyLikeRepository;
import com.orientalSalad.troubleShot.troubleShooting.repository.TroubleShootingReplyRepository;
import com.orientalSalad.troubleShot.troubleShooting.repository.TroubleShootingRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryService {
	private final CategoryRepository categoryRepository;
	private final ObjectConverter<CategoryDTO,CategoryEntity> categoryConverter;

	public List<CategoryDTO> findUserCategoryList(Long userSeq){
		List<CategoryEntity> categoryEntityList = categoryRepository.findByUserSeq(userSeq);

		List<CategoryDTO> categoryDTOList = new ArrayList<>();

		for(int i=0;i<categoryEntityList.size();i++){
			categoryDTOList.add(categoryConverter.toDTO(categoryEntityList.get(i)));
		}

		return categoryDTOList;
	}
	public CategoryDTO findUserCategoryByName(Long userSeq,String name){
		CategoryEntity categoryEntity = categoryRepository.findByUserSeqAndName(userSeq,name);

		if(categoryEntity == null){
			return null;
		}

		CategoryDTO categoryDTO =  categoryConverter.toDTO(categoryEntity);

		return categoryDTO;
	}
	public boolean insertCategory(RequestCategoryDTO requestCategoryDTO) throws Exception{
		CategoryDTO categoryDTO = findUserCategoryByName(requestCategoryDTO.getLoginSeq(),requestCategoryDTO.getCategory().getName());

		if(categoryDTO != null){
			log.info("이미 있는 카테고리입니다.");
			return false;
		}

		log.info("카테고리 추가");

		CategoryEntity categoryEntity = categoryConverter.toEntity(requestCategoryDTO.getCategory());

		categoryRepository.save(categoryEntity);

		return true;
	}
	public boolean updateCategory(RequestCategoryDTO requestCategoryDTO) throws Exception{
		if(requestCategoryDTO.getCategory().getUserSeq() != requestCategoryDTO.getLoginSeq()){
			throw new Exception("로그인 유저와 카테고리 작성자가 다릅니다.");
		}

		CategoryEntity categoryEntity = categoryRepository.findBySeq(requestCategoryDTO.getCategory().getSeq());

		if(categoryEntity == null){
			throw new Exception("없는 카테고리 입니다.");
		}

		categoryEntity.update(requestCategoryDTO.getCategory());

		categoryRepository.save(categoryEntity);

		return true;
	}
	public boolean deleteCategory(RequestCategoryDTO requestCategoryDTO) throws Exception {
		if(requestCategoryDTO.getCategory().getUserSeq() != requestCategoryDTO.getLoginSeq()){
			throw new Exception("로그인 유저와 카테고리 작성자가 다릅니다.");
		}

		CategoryEntity categoryEntity = categoryRepository.findBySeq(requestCategoryDTO.getCategory().getSeq());

		if(categoryEntity == null){
			throw new Exception("없는 카테고리 입니다.");
		}

		categoryRepository.delete(categoryEntity);
		return true;
	}
}

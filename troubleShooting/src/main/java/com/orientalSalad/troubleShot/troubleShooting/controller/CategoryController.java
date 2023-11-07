package com.orientalSalad.troubleShot.troubleShooting.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.orientalSalad.troubleShot.global.dto.RequestDTO;
import com.orientalSalad.troubleShot.global.dto.ResultDTO;
import com.orientalSalad.troubleShot.global.utill.Authentication;
import com.orientalSalad.troubleShot.troubleShooting.dto.CategoryDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.RequestCategoryDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.RequestTroubleShootingAnswerDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.ResponseCategoryListDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingAnswerDTO;
import com.orientalSalad.troubleShot.troubleShooting.service.CategoryService;
import com.orientalSalad.troubleShot.troubleShooting.service.TroubleShootingAnswerService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Tag(name = "카테고리 API")
@Controller
@RequestMapping("users/{userSeq}/categories")
@RequiredArgsConstructor
@Log4j2
public class CategoryController {
	private final CategoryService categoryService;
	private final Authentication authentication;

	@Operation(summary = "카테고리 등록",description = "입력 DTO :RequestCategoryDTO")
	@PostMapping("")
	public ResponseEntity<?> insertCategory(
		HttpServletRequest request,
		@PathVariable(name = "userSeq") Long userSeq,
		@RequestBody RequestCategoryDTO requestCategoryDTO) throws Exception {
		log.info("====== 카테고리 등록 시작 =====");
		log.info(requestCategoryDTO.toString());

		//로그인 확인
		authentication.checkLogin(request, requestCategoryDTO);
		//카테고리 등록
		categoryService.insertCategory(requestCategoryDTO);

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message("카테고리 등록이 성공했습니다.")
			.build();
		
		log.info("====== 슈팅 카테고리 등록 끝 =====");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.OK);
	}
	@Operation(summary = "카테고리 삭제",description = "입력 DTO :RequestDTO")
	@DeleteMapping("/{categorySeq}")
	public ResponseEntity<?> deleteCategory(
		HttpServletRequest request,
		@RequestBody RequestDTO requestDTO,
		@PathVariable(name = "userSeq") Long userSeq,
		@PathVariable(name = "categorySeq") Long categorySeq) throws
		Exception {
		log.info("====== 카테고리 삭제 시작 =====");
		log.info(requestDTO);

		//로그인 확인
		authentication.checkLogin(request,requestDTO);
		//pk 설정
		RequestCategoryDTO requestCategoryDTO
			= RequestCategoryDTO.builder()
			.loginSeq(requestDTO.getLoginSeq())
			.type(requestDTO.getType())
			.category(CategoryDTO.builder()
				.seq(categorySeq)
				.userSeq(userSeq)
				.build())
			.build();
		//카테고리 삭제
		categoryService.deleteCategory(requestCategoryDTO);

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message(categorySeq+"번 카테고리 삭제를 성공했습니다.")
			.build();

		log.info("====== 카테고리 삭제 끝 =====");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.OK);
	}
	@Operation(summary = "카테고리 수정",description = "입력 DTO :RequestCategoryDTO")
	@PutMapping("/{categorySeq}")
	public ResponseEntity<?> updateCategory(
		HttpServletRequest request,
		@PathVariable(name = "userSeq") Long userSeq,
		@RequestBody RequestCategoryDTO requestCategoryDTO,
		@PathVariable(name = "categorySeq") Long categorySeq) throws
		Exception {
		log.info("====== 카테고리 수정 시작 =====");
		log.info(requestCategoryDTO);
		//로그인 확인
		authentication.checkLogin(request,requestCategoryDTO);
		//pk 설정
		requestCategoryDTO.getCategory().setSeq(categorySeq);
		requestCategoryDTO.getCategory().setUserSeq(userSeq);
		//카테고리 수정
		categoryService.updateCategory(requestCategoryDTO);

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message("카테고리 수정이 성공했습니다.")
			.build();

		log.info("====== 카테고리 수정 끝 =====");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.OK);
	}
	@Operation(summary = "카테고리 목록")
	@GetMapping("")
	public ResponseEntity<?> getCategoryList(
		HttpServletRequest request,
		@PathVariable(name = "userSeq") Long userSeq) throws Exception {
		log.info("====== 카테고리 목록 불러오기 시작 =====");

		List<CategoryDTO> categoryDTOList = categoryService.findUserCategory(userSeq);

		ResponseCategoryListDTO resultDTO = ResponseCategoryListDTO.builder()
			.success(true)
			.message("카테고리 목록 불러오기를 성공했습니다.")
			.categoryList(categoryDTOList)
			.build();

		log.info("====== 카테고리 목록 불러오기 끝 =====");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.OK);
	}
}

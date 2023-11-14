package com.orientalSalad.troubleShot.member.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orientalSalad.troubleShot.global.dto.RequestDTO;
import com.orientalSalad.troubleShot.global.dto.ResultDTO;
import com.orientalSalad.troubleShot.global.utill.Authentication;
import com.orientalSalad.troubleShot.global.utill.Validation;
import com.orientalSalad.troubleShot.member.dto.MemberDTO;
import com.orientalSalad.troubleShot.member.dto.RequestMemberDTO;
import com.orientalSalad.troubleShot.member.dto.ResponseMemberDTO;
import com.orientalSalad.troubleShot.member.dto.ResponseMemberListDTO;
import com.orientalSalad.troubleShot.member.dto.SearchMemberDTO;
import com.orientalSalad.troubleShot.member.service.MemberService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping(path = "/members")
@RequiredArgsConstructor
@Log4j2
public class MemberController {
	private final MemberService memberService;
	private final Validation memberValidation;
	private final Authentication authentication;

	@Operation(summary = "회원가입 API",
		description =
			"입력 DTO : MemberDTO\n"+
				"필수 값 : "
				+ "이메일, 비밀번호, 닉네임, 국적")
	@PostMapping()
	public ResponseEntity<?> insertMember(@RequestBody MemberDTO memberDTO) throws Exception{
		log.info("==== 유저 회원가입 시작 ====");
		log.info(memberDTO);

		if(!memberValidation.validate(memberDTO)){
			throw new Exception("올바르지 않은 필드 값입니다.");
		}

		if(memberDTO.getLocale() == null || memberDTO.getLocale().equals("")){
			memberDTO.setLocale("KO_KR");
		}

		if(memberDTO.getProfileImg() == null || memberDTO.getProfileImg().equals("")){
			memberDTO.setProfileImg("https://k9d205-troubleshot.s3.ap-northeast-2.amazonaws.com/trouble/DefaultImg.png");
		}

		Boolean success = memberService.insertMember(memberDTO);

		//회원가입이 실패하면(이메일 중복)
		if(!success){
			ResultDTO resultDTO = ResultDTO.builder()
				.success(false)
				.message(memberDTO.getEmail()+"은 이미 존재하는 이메일 입니다.")
				.build();

			return new ResponseEntity<>("success", HttpStatus.ACCEPTED);
		}

		//회원가입이 성공하면
		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message(memberDTO.getEmail()+" 유저의 회원가입이 성공했습니다.")
			.build();

		log.info("==== 유저 회원가입 끝 ====");
		return new ResponseEntity<>("success", HttpStatus.ACCEPTED);
	}

	@Operation(summary = "유저 pk로 유저의 정보를 가져오는 API")
	@GetMapping("/{userSeq}")
	public ResponseEntity<?> findMemberBySeq (
		@PathVariable(name = "userSeq") Long userSeq){
		log.info("==== 유저 찾기 시작 ====");

		MemberDTO memberDTO = memberService.findMemberBySeq(userSeq);
		memberDTO.setPassword("");

		log.info(memberDTO);

		ResponseMemberDTO resultDTO = ResponseMemberDTO.builder()
			.success(true)
			.message(userSeq+"번 유저 탐색을 성공했습니다.")
			.member(memberDTO)
			.build();

		log.info("==== 유저 찾기 끝 ====");
		return new ResponseEntity<>(resultDTO, HttpStatus.OK);
	}
	@Operation(summary = "회원정보 수정")
	@PutMapping("/{userSeq}")
	public ResponseEntity<?> updateMember (
		@PathVariable(name = "userSeq") Long userSeq,
		@RequestBody RequestMemberDTO requestMemberDTO,
		HttpServletRequest request) throws Exception {
		log.info("==== 회원 정보 변경 시작 ====");
		log.info(requestMemberDTO.toString());

		//로그인 확인
		authentication.checkLogin(request, requestMemberDTO);

		MemberDTO memberDTO = memberService.updateMember(requestMemberDTO);

		log.info(memberDTO);

		log.info("==== 회원 정보 변경 끝 ====");
		return new ResponseEntity<>("success", HttpStatus.ACCEPTED);
	}
	@Operation(summary = "회원정보 삭제")
	@DeleteMapping("/{userSeq}")
	public ResponseEntity<?> deleteMember (
		@PathVariable(name = "userSeq") Long userSeq,
		@ModelAttribute RequestDTO requestDTO,
		HttpServletRequest request) throws Exception {
		log.info("==== 회원 정보 삭제 시작 ====");
		//로그인 확인
		authentication.checkLogin(request, requestDTO);

		memberService.deleteMember(requestDTO,userSeq);

		log.info("==== 회원 정보 삭제 끝 ====");
		return new ResponseEntity<>("success", HttpStatus.ACCEPTED);
	}
	@Operation(summary = "회원 검색")
	@GetMapping("")
	public ResponseEntity<?> findMember (
		@ModelAttribute SearchMemberDTO searchMemberDTO) throws Exception {
		log.info("==== 회원 목록 검색 시작 ====");

		List<MemberDTO> memberDTOList =  memberService.findMemberByNickName(searchMemberDTO);

		ResponseMemberListDTO resultDTO = ResponseMemberListDTO.builder()
			.success(true)
			.message(searchMemberDTO.getNickname()+"로 유저 검색을 성공했습니다.")
			.memberList(memberDTOList)
			.build();


		log.info("==== 회원 목록 검색 끝 ====");
		return new ResponseEntity<>(resultDTO, HttpStatus.ACCEPTED);
	}
}
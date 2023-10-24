package com.orientalSalad.troubleShot.global.advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.orientalSalad.troubleShot.global.dto.ResultDTO;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class ErrorControllerAdvice {

	@ExceptionHandler
	public ResponseEntity<ResultDTO> errorHandler(Exception e){
		log.info("==== 에러 발생 ====");
		e.printStackTrace();;

		ResultDTO resultDTO = ResultDTO.builder()
							.success(false)
							.message(e.getMessage())
							.build();

		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}

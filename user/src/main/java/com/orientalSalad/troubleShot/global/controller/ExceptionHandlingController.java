// package com.orientalSalad.troubleShot.global.controller;
//
// import org.springframework.boot.web.servlet.error.ErrorController;
// import org.springframework.http.HttpStatus;
// import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.servlet.HandlerMapping;
//
// import jakarta.servlet.RequestDispatcher;
// import jakarta.servlet.http.HttpServletRequest;
// import lombok.extern.slf4j.Slf4j;
//
// @Slf4j
// @RestController
// public class ExceptionHandlingController implements ErrorController {
//
// 	@RequestMapping(value = "/error")
// 	public String handleError(HttpServletRequest request, Model model){
// 		// 에러 코드를 획득한다.
// 		Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
// 		String path = (String)request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
// 		log.info(request.getRequestURI());
//
// 		return path;
// 	}
// }

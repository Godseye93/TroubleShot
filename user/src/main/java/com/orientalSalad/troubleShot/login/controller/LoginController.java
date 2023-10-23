package com.orientalSalad.troubleShot.login.controller;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping(path = "/login")
@RequiredArgsConstructor
@Log4j2
public class LoginController {

	@PostMapping("/login")
	public ResponseEntity<?> login(){
		return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
	}
	@PostMapping("/logout")
	public ResponseEntity<?> logout(){
		return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
	}
}

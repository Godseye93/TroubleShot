package com.orientalSalad.troubleShot.GPTController.controller;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.reactive.function.client.WebClient;

import com.orientalSalad.troubleShot.GPTController.dto.RequestReadMeDTO;
import com.orientalSalad.troubleShot.GPTController.dto.ResponseMessageDTO;
import com.orientalSalad.troubleShot.global.dto.RequestGPTDTO;
import com.orientalSalad.troubleShot.global.dto.ResponseGPTDTO;
import com.orientalSalad.troubleShot.global.dto.ResponseGPTMessageDTO;
import com.orientalSalad.troubleShot.global.dto.ResultDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "gpt API")
@Controller
@RequestMapping("/gpt")
@RequiredArgsConstructor
@Slf4j
public class GPTController {
	@Value("${gpt-key}")
	String gptKey;

	@Operation(summary = "문서 피드백",description = "입력 DTO :RequestReadMeDTO, "
		+ "300자 이내의 조언을 줌 "
		+ "\n주의 : gpt-4라서 시간이 오래 걸릴수 있음(최대 50초 제한)")
	@PostMapping("/feedback")
	public ResponseEntity<?> feedback(@RequestBody RequestReadMeDTO requestReadMeDTO) throws Exception {
		log.info("====== 문서 피드백 시작 =====");
		log.info(requestReadMeDTO.toString());
		String[] splited = requestReadMeDTO.getContext().split(" |\n");
		if(splited.length >= 3000){
			throw new Exception("내용이 너무 깁니다.(3000 토큰 제한)");
		}

		String order = "\n위의 글을 더 좋은 트러블슈팅 문서로 바꿔주고 싶어. "
			+ "어느 부분을 수정해야 할까? "
			+ "이때 너의 조언은 200자가 넘으면 안돼";

		String uri = "https://api.openai.com/v1/chat/completions";
		String key = "Bearer "+gptKey;
		List<ResponseGPTMessageDTO> messages = new ArrayList<>();

		//메시지 생성
		messages.add(ResponseGPTMessageDTO.builder()
			.content(requestReadMeDTO.getContext()+"\n"+order)
			.role("user")
			.build());

		//요청 변ㅅ누 생성
		RequestGPTDTO request = RequestGPTDTO.builder()
			.model("gpt-4")
			.messages(messages)
			.build();

		WebClient webClient = WebClient.create();

		ResponseGPTDTO response = webClient.post()
			.uri(uri)
			.header("Authorization",key)
			.bodyValue(request)
			.retrieve()
			.bodyToMono(ResponseGPTDTO.class)
			.timeout(Duration.ofSeconds(50))
			.block();

		ResponseMessageDTO resultDTO = ResponseMessageDTO.builder()
			.context(response.getChoices().get(0).getMessage().getContent())
			.success(true)
			.message("gpt 문서 조언을 성공했습니다")
			.build();

		log.info("====== 문서 피드백 끝 =====");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.OK);
	}
}

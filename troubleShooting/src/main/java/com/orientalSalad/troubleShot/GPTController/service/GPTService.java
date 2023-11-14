package com.orientalSalad.troubleShot.GPTController.service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.orientalSalad.troubleShot.global.dto.RequestGPTDTO;
import com.orientalSalad.troubleShot.global.dto.ResponseGPTDTO;
import com.orientalSalad.troubleShot.global.dto.ResponseGPTMessageDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class GPTService {
	@Value("${gpt-key}")
	String gptKey;

	private String uri = "https://api.openai.com/v1/chat/completions";

	public String getMessage(String context,String order) throws Exception{
		if(!checkLimitLength(context)){
			throw new Exception("글자수가 너무 깁니다.(최대 3000토큰 제한)");
		}

		String key = "Bearer "+gptKey;
		List<ResponseGPTMessageDTO> messages = new ArrayList<>();

		//메시지 생성
		messages.add(ResponseGPTMessageDTO.builder()
			.content(context+"\n"+order)
			.role("user")
			.build());

		//요청 변수 생성
		RequestGPTDTO request = RequestGPTDTO.builder()
			.model("gpt-4-1106-preview")
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

		return response.getChoices().get(0).getMessage().getContent();
	}

	public boolean checkLimitLength(String context){
		String[] splited = context.split(" |\n");
		if(splited.length >= 3000){
			return false;
		}

		return true;
	}
}

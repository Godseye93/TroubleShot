package com.orientalSalad.troubleShot.GPTController.service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.orientalSalad.troubleShot.GPTController.dto.RequestContextDTO;
import com.orientalSalad.troubleShot.global.dto.RequestDTO;
import com.orientalSalad.troubleShot.global.dto.RequestGPTDTO;
import com.orientalSalad.troubleShot.global.dto.ResponseGPTDTO;
import com.orientalSalad.troubleShot.global.dto.ResponseGPTMessageDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class GPTService {
	private final RedisTemplate redisTemplate;

	@Value("${gpt-key}")
	String gptKey;

	@Value("${gpt-count}")
	Integer limit;

	private String uri = "https://api.openai.com/v1/chat/completions";

	public String getMessage(RequestContextDTO requestContextDTO,String order) throws Exception{
		String answer = "";
		String context = requestContextDTO.getContext();
		HashOperations hashOperations = redisTemplate.opsForHash();;
		String redisKey = "gpt";
		String hashKey = requestContextDTO.getLoginSeq()+"_"+requestContextDTO.getType();
		Integer count = (Integer)hashOperations.get(redisKey,hashKey);

		if(count == null){
			count = 0;
			hashOperations.put(redisKey,hashKey,count);
		}else if(count >= limit){
			answer = "일일 요청 제한를 초과했습니다.";
			return answer;
		}

		try {
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

			// log.info(response.toString());

			answer = response.getChoices().get(0).getMessage().getContent();

			// log.info(answer);
			hashOperations.put(redisKey,hashKey,count+1);
		}catch (Exception e){
			e.printStackTrace();
			answer = "서버 장애로 답변을 받을 수 없습니다.";
		}

		return answer;
	}

	public int getCount(RequestDTO requestDTO){
		HashOperations hashOperations = redisTemplate.opsForHash();;
		String redisKey = "gpt";
		String hashKey = requestDTO.getLoginSeq()+"_"+requestDTO.getType();
		Integer count = (Integer)hashOperations.get(redisKey,hashKey);

		if(count == null){
			count = limit;
		}else{
			count = limit - count;
		}

		return count;
	}

	public boolean checkLimitLength(String context){
		String[] splited = context.split(" |\n");
		if(splited.length >= 3000){
			return false;
		}

		return true;
	}

}

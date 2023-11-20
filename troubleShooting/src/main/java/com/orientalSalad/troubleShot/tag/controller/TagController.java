package com.orientalSalad.troubleShot.tag.controller;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.reactive.function.client.WebClient;

import com.orientalSalad.troubleShot.global.dto.RequestGPTDTO;
import com.orientalSalad.troubleShot.global.dto.ResponseGPTDTO;
import com.orientalSalad.troubleShot.global.dto.ResponseGPTMessageDTO;
import com.orientalSalad.troubleShot.global.dto.ResultDTO;
import com.orientalSalad.troubleShot.tag.serivice.TagService;
import com.orientalSalad.troubleShot.troubleShooting.entity.TroubleShootingEntity;
import com.orientalSalad.troubleShot.troubleShooting.repository.TroubleShootingRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@RequestMapping("/tags")
@RequiredArgsConstructor
@Log4j2
public class TagController {
	private final TagService tagService;
	private final TroubleShootingRepository troubleShootingRepository;

	@Value("${gpt-key}")
	String gptKey;

	@GetMapping("/set-ori")
	public ResponseEntity<?> makeTag(){
		log.info("====== 기존 트러블 슈팅 문서 태그 시작 =====");

		// long totalCount = troubleShootingRepository.count();
		long totalCount = 10;
		int count = 0;
		String order = "\n위의 문장들은 에러나 오류를 해결하거나 기술적인 내용을 적어놓은 트러블슈팅 문서 내용이야. 문장에 나온 단어들중 기술 이름이나 기술적인 요소가 담긴 단어를 찾고 싶어. 이때  아래의 조건을 맞춰서 알려줘\n"
			+ "\n"
			+ "1. 너가 말하는 단어의 개수는 최대 3개야\n"
			+ "2. 설명과 괄호없이 단어만 알려줘\n"
			+ "3. 모든 단어의 구분자는 ,로 구분해줘\n"
			+ "4. 만약 키워드가 없으면 아무것도 말하지 말하줘\n"
			+ "5. 너의 응답은 단답식으로 말해야해\n"
			+ "\n"
			+ "예를 들어 너가 찾은 단어가 리액트, 스프링, 크롬이면 결과값은\n"
			+ "[리액트, 스프링, 크롬]\n"
			+ "이야. 꼭 위의 양식에 지켜서 말해줘";
		String uri = "https://api.openai.com/v1/chat/completions";

		while(count < totalCount){
			List<TroubleShootingEntity> troubleShootingEntityList
				=  troubleShootingRepository.findTop10ByLength();
			if(troubleShootingEntityList == null){
				log.info("태그를 만들 게시물이 없습니다.");
				break;
			}

			for(TroubleShootingEntity troubleShootingEntity : troubleShootingEntityList){
				log.info(count+"번째 태그 생성");
				log.info("============="+troubleShootingEntity.getSeq()+" : "+troubleShootingEntity.getCategory()+"=============");
				log.info(troubleShootingEntity.getContext());
					try{
						List<ResponseGPTMessageDTO> messages = new ArrayList<>();

						String context = troubleShootingEntity.getTitle()+" \n "+ troubleShootingEntity.getContext();
						String [] splited = context.split(" |\n");


						StringBuilder sb = new StringBuilder();

						for(int i=0; i< 3000 && i< splited.length;i++){
							sb.append(splited[i]);
						}

						messages.add(ResponseGPTMessageDTO.builder()
							.content(sb.toString()+"\n"+order)
							.role("user")
							.build());

						RequestGPTDTO request = RequestGPTDTO.builder()
							.model("gpt-3.5-turbo")
							.messages(messages)
							.build();

						WebClient webClient = WebClient.create();


						ResponseGPTDTO response = webClient.post()
							.uri(uri)
							.header("Authorization","Bearer "+gptKey)
							.bodyValue(request)
							.retrieve()
							.bodyToMono(ResponseGPTDTO.class)
							.timeout(Duration.ofSeconds(10))
							.block();

						log.info("응답 결과");
						log.info(response);

						String content = response.getChoices().get(0).getMessage().getContent();

						log.info("생성된 태그");
						int start = content.indexOf("[");
						int end = content.indexOf("]");

						log.info("받은 태그 : "+content);

						List<String> tagList = new ArrayList<>();
						if(start < 0 && content.contains(",")){
							tagList =  Arrays.asList(
								Arrays.stream(content.split(","))
									.map(x->String.valueOf(x))
									.map(String::trim)
									.toArray(String[]::new)
							);
						}
						else if(content.contains(",")){
							tagList =  Arrays.asList(content.substring(start+1,end).split(","));

						}else{
							tagList.add(content.substring(start+1,end));
						}
						List<String> trimTagList = new ArrayList<>();
						for(String tag : tagList){
							trimTagList.add(tag.trim());
							if(trimTagList.size()>3){
								break;
							}
						}

						tagService.attachTag(trimTagList,troubleShootingEntity.getSeq());
						troubleShootingEntity.updateTaged();
						troubleShootingRepository.save(troubleShootingEntity);
						log.info("태그 저장 끝");
					}catch (Exception e){
						e.printStackTrace();
					}
					count++;
			}
		}

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message("기존 트러블 슈팅 문서 태그가 성공했습니다.")
			.build();

		log.info("====== 기존 트러블 슈팅 문서 태그 끝 =====");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.ACCEPTED);
	}
}

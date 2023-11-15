package com.orientalSalad.troubleShot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@SpringBootApplication
@EnableCaching
@EnableScheduling
public class TroubleShootingApplication {
	public static void main(String[] args) {
		SpringApplication.run(TroubleShootingApplication.class, args);

	}

	@Scheduled(fixedDelay = 10000) // 10s에 한번씩 실행
	@CacheEvict(value = {"troubleShootingInfo","troubleShooting","troubleShootingList","countTroubleShooting"}, allEntries = true) // 캐시 제거
	public void cacheInitialization(){}
}
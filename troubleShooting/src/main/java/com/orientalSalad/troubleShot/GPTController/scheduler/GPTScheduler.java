package com.orientalSalad.troubleShot.GPTController.scheduler;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;


public class GPTScheduler {
	RedisTemplate redisTemplate;

	@Scheduled(cron = "0 0 0 * * ?")
	public void removeCount(){
		redisTemplate.delete("gpt");
	}
}

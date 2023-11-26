package com.orientalSalad.troubleShot.email.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class RedisAuthCodeConfig {
	private final RedisConnectionFactory redisConnectionFactory;

	// @Bean
	// public RedisTemplate<String, Object> redisTemplate(){
	// 	RedisTemplate<String,Object> redisTemplate = new RedisTemplate<>();
	//
	// 	redisTemplate.setConnectionFactory(redisConnectionFactory);
	//
	// 	redisTemplate.setKeySerializer(new StringRedisSerializer());
	// 	redisTemplate.setHashKeySerializer(new StringRedisSerializer());
	// 	redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer());
	// 	redisTemplate.setHashValueSerializer(new GenericJackson2JsonRedisSerializer());
	//
	// 	return redisTemplate;
	// }
}

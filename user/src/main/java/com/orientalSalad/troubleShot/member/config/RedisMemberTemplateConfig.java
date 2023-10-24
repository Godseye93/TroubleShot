package com.orientalSalad.troubleShot.member.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericToStringSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.fasterxml.jackson.databind.ser.std.StringSerializer;
import com.orientalSalad.troubleShot.member.dto.MemberDTO;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class RedisMemberTemplateConfig {
	private final RedisConnectionFactory connectionFactory;

	// @Bean
	// public RedisTemplate<Long, MemberDTO> RedisMemberTemplate(){
	// 	RedisTemplate<Long,MemberDTO> redisTemplate = new RedisTemplate<>();
	//
	// 	redisTemplate.setConnectionFactory(connectionFactory);
	//
	// 	redisTemplate.setKeySerializer(new StringRedisSerializer());
	// 	redisTemplate.setHashKeySerializer(new StringRedisSerializer());
	// 	redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(MemberDTO.class));
	// 	redisTemplate.setHashValueSerializer(new Jackson2JsonRedisSerializer<>(MemberDTO.class));
	//
	// 	return redisTemplate;
	// }
}

package com.orientalSalad.troubleShot.global.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.extern.slf4j.Slf4j;

@EnableCaching
@Configuration
@Slf4j
public class CacheConfig {
	@Bean
	public CacheManager cacheManager() {
		log.info("[+] CacheConfig Start !!! ");
		return new ConcurrentMapCacheManager("troubleShooting");
	}
}

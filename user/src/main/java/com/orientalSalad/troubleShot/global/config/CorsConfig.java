package com.orientalSalad.troubleShot.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true); //쿠키 및 헤더에 값을 넣기 위해 설정
		config.addAllowedOrigin("http://localhost:5501");
		config.addAllowedOrigin("http://127.0.0.1:5501");
		config.addAllowedOrigin("https://localhost:5501");
		config.addAllowedOrigin("https://127.0.0.1:5501");

		config.addAllowedOrigin("http://localhost:3000");
		config.addAllowedOrigin("http://127.0.0.1:3000");
		config.addAllowedOrigin("https://localhost:3000");
		config.addAllowedOrigin("https://127.0.0.1:3000");

		config.addAllowedOrigin("https://k9d205.p.ssafy.io:3000");
		config.addAllowedOrigin("http://k9d205.p.ssafy.io:3000");
		config.addAllowedOrigin("https://k9d205.p.ssafy.io");
		config.addAllowedOrigin("http://k9d205.p.ssafy.io");

		config.addAllowedOrigin("https://orientalsalad.kro.kr:3000");
		config.addAllowedOrigin("https://orientalsalad.kro.kr:80");
		config.addAllowedOrigin("http://orientalsalad.kro.kr:3000");
		config.addAllowedOrigin("http://orientalsalad.kro.kr:80");

		config.addAllowedOrigin("https://orientalsalad.kro.kr");
		config.addAllowedOrigin("http://orientalsalad.kro.kr");

		config.addAllowedHeader("*");
		config.addAllowedMethod("*");

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);

		return new CorsFilter(source);
	}
}

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
		config.setAllowCredentials(true);
		config.addAllowedOrigin("http://localhost:5500");
		config.addAllowedOrigin("http://127.0.0.1:5500");
		config.addAllowedOrigin("https://localhost:5500");
		config.addAllowedOrigin("https://127.0.0.1:5500");

		config.addAllowedOrigin("http://127.0.0.1:3000");
		config.addAllowedOrigin("http://127.0.0.1:3000");

		config.addAllowedHeader("*");
		config.addAllowedMethod("*");

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);

		return new CorsFilter(source);
	}
}

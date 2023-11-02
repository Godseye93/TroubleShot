package com.orientalSalad.troubleShot.crawling.entity;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "velog_data")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class VelogDataEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long seq;
	@Column(columnDefinition = "TEXT")
	private String url;
	@Column(columnDefinition = "TEXT")
	private String title;
	@Column(columnDefinition = "TEXT")
	private String context;
	private boolean crawling;
	@ColumnDefault("false")
	private boolean error;
}

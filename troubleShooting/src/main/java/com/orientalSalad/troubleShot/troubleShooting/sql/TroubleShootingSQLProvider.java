package com.orientalSalad.troubleShot.troubleShooting.sql;

import org.apache.ibatis.jdbc.SQL;
import org.springframework.stereotype.Component;

import com.orientalSalad.troubleShot.global.constant.Pagination;
import com.orientalSalad.troubleShot.global.constant.TroubleShootingOrder;
import com.orientalSalad.troubleShot.troubleShooting.dto.SearchTroubleShootingDTO;

@Component
public class TroubleShootingSQLProvider {
	public String findTroubleShootingList(SearchTroubleShootingDTO searchParam){
		String sql = new SQL(){{
			SELECT("ts.seq AS seq, ts.title AS title, ts.context AS context, ts.solved AS solved, "
				+ "ts.create_time AS create_time, ts.update_time AS update_time, ts.delete_time AS delete_time, "
				+ "ts.view_count AS view_count, ts.like_count AS like_count, ts.reply_count AS reply_count, "
				+ "m.seq AS writer_seq, m.nickname AS writer_nickname, m.email AS writer_email, m.profile_img AS writer_profile_img ");
			FROM("trouble_shooting ts, member m");
			WHERE("ts.writer_seq = m.seq");
			
			//작성자 검색
			if(searchParam.getWriter() != null){
				WHERE("m.nickname LIKE CONCAT('%',#{searchParam.writer},'%')");
			}
			
			//해결된건지 확인
			if(searchParam.getSolved() != null){
				WHERE("ts.solved = #{searchParam.solved}");
			}

			//검색어 추가
			if(searchParam.getKeyword() != null){
				System.out.println("키워드 검색");
				WHERE("ts.title LIKE CONCAT('%','"+searchParam.getKeyword()+"','%')");
				WHERE("ts.context LIKE CONCAT('%','"+searchParam.getKeyword()+"','%')");
			}

			if(searchParam.getStartTime() != null){
				WHERE("ts.create_time >= #{searchParam.startTime}");
			}
			if(searchParam.getEndTime() != null){
				WHERE("ts.create_time <= #{searchParam.endTime}");
			}
			//페이지 번호 기본값
			if(searchParam.getPageNo() == 0){
				searchParam.setPageNo(Pagination.PAGE_NO);
			}

			//페이지 크기 기본값
			if(searchParam.getPageSize() == 0){
				searchParam.setPageSize(Pagination.PAGE_SIZE);
			}

			//정렬
			if(searchParam.getOrder()== TroubleShootingOrder.VIEW){
				ORDER_BY("ts.view_count DESC");
			}else if(searchParam.getOrder()==TroubleShootingOrder.LIKE){
				ORDER_BY("ts.like_count DESC");
			}else if(searchParam.getOrder() == TroubleShootingOrder.REPLY){
				ORDER_BY("ts.reply_count DESC");
			}else{
				ORDER_BY("ts.create_time DESC");
			}

			//페이지내이션
			LIMIT(searchParam.getPageSize());
			OFFSET((searchParam.getPageNo() - 1) * searchParam.getPageSize());
		}}.toString();

		System.out.println(sql);

		return sql;
	}
	public String findTroubleShootingListByUserSeq(SearchTroubleShootingDTO searchParam,Long userSeq){
		String sql = new SQL(){{
			SELECT("ts.seq AS seq, ts.title AS title, ts.context AS context, ts.solved AS solved, "
				+ "ts.create_time AS create_time, ts.update_time AS update_time, ts.delete_time AS delete_time, "
				+ "ts.view_count AS view_count, ts.like_count AS like_count, ts.reply_count AS reply_count, "
				+ "m.seq AS writer_seq, m.nickname AS writer_nickname, m.email AS writer_email, m.profile_img AS writer_profile_img ");
			FROM("trouble_shooting ts, member m");
			WHERE("ts.writer_seq = #{userSeq}");
			WHERE("ts.writer_seq = m.seq");

			//해결된건지 확인
			if(searchParam.getSolved() != null){
				WHERE("ts.solved = #{searchParam.solved}");
			}

			//검색어 추가
			if(searchParam.getKeyword() != null){
				System.out.println("키워드 검색");
				WHERE("ts.title LIKE CONCAT('%','"+searchParam.getKeyword()+"','%')");
				WHERE("ts.context LIKE CONCAT('%','"+searchParam.getKeyword()+"','%')");
			}

			if(searchParam.getStartTime() != null){
				WHERE("ts.create_time >= #{searchParam.startTime}");
			}
			if(searchParam.getEndTime() != null){
				WHERE("ts.create_time <= #{searchParam.endTime}");
			}
			//페이지 번호 기본값
			if(searchParam.getPageNo() == 0){
				searchParam.setPageNo(Pagination.PAGE_NO);
			}

			//페이지 크기 기본값
			if(searchParam.getPageSize() == 0){
				searchParam.setPageSize(Pagination.PAGE_SIZE);
			}

			//정렬
			if(searchParam.getOrder()== TroubleShootingOrder.VIEW){
				ORDER_BY("ts.view_count DESC");
			}else if(searchParam.getOrder()==TroubleShootingOrder.LIKE){
				ORDER_BY("ts.like_count DESC");
			}else if(searchParam.getOrder() == TroubleShootingOrder.REPLY){
				ORDER_BY("ts.reply_count DESC");
			}else{
				ORDER_BY("ts.create_time DESC");
			}

			//페이지내이션
			LIMIT(searchParam.getPageSize());
			OFFSET((searchParam.getPageNo() - 1) * searchParam.getPageSize());
		}}.toString();

		System.out.println(sql);

		return sql;
	}

	public String countTroubleShootingList(SearchTroubleShootingDTO searchParam){
		String sql = new SQL(){{
			SELECT("count(*) ");
			FROM("trouble_shooting ts, member m");
			WHERE("ts.writer_seq = m.seq");

			//작성자 검색
			if(searchParam.getWriter() != null){
				WHERE("m.nickname LIKE CONCAT('%',#{searchParam.writer},'%')");
			}

			//해결된건지 확인
			if(searchParam.getSolved() != null){
				WHERE("ts.solved = #{searchParam.solved}");
			}

			//검색어 추가
			if(searchParam.getKeyword() != null){
				System.out.println("키워드 검색");
				WHERE("ts.title LIKE CONCAT('%','"+searchParam.getKeyword()+"','%')");
				WHERE("ts.context LIKE CONCAT('%','"+searchParam.getKeyword()+"','%')");
			}

			if(searchParam.getStartTime() != null){
				WHERE("ts.create_time >= #{searchParam.startTime}");
			}
			if(searchParam.getEndTime() != null){
				WHERE("ts.create_time <= #{searchParam.endTime}");
			}
		}}.toString();

		System.out.println(sql);

		return sql;
	}
	public String countTroubleShootingListByUserSeq(SearchTroubleShootingDTO searchParam,Long userSeq){
		String sql = new SQL(){{
			SELECT("count(*) ");
			FROM("trouble_shooting ts, member m");
			WHERE("ts.writer_seq = #{userSeq}");
			WHERE("ts.writer_seq = m.seq");

			//해결된건지 확인
			if(searchParam.getSolved() != null){
				WHERE("ts.solved = #{searchParam.solved}");
			}

			//검색어 추가
			if(searchParam.getKeyword() != null){
				System.out.println("키워드 검색");
				WHERE("ts.title LIKE CONCAT('%','"+searchParam.getKeyword()+"','%')");
				WHERE("ts.context LIKE CONCAT('%','"+searchParam.getKeyword()+"','%')");
			}

			if(searchParam.getStartTime() != null){
				WHERE("ts.create_time >= #{searchParam.startTime}");
			}
			if(searchParam.getEndTime() != null){
				WHERE("ts.create_time <= #{searchParam.endTime}");
			}
		}}.toString();

		System.out.println(sql);

		return sql;
	}
}

package com.orientalSalad.troubleShot.troubleShooting.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;

import com.orientalSalad.troubleShot.troubleShooting.dto.SearchTroubleShootingDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingDTO;
import com.orientalSalad.troubleShot.troubleShooting.sql.TroubleShootingSQLProvider;

@Mapper
public interface TroubleShootingMapper {
	@Select("SELECT ts.seq AS seq, ts.title AS title, ts.context AS context, ts.solved AS solved, "
		+ "ts.create_time AS create_time, ts.update_time AS update_time, ts.delete_time AS delete_time, "
		+ "ts.view_count AS view_count, ts.like_count AS like_count, ts.reply_count AS reply_count, "
		+ "m.seq AS writer_seq, m.nickname AS writer_nickname, m.email AS writer_email, m.profile_img AS writer_profile_img "
		+ "FROM trouble_shooting ts, member m "
		+ "WHERE ts.seq = #{seq} and ts.writer_seq = m.seq "
		+ "LIMIT 1")
	@Results({
		@Result(property = "seq", column = "seq"),
		@Result(property = "title",column = "title"),
		@Result(property = "context",column = "context"),
		@Result(property = "viewCount",column = "view_count"),
		@Result(property = "likeCount",column = "like_count"),
		@Result(property = "replyCount",column = "reply_count"),
		@Result(property = "solved",column = "solved"),
		@Result(property = "createTime",column = "create_time"),
		@Result(property = "updateTime",column = "update_time"),
		@Result(property = "deleteTime",column = "delete_time"),
		@Result(property = "writer.seq",column = "writer_seq"),
		@Result(property = "writer.nickname",column = "writer_nickname"),
		@Result(property = "writer.email",column = "writer_email"),
		@Result(property = "writer.profileImg",column = "writer_profile_img")
	})
	public TroubleShootingDTO selectTroubleShootingBySeq(@Param("seq") long seq);

	@SelectProvider(type = TroubleShootingSQLProvider.class, method = "findTroubleShootingList")
	@Results({
		@Result(property = "seq", column = "seq"),
		@Result(property = "title",column = "title"),
		@Result(property = "context",column = "context"),
		@Result(property = "viewCount",column = "view_count"),
		@Result(property = "likeCount",column = "like_count"),
		@Result(property = "replyCount",column = "reply_count"),
		@Result(property = "solved",column = "solved"),
		@Result(property = "createTime",column = "create_time"),
		@Result(property = "updateTime",column = "update_time"),
		@Result(property = "deleteTime",column = "delete_time"),
		@Result(property = "writer.seq",column = "writer_seq"),
		@Result(property = "writer.nickname",column = "writer_nickname"),
		@Result(property = "writer.email",column = "writer_email"),
		@Result(property = "writer.profileImg",column = "writer_profile_img")
	})
	public List<TroubleShootingDTO> selectTroubleShootingList(@Param("searchParam") SearchTroubleShootingDTO searchParam);

	@SelectProvider(type = TroubleShootingSQLProvider.class, method = "findTroubleShootingListByUserSeq")
	@Results({
		@Result(property = "seq", column = "seq"),
		@Result(property = "title",column = "title"),
		@Result(property = "context",column = "context"),
		@Result(property = "viewCount",column = "view_count"),
		@Result(property = "likeCount",column = "like_count"),
		@Result(property = "replyCount",column = "reply_count"),
		@Result(property = "solved",column = "solved"),
		@Result(property = "createTime",column = "create_time"),
		@Result(property = "updateTime",column = "update_time"),
		@Result(property = "deleteTime",column = "delete_time"),
		@Result(property = "writer.seq",column = "writer_seq"),
		@Result(property = "writer.nickname",column = "writer_nickname"),
		@Result(property = "writer.email",column = "writer_email"),
		@Result(property = "writer.profileImg",column = "writer_profile_img")
	})
	public List<TroubleShootingDTO> selectTroubleShootingListByUserSeq(
		@Param("searchParam") SearchTroubleShootingDTO searchParam,
		@Param("userSeq") Long userSeq);
}

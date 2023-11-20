package com.orientalSalad.troubleShot.statics.typehandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedTypes;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.orientalSalad.troubleShot.statics.dto.TagDailyHistoryDTO;

@MappedTypes(Set.class)
public class JsonToDailyTagHistoryTypeHandler extends BaseTypeHandler<List<TagDailyHistoryDTO>> {
	private static final ObjectMapper mapper = new ObjectMapper();

	@Override
	public void setNonNullParameter(PreparedStatement ps, int i, List<TagDailyHistoryDTO> parameter, JdbcType jdbcType) throws SQLException {
		ps.setString(i, toJson(parameter));
	}

	@Override
	public List<TagDailyHistoryDTO> getNullableResult(ResultSet rs, String columnName) throws SQLException {
		List<TagDailyHistoryDTO> result = new ArrayList<>();
		try{
			result = fromJson(rs.getString(columnName));
			if(result.size() == 1 && result.get(0) == null){
				result = new ArrayList<>();
			}
		}catch (Exception e){
			e.printStackTrace();
		}

		return result;
	}

	@Override
	public List<TagDailyHistoryDTO> getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
		return fromJson(rs.getString(columnIndex));
	}

	@Override
	public List<TagDailyHistoryDTO> getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
		return fromJson(cs.getString(columnIndex));
	}

	private String toJson(List<TagDailyHistoryDTO> objects) throws SQLException {
		try {
			return mapper.writeValueAsString(objects);
		} catch (Exception e) {
			throw new SQLException("Error converting list to JSON", e);
		}
	}

	private List<TagDailyHistoryDTO> fromJson(String json) throws SQLException {
		try {
			return mapper.readValue(json, new TypeReference<List<TagDailyHistoryDTO>>() {});
		} catch (Exception e) {
			throw new SQLException("Error converting JSON to list", e);
		}
	}
}

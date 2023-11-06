package com.orientalSalad.troubleShot.troubleShooting.typehandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedTypes;

import com.fasterxml.jackson.databind.ObjectMapper;

@MappedTypes(List.class)
public class StringToListTypeHandler extends BaseTypeHandler<List<String>> {
	private static final ObjectMapper mapper = new ObjectMapper();

	@Override
	public void setNonNullParameter(PreparedStatement ps, int i, List<String> parameter, JdbcType jdbcType) throws SQLException {
		ps.setString(i, String.join(",",parameter));
	}

	@Override
	public List<String> getNullableResult(ResultSet rs, String columnName) throws SQLException {
		String value = rs.getString(columnName);
		return value == null ? new ArrayList<>() : Arrays.asList(value.split(",\\s*"));
	}

	@Override
	public List<String> getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
		String value = rs.getString(columnIndex);
		return value == null ? new ArrayList<>() : Arrays.asList(value.split(",\\s*"));
	}

	@Override
	public List<String> getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
		String value = cs.getString(columnIndex);
		return value == null ? new ArrayList<>() : Arrays.asList(value.split(",\\s*"));
	}
}

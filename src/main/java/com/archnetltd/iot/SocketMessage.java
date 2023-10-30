package com.archnetltd.iot;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

public class SocketMessage {
	
	private final static ObjectMapper MAPPER = new ObjectMapper();

	private Map<String, String> headers = new HashMap<>();

	private String body = null;

	public Map<String, String> getHeaders() {
		return headers;
	}

	public void setHeaders(Map<String, String> headers) {
		this.headers = headers;
	}

	public String getHeader(String key) {
		return headers.get(key);
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}
	
	public void setBody(Object body) {
		if(!(body instanceof String)) {
			try {
				this.body = MAPPER.writeValueAsString(body);
			}catch(Exception e) {
				throw new RuntimeException(e);
			}
		}else {
			this.body = body + "";
		}
	}
	
	public <T> T getBodyAs(Class<T> cls)throws Exception {
		return MAPPER.readValue(body.getBytes(), cls);
	}
	
	public String getId() {
		return headers.get("uid");
	}

}

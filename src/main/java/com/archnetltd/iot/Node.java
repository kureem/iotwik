package com.archnetltd.iot;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.URI;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketExtension;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

public class Node implements WebSocketSession{
	
	private WebSocketSession session;
	
	 
	
	
	private Map<String,List<NodeEventListener>> listeners = new HashMap<>();

	public Node(WebSocketSession session) {
		super();
		this.session = session;
	}
	
	public void addListener(String type, NodeEventListener listener) {
		if(listeners.containsKey(type)) {
			listeners.get(type).add(listener);
		}else {
			listeners.put(type, new ArrayList<>());
			listeners.get(type).add(listener);
		}
	}
	
	public void clearListeners(String type) {
		listeners.remove(type);
	}
	
	public void clearListeners() {
		listeners.clear();
	}
	
	public void fireListeners(String type, Map<String,Object> params) {
		params.put("type", type);
		System.out.println("Firering " + type + ":" + params);
		if(listeners.containsKey(type)) {
			for(NodeEventListener l : listeners.get(type)) {
				l.execute(this, params);
			}
		}
	}

	public String getId() {
		return session.getId();
	}

	public URI getUri() {
		return session.getUri();
	}

	public HttpHeaders getHandshakeHeaders() {
		return session.getHandshakeHeaders();
	}

	public Map<String, Object> getAttributes() {
		return session.getAttributes();
	}

	public Principal getPrincipal() {
		return session.getPrincipal();
	}

	public InetSocketAddress getLocalAddress() {
		return session.getLocalAddress();
	}

	public InetSocketAddress getRemoteAddress() {
		return session.getRemoteAddress();
	}

	public String getAcceptedProtocol() {
		return session.getAcceptedProtocol();
	}

	public void setTextMessageSizeLimit(int messageSizeLimit) {
		session.setTextMessageSizeLimit(messageSizeLimit);
	}

	public int getTextMessageSizeLimit() {
		return session.getTextMessageSizeLimit();
	}

	public void setBinaryMessageSizeLimit(int messageSizeLimit) {
		session.setBinaryMessageSizeLimit(messageSizeLimit);
	}

	public int getBinaryMessageSizeLimit() {
		return session.getBinaryMessageSizeLimit();
	}

	public List<WebSocketExtension> getExtensions() {
		return session.getExtensions();
	}

	public void sendMessage(WebSocketMessage<?> message) throws IOException {
		Map<String,Object> payload = new HashMap<>();
		payload.put("message", message);
		fireListeners("beforeSend", payload);
		session.sendMessage(message);
		fireListeners("afterSend", payload);
		fireListeners("send", payload);
	}

	public boolean isOpen() {
		return session.isOpen();
	}

	public void close() throws IOException {
		if(session.isOpen()) {
			session.close();
		}
		fireListeners("close", new HashMap<>());
		
	}

	public void close(CloseStatus status) throws IOException {
		if(session.isOpen()) {
			session.close(status);
		}
		Map<String,Object> params = new HashMap<>();
		params.put("status", status);
		fireListeners("close", params);
	}
	
	public void started() {
		fireListeners("started", new HashMap<>());
	}

}

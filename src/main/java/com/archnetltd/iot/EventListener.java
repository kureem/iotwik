package com.archnetltd.iot;

import org.springframework.web.socket.WebSocketSession;

public interface EventListener {
	
	public final static String DEVICE_CONNECTED = "DEVICE_CONNECTED";
	public final static String DEVICE_ACTIVATED = "DEVICE_ACTIVATED";
	public final static String DEVICE_RECEIVED_INSTRUCTION = "DEVICE_EXECUTING_INSTRUCTION";
	public final static String DEVICE_EXECUTING_INSTRUCTION = "DEVICE_EXECUTING_INSTRUCTION";
	public final static String DEVICE_AKCNOWLEDGE_INSTRUCTION = "DEVICE_AKCNOWLEDGE_INSTRUCTION";
	public final static String DEVICE_DISCONNECTED = "DEVICE_DISCONNECTED";
	
	
	public void doExecute(String mac, Node session, SocketMessage message, String type);

}

package com.archnetltd.iot.controllers;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.messaging.SubProtocolHandler;

import com.archnetltd.iot.Action;
import com.archnetltd.iot.DeviceWrapper;
import com.archnetltd.iot.EventListener;
import com.archnetltd.iot.Instruction;
import com.archnetltd.iot.Node;
import com.archnetltd.iot.Parameter;
import com.archnetltd.iot.SocketMessage;
import com.fasterxml.jackson.databind.ObjectMapper;

public class IOTProtocolHandler implements SubProtocolHandler{
	
	private final static ObjectMapper mapper = new ObjectMapper();
	
	private Map<String, List<EventListener>> listeners = new HashMap<>();
	
	@Autowired
	private DeviceSocketFacade socketFacade;
	
	
	
	
	private Map<String, Node> sessions = new HashMap<>();
	
	private Map<String, Node> deviceSessions = new HashMap<>();
	
	private Map<String, List<Node>> deviceSubscription = new HashMap<>();
	
	
	
	@Override
	public List<String> getSupportedProtocols() {
		return null;
	}
	
	public void addListener(String type, EventListener listener) {
		if(listeners.containsKey(type)) {
			listeners.get(type).add(listener);
		}else {
			listeners.put(type, new LinkedList<>());
			listeners.get(type).add(listener);
		}
	}
	
	public void fireListener(String mac, Node session, SocketMessage message, String type) {
		if(listeners.containsKey(type)) {
			for(EventListener l : listeners.get(type)) {
				l.doExecute(type, null, null, type);
			}
		}
	}

	@Override
	public void handleMessageFromClient(WebSocketSession session, WebSocketMessage<?> message,
			MessageChannel outputChannel) throws Exception {
		try {
		TextMessage tm = (TextMessage)message;
		
		String payload = tm.getPayload();
		if(payload.equals("-")) {
			return;
		}
		
		SocketMessage sm = mapper.readValue(payload, SocketMessage.class);
		Node n = (Node)session;
		
		String action = sm.getHeader("action");
		if(action.equals("start")) {
			String body = sm.getBody();
			DeviceWrapper wrapper = mapper.readValue(body, DeviceWrapper.class);
			String mac = wrapper.getDevice().getMac();
			SocketMessage result = socketFacade.startDevice(wrapper);
			sendMessage(session, result, sm.getHeaders());
			deviceSessions.put(mac, (Node)session);
			fireListener(mac, (Node)session, sm, EventListener.DEVICE_CONNECTED);
			subscribe(mac, n);
			resendDevice(mac);
			// tell everybody interested about this
			//
		}else if(action.equals("add-instruction")) {
			//deviceController.addInstruction(null)
			Instruction instruction = sm.getBodyAs(Instruction.class);
			String mac =instruction.getMac();
			SocketMessage result = socketFacade.addInstruction(instruction);
			//Map<String,Object> result =deviceController.addInstruction(instruction);
			//send device instruction
			sendMessage(session, result, sm.getHeaders());
			fireListener(mac, n, sm, EventListener.DEVICE_EXECUTING_INSTRUCTION);
			Node devicenode = getSession(instruction.getMac());
			if(devicenode != null && devicenode.isOpen()) {
				sendMessage(devicenode, instruction, sm.getHeaders());
				fireListener(mac, n, sm, EventListener.DEVICE_RECEIVED_INSTRUCTION);
			}
			// tell everybody insterested about this
			
		}else if(action.equals("acknowledge")) {
			//deviceController.addInstruction(null)
			Map<String,Object> body = (Map<String,Object>)sm.getBodyAs(Map.class);
			SocketMessage result = socketFacade.acknowledgeInstructions(body);
			String mac = (String)body.get("mac");
			fireListener(mac, n, sm, EventListener.DEVICE_AKCNOWLEDGE_INSTRUCTION);
			sendMessage(session, result, sm.getHeaders());
			resendDevice(mac);
			// tell everybody insterested about this
			
		}else if(action.equals("get-device")) {
			String mac = sm.getBody();
			SocketMessage result = socketFacade.getMacDevice(mac);
			
			sendMessage(session, result, sm.getHeaders());
			subscribe(mac, (Node)session);
		}
		}catch(Exception e) {
			e.printStackTrace();
			session.sendMessage(message);
		}
		//session.sendMessage(message);
		// TODO Auto-generated method stub
		
	}
	
	public void resendDevice(String mac)throws Exception {
		SocketMessage message = socketFacade.getMacDevice(mac);
		sendMessage(mac, message, null);
	}
	
	protected void subscribe(String mac, Node n) {
		if(deviceSubscription.containsKey(mac)) {
			if(!deviceSubscription.get(mac).contains(n)) {
				deviceSubscription.get(mac).add(n);
			}
		}else {
			deviceSubscription.put(mac, new LinkedList<>());
			deviceSubscription.get(mac).add(n);
		}
	}
	
	public Node getSession(String mac) {
		return deviceSessions.get(mac); 
	}
	
	/**
	 * WIll send message to all sessions (browser) connected to the specified mac
	 * @param mac - the mac which is a unique Id for the microcontroller
	 * @param payload - The payload to send
	 * @param requestheaders - The headers from which this message was triggered
	 * @throws Exception
	 */
	protected void sendMessage(String mac,Object payload, Map<String,String> requestheaders )throws Exception {
		List<Node> subscriptions = deviceSubscription.get(mac);
		if(subscriptions != null) {
			for(Node n : subscriptions) {
				sendMessage(n, payload, requestheaders);
			}
		}
	}
	
	protected void sendMessage(WebSocketSession session, Object payload, Map<String,String> requestheaders)throws Exception {
		
		
		SocketMessage response = new SocketMessage();
		if(payload instanceof SocketMessage) {
			response = (SocketMessage)payload;
		}else {
			String spayload = mapper.writeValueAsString(payload);
			response.setHeaders(requestheaders);
			response.setBody(spayload);
		}
		String sres = mapper.writeValueAsString(response);
		session.sendMessage(new TextMessage(sres.getBytes()));
	}

	@Override
	public void handleMessageToClient(WebSocketSession session, Message<?> message) throws Exception {
		// TODO Auto-generated method stub
		session.sendMessage(new TextMessage(message.getPayload() + ""));
	}

	@Override
	public String resolveSessionId(Message<?> message) {
		return SimpMessageHeaderAccessor.getSessionId(message.getHeaders());
	}

	@Override
	public void afterSessionStarted(WebSocketSession session, MessageChannel outputChannel) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("Session started:" + session);
		sessions.put(session.getId(), (Node)session);
		((Node)session).started();
	}

	@Override
	public void afterSessionEnded(WebSocketSession session, CloseStatus closeStatus, MessageChannel outputChannel)
			throws Exception {
		// TODO Auto-generated method stub
		System.out.println("Session ended:" + session);
		
		Node ns = sessions.remove(session.getId());
		ns.close(closeStatus);
		
		
	}

}

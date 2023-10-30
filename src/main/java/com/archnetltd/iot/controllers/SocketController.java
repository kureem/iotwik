package com.archnetltd.iot.controllers;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.SubscribableChannel;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.messaging.SubProtocolWebSocketHandler;

import com.archnetltd.iot.Node;

@Component
public class SocketController extends SubProtocolWebSocketHandler {
	

	
	public SocketController(@Qualifier("inbound") MessageChannel clientInboundChannel, @Qualifier("outbound")SubscribableChannel clientOutboundChannel, IOTProtocolHandler protocolHandler) {
		super(clientInboundChannel, clientOutboundChannel);
		
		setDefaultProtocolHandler(protocolHandler);
		// TODO Auto-generated constructor stub
	}

	@Override
	protected WebSocketSession decorateSession(WebSocketSession session) {
		// TODO Auto-generated method stub
		return new Node( super.decorateSession(session));
	}
	
	

	

	

}

package com.archnetltd.iot;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;
import org.springframework.messaging.SubscribableChannel;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.archnetltd.iot.controllers.IOTProtocolHandler;
import com.archnetltd.iot.controllers.SocketController;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

	
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(new SocketController(new InboundChannel(), new OutboundChannel(), getHandler()), "/ws/acknowledge");
		
	}
	
	
	@Bean
	public IOTProtocolHandler getHandler() {
		return new IOTProtocolHandler();
	}

}

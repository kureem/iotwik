package com.archnetltd.iot;

import org.springframework.messaging.Message;
import org.springframework.messaging.support.AbstractSubscribableChannel;
import org.springframework.stereotype.Component;

@Component("outbound")
public class OutboundChannel extends AbstractSubscribableChannel {

	@Override
	protected boolean sendInternal(Message<?> message, long timeout) {
		// TODO Auto-generated method stub
		return true;
	}

}

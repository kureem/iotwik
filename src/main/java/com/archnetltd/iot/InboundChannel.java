package com.archnetltd.iot;

import org.springframework.messaging.Message;
import org.springframework.messaging.support.AbstractMessageChannel;
import org.springframework.stereotype.Component;

@Component(value = "inbound")
public class InboundChannel extends AbstractMessageChannel{

	@Override
	protected boolean sendInternal(Message<?> message, long timeout) {
		// TODO Auto-generated method stub
		return true;
	}

}

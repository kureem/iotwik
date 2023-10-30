package com.archnetltd.iot.controllers;

import org.springframework.web.socket.WebSocketSession;

public class SessionHolder {

	private final WebSocketSession session;

	private final long createTime;

	private volatile boolean hasHandledMessages;

	public SessionHolder(WebSocketSession session) {
		this.session = session;
		this.createTime = System.currentTimeMillis();
	}

	public WebSocketSession getSession() {
		return this.session;
	}

	public long getCreateTime() {
		return this.createTime;
	}

	public void setHasHandledMessages() {
		this.hasHandledMessages = true;
	}

	public boolean hasHandledMessages() {
		return this.hasHandledMessages;
	}

	@Override
	public String toString() {
		return "WebSocketSessionHolder[session=" + this.session + ", createTime=" +
				this.createTime + ", hasHandledMessages=" + this.hasHandledMessages + "]";
	}
}

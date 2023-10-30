package com.archnetltd.iot;

import java.util.Map;

public interface NodeEventListener {
	
	public void execute(Node node, Map<String,Object> params);

}

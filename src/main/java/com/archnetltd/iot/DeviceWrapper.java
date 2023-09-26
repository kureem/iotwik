package com.archnetltd.iot;

import java.util.List;

public class DeviceWrapper {
	private Device device;
	
	private List<Action> actions;
	
	private List<Parameter> parameters;

	public Device getDevice() {
		return device;
	}

	public void setDevice(Device device) {
		this.device = device;
	}

	public List<Action> getActions() {
		return actions;
	}

	public void setActions(List<Action> actions) {
		this.actions = actions;
	}

	public List<Parameter> getParameters() {
		return parameters;
	}

	public void setParameters(List<Parameter> parameters) {
		this.parameters = parameters;
	}
	
	public Parameter getParameter(String name) {
		for(Parameter p : parameters) {
			if(p.getName().equals(name)) {
				return p;
			}
		}
		return null;
	}
	
	public Action getAction(String name) {
		for(Action a : actions) {
			if(a.getName().equals(name)) {
				return a;
			}
		}
		return null;
	}

}

package com.archnetltd.iot.services;

import java.util.List;

import com.archnetltd.iot.DeviceWrapper;
import com.archnetltd.iot.Instruction;

public interface IOTService {
	
	public  List<Instruction> getLatestInstructions(String mac);
	
	public DeviceWrapper acknowledgeInstructions(String mac, List<Integer> intructionIds);
	
	public DeviceWrapper getDevice(String mac);
	
	public Instruction addInstruction(Instruction instruction);
	
	public void startDevice(String mac);

}

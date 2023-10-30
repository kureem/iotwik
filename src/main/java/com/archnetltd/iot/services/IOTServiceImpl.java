package com.archnetltd.iot.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.archnetltd.iot.Action;
import com.archnetltd.iot.Device;
import com.archnetltd.iot.DeviceWrapper;
import com.archnetltd.iot.Instruction;
import com.archnetltd.iot.Parameter;
import com.archnetltd.iot.repositories.ActionRepository;
import com.archnetltd.iot.repositories.DeviceRepository;
import com.archnetltd.iot.repositories.InstructionRepository;
import com.archnetltd.iot.repositories.ParameterRepository;

@Service
public class IOTServiceImpl implements IOTService{
	
	@Autowired
	private InstructionRepository instructionRepository;
	
	@Autowired
	private DeviceRepository deviceRepository;

	@Autowired
	private ActionRepository actionRepository;

	@Autowired
	private ParameterRepository parameterRepository;
	
	

	public InstructionRepository getInstructionRepository() {
		return instructionRepository;
	}

	public void setInstructionRepository(InstructionRepository instructionRepository) {
		this.instructionRepository = instructionRepository;
	}

	public DeviceRepository getDeviceRepository() {
		return deviceRepository;
	}

	public void setDeviceRepository(DeviceRepository deviceRepository) {
		this.deviceRepository = deviceRepository;
	}

	public ActionRepository getActionRepository() {
		return actionRepository;
	}

	public void setActionRepository(ActionRepository actionRepository) {
		this.actionRepository = actionRepository;
	}

	public ParameterRepository getParameterRepository() {
		return parameterRepository;
	}

	public void setParameterRepository(ParameterRepository parameterRepository) {
		this.parameterRepository = parameterRepository;
	}

	@Override
	public List<Instruction> getLatestInstructions(String mac) {
		
		List<Instruction> instructions = instructionRepository.findByMacAndStatusOrderByCreatedDateDesc(mac, "Ready");
		return instructions;
	}
	
	public DeviceWrapper getDevice(String mac) {
		Device d = deviceRepository.findByMac(mac);
		List<Action> actions = actionRepository.findByMac(mac);
		List<Parameter> params = parameterRepository.findByMac(mac);
		DeviceWrapper w = new DeviceWrapper();
		w.setDevice(d);
		w.setActions(actions);
		w.setParameters(params);
		
		return w;
	}
	
	public Instruction addInstruction(Instruction instruction) {
		instruction.setStatus("Ready");
		instructionRepository.save(instruction);
		return instruction;
	}

	/**
	 * Will change the status of the instructions from Ready to Executed<br>
	 * Will set the value of the Parameter of the device to the value instructed in the instruction
	 */
	@Override
	public DeviceWrapper acknowledgeInstructions(String mac, List<Integer> intructionIds) {
		List<Instruction> instructions = instructionRepository.findByIdInOrderByCreatedDateDesc(intructionIds);
		 
		List<Parameter> paramsu = new ArrayList<>();
		List<String> namesu = new ArrayList<>();
		DeviceWrapper w = getDevice(mac);
		for(Instruction i : instructions) {
			String paramName = i.getParameterName();
			String val = i.getParameterValue();
			Parameter p = w.getParameter(paramName);
			if(p.getCurrentValue()== null || !p.getCurrentValue().equals(val)) {
				p.setCurrentValue(val);
			//if(p.getCurrentValue() != null && !p.getCurrentValue().equals(val)) {
				p.setLastModifiedDate(new Date());
				if(!namesu.contains(p.getName())) {
					paramsu.add(p);
					namesu.add(p.getName());
				}
			}
			
			i.setStatus("Executed");
		}
		parameterRepository.saveAll(paramsu);
		instructionRepository.saveAll(instructions);
		return w;
		
	}

	@Override
	public void startDevice(String mac) {
		Device d = deviceRepository.findByMac(mac);
		d.setStatus("Started");
		deviceRepository.save(d);
	}

}

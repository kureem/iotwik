package com.archnetltd.iot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class IotApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context =SpringApplication.run(IotApplication.class, args);
		//MyGateway gateway = context.getBean(MyGateway.class);
        //gateway.sendToMqtt("foo");
        
	}
	
}

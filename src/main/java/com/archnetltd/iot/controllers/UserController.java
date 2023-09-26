package com.archnetltd.iot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.archnetltd.iot.User;
import com.archnetltd.iot.repositories.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	public UserRepository getUserRepository() {
		return userRepository;
	}

	public void setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public User saveUser(@RequestBody User user) {
		userRepository.save(user);
		return user;
	}
	
	public User getUser(@RequestParam("email") String email) {
		return userRepository.findByEmail(email);
	}

}

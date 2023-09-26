package com.archnetltd.iot.repositories;

import org.springframework.data.repository.CrudRepository;

import com.archnetltd.iot.User;

public interface UserRepository extends CrudRepository<User, Integer>{

	public User findByEmail(String email);
	
}

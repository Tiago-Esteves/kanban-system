package br.com.tiago.kanban.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

	@Email(message = "Email inválido.")
	@NotBlank(message = "O email é obrigatório.")
	private String email;
	
	@NotBlank(message = "A senha é obrigatória.")
	private String password;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String senha) {
		this.password = senha;
	}
	
	
}

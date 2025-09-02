package br.com.tiago.kanban.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

	@NotBlank(message = "O nome é obrigatório.")
	private String username;
	
	@Email(message = "Email inválido!")
	@NotBlank(message = "O email é obrigatório.")
	private String email;
	
	@NotBlank(message = "A senha é obrigatória.")
	@Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres.")
	private String password;

	
	public String getUsername() {
		return username;
	}

	public void setUsername(String nome) {
		this.username = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
}

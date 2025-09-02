package br.com.tiago.kanban.dto;

public class AuthResponse {

	private String token;
	private String tipoToken = "Bearer";
	
	public AuthResponse(String token) {
		this.token = token;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getTipoToken() {
		return tipoToken;
	}

	public void setTipoToken(String tipoToken) {
		this.tipoToken = tipoToken;
	}


	
	
}

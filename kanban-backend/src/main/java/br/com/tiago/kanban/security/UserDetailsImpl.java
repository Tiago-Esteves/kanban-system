package br.com.tiago.kanban.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.tiago.kanban.model.entities.Usuario;

public class UserDetailsImpl implements UserDetails{
	
	private final Usuario usuario;
	
	public UserDetailsImpl(Usuario usuario) {
		super();
		this.usuario = usuario;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.emptyList();
	}

	@Override
	public String getPassword() {
		return usuario.getPassword();
	}

	@Override
	public String getUsername() {
		return usuario.getEmail(); // Usar o email como login
	}

	public Usuario getUsuario() {
		return usuario;
	}
	
	

}

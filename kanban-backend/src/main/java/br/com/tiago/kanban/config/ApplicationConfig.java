package br.com.tiago.kanban.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import br.com.tiago.kanban.model.repositories.UsuarioRepository;
import br.com.tiago.kanban.security.UserDetailsImpl;

@Configuration
public class ApplicationConfig {

	private final UsuarioRepository usuarioRepository;

	public ApplicationConfig(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}

	@Bean
	public UserDetailsService userDetailsService() {
		return email -> usuarioRepository.findByEmail(email).map(UserDetailsImpl::new)
				.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + email));
	}

	

	/*
	 * @Bean public AuthenticationManager
	 * authenticationManager(AuthenticationConfiguration config) throws Exception {
	 * return config.getAuthenticationManager(); }
	 */
}

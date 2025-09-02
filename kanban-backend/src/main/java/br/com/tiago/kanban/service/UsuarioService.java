package br.com.tiago.kanban.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.tiago.kanban.dto.RegisterRequest;
import br.com.tiago.kanban.model.entities.Usuario;
import br.com.tiago.kanban.model.repositories.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	UsuarioRepository usuarioRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
		super();
		this.usuarioRepository = usuarioRepository;
		this.passwordEncoder = passwordEncoder;
	}
	
	public Usuario cadastrarUsuario(RegisterRequest request) {
        Optional<Usuario> existente = usuarioRepository.findByEmail(request.getEmail());
        if (existente.isPresent()) {
            throw new RuntimeException("Email já cadastrado!");
        }

        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword())); 
        
        return usuarioRepository.save(usuario);
    }
	
	public Usuario buscarPorEmail(String email) {
		return usuarioRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Email não encontrado: " + email));
	}
	
	public Usuario buscarPorId(Long id) {
		return usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Id não encontrado: " + id));
	}
	
	public Usuario buscarPorNome(String username) {
		return usuarioRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Nome de usuário não encontrado: " + username));
	}
	
	
}

package br.com.tiago.kanban.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.tiago.kanban.dto.AuthResponse;
import br.com.tiago.kanban.dto.LoginRequest;
import br.com.tiago.kanban.dto.RegisterRequest;
import br.com.tiago.kanban.model.entities.Usuario;
import br.com.tiago.kanban.model.repositories.UsuarioRepository;
import br.com.tiago.kanban.security.JwtUtil;
import br.com.tiago.kanban.security.UserDetailsImpl;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthenticationManager authenticationManager;
	private final UsuarioRepository usuarioRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;
	
	
	
	public AuthController(AuthenticationManager authenticationManager, UsuarioRepository usuarioRepository,
			PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
		super();
		this.authenticationManager = authenticationManager;
		this.usuarioRepository = usuarioRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtUtil = jwtUtil;
	}



	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
		
		try {
			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
			// Carrega o userDetails
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			String token = jwtUtil.generateToken(userDetails);
			
			// Retorna o token no DTO AuthResponse
			AuthResponse authResponse = new AuthResponse(token);
			
			return ResponseEntity.ok(authResponse);
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
		}
	}
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest registerRequest){
		if (usuarioRepository.existsByEmail(registerRequest.getEmail())) {
			return ResponseEntity.badRequest().body("Email já cadastrado!");
		}
		
		Usuario usuario = new Usuario();
		usuario.setEmail(registerRequest.getEmail());
		usuario.setUsername(registerRequest.getUsername());
		usuario.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
		usuarioRepository.save(usuario);
		
		return ResponseEntity.ok("Usuário registrado com sucesso!");
	}
	
	
	
}

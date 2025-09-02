package br.com.tiago.kanban.model.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.tiago.kanban.model.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	Optional<Usuario> findByEmail(String email);
	
	Optional<Usuario> findByUsername(String nome);
	
	boolean existsByEmail(String email);
}

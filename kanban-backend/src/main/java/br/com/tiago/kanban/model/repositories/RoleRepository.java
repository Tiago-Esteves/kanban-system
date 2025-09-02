package br.com.tiago.kanban.model.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.tiago.kanban.model.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{

	Optional<Role> findBynome(String nome);
}

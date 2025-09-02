package br.com.tiago.kanban.model.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.tiago.kanban.model.entities.Quadro;

public interface QuadroRepository extends JpaRepository<Quadro, Integer>{
	List<Quadro> findByUsuarioId(Long usuarioId);
}

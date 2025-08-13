package br.com.tiago.kanban.model.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.tiago.kanban.model.entities.Coluna;

public interface ColunaRepository extends JpaRepository<Coluna, Integer>{

}

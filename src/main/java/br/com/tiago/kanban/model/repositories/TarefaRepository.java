package br.com.tiago.kanban.model.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.tiago.kanban.model.entities.Tarefa;

public interface TarefaRepository extends JpaRepository<Tarefa, Integer>{

}

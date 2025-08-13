package br.com.tiago.kanban.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.tiago.kanban.model.entities.Coluna;
import br.com.tiago.kanban.model.entities.Tarefa;
import br.com.tiago.kanban.model.repositories.TarefaRepository;

@Service
public class TarefaService {

	@Autowired
	private TarefaRepository tarefaRepository;
	
	public Tarefa novaTarefa(Tarefa tarefa) {
		tarefaRepository.save(tarefa);
		return tarefa;
	}
	
	public List<Tarefa> listarTodas(){
		return tarefaRepository.findAll();
	}
	
	public Tarefa buscarPorId(int id) {
		return tarefaRepository.findById(id).orElseThrow( () -> new RuntimeException("Quadro não encontrado com o id: " + id));
	}
	
	public Tarefa atualizar(int id, Tarefa novaTarefa) {
		Tarefa tarefaAtual = buscarPorId(id);
		tarefaAtual.setDescricao(novaTarefa.getDescricao());
		tarefaAtual.setPrazo(novaTarefa.getPrazo());
		
		return tarefaRepository.save(tarefaAtual);
	}
	
	public void deletarPorId(int id) {		
		tarefaRepository.deleteById(id);
	}
	
	public void moverTarefa(Coluna coluna, Tarefa tarefa) {
		tarefa.setColuna(coluna);
		tarefaRepository.save(tarefa);
	}
	
}

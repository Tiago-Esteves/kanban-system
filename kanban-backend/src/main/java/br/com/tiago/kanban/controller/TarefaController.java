package br.com.tiago.kanban.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.tiago.kanban.dto.MoverTarefaDto;
import br.com.tiago.kanban.model.entities.Coluna;
import br.com.tiago.kanban.model.entities.Tarefa;
import br.com.tiago.kanban.service.ColunaService;
import br.com.tiago.kanban.service.TarefaService;

@RestController
@RequestMapping
public class TarefaController {

	@Autowired
	TarefaService tarefaService;
	@Autowired
	ColunaService colunaService;
	
	@PostMapping
	public Tarefa criar(@RequestBody Tarefa tarefa) {
		return tarefaService.novaTarefa(tarefa);
	}
	
	@GetMapping
	public List<Tarefa> listarTodas(){
		return tarefaService.listarTodas();
	}
	
	@GetMapping("/{id}")
	public Tarefa buscarPorId(@PathVariable int id) {
		return tarefaService.buscarPorId(id);
	}
	
	@PutMapping("/{id}")
	public Tarefa atualizar(@PathVariable int id, @RequestBody Tarefa tarefaAtualizada) {
		return tarefaService.atualizar(id, tarefaAtualizada);
	}
	
	@DeleteMapping("/{id}")
	public void deletar(@PathVariable int id) {
		tarefaService.deletarPorId(id);
	}
	
	@PatchMapping()
	public void mover(@RequestBody MoverTarefaDto dto) {
		Tarefa tarefa = tarefaService.buscarPorId(dto.getIdTarefa());
		Coluna coluna = colunaService.buscarPorId(dto.getIdColuna());
		tarefaService.moverTarefa(coluna, tarefa);
	}
}

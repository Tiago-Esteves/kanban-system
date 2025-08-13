package br.com.tiago.kanban.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.tiago.kanban.model.entities.Quadro;
import br.com.tiago.kanban.service.QuadroService;

@RequestMapping("/api/quadros")
@RestController
public class QuadroController {

	@Autowired
	private QuadroService quadroService;
	
	@PostMapping
	public Quadro criar(@RequestBody Quadro quadro) {
		
		return quadroService.salvar(quadro);
	}
	
	@GetMapping
	public List<Quadro> listar() {
		return quadroService.listarTodos();
	}
	
	@GetMapping("/{id}")
	public Quadro buscarPorId(@PathVariable int id) {
		
		return quadroService.buscarPorId(id);
	}
	
	@PutMapping("/{id}")
	public Quadro atualizar(@PathVariable int id, @RequestBody Quadro quadroAtualizado) {
	    return quadroService.atualizar(id, quadroAtualizado);
	}

	
	@DeleteMapping("/{id}")
	public void deletar(@PathVariable int id) {
		quadroService.deletarPorId(id);
	}
}

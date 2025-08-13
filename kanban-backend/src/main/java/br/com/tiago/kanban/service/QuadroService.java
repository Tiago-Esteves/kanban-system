package br.com.tiago.kanban.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.tiago.kanban.model.entities.Quadro;
import br.com.tiago.kanban.model.repositories.QuadroRepository;
import jakarta.validation.Valid;

@Service
public class QuadroService {

	@Autowired
	private QuadroRepository quadroRepository;
	
	public Quadro salvar(@Valid Quadro quadro) {
		return quadroRepository.save(quadro);
	}
	
	public List<Quadro> listarTodos(){
		return quadroRepository.findAll();
	}
	
	public Quadro buscarPorId(int id) { 
		return quadroRepository.findById(id).orElseThrow( () -> new RuntimeException("Quadro não encontrado com o id: " + id));
	}
	
	public Quadro atualizar(int id, @Valid Quadro novoQuadro) { //Peguei do gpt. analisar BD
		Quadro quadroAtual = buscarPorId(id);
		quadroAtual.setNome(novoQuadro.getNome());
		quadroAtual.setStatus(novoQuadro.isStatus());
		
		return quadroRepository.save(quadroAtual);
	}
	
	public void deletarPorId(int id) {
		quadroRepository.deleteById(id);
	}
}

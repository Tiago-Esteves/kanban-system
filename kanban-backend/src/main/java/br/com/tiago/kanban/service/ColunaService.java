package br.com.tiago.kanban.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.tiago.kanban.model.entities.Coluna;
import br.com.tiago.kanban.model.repositories.ColunaRepository;

@Service
public class ColunaService {

	@Autowired
	private ColunaRepository colunaRepository;
	
	public List<Coluna> listarTodas(){
		return colunaRepository.findAll();
	}
	
	public Coluna buscarPorId(int id) {
		return colunaRepository.findById(id).orElseThrow( () -> new RuntimeException("Quadro não encontrado com o id: " + id));
	}
}

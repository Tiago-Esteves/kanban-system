package br.com.tiago.kanban.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.tiago.kanban.model.entities.Coluna;
import br.com.tiago.kanban.service.ColunaService;

@RestController
@RequestMapping("/api/quadro")
public class ColunaController {

	@Autowired
	ColunaService colunaService;
	
	@GetMapping
	public List<Coluna> listarColunas(){
		
		return colunaService.listarTodas();
	}
}

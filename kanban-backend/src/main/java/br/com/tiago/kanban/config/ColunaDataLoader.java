package br.com.tiago.kanban.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import br.com.tiago.kanban.model.entities.Coluna;
import br.com.tiago.kanban.model.repositories.ColunaRepository;

@Component
public class ColunaDataLoader implements CommandLineRunner {

	@Autowired
	private ColunaRepository colunaRepository;
	
	public ColunaDataLoader(ColunaRepository colunaRepository) {
		this.colunaRepository = colunaRepository;
	}
	
	
	public void run(String... argss) throws Exception{
		if (colunaRepository.count() == 0) {
			colunaRepository.save(new Coluna("A começar"));
			colunaRepository.save(new Coluna("Fazendo"));
			colunaRepository.save(new Coluna("Concluído"));
			colunaRepository.save(new Coluna("Atrasado"));
		}
			
	}
	
}

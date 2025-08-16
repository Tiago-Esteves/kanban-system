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
			colunaRepository.save(new Coluna(1, "A começar"));
			colunaRepository.save(new Coluna(2, "Em andamento"));
			colunaRepository.save(new Coluna(3, "Concluído"));
			colunaRepository.save(new Coluna(4, "Atrasado"));
		}
			
	}
	
}

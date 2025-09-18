package br.com.tiago.kanban.service;

import java.util.List;

import br.com.tiago.kanban.model.repositories.TarefaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.tiago.kanban.model.entities.Quadro;
import br.com.tiago.kanban.model.entities.Usuario;
import br.com.tiago.kanban.model.repositories.QuadroRepository;
import jakarta.validation.Valid;

@Service
public class QuadroService {

	@Autowired
	private QuadroRepository quadroRepository;

    @Autowired
    private TarefaRepository tarefaRepository;
	
	public Quadro salvar(@Valid Quadro quadro) {
		return quadroRepository.save(quadro);
	}
	
	public List<Quadro> listarTodos(){
		return quadroRepository.findAll();
	}
	
	public List<Quadro> getQuadrosDoUsuario(Usuario usuario) {
	    return quadroRepository.findByUsuarioId(usuario.getId());
	}
	
	public Quadro buscarPorId(int id) { 
		//System.out.println("Teste");
		return quadroRepository.findById(id).orElseThrow( () -> new RuntimeException("Quadro não encontrado com o id: " + id));
		
	}
	
	public Quadro atualizar(int id, @Valid Quadro novoQuadro) { 
		Quadro quadroAtual = buscarPorId(id);
		quadroAtual.setNome(novoQuadro.getNome());
		quadroAtual.setStatus(novoQuadro.isStatus());
		
		return quadroRepository.save(quadroAtual);
	}
	@Transactional //Se o tudo der certo sem exceções, a transação é confirmada.
	public void deletarPorId(int id) {
		tarefaRepository.deleteAllByQuadroId((long) id);
        quadroRepository.deleteById(id);
	}
}

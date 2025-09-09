package br.com.tiago.kanban.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.tiago.kanban.model.entities.Quadro;
import br.com.tiago.kanban.model.entities.Usuario;
import br.com.tiago.kanban.security.UserDetailsImpl;
import br.com.tiago.kanban.service.QuadroService;

@RequestMapping("/api/quadros")
@RestController
public class QuadroController {

	@Autowired
	private QuadroService quadroService;
	
	@PostMapping
	public Quadro criar(@RequestBody Quadro quadro, @AuthenticationPrincipal UserDetailsImpl userDetails) { //pega o usuário autenticado
		Usuario usuario = userDetails.getUsuario(); //Usuario da ação = usuário logado
		quadro.setUsuario(usuario); // vincula o quadro ao usuário logado
		return quadroService.salvar(quadro);
	}
	
	@GetMapping
	public List<Quadro> listarTodosPorUsuario( @AuthenticationPrincipal UserDetailsImpl userDetails) {
		Usuario usuario = userDetails.getUsuario();
		return quadroService.getQuadrosDoUsuario(usuario);
	}
	
	@GetMapping("/{id}")
	public Quadro buscarPorId(@PathVariable int id,  @AuthenticationPrincipal UserDetailsImpl userDetails) { 
		Usuario usuario = userDetails.getUsuario();
	    Quadro quadro = quadroService.buscarPorId(id);
	    if (quadro.getUsuario().getId() != usuario.getId()) {
	        throw new RuntimeException("Você não tem acesso a este quadro!");
	    }
	    return quadro;
	}

	@PutMapping("/{id}")
	public Quadro atualizar(@PathVariable int id, @RequestBody Quadro quadroAtualizado, @AuthenticationPrincipal UserDetailsImpl userDetails) {
		Usuario usuario = userDetails.getUsuario();
		Quadro quadro = quadroService.buscarPorId(id);
		if(quadro.getUsuario().getId() != usuario.getId()) {
			throw new RuntimeException("Você não tem permissão para atualizar este quadro!");
		}
		
	    return quadroService.atualizar(id, quadroAtualizado);
	}

	@DeleteMapping("/{id}")
	public void deletar(@PathVariable int id,  @AuthenticationPrincipal UserDetailsImpl userDetails) {
		Usuario usuario = userDetails.getUsuario();
		Quadro quadro = quadroService.buscarPorId(id);
		if(quadro.getUsuario().getId() != usuario.getId()) {
			throw new RuntimeException("Você não tem permissão para deletar este quadro!");
		}
		quadroService.deletarPorId(id);
	}
}

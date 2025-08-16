package br.com.tiago.kanban.model.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "colunas")
public class Coluna {

	@Id
	private int id;
	
	@NotBlank
    @Column(nullable = false)
	private String nome;
	
	@OneToMany(mappedBy = "coluna")
	List<Tarefa> tarefas;
		
	public Coluna() {
		
	}
	
	public Coluna(int id, String nome) {
		this.id = id;
		this.nome = nome;
	}
	
	public Coluna(String nome) {
		this.nome = nome;
	}	

	public Coluna(String nome, List<Tarefa> tarefas) {
		super();
		this.nome = nome;
		this.tarefas = tarefas;
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public List<Tarefa> getTarefa() {
		return tarefas;
	}

	public void setTarefa(List<Tarefa> tarefa) {
		this.tarefas = tarefa;
	}
	
	
}

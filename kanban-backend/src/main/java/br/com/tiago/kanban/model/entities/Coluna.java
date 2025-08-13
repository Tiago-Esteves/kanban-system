package br.com.tiago.kanban.model.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Coluna {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@NotBlank
    @Column(nullable = false)
	private String nome;
	
	@OneToMany(mappedBy = "coluna")
	List<Tarefa> tarefa;
	
	@ManyToOne
	@JoinColumn(name = "quadro_id")
	private Quadro quadro;
	
	public Coluna() {
		
	}

	public Coluna(String nome, List<Tarefa> tarefa) {
		super();
		this.nome = nome;
		this.tarefa = tarefa;
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
		return tarefa;
	}

	public void setTarefa(List<Tarefa> tarefa) {
		this.tarefa = tarefa;
	}
	
	
}

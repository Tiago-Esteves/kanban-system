package br.com.tiago.kanban.model.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "tarefas")
public class Tarefa {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@NotBlank
    @Column(nullable = false)
	private String descricao;
	@CreationTimestamp
	private LocalDateTime dataCriacao;
	private LocalDateTime prazo;
	
	@ManyToOne
	@JoinColumn(name = "coluna_id")
	private Coluna coluna;
	
	public Tarefa() {
		
	}

	public Tarefa(String descricao, LocalDateTime dataCriacao, LocalDateTime prazo) {
		super();
		this.descricao = descricao;
		this.dataCriacao = dataCriacao;
		this.prazo = prazo;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public LocalDateTime getDataCriacao() {
		return dataCriacao;
	}

	public void setDataCriacao(LocalDateTime dataCriacao) {
		this.dataCriacao = dataCriacao;
	}

	public LocalDateTime getPrazo() {
		return prazo;
	}

	public void setPrazo(LocalDateTime prazo) {
		this.prazo = prazo;
	}

	public Coluna getColuna() {
		return coluna;
	}

	public void setColuna(Coluna coluna) {
		this.coluna = coluna;
	}
	
	
	
	
}

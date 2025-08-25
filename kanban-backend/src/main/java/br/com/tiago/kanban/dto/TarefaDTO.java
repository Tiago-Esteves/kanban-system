package br.com.tiago.kanban.dto;

import java.time.LocalDateTime;

import br.com.tiago.kanban.model.entities.Tarefa;

public class TarefaDTO {
    private int id;
    private String descricao;
    private LocalDateTime prazo;
    private int quadroId;
    private int colunaId;
    private String colunaNome; 
    
    public TarefaDTO(Tarefa tarefa) {
        this.id = tarefa.getId();
        this.descricao = tarefa.getDescricao();
        this.prazo = tarefa.getPrazo();
        this.quadroId = tarefa.getQuadro().getId();
        this.colunaId = tarefa.getColuna().getId();
        this.colunaNome = tarefa.getColuna().getNome();
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

	public LocalDateTime getPrazo() {
		return prazo;
	}

	public void setPrazo(LocalDateTime prazo) {
		this.prazo = prazo;
	}

	public int getQuadroId() {
		return quadroId;
	}

	public void setQuadroId(int quadroId) {
		this.quadroId = quadroId;
	}

	public int getColunaId() {
		return colunaId;
	}

	public void setColunaId(int colunaId) {
		this.colunaId = colunaId;
	}

	public String getColunaNome() {
		return colunaNome;
	}

	public void setColunaNome(String colunaNome) {
		this.colunaNome = colunaNome;
	}

    // Getters e setters
    // ...
}

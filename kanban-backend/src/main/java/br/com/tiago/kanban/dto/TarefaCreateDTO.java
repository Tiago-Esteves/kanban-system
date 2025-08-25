package br.com.tiago.kanban.dto;

import java.time.LocalDateTime;

public class TarefaCreateDTO {
    private String descricao;
    private LocalDateTime prazo;
    private int quadroId;
    private int colunaId;
    
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

    
}


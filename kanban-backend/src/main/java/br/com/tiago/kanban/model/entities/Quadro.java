package br.com.tiago.kanban.model.entities;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Setter
@Getter
@Entity
@Table(name = "quadros")
public class Quadro {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
    @Column(nullable = false)
	private String nome;
	private boolean status;

	@CreationTimestamp
	private LocalDateTime dataCriacao;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "usuario_id")
	private Usuario usuario;

	public Quadro() {

	}


}

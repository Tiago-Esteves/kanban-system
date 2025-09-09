package br.com.tiago.kanban.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import br.com.tiago.kanban.security.JwtAccessDeniedHandler;
import br.com.tiago.kanban.security.JwtAuthenticationEntryPoint;
import br.com.tiago.kanban.security.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	private final JwtAuthenticationFilter jwtAuthFilter;
	private final UserDetailsService userDetailsService;
	
	@Autowired
	private Environment env;

	
	public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter, UserDetailsService userDetailsService) {
		this.jwtAuthFilter = jwtAuthFilter;
		this.userDetailsService = userDetailsService;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
	    return config.getAuthenticationManager();
	}
	
	@SuppressWarnings("deprecation")
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
	    @SuppressWarnings("deprecation")
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
	    authProvider.setUserDetailsService(userDetailsService);
	    authProvider.setPasswordEncoder(passwordEncoder());
	    return authProvider;
	}
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http,
	        JwtAuthenticationEntryPoint jwtAuthEntry,
	        JwtAccessDeniedHandler jwtAccess) throws Exception {

	    http.csrf(csrf -> csrf.disable())
	        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	        .authorizeHttpRequests(auth -> {
	            // APIs públicas
	            auth.requestMatchers("/api/auth/**").permitAll();

	            // Swagger liberado somente no dev
	            if ("dev".equals(env.getProperty("spring.profiles.active"))) {
	                auth.requestMatchers(
	                        "/v3/api-docs/**",
	                        "/swagger-ui/**",
	                        "/swagger-ui.html",
	                        "/swagger-ui/index.html",
	                        "/swagger-resources/**",
	                        "/webjars/**"
	                ).permitAll();
	            }

	            // Outras APIs precisam de autenticação
	            auth.requestMatchers("/api/quadros/**", "/api/colunas/**", "/api/tarefas/**")
	                .authenticated()
	                .anyRequest().authenticated();
	        })
	        .exceptionHandling(ex -> ex.accessDeniedHandler(jwtAccess)
	                                    .authenticationEntryPoint(jwtAuthEntry))
	        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

	    http.cors(Customizer.withDefaults());

	    return http.build();
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of("http://localhost:5173"));
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(List.of("*"));
		configuration.setAllowCredentials(true);
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}

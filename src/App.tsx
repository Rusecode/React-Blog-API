import { useState } from 'react';
import './App.css';

interface Usuario {
  id: number;
  nome: string; // Corrigido para 'nome' em vez de 'Nome'
}

const HomeComponent: React.FC = () => {
  const [nome, setNome] = useState<string>(''); 
  const [mensagem, setMensagem] = useState<string | null>(null); 

  const criarUsuario = async () => {
    try {
      const resposta = await fetch('http://localhost:5120/api/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Envie o nome corretamente como 'nome'
        body: JSON.stringify({ nome }), 
      });

      const respostaTexto = await resposta.text();

      if (!resposta.ok) {
        setMensagem('Falha ao criar o usuário'); 
        return; 
      }

      const usuarioCriado: Usuario = JSON.parse(respostaTexto); 

      // Acesse o campo 'nome' corretamente
      if (usuarioCriado.nome) {
        setMensagem(`Usuário ${usuarioCriado.nome} criado com sucesso!`); 
      } else {
        setMensagem('Usuário criado, mas o nome é indefinido.'); 
      }

      setNome(''); 
    } catch (erro) {
      setMensagem('Falha ao criar o usuário'); 
    }
  };

  return (
    <div>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)} 
        placeholder="Digite seu nome"
      />
      <button onClick={criarUsuario}>Criar Usuário</button> 
      {mensagem && <p>{mensagem}</p>} 
    </div>
  );
};

export default HomeComponent;












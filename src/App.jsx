import { useState, useEffect } from 'react';

function App() {
  const [previsao, setPrevisao] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/clima/previsao/3040')
      .then(response => response.json())
      .then(data => {
        console.log('Dados recebidos:', data); 
        setPrevisao(data);
      })
      .catch(error => console.error('Erro ao buscar previsão:', error));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Previsão do Tempo</h1>
      {previsao ? (
        <div>
          <h2>{previsao.nome} - {previsao.uf}</h2>
          <p>Última atualização: {previsao.atualizacao}</p>
          <ul>
            {previsao.previsoes.map((dia, index) => (
              <li key={index}>
                Dia: {dia.dia} | Máx: {dia.maxima}°C | Mín: {dia.minima}°C | Tempo: {dia.tempo}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Carregando informações...</p>
      )}
    </div>
  );
} 

export default App;

import { useState } from 'react';
import './App.css';

import { 
  FaCloudSun, FaCloudRain, FaSun, FaBolt, FaSnowflake, FaCloud, FaCloudShowersHeavy,
  FaCloudMoon, FaSmog, FaCloudMoonRain 
} from 'react-icons/fa';


function App() {
  const [cidade, setCidade] = useState('');
  const [previsao, setPrevisao] = useState(null);
  const [erro, setErro] = useState('');

  const buscarPrevisao = async () => {
    if (cidade.trim() === '') {
      setErro('Por favor, digite o nome da cidade');
      setPrevisao(null);
      return;
    }

    try {
      setErro('');
      const respCidades = await fetch(`http://localhost:8080/api/clima/cidades?nome=${cidade}`);
      const dataCidades = await respCidades.json();

      const cidadeExata = dataCidades.cidades.find(
        c => c.nome.toLowerCase() === cidade.trim().toLowerCase()
      );

      if (!cidadeExata) {
        setErro('Cidade não encontrada com o nome exato');
        setPrevisao(null);
        return;
      }

      const respPrevisao = await fetch(`http://localhost:8080/api/clima/previsao/${cidadeExata.id}`);
      const dataPrevisao = await respPrevisao.json();
      setPrevisao(dataPrevisao);

      setCidade('');
    } catch (e) {
      setErro('Erro ao buscar dados');
      setPrevisao(null);
    }
  };

  const nomeDoDia = (dataString) => {
    const dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const [ano, mes, dia] = dataString.split('-').map(Number);
    const data = new Date(ano, mes - 1, dia);
    return dias[data.getDay()];
  }

  const traduzTempo = (sigla) => {
    const tabela = {
      ec: "Encoberto c/ Chuvas Isoladas",
      ci: "Chuvas Isoladas",
      c: "Chuva",
      in: "Instável",
      pp: "Poss. de Pancadas de Chuva",
      cm: "Chuva pela Manhã",
      cn: "Chuva à Noite",
      pt: "Pancadas de Chuva à Tarde",
      pm: "Pancadas de Chuva pela Manhã",
      np: "Nublado c/ Pancadas de Chuva",
      pc: "Pancadas de Chuva",
      pn: "Parcialmente Nublado",
      cv: "Chuvisco",
      ch: "Chuvoso",
      t: "Tempestade",
      ps: "Predomínio de Sol",
      e: "Encoberto",
      n: "Nublado",
      cl: "Céu Claro",
      nv: "Nevoeiro",
      g: "Geada",
      ne: "Neve",
      nd: "Não Definido",
      pnt: "Pancadas de Chuva à Noite",
      psc: "Possibilidade de Chuva",
      pcm: "Poss. de Chuva pela Manhã",
      pct: "Poss. de Chuva à Tarde",
      pcn: "Poss. de Chuva à Noite",
      npt: "Nublado c/ Pancadas à Tarde",
      npn: "Nublado c/ Pancadas à Noite",
      ncn: "Nubl. c/ Poss. de Chuva à Noite",
      nct: "Nubl. c/ Poss. de Chuva à Tarde",
      ncm: "Nubl. c/ Poss. de Chuva pela Manhã",
      npm: "Nubl. c/ Pancadas pela Manhã",
      npp: "Nubl. c/ Possibilidade de Chuva",
      vn: "Variação de Nebulosidade",
      ct: "Chuva à Tarde",
      ppn: "Poss. de Panc. de Chuva à Noite",
      ppt: "Poss. de Panc. de Chuva à Tarde",
      ppm: "Poss. de Panc. de Chuva pela Manhã"
    };
    return tabela[sigla] || sigla;
  };

  const iconeDoTempo = (sigla) => {
    switch(sigla) {
      case 'ec': return <FaCloudShowersHeavy />;
      case 'ci': return <FaCloudRain />;
      case 'c': return <FaCloudRain />;
      case 'in': return <FaSmog />; 
      case 'pp': return <FaCloudShowersHeavy />;
      case 'cm': return <FaCloudSun />;
      case 'cn': return <FaCloudMoonRain />;
      case 'pt': return <FaCloudShowersHeavy />;
      case 'pm': return <FaCloudShowersHeavy />;
      case 'np': return <FaCloudShowersHeavy />;
      case 'pc': return <FaCloudShowersHeavy />;
      case 'pn': return <FaCloudSun />;
      case 'cv': return <FaCloudDrizzle />;
      case 'ch': return <FaCloudRain />;
      case 't': return <FaBolt />;
      case 'ps': return <FaSun />;
      case 'e': return <FaCloud />;
      case 'n': return <FaCloud />;
      case 'cl': return <FaSun />;
      case 'nv': return <FaSmog />;
      case 'g': return <FaSnowflake />;
      case 'ne': return <FaSnowflake />;
      case 'nd': return <FaSmog />;
      case 'pnt': return <FaCloudShowersHeavy />;
      case 'psc': return <FaCloudShowersHeavy />;
      case 'pcm': return <FaCloudShowersHeavy />;
      case 'pct': return <FaCloudShowersHeavy />;
      case 'pcn': return <FaCloudShowersHeavy />;
      case 'npt': return <FaCloudShowersHeavy />;
      case 'npn': return <FaCloudShowersHeavy />;
      case 'ncn': return <FaCloudShowersHeavy />;
      case 'nct': return <FaCloudShowersHeavy />;
      case 'ncm': return <FaCloudShowersHeavy />;
      case 'npm': return <FaCloudShowersHeavy />;
      case 'npp': return <FaCloudShowersHeavy />;
      case 'vn': return <FaCloudSun />;
      case 'ct': return <FaCloudShowersHeavy />;
      case 'ppn': return <FaCloudShowersHeavy />;
      case 'ppt': return <FaCloudShowersHeavy />;
      case 'ppm': return <FaCloudShowersHeavy />;
      default: return <FaCloudSun />;
    }
  }

  const formatarData = (dataString) => {
    const [ano, mes, dia] = dataString.split('-').map(Number);
    // Retorna no formato DD/MM
    return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}`;
  };

  const tempoHoje = previsao?.previsoes?.[0]?.tempo;

  const obterClasseFundo = (sigla) => {
    const sol = ['ps', 'cl'];
    const parcialmenteNublado = ['pn', 'vn'];
    const nublado = ['n', 'e', 'ec', 'in'];
    const chuvaFraca = ['ci', 'pp', 'pc', 'pt', 'pm', 'pnt', 'ppn', 'ppt', 'ppm', 'psc', 'pcm', 'pct', 'pcn', 'ct'];
    const chuvaForte = ['c', 'ch', 'cm', 'cn', 'np', 'npm', 'npt', 'npn'];
    const tempestade = ['t'];
    const neblina = ['nv', 'npp', 'ncm', 'nct', 'ncn'];
    const neve = ['g', 'ne'];

    if (sol.includes(sigla)) return 'fundo-ceuLimpo';
    if (parcialmenteNublado.includes(sigla)) return 'fundo-parcialmenteNublado';
    if (nublado.includes(sigla)) return 'fundo-nublado';
    if (chuvaFraca.includes(sigla)) return 'fundo-chuvaFraca';
    if (chuvaForte.includes(sigla)) return 'fundo-chuvaForte';
    if (tempestade.includes(sigla)) return 'fundo-tempestade';
    if (neblina.includes(sigla)) return 'fundo-neblina';
    if (neve.includes(sigla)) return 'fundo-neve';

    return 'fundo-ceuLimpo'; // padrão
  };

  const classeFundo = tempoHoje ? obterClasseFundo(tempoHoje) : 'fundo-ceuLimpo';


  return (
   <div className={`app-container ${classeFundo}`}>
      <div className="header-fixo">
        <h1>Previsão do Tempo</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Digite o nome da cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
          <button onClick={buscarPrevisao}>Buscar</button>
        </div>
      </div>

      {erro && <div className="error">{erro}</div>}

      {previsao && (
        <div className="previsao-container">

          {previsao.previsoes.length > 0 && (
            <div className="previsao-hoje">
              <h4>Hoje</h4>
              <h4>Máx: {previsao.previsoes[0].maxima}°C   |   Mín: {previsao.previsoes[0].minima}°C</h4>
              <h1>{previsao.nome} - {previsao.uf}</h1>
              <h2>{iconeDoTempo(previsao.previsoes[0].tempo)} {traduzTempo(previsao.previsoes[0].tempo)}</h2>
            </div>
          )}

         

          <div className="cards">
            {previsao.previsoes.map((dia, index) => (
               <div key={index} className="card">
                <h3>{nomeDoDia(dia.dia)} - {formatarData(dia.dia)}</h3>
                <div className="icone">{iconeDoTempo(dia.tempo)}</div>
                <p>{traduzTempo(dia.tempo)}</p>
                <p>Máx: {dia.maxima}°C</p>
                <p>Mín: {dia.minima}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

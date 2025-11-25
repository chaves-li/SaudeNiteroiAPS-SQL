// ========================================================================
// 0. SIMULAÇÃO DA BASE DE DADOS RELACIONAL (Substitui a leitura do BD SQL)
//    Estes dados seriam o resultado de um SELECT JOIN do servidor.
// ========================================================================
const dadosSimuladosDB = [
    { 
        id: 101, 
        nome: "USF do Morro do Estado", 
        tipo_unidade: "USF", 
        bairro: "Fonseca", 
        endereco: "Rua Dr. Luiz Palmier, S/N",
        horario_funcionamento: "Segunda a Sexta, 8h às 17h", 
        telefone: "(21) 3601-2000",
        servicos: ["Vacinação Infantil", "Pré-natal", "Planejamento Familiar"] 
    },
    { 
        id: 102, 
        nome: "Policlínica Regional Dr. Guilherme Taylor", 
        tipo_unidade: "Policlínica/Secundária", 
        bairro: "Pendotiba", 
        endereco: "Estrada da Paciência, 1147",
        horario_funcionamento: "Segunda a Sexta, 7h às 19h", 
        telefone: "(21) 2717-3450",
        servicos: ["Consultas Especializadas", "Exames Laboratoriais", "Farmácia Básica"]
    },
    { 
        id: 103, 
        nome: "USF Baldeador", 
        tipo_unidade: "USF", 
        bairro: "Baldeador", 
        endereco: "Rua do Baldeador, 222",
        horario_funcionamento: "Segunda a Sexta, 8h às 17h", 
        telefone: "(21) 3601-3000",
        servicos: ["Vacinação Infantil", "Planejamento Familiar", "Acompanhamento Odontológico"]
    },
    { 
        id: 104, 
        nome: "Clínica da Família", 
        tipo_unidade: "Clínica", 
        bairro: "Icaraí", 
        endereco: "Rua Gavião Peixoto, 76",
        horario_funcionamento: "Segunda a Sexta, 8h às 17h", 
        telefone: "(21) 3601-4000",
        servicos: ["Vacinação Infantil", "Consultas"]
    }
];

// Array que armazena os dados atuais para o filtro
let todasUnidades = [];

// ========================================================================
// 1. VARIÁVEIS GLOBAIS (Elementos HTML)
// ========================================================================

const unidadesLista = document.getElementById('unidadesLista');
const inputBusca = document.getElementById('inputBusca');
const formFeedback = document.getElementById('formFeedback');
const anonimoCheck = document.getElementById('anonimoCheck');
const nomeInput = document.getElementById('nome');
const sobrenomeInput = document.getElementById('sobrenome');
const sugestaoInput = document.getElementById('sugestao'); // Usado para a coleta do feedback

// ========================================================================
// 2. FUNÇÕES DE RENDERIZAÇÃO E EXIBIÇÃO (Leitura/Visualização)
// ========================================================================

function criarCardUnidade(unidade) {
    // Cria badges para cada serviço
    const servicosHtml = (unidade.servicos || [])
        .map(servico => `<span class="badge bg-secondary badge-servico">${servico}</span>`)
        .join('');

    return `
        <div class="col">
            <div class="card unidade-card shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${unidade.nome}</h5>
                    <p class="card-text text-muted mb-1">${unidade.tipo_unidade} - ${unidade.bairro}</p>
                    <p class="card-text">
                        <i class="bi bi-geo-alt-fill me-1"></i> Endereço: ${unidade.endereco || 'Não informado'}
                    </p>
                    <p class="card-text">
                        <i class="bi bi-clock me-1"></i> Horário: ${unidade.horario_funcionamento || 'Verificar localmente'}
                    </p>
                    <p class="card-text">
                        <i class="bi bi-telephone me-1"></i> Contato: ${unidade.telefone || 'Sem telefone de contato'}
                    </p>
                    <hr>
                    <h6>Serviços Oferecidos:</h6>
                    <div class="d-flex flex-wrap">${servicosHtml}</div>
                </div>
            </div>
        </div>
    `;
}

function exibirUnidades(unidades) {
    if (unidadesLista) {
        if (unidades && unidades.length > 0) {
            unidadesLista.innerHTML = unidades.map(criarCardUnidade).join('');
        } else {
            unidadesLista.innerHTML = '<div class="col-12"><p class="alert alert-warning text-center">Nenhuma unidade encontrada com os critérios de busca.</p></div>';
        }
    }
}

// ========================================================================
// 3. FUNÇÃO DE BUSCA E FILTRO (Lógica de Consulta)
// ========================================================================

function filtrarUnidades(termo) {
    const termoNormalizado = termo.toLowerCase().trim();

    if (!termoNormalizado) {
        exibirUnidades(todasUnidades);
        return;
    }

    const unidadesFiltradas = todasUnidades.filter(unidade => {
        // Normaliza campos para comparação
        const nome = unidade.nome ? unidade.nome.toLowerCase() : '';
        const bairro = unidade.bairro ? unidade.bairro.toLowerCase() : '';
        
        // 1. Busca no NOME ou BAIRRO
        if (nome.includes(termoNormalizado) || bairro.includes(termoNormalizado)) {
            return true;
        }

        // 2. Busca nos SERVIÇOS
        if (unidade.servicos && Array.isArray(unidade.servicos)) {
            const servicoEncontrado = unidade.servicos.some(servico => 
                servico.toLowerCase().includes(termoNormalizado)
            );
            return servicoEncontrado;
        }
        return false;
    });

    exibirUnidades(unidadesFiltradas);
}

// ========================================================================
// 4. LÓGICA DE MANIPULAÇÃO DE DADOS (CRUD Conceitual)
// ========================================================================

/**
 * Simula a inserção de um novo feedback no Banco de Dados Relacional.
 * Usa console.log para demonstrar o comando SQL INSERT conceitual.
 */
function enviarFeedbackHandler(e) {
    e.preventDefault();

    const nomeCompleto = anonimoCheck.checked 
        ? 'Anônimo' 
        : `${nomeInput.value} ${sobrenomeInput.value}`.trim();

    const novoFeedback = {
        nome_usuario: nomeCompleto,
        sugestao: sugestaoInput.value,
        data_envio: new Date().toISOString(),
        id_unidade: null // Poderia ser capturado se o formulário estivesse em um card
    };

    // Demonstração da Inserção de Dados (Requisito: Manipulação de Dados - INSERT)
    console.groupCollapsed("Demonstração de INSERT SQL (Feedback)");
    console.log("Comando SQL Simulado:");
    console.log(`INSERT INTO Feedbacks (nome_usuario, sugestao, data_envio) VALUES ('${novoFeedback.nome_usuario}', '${novoFeedback.sugestao}', '${novoFeedback.data_envio}');`);
    console.log("Dados Inseridos:", novoFeedback);
    console.groupEnd();
    
    // Alerta visual para o usuário
    alert("Feedback enviado com sucesso! (Operação de INSERT SQL demonstrada no console para avaliação).");

    // Limpa o formulário
    formFeedback.reset();
    nomeInput.disabled = true; // Volta ao modo anônimo padrão
    sobrenomeInput.disabled = true;
}

// ========================================================================
// 5. FUNÇÃO PRINCIPAL DE INICIALIZAÇÃO E EVENT LISTENERS
// ========================================================================

function iniciarAplicacao() {
    // 1. Carrega os dados da simulação (Substitui o Firebase/API)
    todasUnidades = dadosSimuladosDB; 
    exibirUnidades(todasUnidades); // Exibe a lista completa ao carregar

    // 2. Evento de Busca e Filtro (INPUT)
    if (inputBusca) {
        inputBusca.addEventListener('input', (e) => {
            filtrarUnidades(e.target.value); 
        });
        // Previne o recarregamento da página ao enviar a busca (comportamento padrão de formulário)
        document.querySelector('#busca form').addEventListener('submit', (e) => e.preventDefault());
    }

    // 3. Evento de Envio de Feedback (Submit)
    if (formFeedback) {
        formFeedback.addEventListener('submit', enviarFeedbackHandler);
    }
    
    // 4. Controle de Modo Anônimo (Requisito Funcional)
    if (anonimoCheck) {
        anonimoCheck.addEventListener('change', () => {
            const isAnonimo = anonimoCheck.checked;
            nomeInput.disabled = isAnonimo;
            sobrenomeInput.disabled = isAnonimo;
            if (isAnonimo) {
                nomeInput.value = '';
                sobrenomeInput.value = '';
            }
        });
    }
    
    console.log("Aplicação Front-end inicializada com sucesso. Dados carregados do modelo simulado.");
}

// Garante que o código de inicialização só rode após o HTML estar pronto
document.addEventListener('DOMContentLoaded', iniciarAplicacao);
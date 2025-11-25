-- DDL: Criação das Tabelas do Modelo Relacional

-- -----------------------------------------------------------------------
-- 1. Tabela UnidadesSaude: Armazena a informação primária de localização e contato.
--    id_unidade: Usamos SERIAL ou GENERATED AS IDENTITY para garantir que seja única.
-- -----------------------------------------------------------------------
CREATE TABLE UnidadesSaude (
    id_unidade SERIAL PRIMARY KEY, -- Chave Primária Auto-Incremental
    nome VARCHAR(255) NOT NULL,
    tipo_unidade VARCHAR(100) NOT NULL, -- Ex: USF, Policlínica
    endereco VARCHAR(255) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    horario_funcionamento VARCHAR(255),
    telefone VARCHAR(20)
);

-- -----------------------------------------------------------------------
-- 2. Tabela Servicos: Catálogo de todos os serviços que Niterói oferece.
-- -----------------------------------------------------------------------
CREATE TABLE Servicos (
    id_servico SERIAL PRIMARY KEY,
    nome_servico VARCHAR(100) NOT NULL UNIQUE -- Garante que o nome do serviço não se repita
);

-- -----------------------------------------------------------------------
-- 3. Tabela UnidadeServico (N:M): Resolve o relacionamento entre Unidades e Serviços.
-- -----------------------------------------------------------------------
CREATE TABLE UnidadeServico (
    id_unidade INT NOT NULL,
    id_servico INT NOT NULL,
    PRIMARY KEY (id_unidade, id_servico), -- Chave primária composta
    
    -- Restrições de Chave Estrangeira
    FOREIGN KEY (id_unidade) REFERENCES UnidadesSaude(id_unidade) ON DELETE CASCADE,
    FOREIGN KEY (id_servico) REFERENCES Servicos(id_servico) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------
-- 4. Tabela Feedbacks: Armazena sugestões e críticas dos usuários.
-- -----------------------------------------------------------------------
CREATE TABLE Feedbacks (
    id_feedback SERIAL PRIMARY KEY,
    id_unidade INT, 
    nome_usuario VARCHAR(255),
    sugestao TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Chave Estrangeira para rastrear o feedback a uma unidade, pode ser NULL
    FOREIGN KEY (id_unidade) REFERENCES UnidadesSaude(id_unidade) ON DELETE SET NULL
);

-- DML: Inserção de Dados de Teste

-- A. Inserção de Serviços (Catálogo)
INSERT INTO Servicos (nome_servico) VALUES
('Vacinação Infantil'), -- ID 1
('Pré-natal'),          -- ID 2
('Planejamento Familiar'), -- ID 3
('Consultas Especializadas'), -- ID 4
('Exames Laboratoriais');     -- ID 5

-- B. Inserção de Unidades (Dados de Localização)
INSERT INTO UnidadesSaude (nome, tipo_unidade, endereco, bairro, horario_funcionamento, telefone)
VALUES 
('USF do Morro do Estado', 'USF', 'Rua Dr. Luiz Palmier, S/N', 'Fonseca', '08:00 - 17:00', '(21) 3601-2000'), -- ID ~1
('Policlínica Dr. Guilherme Taylor', 'Policlínica', 'Estrada da Paciência, 1147', 'Pendotiba', '07:00 - 19:00', '(21) 2717-3450'), -- ID ~2
('USF Baldeador', 'USF', 'Rua do Baldeador, 222', 'Baldeador', '08:00 - 17:00', '(21) 3601-3000'); -- ID ~3

-- C. Inserção de Relacionamentos (N:M)
-- USF Morro do Estado (ID 1) oferece Vacinação (1), Pré-natal (2) e Planejamento (3)
INSERT INTO UnidadeServico (id_unidade, id_servico) VALUES (1, 1), (1, 2), (1, 3); 

-- Policlínica Guilherme Taylor (ID 2) oferece Especialidades (4) e Exames (5)
INSERT INTO UnidadeServico (id_unidade, id_servico) VALUES (2, 4), (2, 5); 

-- USF Baldeador (ID 3) oferece Vacinação (1) e Planejamento (3)
INSERT INTO UnidadeServico (id_unidade, id_servico) VALUES (3, 1), (3, 3);
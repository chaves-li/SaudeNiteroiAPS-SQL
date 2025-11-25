# Projeto APS Niterói: Localizador de Unidades de Saúde

## 1. Descrição do Projeto

Este projeto consiste em um **Localizador de Unidades de Saúde da Atenção Primária (APS)** no município de Niterói, RJ. O objetivo é fornecer à população uma ferramenta **acessível** e **confiável** para encontrar unidades, verificar serviços e horários.

O projeto demonstra a aplicação de uma arquitetura profissional de **Três Camadas**, com o Front-end comunicando-se com uma API Back-end conceitual, que, por sua vez, interage com um Banco de Dados Relacional (SQL).

### Requisitos Funcionais Principais:

* **Busca e Filtro:** Pesquisa em tempo real por nome, bairro ou serviço.
* **Visualização de Dados:** Exibição detalhada de Unidades, Serviços e Contato.
* **Feedback:** Formulário para envio de sugestões (simulando a inserção no BD SQL).

***

## 2. Arquitetura e Tecnologias

A arquitetura do projeto separa estritamente as responsabilidades do cliente, do servidor e dos dados, conforme as boas práticas do desenvolvimento profissional.

| Camada | Tecnologia Principal | Implementação |
| :--- | :--- | :--- |
| **Front-end (Cliente)** | **HTML5, CSS3, Vanilla JavaScript** | Responsável pela interface, lógica de busca local e comunicação via `fetch` (requisições HTTP). |
| **Estilização** | **Bootstrap 5** | Garantia de **Responsividade** e **Usabilidade** do layout. |
| **Back-end (API)** | Conceitual (**Node.js/Express**) | Rota intermediária que receberia as requisições do Front-end e as traduziria para comandos SQL. (Simulada para a avaliação). |
| **Banco de Dados** | **Modelo Relacional (SQL)** | O modelo conceitual para armazenamento de dados, garantindo **Integridade** e **Consistência** (DDL e DML documentados). |

***

## 3. Instalação e Configuração

Para rodar e entender o projeto, é necessário configurar o ambiente local.

### 3.1. Clonagem do Repositório

Abra o Terminal e baixe o código-fonte:

```bash
git clone [https://github.com/chaves-li/SaudeNiteroiAPS-API.git](https://github.com/chaves-li/SaudeNiteroiAPS-API.git)
cd SaudeNiteroiAPS-API

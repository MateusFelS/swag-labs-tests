# Estudo de Testes com Playwright - Swag Labs

Este é um projeto de estudo para aprender e praticar automação de testes com Playwright, focado em testes de interface na plataforma [Swag Labs](https://www.saucedemo.com/). O objetivo é verificar funcionalidades essenciais do sistema de gerenciamento de produtos e carrinho de compras, cobrindo cenários de login, adição e remoção de produtos, e realização de checkout.

## Índice

- [Objetivo](#objetivo)
- [Funcionalidades Testadas](#funcionalidades-testadas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Execução](#instalação-e-execução)

## Objetivo

Este projeto foi desenvolvido para exercitar habilidades de QA em automação, utilizando o Playwright para testar interações na interface de um sistema web. Os testes cobrem funcionalidades como login, gerenciamento de produtos no carrinho e fluxo de checkout.

## Funcionalidades Testadas

- **Login**:
  - Login bem-sucedido com credenciais válidas.
  - Login com falha ao utilizar credenciais inválidas.
  - Login com campos vazios, validando mensagens de erro.

- **Carrinho**:
  - Adição de produtos ao carrinho.
  - Remoção de produtos do carrinho.
  - Verificação dos itens no carrinho.

- **Checkout**:
  - Fluxo de checkout bem-sucedido ao preencher o formulário com dados válidos.
  - Validação de erro ao tentar realizar checkout com formulário vazio.
  
## Tecnologias Utilizadas

- **Playwright**: Framework de automação de testes end-to-end.
- **TypeScript**: Linguagem principal para escrita dos testes.

## Estrutura do Projeto

A estrutura de pastas e arquivos é organizada para facilitar a manutenção e entendimento dos testes.

   ```bash
    ├── tests/
    │   ├── login.spec.ts            # Testes relacionados ao login
    │   ├── cart.spec.ts             # Testes de adição e remoção de produtos no carrinho
    │   ├── checkout.spec.ts         # Testes do fluxo de checkout
    ├── playwright.config.ts         # Configurações do Playwright
    ├── README.md                    # Documentação do projeto
   ```
## Instalação e Execução

Para rodar os testes em sua máquina local, siga os passos abaixo:

1. **Clone este repositório**:

   ```bash
   git clone https://github.com/MateusFels/swag-labs-tests.git
   cd "seu_repositorio"

2. **Instale as dependências**:

   ```bash
   npm install

3. **Execute os testes**:

 - Para rodar os testes em modo interativo:

   ```bash
   npx playwright test --ui

 - Para rodar os testes em modo headless (sem interface):

   ```bash
   npx playwright test

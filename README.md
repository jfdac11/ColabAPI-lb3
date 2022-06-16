<p align="center">
  <a href="" rel="noopener">
  <img width=300px height=200px src="./imagens/logo.png" alt="Logo do Projeto"></a>
</p>

<h3 align="center">Aplicação: monitoramento da saúde</h3>

---

<p align="center"> API construída em Loopback utilizando microsserviços com comunicação RESTful em ambiente Docker para monitoramento de informações referentes à saúde dos usuários do aplicativo (colocar link do app) e apresentação desses dados na _dashboard_ do sistema (colocar link do sistema).
    
    <br>
</p>

## 📝 Sumário

- [Sobre](#sobre)
- [Iniciando](#inicio)
- [Preparando Uso](#preparando)
- [Como Usar](#como-usar)
- [Tecnologias Usadas](#tecnologias-usadas)
- [TODO](./TODO.md)
- [Contribuindo](./CONTRIBUTING.md)
- [Desenvolvedores](#desenvolvedores)

## 🧐 Sobre <a name = "sobre"></a>

Projeto desenvolvido como 3ª avaliação da disciplina Sistemas Distruídos, ministrada pelo professor Sérgio, do curso de Engenharia de Computação do Centro Universitário SENAI CIMATEC.

O presente trabalho visa a implementação de um aplicativo na área de saúde, o qual possui 2 tipos de usuários (colaborador e administrador), os quais realizam cadastro e login. O primeiro registra seus dados: data de nascimento; peso; altura, além de avaliações, incluindo: pressão arterial; batimento cardíaco por minuto (BPM). Conforme as medidas fornecidas, é calculado o IMC (índice de massa corpórea) e indicada a classificação da pressão arterial. Já o administrador, tem acesso a todas as informações dos colaboradores, podendo visualizá-las em uma dashboard. 

Esse projeto possui os seguintes microsserviços: 
- Administrativo, o qual controla os processos realizados por um administrador, como o cadastro, login, e a visualização da dashboard;
- Colaborativo, controlando os processos realizados por um colaborador: cadastro; login; inserção das medidas (peso e altura);
- Avaliativo, que realiza o controle dos processos necessários para criar avaliações dos colaboradores, sendo: a classificação os colaboradores de acordo com suas informações e o gerenciamento do histórico de medidas.


## 🏁 Iniciando <a name = "inicio"></a>

Essas serão as instruções de como reproduzir uma cópia do seu projeto para desenvolvê-lo ou testá-lo. Veja "[Preparando Uso](#preparando)" para instruções de como preparar o sistema desenvolvido para uso.

### Pré-requisitos

Docker

```
dê exemplos
```

NodeJs


```
dê exemplos
```

Loopback

### Instalando

Um passo a passo com exemplos de como deixar tudo pronto para o desenvolvimento.

Explique cada passo

```
Dê um exemplo
```

e repita

```
até que esteja finalizado
```

Finalize com algum exemplo para verificar se a finalização ocorreu bem.

## 🚀 Preparando Uso <a name = "preparando"></a>

Mais instruções de como preparar o seu sistema para o uso normal.

## 🎈 Como Usar <a name="como-usar"></a>

Utilizando o terminal no caminho do diretório do projeto rode o comando:

```
npm start
```

## ⛏️ Tecnologias Usadas <a name = "tecnologias-usadas"></a>

- [MongoDB](https://www.mongodb.com/) - Banco de Dados
- [Loopback](https://loopback.io/) - Framework de Servidor
- [NodeJs](https://nodejs.org/en/) - Ambiente de Servidor
- [Docker](https://docker.com/) - Plataforma

## ✍️ Desenvolvedores <a name = "desenvolvedores"></a>

- [@DMCDavi](https://github.com/DMCDavi)
- [@fernandanlisboa](https://github.com/fernandanlisboa)
- [@jfdac11](https://github.com/jfdac11)
- [@AmadoMaria](https://github.com/AmadoMaria)

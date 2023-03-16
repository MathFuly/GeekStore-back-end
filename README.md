# GeekStore API
GeekStore é um projeto de e-commerce, focado na venda de roupas com estampas do mundo geek, desenvolvido para o meu último projeto integrador na Instituição de Ensino SENAC. A loja virtual possuí um sistema de drops, que consite em produtos, que são lançados todo mês, com quantidade limitadas por peça.

# Descrição
Essa é uma api que cuida desde cadastros de usuários, produtos, categorias, etc, até operações mais complexas como gestão de carrinho de compras e compras de um usuário.

Foram utilizadas diversas técnologias durante o desenvolvimento mais as que valem ressaltar é o Prisma ORM que permite ,caso banco de dados mude no futuro, não seja necessário mudar toda a estrutura do projeto, o TypeScript com Clean Code que permite uma melhor manutenção de código caso precise e o Node com Express.

Os desafiosdesse projeto foram as vaidações de compras pois é necessário checar e alterar diversas tabelas para que assim não haja erro na hora de saber quem comprou, o que comprou, quantas unidades comprou e quanto custou.

# Instalação
Para instalar o projeto é necessário ter a última versão LTS do node, que pode ser encontada aqui: https://nodejs.org/en;
A api foi feita em cima de um banco de dados SQL utilizando postgresql que pode ser baixado por aqui: https://www.postgresql.org/download/;
Após a Instalação do Node você deve abrir um terminal e navegar até a pasta do projeto, depois digite o comando npx prisma migrate dev ou npx prisma migrate para criar o banco de dados;
Ao terminar a criação do banco de dados execute o comando npm start para iniciar o projeto.

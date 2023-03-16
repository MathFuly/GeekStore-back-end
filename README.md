# GeekStore API
GeekStore é um projeto de e-commerce focado na venda de roupas com estampas do mundo geek, desenvolvido para o meu último projeto integrador na Instituição de Ensino SENAC. A loja virtual possui um sistema de drops, que consiste em produtos lançados todo mês, com quantidades limitadas por peça.

# Descrição
Essa é uma API que cuida desde o cadastro de usuários, produtos, categorias, etc., até operações mais complexas, como gestão do carrinho de compras e compras de um usuário.

Foram utilizadas diversas tecnologias durante o desenvolvimento, mas as que valem ressaltar são: o Prisma ORM, que permite, caso o banco de dados mude no futuro, não ser necessário mudar toda a estrutura do projeto; o TypeScript com Clean Code, que permite uma melhor manutenção do código, caso necessário; e o Node com Express.

Os desafios desse projeto foram as validações de compras, pois é necessário checar e alterar diversas tabelas para que não haja erro na hora de saber quem comprou, o que comprou, quantas unidades comprou e quanto custou.

# Instalação
Para instalar o projeto, é necessário ter a última versão LTS do Node, que pode ser encontrada aqui: https://nodejs.org/en/.

A API foi feita em cima de um banco de dados SQL utilizando PostgreSQL, que pode ser baixado aqui: https://www.postgresql.org/download/.

Após a instalação do Node, você deve abrir um terminal e navegar até a pasta do projeto. Em seguida, digite o comando "npx prisma migrate dev" ou "npx prisma migrate" para criar o banco de dados.

Ao terminar a criação do banco de dados, execute o comando "npm start" para iniciar o projeto.

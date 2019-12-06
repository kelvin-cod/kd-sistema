/****** Object:  Database [Lanchonete]    Script Date: 02/11/2019 18:51:51 ******/
CREATE DATABASE Lanchonete;



USE Lanchonete;
 
/****** Object:  Table [dbo].[Categoria]    Script Date: 02/11/2019 18:51:51 ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
/* SET ANSI_PADDING ON */
 
CREATE TABLE Categoria(
	idCategoria int AUTO_INCREMENT NOT NULL,
	Descricao varchar(100) NOT NULL,
	Estatus varchar(100) NULL,
 CONSTRAINT PK_idCategoria PRIMARY KEY 
(
	idCategoria ASC
) 
);

/* SET ANSI_PADDING OFF */
 
/****** Object:  Table [dbo].[Cliente]    Script Date: 02/11/2019 18:51:51 ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
/* SET ANSI_PADDING ON */
 
CREATE TABLE Cliente(
	idCliente int AUTO_INCREMENT NOT NULL,
	Nome varchar(100) NULL,
	Celular varchar(30) NULL,
	Telefone varchar(30) NULL,
	idEnd int NULL,
 CONSTRAINT PK_idCliente PRIMARY KEY 
(
	idCliente ASC
) 
);

/* SET ANSI_PADDING OFF */
 
/****** Object:  Table [dbo].[Endereco]    Script Date: 02/11/2019 18:51:51 ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
/* SET ANSI_PADDING ON */
 
CREATE TABLE Endereco(
	idEnd int AUTO_INCREMENT NOT NULL,
	Rua varchar(100) NULL,
	Nuemro varchar(10) NULL,
	Bairro varchar(100) NULL,
	Complemento varchar(100) NULL,
	Cep varchar(20) NULL,
 CONSTRAINT PK_idEnd PRIMARY KEY 
(
	idEnd ASC
) 
);

/* SET ANSI_PADDING OFF */
 
/****** Object:  Table [dbo].[Entrega]    Script Date: 02/11/2019 18:51:51 ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
/* SET ANSI_PADDING ON */
 
CREATE TABLE Entrega(
	idEntrega int AUTO_INCREMENT NOT NULL,
	Numero varchar(100) NOT NULL,
	Data date NOT NULL,
	Hora date NOT NULL,
 CONSTRAINT PK_idENTREGA PRIMARY KEY 
(
	idEntrega ASC
) 
);

/* SET ANSI_PADDING OFF */
 
/****** Object:  Table [dbo].[Fornece]    Script Date: 02/11/2019 18:51:51 ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
CREATE TABLE Fornece(
	idFornece int AUTO_INCREMENT NOT NULL,
	idFornecedor int NULL,
	idProduto int NULL,
 CONSTRAINT PK_idFornece PRIMARY KEY 
(
	idFornece ASC
) 
);

/****** Object:  Table [dbo].[Fornecedor]    Script Date: 02/11/2019 18:51:51 ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
/* SET ANSI_PADDING ON */
 
CREATE TABLE Fornecedor(
	idFornecedor int AUTO_INCREMENT NOT NULL,
	Nome varchar(100) NOT NULL,
	Celular varchar(40) NOT NULL,
	Telefone varchar(40) NOT NULL,
 CONSTRAINT PK_idFornecedor PRIMARY KEY 
(
	idFornecedor ASC
) 
);

/* SET ANSI_PADDING OFF */
 
/****** Object:  Table [dbo].[ItemPedido]    Script Date: 02/11/2019 18:51:51 ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
/* SET ANSI_PADDING ON */
 
CREATE TABLE ItemPedido(
	idItemPedido int AUTO_INCREMENT NOT NULL,
	Produto varchar(100) NULL,
	Qtd int NULL,
	SubTotal Decimal(15,4) NULL,
	idProduto int NULL,
	idPedido int NULL,
 CONSTRAINT PK_idItemPedido PRIMARY KEY 
(
	idItemPedido ASC
) 
);

/* SET ANSI_PADDING OFF */
 
/****** Object:  Table [dbo].[Pedido]    Script Date: 02/11/2019 18:51:51 ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
/* SET ANSI_PADDING ON */
 
CREATE TABLE Pedido(
	idPedido int AUTO_INCREMENT NOT NULL,
	NumPedido varchar(50) NULL,
	ValorTot Decimal(15,4) NULL,
	Hora date NOT NULL,
	idUsuario int NULL,
	idCliente int NULL,
 CONSTRAINT PK_idPedido PRIMARY KEY 
(
	idPedido ASC
) 
);

/* SET ANSI_PADDING OFF */
 
/****** Object:  Table [dbo].[Possui]    Script Date: 02/11/2019 18:51:51 ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
CREATE TABLE Possui(
	idPossui int AUTO_INCREMENT NOT NULL,
	idEnd int NULL,
	idCliente int NULL,
 CONSTRAINT PK_idPossui PRIMARY KEY 
(
	idPossui ASC
) 
);

/****** Object:  Table [dbo].[Produto]    Script Date: 02/11/2019 18:51:51 ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
/* SET ANSI_PADDING ON */
 
CREATE TABLE Produto(
	idProduto int AUTO_INCREMENT NOT NULL,
	Descricao varchar(100) NOT NULL,
	Valor Decimal(15,4) NULL,
	idFornecedor int NULL,
	idCategoria int NULL,
 CONSTRAINT PK_idProduto PRIMARY KEY 
(
	idProduto ASC
) 
);

/* SET ANSI_PADDING OFF */
 
/****** Object:  Table [dbo].[Usuario]    Script Date: 02/11/2019 18:51:51 ******/
/* SET ANSI_NULLS ON */
 
/* SET QUOTED_IDENTIFIER ON */
 
/* SET ANSI_PADDING ON */
 
CREATE TABLE Usuario(
	idUsuario int AUTO_INCREMENT NOT NULL,
	Nome varchar(100) NOT NULL,
	Email varchar(100) NOT NULL,
	Senha varchar(50) NOT NULL,
 CONSTRAINT PK_idUsuario PRIMARY KEY 
(
	idUsuario ASC
) 
);

/* SET ANSI_PADDING OFF 
 
ALTER TABLE Cliente ADD  CONSTRAINT DF_Nome DEFAULT 'Cliente Padrão' FOR Nome;*/

ALTER TABLE Cliente  ADD  CONSTRAINT FK_idEnd FOREIGN KEY(idEnd)
REFERENCES Endereco (idEnd);



ALTER TABLE Fornece   ADD  CONSTRAINT FK_idFdor FOREIGN KEY(idFornecedor)
REFERENCES Fornecedor (idFornecedor);



ALTER TABLE Fornece   ADD  CONSTRAINT FK_idPdto FOREIGN KEY(idProduto)
REFERENCES Produto (idProduto);



ALTER TABLE ItemPedido   ADD  CONSTRAINT FK_idPedido FOREIGN KEY(idPedido)
REFERENCES Pedido (idPedido);



ALTER TABLE ItemPedido   ADD  CONSTRAINT FK_idProduto FOREIGN KEY(idProduto)
REFERENCES Produto (idProduto);



ALTER TABLE Pedido   ADD  CONSTRAINT FK_idCliente FOREIGN KEY(idCliente)
REFERENCES Cliente (idCliente);


ALTER TABLE Pedido   ADD  CONSTRAINT FK_idUsuario FOREIGN KEY(idUsuario)
REFERENCES Usuario (idUsuario);


ALTER TABLE Possui   ADD  CONSTRAINT FK_idCli FOREIGN KEY(idCliente)
REFERENCES Cliente (idCliente);



ALTER TABLE Possui   ADD  CONSTRAINT FK_idEndereco FOREIGN KEY(idEnd)
REFERENCES Endereco (idEnd);



ALTER TABLE Produto   ADD  CONSTRAINT FK_idCategoria FOREIGN KEY(idCategoria)
REFERENCES Categoria (idCategoria);



ALTER TABLE Produto   ADD  CONSTRAINT FK_idFornecedor FOREIGN KEY(idFornecedor)
REFERENCES Fornecedor (idFornecedor);



ALTER TABLE Categoria   ADD  CONSTRAINT CHC_Statos CHECK  ((Estatus='Inativo' OR Estatus='Ativo'));



ALTER TABLE ItemPedido   ADD  CONSTRAINT CHK_Qtd CHECK  ((Qtd>=(1)));



ALTER TABLE ItemPedido ADD  CONSTRAINT CHK_SubTotal CHECK  ((SubTotal>(0)));



ALTER TABLE Pedido ADD  CONSTRAINT CHK_ValorTot CHECK  ((ValorTot>=(1)));



ALTER TABLE Produto   ADD  CONSTRAINT CHK_Valor CHECK  ((Valor>(0)))





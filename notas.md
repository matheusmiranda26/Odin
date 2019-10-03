* criação tabela insumo_historico
    create table insumo_historico(
	id int(10) NOT NULL AUTO_INCREMENT,
    idInsumo int(10) not null,
    tipo varchar(45),
    data date not null,
    quantidadePecas int(10),
    media numeric(5,2),
    quantidade numeric(5,2),
     PRIMARY KEY (id),
     KEY `fk_insumo_historico_idx` (`idInsumo`),
  CONSTRAINT `fk_insumo_historico` FOREIGN KEY (`idInsumo`) REFERENCES `insumo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    );

* adição da coluna deletedAt
    ALTER TABLE `odin`.`insumo` 
    ADD COLUMN `deletedAt` DATE NULL AFTER `idFornecedor`;

* remoção do not null
    ALTER TABLE `odin`.`insumo` 
    DROP FOREIGN KEY `fk_produtos_categorias1`;
    ALTER TABLE `odin`.`insumo` 
    CHANGE COLUMN `idCategoria` `idCategoria` INT(10) NULL ;
    ALTER TABLE `odin`.`insumo` 
    ADD CONSTRAINT `fk_produtos_categorias1`
  FOREIGN KEY (`idCategoria`)
  REFERENCES `odin`.`categorias` (`id`);


* 
    ALTER TABLE `odin`.`insumo` 
    CHANGE COLUMN `precoCusto` `preco` DECIMAL(10,2) NULL DEFAULT NULL ;


*   
    ALTER TABLE `odin`.`insumo_historico` 
    ADD COLUMN `referencia` VARCHAR(45) NULL AFTER `quantidade`;

* 
    ALTER TABLE `odin`.`insumo` 
    ADD COLUMN `cor` VARCHAR(45) NULL DEFAULT NULL AFTER `deletedAt`,
    CHANGE COLUMN `codigo` `codigo` VARCHAR(45) NULL DEFAULT NULL ;

* 
    ALTER TABLE `odin`.`fornecedores` 
    CHANGE COLUMN `inscricaoEstadual` `inscricaoEstadual_rg` VARCHAR(20) NULL DEFAULT NULL ;

*   
    ALTER TABLE `odin`.`fornecedores` 
    CHANGE COLUMN `fornecedorescol` `nomeFantasia` VARCHAR(45) NULL DEFAULT NULL ;

*   
    ALTER TABLE `odin`.`insumo_historico` 
    ADD COLUMN `estoqueAtual` DECIMAL(5,2) NULL AFTER `referencia`;
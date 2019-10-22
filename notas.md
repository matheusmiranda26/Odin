ALTER TABLE `odin`.`despesas` 
ADD COLUMN `desconto` DECIMAL(10,2) NULL DEFAULT NULL AFTER `pago`,
ADD COLUMN `valorTotal` DECIMAL(10,2) NULL DEFAULT NULL AFTER `desconto`;


ALTER TABLE `odin`.`despesas` 
ADD COLUMN `observacao` VARCHAR(45) NULL AFTER `valorTotal`;
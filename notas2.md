ALTER TABLE `odin`.`despesas` 
ADD COLUMN `deletedAt` DATE NULL AFTER `formaPagamento`;

ALTER TABLE `odin`.`despesas` 
ADD COLUMN `numero` VARCHAR(45) NULL DEFAULT NULL AFTER `deletedAt`;

ALTER TABLE `odin`.`despesas` 
ADD COLUMN `banco` VARCHAR(45) NULL AFTER `numero`,
ADD COLUMN `agencia` VARCHAR(45) NULL AFTER `banco`;

ALTER TABLE `odin`.`despesas` 
CHANGE COLUMN `banco` `conta` VARCHAR(45) NULL DEFAULT NULL ;

ALTER TABLE `odin`.`despesas` 
ADD COLUMN `valor` DECIMAL(10,2) NULL DEFAULT NULL AFTER `agencia`,
ADD COLUMN `pago` VARCHAR(10) NULL DEFAULT NULL AFTER `valor`;

UPDATE `odin`.`vendedores` SET `status` = '1' WHERE (`id` = '1');
UPDATE `odin`.`vendedores` SET `status` = '1' WHERE (`id` = '4');
UPDATE `odin`.`vendedores` SET `status` = '1' WHERE (`id` = '9');
UPDATE `odin`.`vendedores` SET `status` = '1' WHERE (`id` = '14');
UPDATE `odin`.`vendedores` SET `status` = '1' WHERE (`id` = '24');
UPDATE `odin`.`vendedores` SET `status` = '1' WHERE (`id` = '25');
UPDATE `odin`.`vendedores` SET `status` = '1' WHERE (`id` = '26');
UPDATE `odin`.`vendedores` SET `status` = '1' WHERE (`id` = '27');
UPDATE `odin`.`vendedores` SET `status` = '1' WHERE (`id` = '28');
UPDATE `odin`.`vendedores` SET `status` = '1' WHERE (`id` = '29');
UPDATE `odin`.`vendedores` SET `status` = '1' WHERE (`id` = '30');
UPDATE `odin`.`vendedores` SET `status` = '0' WHERE (`id` = '2');
UPDATE `odin`.`vendedores` SET `status` = '0' WHERE (`id` = '3');
UPDATE `odin`.`vendedores` SET `status` = '0' WHERE (`id` = '5');
UPDATE `odin`.`vendedores` SET `status` = '0' WHERE (`id` = '6');
UPDATE `odin`.`vendedores` SET `status` = '0' WHERE (`id` = '7');
UPDATE `odin`.`vendedores` SET `status` = '0' WHERE (`id` = '8');
UPDATE `odin`.`vendedores` SET `status` = '0' WHERE (`id` = '11');
UPDATE `odin`.`vendedores` SET `status` = '0' WHERE (`id` = '12');
UPDATE `odin`.`vendedores` SET `status` = '0' WHERE (`id` = '13');
UPDATE `odin`.`vendedores` SET `status` = '0' WHERE (`id` = '15');
UPDATE `odin`.`vendedores` SET `status` = '0' WHERE (`id` = '16');
UPDATE `odin`.`vendedores` SET `status` = '0' WHERE (`id` = '17');
UPDATE `odin`.`vendedores` SET `status` = '0' WHERE (`id` = '18');
UPDATE `odin`.`vendedores` SET `status` = '0' WHERE (`id` = '19');
UPDATE `odin`.`vendedores` SET `status` = '0' WHERE (`id` = '20');
UPDATE `odin`.`vendedores` SET `status` = '0' WHERE (`id` = '21');
UPDATE `odin`.`vendedores` SET `status` = '0' WHERE (`id` = '22');
UPDATE `odin`.`vendedores` SET `status` = '0' WHERE (`id` = '23');

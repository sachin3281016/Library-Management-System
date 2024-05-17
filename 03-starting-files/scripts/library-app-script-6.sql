use libraryapp;
drop table if exists `payment`;

create table `payment`(
`id` bigint(20) not null auto_increment,
`user_email` varchar(45) default null,
`amount` decimal(10,2) default null,
primary key(`id`)
)engine=InnoDB auto_increment=1 charset=latin1;
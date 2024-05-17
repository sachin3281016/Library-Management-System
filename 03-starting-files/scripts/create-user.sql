-- dorp user if exists

drop user if exists 'libraryapp3'@'%';
create user 'libraryapp3'@'%' identified by 'libraryApp$3';
GRANT ALL PRIVILEGES ON * . * TO 'libraryapp3'@'%';


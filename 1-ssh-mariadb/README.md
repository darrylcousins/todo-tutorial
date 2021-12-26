# Tutorial One

## SSH

Sort out ssh network connection between the two laptops.

`ifconfig` or `ip route list` to get ipaddress. Then log in with 

```bash
  $ ssh adam@192.168.1.66
```

And transfer files with

```bash
  $ scp file.txt adam@192.168.1.66:/home/adam/
```

## MariaDB 

Set up mariadb and create database `todo` with single table `tasks`.

```
  $ sudo apt install mariadb-server
  $ sudo mysql_secure_installation
```

Create an admin account, keep it easy and use same username and password:

```
  $ sudo mysql
  MariaDB [(none)]> GRANT ALL ON *.* TO 'adam'@'localhost' IDENTIFIED BY '********' WITH GRANT OPTION;
  MariaDB [(none)]> FLUSH PRIVILEGES;
  MariaDB [(none)]> exit
```

Test that worked:

```
  $ mysqladmin -u adam -p version
```

## Create TODO Database

```bash
  $ mysql -p
```

Copy paste this into mysql shell:

```sql
CREATE DATABASE todo;

CREATE TABLE todo.tasks (
  id INT(11) unsigned NOT NULL AUTO_INCREMENT,
  description VARCHAR(500) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);
```

## Simple SQL statements

```sql
use todo;
select * from tasks;
insert into tasks (description) values ("test1");
select * from tasks where id = 1;
update tasks set completed = 1 where id = 1;
```


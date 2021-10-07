select id,role_id,username,address from user;
-- select (columns) from (nama table)
select * from user where username = 'dino' and password = 'abcdef';
use sakila;

select * from  actor;
select * from actor where first_name = 'PENELOPE';
select * from actor where not first_name = 'PENELOPE' and actor_id>=100 order by first_name desc, last_name;
-- select > from > and,not,or> having >order by > limit
-- cari last namenya null  (is null, is not null)
select * from actor where last_name is null order by first_name desc, last_name;

-- pages=1,0 2,10 3,20 ,limit = 10    rumus = (pages-1) * 10   0,10,20, 
-- limit buat paging

select * from actor limit 10,10;

-- get data dengan fistrname penelope dan laura 
select * from actor where first_name  in ('penelope','laura');
-- get data dengan fistrname bukan penelope dan laura 
select * from actor where first_name  not in ('penelope','laura');
-- contoh between
-- between number
select * from payment where amount between 3 and 5; 
-- between waktu
select *
from payment where payment_date 
between "2005-07-01" and "2005-07-30" ; 

-- alias untuk mmbeberi nama lain dari sebuah column
select *, Date(payment_date) as tanggal_bayar, (amount * 0.1) as pajak
from payment where payment_date between "2005-07-01" and "2005-07-30" ; 

-- having untuk where column buatan 
select *, Date(payment_date) as tanggal_bayar, (amount * 0.1) as pajak
from payment 
where payment_date between "2005-07-01" and "2005-07-30"  
having pajak >0.8; 


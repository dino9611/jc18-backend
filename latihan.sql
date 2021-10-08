select id,role_id,username,address from user;
-- select (columns) from (nama table)
select * from user where username = 'dino' and password = 'abcdef';
use sakila;
use bejc18;
select * from  actor;
select * from actor where first_name = 'PENELOPE';
select * from actor where not first_name = 'PENELOPE' and actor_id>=100 order by first_name desc, last_name;

-- urutan syntax
-- select > from >join > where and,not,or> group by > having >order by > limit


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

-- update query where 
-- update user set username='admin',role_id=1 where id =1;

-- delete query where 
-- DELETE from user where id =1;

-- MIn Aggregate function bisa buat date atau number
select Min(amount) as minimum_amount from payment;

-- Max Aggregate function
select max(amount) as maximum_amount from payment;

select max(payment_date) as tanggal_terkahir from payment;

-- count Aggregate function hitung jumlah row
-- ada berapa payment yang amountnya diatas 0.5
select count(*) as jumlah_payment from payment where amount > 8 ;
-- ada berapa film  yang dimainkan acotr_id 1
select count(*) from film_Actor where actor_id = 1; 

-- avg 
-- rata-rata amount  
select avg(amount) as rata_amount from payment ;

-- rata-rata amount  bulan juli, juli = 7
select avg(amount) as rata_amount from payment where month(payment_date) = 7;

-- total 
-- total amount  bulan juli, juli = 7
select sum(amount) as total_amount from payment where month(payment_date) = 7;

-- total amount keseluruhan
select sum(amount) as total_amount from payment ;

-- group by with aggregate function
-- hitung film tiap aktor
select actor_id,count(*) as jumlah_film from film_Actor group by actor_id; 

-- hitung aktor tiap film
select film_id,count(*) as jumlah_aktor from film_Actor group by film_id; 

-- sub-query
select actor_id from actor where first_name ='penelope' and last_name='guiness' ;
select actor_id from actor where first_name ='penelope'  ;

select * from film_actor 
where actor_id = (select actor_id from actor where first_name ='penelope' and last_name='guiness') ;
-- subquerynya harus menghasilkan 1 row dan 1 column jika subquerynya dipake setealh opertaor =, > ,< dsb
select * from film_actor 
where actor_id in (select actor_id from actor where first_name ='penelope');
-- subquerynya harus menghasilkan row bebas dan hanya 1 column jika subquerynya dipake setelah operator in
-- cari list data payment yang amountnya diatas rata2 (hint subquery)
 select * from payment where amount > (select avg(amount) as rata_amount from payment) ;
 
 
-- join biasa 
-- join doang artinya itu inner join
 
 
 select fa.actor_id,first_name,last_name,fa.film_id,title 
	 from actor a
	 join film_actor fa on fa.actor_id = a.actor_id 
	 join film f on f.film_id = fa.film_id
	 where first_name ='penelope' and last_name='guiness';
 -- cari nama actor dengan film terbanyak     
 
select fa.actor_id, 
concat(a.first_name,' ',a.last_name) as full_name, count(*) as jumlah_film 
from film_Actor fa
join actor a on a.actor_id=fa.actor_id 
group by fa.actor_id 
order by jumlah_film desc
limit 1
; 

-- inner join  
select * from user u join phone p on u.id = p.user_id ;

-- left join  
select * from user u left join phone p on u.id = p.user_id ;
 
 -- right join  
select * from user u right join phone p on u.id = p.user_id ;
 
 
-- CREATE VIEW users_without_phone as
-- select u.*,phone_numb from user u left join phone p on u.id = p.user_id where phone_numb is null ;
-- show full tables;
 
-- select * from users_without_phone where username like '%tomb%';
 
 --  hitung total film tiap category, harus ada column nama kategorynya juga 
 
 select fc.category_id,name, count(*) as total_film 
 from film_category fc 
 join category c 
 on fc.category_id = c.category_id 
 group by fc.category_id;
 
  select fc.category_id,count(*) as total_film 
 from film_category fc 
 group by fc.category_id;
 
 
 -- rata-rata harga sewa tiap category film urutkan dari yang terbesar, nama_category,rata-ratanya 
	select fc.category_id ,c.name,avg(f.rental_rate) as rata2_rate
    from film f
    join  film_category fc
    on f.film_id = fc.film_id
    join category c 
    on fc.category_id = c.category_id
    group by fc.category_id
    ;
    
    
    
 -- cari film dengan sales tertinggi 
 -- cari category film dengan sales tertinggi
 -- list total sales per toko
 -- contoh group_concat dari list aktor tiap film 
 
 

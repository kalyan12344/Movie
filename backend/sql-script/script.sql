create table user(user_id int not null auto_increment, username varchar(20) not null unique, email varchar(50) not null, password varchar(20) not null, mobile_no varchar(20), age int,primary key(user_id));
create table admin(admin_id int not null auto_increment, admin_name varchar(20) not null unique, email varchar(50) not null, password varchar(20) not null, mobile_no varchar(20), age int, expirence varchar(20),primary key(admin_id))
create table movies(movie_id int not null auto_increment,title varchar(20), poster_url text,description varchar(100),director varchar(20),duration varchar(20),release_date date, end_date date, is_completed boolean, primary key(movie_id),foreign key(admin_id) references admin(admin_id))
create table location(location_id int not null auto_increment, zipcode int, city varchar(20), state varchar(20),primary key(location_id));
create table theater(theater_id int not null auto_increment, theater_name varchar(20), description varchar(100),theater_url text, admin_id int, location_id int, primary key(theater_id),foreign key(admin_id) references admin(admin_id),foreign key(location_id) references location(location_id));
create table show_time(show_time_id int not null auto_increment, show_name varchar(20) not null, start_time time, end_time time, available_seats int, theater_id int, movie_id int, admin_id int, primary key(show_time_id), foreign key(theater_id) references theater(theater_id),foreign key(movie_id) references movies(movie_id), foreign key(admin_id) references admin(admin_id));





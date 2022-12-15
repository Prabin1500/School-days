DROP DATABASE IF EXISTS appdatabase;
CREATE DATABASE appdatabase;
USE appdatabase;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  userssn varchar(11) NOT NULL,
  first_name char(20) NOT NULL,
  last_name char(20) NOT NULL,
  email varchar(30) NOT NULL,
  phone_number varchar(15) NOT NULL,
  role char(10) NOT NULL,
  username varchar(15) NOT NULL,
  password varchar(100) NOT NULL,
  class int(11) DEFAULT NULL,
  PRIMARY KEY (userssn)
);

DROP TABLE IF EXISTS announcement;
CREATE TABLE announcement (
  announcementid int(11) NOT NULL AUTO_INCREMENT,
  text varchar(3000) NOT NULL,
  media_filename varchar(100) DEFAULT NULL,
  dateandtime varchar(30) NOT NULL,
  userssn varchar(11) NOT NULL,
  class int(11) DEFAULT NULL,
  PRIMARY KEY (announcementid),
  FOREIGN KEY (userssn) REFERENCES users(userssn)
) ;

DROP TABLE IF EXISTS message;

CREATE TABLE message (
  id int(11) NOT NULL AUTO_INCREMENT,
  description varchar(3000) NOT NULL,
  sender varchar(15) NOT NULL,
  reciever varchar(15) NOT NULL,
  dateandtime varchar(30) NOT NULL,
  PRIMARY KEY (id)
) ;
DROP TABLE IF EXISTS students;
CREATE TABLE students (
  childssn varchar(11) NOT NULL,
  first_name char(20) NOT NULL,
  last_name char(20) NOT NULL,
  class int(11) NOT NULL,
  userssn varchar(11) NOT NULL,
  PRIMARY KEY (childssn),
  FOREIGN KEY (userssn) REFERENCES users(userssn)
) ;


/*SQL script with all the queries your backend makes.*/

SELECT announcement.announcementid,announcement.text,announcement.media_filename, announcement.dateandtime, users.first_name, users.last_name from announcement,users where announcement.userssn = users.userssn and users.role = "admin" order by announcementid desc;
SELECT * FROM announcement where announcementid =?;
SELECT announcement.announcementid,announcement.text,announcement.media_filename, announcement.dateandtime, users.first_name, users.last_name from announcement,users where announcement.userssn=users.userssn and announcement.userssn = ? order by announcementid desc; 
SELECT announcement.announcementid,announcement.text,announcement.media_filename, announcement.dateandtime, users.first_name, users.last_name from announcement,users where announcement.class=? and announcement.userssn = users.userssn  order by announcementid desc;
select announcement.announcementid,announcement.text,announcement.media_filename, announcement.dateandtime, users.first_name, users.last_name from announcement,users where announcement.userssn = users.userssn  order by announcementid desc;
INSERT INTO announcement VALUES (null,?,?,?,?,?);
INSERT INTO announcement(text,dateandtime,userssn,class) VALUES (?,?,?,?);
DELETE FROM announcement where announcementid = ?;
UPDATE announcement SET text =?, dateandtime=? where announcementid = ?;
select message.description,message.sender,message.dateandtime from message where (reciever=? or sender=?) and (reciever=? or sender=?);
select message.description,message.sender,message.dateandtime from message where reciever=? order by id asc;
INSERT INTO message VALUES(null,?,?,?,?);
select users.first_name,users.last_name,users.email,users.phone_number, users.class, users.role, users.userssn,users.username from users:
select users.first_name,users.last_name,users.email,users.phone_number, users.class,users.username from users where role = ? or role=?;
select students.first_name, students.last_name, students.class, students.userssn from students;
INSERT INTO users(USERSSN, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, ROLE, USERNAME, PASSWORD) VALUES (?,?,?,?,?,?,?,?)
                            [user.userssn, user.firstName, user.lastName, user.email, user.phoneNumber, user.role, user.username, user.password, null];
INSERT INTO users(USERSSN, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, ROLE, USERNAME, PASSWORD, CLASS) VALUES (?,?,?,?,?,?,?,?,?);					
INSERT INTO students(CHILDSSN, FIRST_NAME, LAST_NAME, CLASS, USERSSN) VALUES (?,?,?,?,?);					
SELECT * FROM users WHERE users.email = ? or users.username =?;
select users.first_name,users.last_name,users.username,students.first_name as student_fname,students.last_name as student_lname from users,students where users.userssn = students.userssn;

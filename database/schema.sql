DROP TABLE IF EXISTS channel_users;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS channels;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(10) UNIQUE NOT NULL,
    password VARCHAR(20) NOT NULL 
);

CREATE TABLE channels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    created_by INT NOT NULL,

    UNIQUE(name, created_by)
);


CREATE TABLE messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    body VARCHAR(500) NOT NULL,
    channel INT NOT NULL,
    sent_by INT NOT NULL,
    date DATETIME NOT NULL,

    FOREIGN KEY (channel) REFERENCES channels(id),
    FOREIGN KEY (sent_by) REFERENCES users(id)
);

CREATE TABLE channel_users (
    channel INT,
    user INT,

    PRIMARY KEY (channel, user),

    FOREIGN KEY (channel) REFERENCES channels(id),
    FOREIGN KEY (user) REFERENCES users(id)
);

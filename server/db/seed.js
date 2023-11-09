const {
    client,

} = require("./index");

async function dropTables() {
    try {
      console.log("Starting to drop tables...");
  
      // have to make sure to drop in correct order
      await client.query(`
        DROP TABLE IF EXISTS books;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS comments;
      `);
  
      console.log("Finished dropping tables!");
    } catch (error) {
      console.error("Error dropping tables!");
      throw error;
    }
  }


async function createTables() {
    try {
      console.log("Starting to build tables...");
  
      await client.query(`
        CREATE TABLE books (
            book_id INT PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            author VARCHAR(100) NOT NULL,
            rating DECIMAL(3,2),
            description TEXT,
            genre VARCHAR(50),
            image_url VARCHAR(255),
            active BOOLEAN
        );
        CREATE TABLE users (
            user_id INT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL,
            status VARCHAR(20)
        );
        CREATE TABLE comments (
            comment_id INT PRIMARY KEY,
            user_id INT,
            book_id INT,
            comment TEXT,
            rating DECIMAL(3,2),
            FOREIGN KEY (user_id) REFERENCES users(user_id),
            FOREIGN KEY (book_id) REFERENCES books(book_id)
        );
      `);
      console.log("Finished building tables!");
    } catch (error) {
      console.error("Error building tables!");
      throw error;
    }
  }

  async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
      // await createInitial Books/Users
    } catch (error) {
      console.log("Error during rebuildDB");
      throw error;
    }
  }
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const mysql = require('mysql2');


var database = mysql.createConnection({
  host: 'mysql-image',
  user: 'root',
  password: 'abcdefgh'
 
});


database.connect((error) => {
  if (error) {
      console.error('Error connecting to the database:', error);
      if (error.code === 'ECONNREFUSED') {
          console.error('Database connection refused. Exiting application.');
          process.exit(1); 
      }
  } else {
      console.log('Connected to the database.');
      createDatabase();
  }
});


async function createDatabase(){
    database.query(`CREATE DATABASE IF NOT EXISTS Cscommunity`, async(error, result)=>{
        if (error){
            console.error('Error while creating the database: ',error);
            return;
        }
        console.log('Successfully created database Cscommunity');
        useDatabase();
    })
}

function useDatabase(){
    database.query(`USE Cscommunity`,async(error,result)=>{
        if(error){
            console.error('Error while accessing the database: ',error);
            return;
        }
        console.log('Successfully accessed database Cscommunity');
        createUserTable();
        createPostsTable();
        createChannelsTable();
        createMessagesTable();
        createMessagesTable();
    })
}


function createUserTable(){
    database.query(`CREATE TABLE IF NOT EXISTS userTable 
                        (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
                        username VARCHAR(50) NOT NULL, 
                        name VARCHAR(100) NOT NULL, 
                        email VARCHAR(100) NOT NULL,
                        password VARCHAR(100) NOT NULL,
                        avatar VARCHAR(200) NOT NULL,
                        skills JSON,
                        occupation VARCHAR(100) NOT NULL,
                        totalPosts INT NOT NULL,
                        likes INT NOT NULL)`,(error,result)=>{
                            if (error){
                                console.error('Error while creating the table userTable: ',error);
                                return;
                            }
                            console.log('Successfully created table userTable');
                        })
}

function createPostsTable(){
    database.query(`CREATE TABLE IF NOT EXISTS postsTable 
                        (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        replyTo INT,
                        username INT,
                        datetime DATETIME DEFAULT CURRENT_TIMESTAMP, 
                        post VARCHAR(1000) NOT NULL, 
                        files JSON,
                        channel INT)`,(error,result)=>{
                            if (error){
                                console.error('Error while creating the table postsTable: ',error);
                                return;
                            }
                            console.log('Successfully created table postsTable');
                        })
}


function createChannelsTable(){
    database.query(`CREATE TABLE IF NOT EXISTS channelsTable 
                        (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        username INT,
                        channel VARCHAR(500) NOT NULL,
                        totalpeople INT NOT NULL,
                        totalposts INT NOT NULL)`,(error,result)=>{
                            if (error){
                                console.error('Error while creating the table channelsTable: ',error);
                                return;
                            }
                            console.log('Successfully created table channelsTable');
                        })
}


function createMessagesTable(){
    database.query(`CREATE TABLE IF NOT EXISTS messagesTable 
                        (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
                        sender INT, 
                        reciever INT, 
                        datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
                        message VARCHAR(1000) NOT NULL,
                        files JSON)`,(error,result)=>{
                            if (error){
                                console.error('Error while creating the table messagesTable: ',error);
                                return;
                            }
                            console.log('Successfully created table messagesTable');
                            addForeignkeys();
                        })
}


function addForeignkeys(){
    database.query(`ALTER TABLE postsTable 
        DROP FOREIGN KEY fk_replyTo_posttable`,(error,result)=>{
            if (error){
                console.error('Error while deleting foreign key fk_replyTo_posttable from table postsTable: ',error);
                return;
            }
            else{
                database.query(`ALTER TABLE postsTable
                DROP FOREIGN KEY fk_username_posttable`,(error,result)=>{
                    if (error){
                        console.error('Error while deleting foreign key fk_username_posttable from table postsTable: ',error);
                        return;
                    }
                    else{
                        database.query(`ALTER TABLE postsTable
                        DROP FOREIGN KEY fk_channel_posttable`,(error,result)=>{
                            if (error){
                                console.error('Error while deleting foreign key fk_channel_posttable from table postsTable: ',error);
                                return;
                            }
                            else{
                                database.query(`ALTER TABLE postsTable 
                                ADD CONSTRAINT fk_replyTo_posttable
                                FOREIGN KEY (replyTo) REFERENCES postsTable(id) ON DELETE SET NULL,
                                ADD CONSTRAINT fk_username_posttable
                                FOREIGN KEY (username) REFERENCES userTable(id) ON DELETE SET NULL,
                                ADD CONSTRAINT fk_channel_posttable
                                FOREIGN KEY (channel) REFERENCES channelsTable(id) ON DELETE SET NULL`,(error, result)=>{
                                    if (error){
                                        console.error('Error while adding foreign key to table postsTable: ',error);
                                        return;
                                    }
                                    console.log('Successfully added foreign key to table postsTable');
                                    
                                });

                            }
                        })

                    }
                })
            }
    })

    
    database.query(`ALTER TABLE channelsTable 
                    DROP FOREIGN KEY fk_username_channelstable`,(error,result)=>{
                        if (error){
                            console.error('Error while deleting foreign key fk_username_channelstable from table postsTable: ',error);
                            return;
                        }
                        else{
                            database.query(`ALTER TABLE channelsTable 
                                            ADD CONSTRAINT fk_username_channelstable
                                            FOREIGN KEY (username) REFERENCES userTable(id) ON DELETE SET NULL`,(error, result)=>{
                                                if (error){
                                                    console.error('Error while adding foreign key to table channelsTable: ',error);
                                                    return;
                                                }
                                                console.log('Successfully added foreign key to table channelsTable');
                                                
                                            });

                        }
    });

    database.query(`ALTER TABLE messagesTable 
                    DROP FOREIGN KEY fk_sender_messagestable`,(error,result)=>{
                        if (error){
                            console.error('Error while deleting foreign key fk_sender_messagestable from table messagesTable: ',error);
                            return;
                        }
                        else{
                            database.query(`ALTER TABLE messagesTable 
                            DROP FOREIGN KEY fk_reciever_messagestable`,(error,result)=>{
                                if (error){
                                    console.error('Error while deleting foreign key fk_reciever_messagestable from table messagesTable: ',error);
                                    return;
                                }
                                else{
                                    database.query(`ALTER TABLE messagesTable 
                                            ADD CONSTRAINT fk_sender_messagestable
                                            FOREIGN KEY (sender) REFERENCES userTable(id) ON DELETE SET NULL, 
                                            ADD CONSTRAINT fk_reciever_messagestable
                                            FOREIGN KEY (reciever) REFERENCES userTable(id) ON DELETE SET NULL`,(error, result)=>{
                                                if (error){
                                                    console.error('Error while adding foreign key to table messagesTable: ',error);
                                                    return;
                                                }
                                                console.log('Successfully added foreign key to table messagesTable');
                                                
                                            })

                                }
                            })
                        }
                    });    
}











app.listen(PORT, () => {
    console.log('server is running on port ' + PORT + ".");
});

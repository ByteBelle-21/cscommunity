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
        createFilesTable();
        createChannelsTable();
        createMessagesTable();
       
    })
}


function createUserTable(){
    //skills JSON,
    database.query(`CREATE TABLE IF NOT EXISTS userTable 
                        (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
                        username VARCHAR(50) NOT NULL, 
                        email VARCHAR(100) NOT NULL,
                        password VARCHAR(100) NOT NULL,
                        name VARCHAR(100)  NOT NULL, 
                        occupation VARCHAR(100)  NOT NULL,
                        skills TEXT  NOT NULL,
                        avatar VARCHAR(200)  NOT NULL,
                        totalPosts INT  NOT NULL,
                        likes INT  NOT NULL)`,(error,result)=>{
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
                        replyTo INT ,
                        username INT,
                        datetime DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, 
                        post VARCHAR(1000) NOT NULL,
                        channel INT)`,(error,result)=>{
                            if (error){
                                console.error('Error while creating the table postsTable: ',error);
                                return;
                            }
                            console.log('Successfully created table postsTable');
                        })
}


function createFilesTable(){
    database.query(`CREATE TABLE IF NOT EXISTS filesTable 
                        (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        filename VARCHAR(255) NULL,
                        filetype VARCHAR(50) NULL,
                        filedata LONGBLOB NULL,
                        postId INT,
                        messageId INT)`,(error,result)=>{
                            if (error){
                                console.error('Error while creating the table filesTable: ',error);
                                return;
                            }
                            console.log('Successfully created table filesTable');
                        })
}


function createChannelsTable(){
    database.query(`CREATE TABLE IF NOT EXISTS channelsTable 
                        (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        username INT,
                        channel VARCHAR(500) NOT NULL,
                        totalpeople INT NULL,
                        totalposts INT NULL)`,(error,result)=>{
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
                        datetime DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                        message VARCHAR(1000) NOT NULL)`,(error,result)=>{
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
    
    database.query(`ALTER TABLE filesTable 
                                ADD CONSTRAINT fk_postId_filesTable
                                FOREIGN KEY (postId) REFERENCES postsTable(id) ON DELETE SET NULL,
                                ADD CONSTRAINT fk_messageId_filesTable
                                FOREIGN KEY (messageId) REFERENCES messagesTable(id) ON DELETE SET NULL`,(error, result)=>{
                                    if (error){
                                        console.error('Error while adding foreign key to table filesTable: ',error);
                                        return;
                                    }
                                    console.log('Successfully added foreign key to table filesTable');
                                    
                                });

    database.query(`ALTER TABLE channelsTable 
                                ADD CONSTRAINT fk_username_channelstable
                                FOREIGN KEY (username) REFERENCES userTable(id) ON DELETE SET NULL`,(error, result)=>{
                                    if (error){
                                        console.error('Error while adding foreign key to table channelsTable: ',error);
                                        return;
                                    }
                                    console.log('Successfully added foreign key to table channelsTable');
                                    
                                });

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
                                    
                                });

}








/**
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

*/

app.post('/signup', (request, response) => {
    const input_username = request.body.signupUsername;
    const input_email = request.body.signupEmail;
    const input_password = request.body.signupPassword;
    const input_name = request.body.signupName;
    const input_occupation = request.body.signupOccupation;
    const input_skills = request.body.skills;
    const input_avatar = request.body.signupAvatar;
    database.query(`SELECT * FROM userTable WHERE email=?`,[input_email],(error,result)=>{
        if(error){
            response.status(500).send("Server error during sign up1");
            return;
        }
        else{
            if(result.length!==0){
                response.status(401).send("Provided email is already associated with other account");
                
            }
            else{
                database.query(`SELECT * FROM userTable WHERE username=?`,[input_username],(error,result)=>{
                    if(error){
                        response.status(500).send("Server error during sign up2");
                        return;
                    }
                    else{
                        if(result.length!==0){
                            response.status(401).send("Provided username is already associated with someone's account. Try other username");
                            
                        }
                        else{
                            database.query(`INSERT INTO userTable (username,email,password,name,occupation,skills,avatar,totalPosts,likes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,[input_username, input_email,input_password,input_name, input_occupation, input_skills,input_avatar,0,0],(error,result)=>{
                                if(error){
                                    response.status(500).send("Server error during sign up3 :");
                                    return;
                                }
                                else{
                                    response.status(200).send("Successfully signed up")
                                }
                            })
                        }

                    }
                })
            }
        }
    })

});



app.post('/login', (request, response) => {
    const input_username = request.body.loginUsername;
    const input_password = request.body.loginPassword;
    database.query(`SELECT * FROM userTable WHERE username=?`,[input_username],(error,result)=>{
        if(error){
            response.status(500).send("Server error during sign up1");
            return;
        }
        else{
            if(result.length===0){
                response.status(401).send("Provided username is not associated with any account");
                
            }
            else{
                database.query(`SELECT * FROM userTable WHERE username=? and password=?`,[input_username,input_password],(error,result)=>{
                    if(error){
                        response.status(500).send("Server error during sign up2");
                        return;
                    }
                    else{
                        if(result.length===0){
                            response.status(401).send("Wrong password.Try again");
                            
                        }
                        else{
                            response.status(200).send("Successfully logged in");
                        }
                        
                    }
                })
            }
        }
    })

});




app.get('/user',(request,response)=>{
    const user  = request.query.user;
    database.query(`SELECT * FROM userTable WHERE username=? `,[user],(error, result)=>{
    if (error){
        response.status(500).send("Server error during retrieving current user details");
        return;
    }
    response.status(200).json(result);
})
})








app.post('/createchannel', (request, response) => {
    const input_username = request.body.username;
    const input_channel = request.body.channel;
    database.query(`SELECT * FROM channelsTable WHERE channel=?`,[input_channel],(error,result)=>{
        if(error){
            response.status(500).send("Server error during creating channel1");
            return;
        }
        else{
            if(result.length!==0){
                response.status(401).send("Provided channel name already exists.");
                
            }
            else{
                database.query(`SELECT id FROM userTable WHERE username=?`,[input_username],(error,result)=>{
                    if(error){
                        response.status(500).send("Server error during retrieving user id from userTable");
                        return;
                    }
                    else{
                        if (result.length ===0){
                            response.status(401).send("Couldn't find user id in userTable");
                        }
                        else{
                            
                            const userId = result[0].id;
                            database.query(`INSERT INTO channelsTable (username,channel,totalpeople,totalposts) VALUES (?, ?, ?, ?)`,[userId, input_channel,0,0],(error,result)=>{
                            if(error){
                                response.status(500).send("Server error during creating channel2");
                                return;
                            }
                            else{
                                response.status(200).send("Successfully created channel");
                            }
                        })}
                    }
                })            
            }
        }
    })

});



app.get('/activeusers',(request,response)=>{
    database.query(`SELECT * FROM userTable ORDER BY totalPosts DESC LIMIT 4`,(error, result)=>{
        if (error){
            response.status(500).send("Server error during retrieving active members");
            return;
        }
        response.status(200).json(result);
    })
})



app.get('/popularchannels',(request,response)=>{
        database.query(`SELECT c.channel AS channel, u.username AS username,  c.totalpeople AS totalpeople, c.totalposts AS totalposts
        FROM channelsTable c JOIN userTable u ON c.username = u.id 
        ORDER BY c.totalpeople DESC 
        LIMIT 6`,(error, result)=>{
        if (error){
            response.status(500).send("Server error during retrieving popular channels");
            return;
        }
        response.status(200).json(result);
    })
})


app.get('/allchannels',(request,response)=>{
    database.query(`SELECT c.channel AS channel, u.username AS username, u.avatar as avatar,  c.totalpeople AS totalpeople, c.totalposts AS totalposts
    FROM channelsTable c JOIN userTable u ON c.username = u.id `,(error, result)=>{
    if (error){
        response.status(500).send("Server error during retrieving popular channels");
        return;
    }
    response.status(200).json(result);
})
})

app.get('/connectedusers',(request,response)=>{
    const user = request.query.user;
    database.query(`SELECT id FROM userTable WHERE username=?`,[user],(error, result)=>{
        if (error){
            response.status(500).send("Server error during retrieving user id for direct messages");
            return;
        }
        else{
            if(result.length===0){
                response.status(401).send("user id doesn't exists for current user");
            }
            else{
                const userId = result[0].id;
                database.query(`SELECT  CASE WHEN m.sender=? THEN u_reciever.avatar 
                                            WHEN m.reciever=? THEN u_sender.avatar 
                                        END AS avatar,
                                        CASE WHEN m.sender=? THEN u_reciever.username 
                                            WHEN m.reciever=? THEN u_sender.username 
                                        END AS username
                                        FROM messagesTable m
                                        JOIN userTable u_reciever ON m.reciever = u_reciever.id 
                                        JOIN userTable u_sender ON m.sender = u_sender.id `,[userId,userId,userId,userId],(error, result)=>{
                                            if (error){
                                                response.status(500).send("Server error during retrieving direct messages");
                                                return;
                                            }
                                            response.status(200).json(result)
                    
                })

            }
        } 
    })
    
})



app.post('/post', (request, response) => {
    const input_post = request.body.inputPost;
    const input_channel = request.body.channel;
    const input_user = request.body.current_user;
    const input_reply_to = request.body.replyTo;
    database.query(`SELECT id FROM userTable WHERE username=?`,[input_user],(error, userId_result)=>{
        if (error){
            response.status(500).send("Server error during retrieving user id for uploading post");
            return;
        }
        else{
            if(userId_result.length===0){
                response.status(401).send("user id doesn't exists for current user in upload post ");
            }
            else{
                const userId = userId_result[0].id;
                database.query(`SELECT id FROM channelsTable WHERE channel=?`,[input_channel],(error, channelId_result)=>{
                    if(error){
                        response.status(500).send("Server error during retrieving channel id for uploading post");
                        return;
                    }
                    else{
                        if(channelId_result.length===0){
                            response.status(401).send("channel id doesn't exists for current channel in upload post ");
                        }
                        else{
                            const channelId = channelId_result[0].id;
                            database.query(`INSERT INTO postsTable (replyTo, username, post, channel) VALUES (?, ?, ?, ?)`,
                            [input_reply_to, userId, input_post, channelId],(error,result)=>{
                                if(error){
                                    response.status(500).send("Server error during uploading the post");
                                    return;
                                }
                                afterPostUpload(userId,channelId);
                                response.status(200).json({ postId: result.insertId });          
                            });

                        }
                    }
                });
            }
        }
    });   
});




function afterPostUpload(user,channel){
    database.query(` UPDATE channelsTable SET totalposts = IFNULL(totalposts, 0) + 1 WHERE id = ?`,[channel],(error,result)=>{
        if(error){
            console.error("Server error during updating total posts in channelsTable");
            return;
        }
        console.log("Successfully updated total posts in channelstable");
    });
    database.query(` UPDATE userTable SET totalPosts = IFNULL(totalPosts, 0) + 1 WHERE id = ?`,[user],(error,result)=>{
        if(error){
            console.error("Server error during updating total posts in channelsTable");
            return;
        }
        console.log("Successfully updated total posts in userTable");
    });
    database.query(`SELECT COUNT(DISTINCT(username)) AS total_people FROM postsTable WHERE channel=?`,[channel],(error,result)=>{
        if(error){
            console.error("Server error during counting total people in channelsTable");
            return;
        }
        const total_people = result[0].total_people;
        database.query(` UPDATE channelsTable SET totalpeople = ? WHERE id = ?`,[total_people,channel],(error,result)=>{
            if(error){
                console.error("Server error during updating total people in channelsTable");
                return;
            }
            console.log("Successfully updated total people in channelsTable");
        })
    });
}




app.get('/allPosts',(request,response)=>{
    console.log("i am here at back all post");
    const channel = request.query.current_channel;
    console.log(channel);
    database.query(`SELECT id FROM channelsTable WHERE channel=?`,[channel],(error, result)=>{
        if (error){
            response.status(500).send("Server error during retrieving channel id while retriving all posts");
            return;
        }
        else{
            if(result.length===0){
                response.status(401).send("channel id doesn't exists for current channel");
            }
            else{
                const channelId = result[0].id; 
                console.log(channelId);
                database.query(`WITH RECURSIVE postTree AS (
                    SELECT 
                        p.id,
                        p.replyTo,
                        u.username,
                        u.avatar,
                        p.datetime,
                        p.post,
                        0 AS level,
                        p.id AS root_id,
                        p.datetime AS root_datetime,
                        CAST(LPAD(p.id, 10, '0') AS CHAR(255)) AS path
                    FROM postsTable p
                    JOIN userTable u ON p.username = u.id
                    WHERE p.replyTo IS NULL AND p.channel = ?
                    
                    UNION ALL
                    
                    SELECT 
                        p.id,
                        p.replyTo,
                        u.username,
                        u.avatar,
                        p.datetime,
                        p.post,
                        pT.level + 1 AS level,
                        pT.root_id AS root_id,
                        pT.root_datetime AS root_datetime,
                        CONCAT(pT.path, '-', LPAD(p.id, 10, '0')) AS path
                    FROM postsTable p
                    JOIN userTable u ON p.username = u.id
                    INNER JOIN postTree pT ON p.replyTo = pT.id
                    WHERE p.channel = ?
                )
                SELECT 
                    id,
                    replyTo,
                    username,
                    avatar,
                    datetime,
                    post,
                    level
                FROM postTree
                ORDER BY path ASC`,[channelId,channelId],(error, result)=>{
                                            if (error){
                                                console.log(error);
                                                response.status(500).send("Server error during retrieving postTree");
                                                return;
                                            }
                                            response.status(200).json(result);
                    
                })

            }
        } 
    })
    
})



app.get('/selected-user',(request,response)=>{
    const user  = request.query.user;
    database.query(`SELECT * FROM userTable WHERE username=? `,[user],(error, userResult)=>{
        if (error){
            response.status(500).send("Server error during retrieving selected user details");
            return;
        }
        else{
            const userDetails = userResult[0];
            const userId = userDetails.id;
            database.query(`SELECT p.post AS post, c.channel AS channel 
                            FROM postsTable p JOIN channelsTable c 
                            ON p.channel = c.id   
                            WHERE p.username=? `,[userId],(error, postsResult)=>{
                if (error){
                    response.status(500).send("Server error during retrieving selected user details");
                    return;
                }
                const responseData = {...userDetails, posts:postsResult }
                response.status(200).json(responseData);
            })
        }
    })
})





app.get('/allMessages',(request,response)=>{
    const you = request.query.loggedIn;
    const connectedUser = request.query.connected;
    database.query(`SELECT id FROM userTable WHERE username=?`,[user],(error, result)=>{
        if (error){
            response.status(500).send("Server error during retrieving user id for direct messages");
            return;
        }
        else{
            if(result.length===0){
                response.status(401).send("user id doesn't exists for current user");
            }
            else{
                const userId = result[0].id;
                database.query(`SELECT  CASE WHEN m.sender=? THEN u_reciever.avatar 
                                            WHEN m.reciever=? THEN u_sender.avatar 
                                        END AS avatar,
                                        CASE WHEN m.sender=? THEN u_reciever.username 
                                            WHEN m.reciever=? THEN u_sender.username 
                                        END AS username
                                        FROM messagesTable m
                                        JOIN userTable u_reciever ON m.reciever = u_reciever.id 
                                        JOIN userTable u_sender ON m.sender = u_sender.id `,[userId,userId,userId,userId],(error, result)=>{
                                            if (error){
                                                response.status(500).send("Server error during retrieving direct messages");
                                                return;
                                            }
                                            response.status(200).json(result)
                    
                })

            }
        } 
    })
    
})











app.listen(PORT, () => {
    console.log('server is running on port ' + PORT + ".");
});





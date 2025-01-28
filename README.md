# csCommunity


Cscommunity is a web development project where I leverage my computer science skills to create a discussion forum website dedicated to various computer science topics, specifically designed for desktop users. This platform empowers users to initiate new discussion channels, connect with others, search for posts, users, and channels, and update their profiles. Currently, the design of this website is not responsive. This project utilizes a React-based frontend built with JavaScript and Bootstrap to create an interactive, responsive user interface. The frontend leverages React Router for dynamic routing and seamless navigation. For the backend, the application is developed using Node.js and Express, ensuring smooth server-side functionality. Data is managed using MySQL, providing efficient storage and retrieval.

To run the application, please follow following steps :
1. Docker is required to run this application.
2. After cloning the source code, please navigate to cscommunity/frontend  and run command 'npm install react-scripts'
3. Open the App.js file and update the window.BASE_URL as this website was built in different isolated environment with its highly specified URL. If you are running the docker in local machine, you can use http://localhost:3000 url.
4. After updating the url, navigate back to cscommunity folder where docker-compose.yml file is located.
5. Run command docker compose build
6. Run command docker compose up
7. You can access the website on port 3000



Design and structure:
The project consists of two parts a back-End & a simple front-end.
Back-end consists of the “Model” folder which contains the schemes and the “Routes” folder which contains the routing functions.
Additional work :
(Front- end is in “client” folder alongside the backend folders.
Front- end folder “client” consists of the “services” folder which contain the link between back end and front end & the “app.js “ file which contain
the front end logic and page render .)

How to run the program:
In the terminal run “nodemon index.js” to run backend
Then navigate to client file to run front end then run “npm start”
To test you need to add the products into the database this could be done using (insomnia , postman ,…) 
send this requests :
{"name":"tshirt",
 "description":"Add description here",
 "price":"10.99",
 "PriceInEGP":"200",
 "NumOfItemsInStock":"1000",
 "image":https://eg.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/30/206171/1.jpg?0359 }

to (http://localhost:4001/proudct/addproudct) 
After adding all proudct you can test using the simple API.



 

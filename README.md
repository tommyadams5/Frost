# Frost

Frost is a Twitter-like messaging web app with public posts, news feed, likes, account creation, and user verification. I built and deployed Frost as a personal project. I used React and Typescript to create a responsive user interface. For the news feed, I implemented infinite scrolling to create a seamless user experience, and lazy loading to expedite load times and economize bandwidth. I established client side routing with React Router to alleviate server load. User access and authorization are governed with JWT cookie verification. To test app functionality, I populated Frost with thousands of posts, profile images, and usernames that I generated with Chat GPT and DALL-E.

Backing the application is an Express REST API server, managing requests to a Firestore database and an AWS S3 bucket. For deployment, I created a microservice architecture to optimize scaling flexibility and fault tolerance. I deployed five AWS EC2 instances: 4 dockerized REST API servers and 1 nginx least connected load balancer with image caching to reduce latency. 
  

https://github.com/tommyadams5/Frost/assets/140980341/74213962-f23e-4584-bf1f-84858ffa3256


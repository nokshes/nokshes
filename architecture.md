# Project Architecture

The project architecture is divided into following segments:
> Design Principles
> Cloud Hosting Architecture
> Chat Bot Services Architecture
> API Architecture

## Design Principles

 - The app will be limited to only IUT Students and Teachers.
 - Enable users to be more productive.
 - Focused on solving crucial existing problems.


## Cloud Hosting Architecture

### Azure Services
Although we are developing our app on azure services, the cost is not viable for us to survive
| Service        | Feature                       | Cost                        |
|----------------|-------------------------------|-----------------------------|
| Azure App Service | 2 Core 3.5 GB RAM			| $ 25
| Azure SQL Database | Serverless 64 GB 4 vCore Single Database | $ 65
| Azure Cloud Storage | File Storage, 64 GB | $ 30
| Total | |$ 120 / month
Azure Services will cost us fucking high on **every single read write operations** on database and storage services.

### Google Cloud Platform
> Google Virtual Machine - Compute Engine
>>![Google VM Pricing](https://drive.google.com/uc?export=view&id=1t9BIZdbCs1wZavfLuiBPLF17eqOvUSlA
(N.B: Open image in a new tab)
> Google App Engine + Cloud SQL + Cloud Storage
> Although I have not calculated the cost, but I am sure that, we can get everything in $60 - $90 / month

Now why App Engines / App Services are viable options here when we can do everything much less cost with VM is because App Engines are **auto scaled and managed**, so that I don't have to worry about network traffic, performance issues or some unfortunate issue with virtual machine babysitting.

## Chat Bot Service Architecture

*In Progress...*
[We need much more contribution please]

## API Architecture

> Graph API Managing Interface
> SQL Database Managing Interface
> File Storage Managing Interface
> The Main **REST API**

### The Main REST API
The ultimate thing that we will focus on building is the REST API which will handle incoming requests from the Chat Bot. *(or from maybe other services which we will build in future)*
The REST API will be written in **Node.js + Express.js web framework**
> The reason I am abandoning **Python + Flask web architecture** is because its not asynchronous. It means we will only be able to handle one request per thread or in simple 16 concurrent requests.
> And it will be a lot of pain in the ass to make a asynchronous web app in python and more pain in the back in making it portable in every cloud platform.
> 
> Where as in Node.js is by default asynchronous and can handle upto 10000 concurrent requests.
>> Here is a reason why I don't like Node.js -> *Dependency hell*, a simple hello world project will be above 100MB.

### Graph API Managing Interface
We will write a basic library of most commonly used facebook Graph API GET and POST request so that it makes our life more easy on managing the main API.

***Focus on the MAIN REST API and Graph API Interface and less on SQL and Cloud Storage because Database and Storage hosting options maybe will be changed in the future***

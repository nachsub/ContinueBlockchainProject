## Continue Blockchain Project
Overview: This is a blockchain implementation which contains classes for a Blockchain, 
Transactions, Users, and Validators. The entry point to simulate the blockchain implementation can be run from app.js. 
Blockchain: This class contains a list of blocks, each of which can be identified by a unique hash. Every transaction processed creats a new block. 
Transaction: This class contains the logic to execute a transaction between a sender and recipient. The transaction object will be stored on the blockchain.
Validator: This class contains the validation logic which is used to determine that a transaction is valid (e.g. that a sender has sent the amount intended and that a reciever has recieved the same amount). If a validator has three invalid transactions, they are banned from validation for the next 10 blocks. 

## Why I Chose This Project
I decided to work on this project because of my interest in blockchain technology. The fundamental idea of a blockchain uses object oriented programming, though it can be extended to implement more complex functionality (e.g. smart contracts). However, even the logic for processing and validating transactions and rewarding validators are complex, multi-step processes. Implementing these modules correctly requires systematic thinking and analytical problem solving skills, in addition to understanding of blockchains. 

## What I Did With Continue
I used continue to understand what a blockchain project would entail and create the underlying boilerplate code to define specific classes and methods that I knew would be needed for a blockchain. For example, I prompted continue to create a Blockchain class that mines blocks and calculates hashes. 

Also, I used continue to understand specific pieces of code that it generates (like the blockchain mining function). It was useful for debugging specific function calls that didn't contain the correct parameters and refactoring pieces of code in app.js to call existing functions in the src directory instead of redundant functions in app.js. 

## What I Did Without Continue
I created the app.js main application logic to initialize the blockchain, users, and validators. Since Continue wasn't using the predefined objects created in the src folder, I spent time stiching these objects together throughout the codebase and utilizing them in the app.js file. 

According to SOLID principles, each class has a single responsibility. Thus, I removed redundant functions created in multiple files and localized them to the class which should own that function. I also added validation logic in the validator.js and app.js files to
    1. Ensure that the sender sent the exact amount that the reciever recieved
    2. Ban the validator for 10 blocks if they have three invalid transactions on their record.

## What Worked and Didn't Work
Continue was good at providing context for unclear code snippets and generating boilerplate code for non-ambiguous functions. Some examples of this included constructors, addTransaction/User, and createTransaction. 

However, I found many functions were redundant or unnecessary. It generated multiple rewardValidator, punishValidator, mineBlock, and other functions in several classes. Therefore, I think it is good at defining clear boilerplate functions that the user prompts it to generate. I don't think it should try to implement complex functions that may rely on other classes or files. If I were to prompt Continue to not create duplicate functions or implement multi-step functions, the project may have turned out more smoothly. 

I also kept seeing an error in the Continue LLM terminal window: `Error: HTTP 500 Internal Server Error from https://proxy-server-green-l6vsfbzhba-uw.a.run.app/stream_chat Error in Continue free trial server: 400 {"type":"error","error":{"type":"invalid_request_error","message":"messages: first message must use the \"user\" role"}}`. This was fixed by creating a new session, though I think Continue should try to do that before this error is raised.

## Ideas About Improving Continue
Multi-step prompting may be a good addition to Continue. If the code generator had understood that I wanted to create a whole project with multiple classes instead of just a single class, that would have prevented code duplication and lack of object references. One way to fix this would be to ask the user "Do you want to create a project with several files or just a single class?". This way, it can understand the context behind the user's questions. 

The code generator could also use context from the previous prompts (where I asked about the structure of a blockchain project) to better assist the planning process. If memory were added to Continue LLMs, it would increase the quality of code generated and reduce debugging time. 

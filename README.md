# Plaque

Plaque can be found live at http://plaque.herokuapp.com/.

**plaque**

/plak/

noun

1.
*an ornamental tablet, typically of metal, porcelain, or wood, that is fixed to a wall or other surface in commemoration of a person or event.
synonyms:	plate, tablet, panel, sign, cartouche, brass
"a plaque in her honor was placed on the door to the auditorium"*

2.
**a sticky deposit on teeth in which bacteria proliferate.**


# 1. Choose an early-stage Internet company that excites you personally.

Slack excites me because it is a tool I use everyday. Slack's software improves my work efficiency because I can now communicate with fellow developers in real time. Slack utilizes Web Sockets to faciliate instant messaging. I want to learn about web sockets. 

# 2. Write a small piece of software that helps you understand the inner workings of the company better. Spend no more than 5-10 hours on this. The backend should be built in Ruby (Rails preferably) and include a small test suite (Ideally on RSpec). The frontend should include React or another frontend framework (Vue.js, Angular, Ember, etc).

I built Plaque in React and Redux with Ruby on Rails as the backend. 

# 3. Send us a link to the working software (running on a web server) and the Github repo.

Plaque can be found live at http://plaque.herokuapp.com/

# 4. Please include a short writeup explaining:

## a) How the software works

Plaque is a barebones instant messaging app. Upon arriving at the site:

1. Users pick a username
2. Users send messages.
3. Users logged into Plaque see other user's messages appear in real time.

I used ActionCables, a built-in library in Ruby on Rails. ActionCables are a layer of abstraction that allows programmers to push data through websockets with ease. 

ActionCables rely on a Publication/Subscription structure. Anyone can subscribe to a `channel`. When new information is `published`, all objects that are `subscribed` to this channel will receive the new information. 

To understand how Plaque works, it is necessary to understand Websockets, TCP (Transmission Control Protocol), and HTTP (Hyper Text Transfer Protocol). 

## Emoji Support

Plaque supports emojis! 

##### Websockets: 

Websockets are a recent computer communications protocol that allows for bidirectional data transfer (the client can `pull` data from the server and the server can `push` data to the client. This allows for **real time updates.**

##### Transmission Control Protocol (TCP): 

"TCP (Transmission Control Protocol) is a standard that defines how to establish and maintain a network conversation via which application programs can exchange data. TCP works with the Internet Protocol (IP), which defines how computers send packets of data to each other." https://en.wikipedia.org/wiki/Transmission_Control_Protocol

##### Hyper Text Transfer Protocol (HTTP):

"HTTP means HyperText Transfer Protocol. HTTP is the underlying protocol used by the World Wide Web and this protocol defines how messages are formatted and transmitted, and what actions Web servers and browsers should take in response to various commands." https://www.webopedia.com/TERM/H/HTTP.html

### Tests

I added five tests to Plaque: one channel/action cable test for broadcasting with the MessageChannel, and four model validations for the Message Model. 

You can find the code in `plaque/app/spec/channels/message_channel_spec.rb` and `plaque/app/spec/models/message_spec.rb` .

I relied on the `rspec-rails` and `shoulda-matchers` gem for my testing. I installed `factory_bot_rails` and `faker`, which I used to set up a factory for Messages; however, I did not need to use that factory method. 

## b) What challenges you encountered

I encountered many challenges while building Plaque. The following are the three most interesting problems I encounted. 

#### 1. Understanding Websockets

I knew I wanted to learn about websockets for weeks and this project gave me the motivation to take action and actively learn about this fascinating tool. My consequent igorance about websockets was my greatest challenge. 

**What were websockets?**

I went to Google to find out. I decided upon six Medium and Hackernoon articles on ActionCables as well as HTTP, Rest, and Websockets. I printed out the articles and read them. The articles taught me Websockets are a newer protocol on the internet to allow `bidirectional` (server talks to client, client talks to server) communication. I grasped the basic syntax and image signature of ActionCables.

It was time to code.

#### 2. Applying Theoretical Knowledge to Practical Problems

It's one thing to know how a tool works. It's an entirely different thing to know how to use that tool.

My ignorance in practical Action Cable knowledge inspired me to ask fellow programmer Ben Pong for advice https://github.com/Benpong89/.

Ben walked me through his project Slang (https://github.com/Benpong89/slang), a Slack Clone. Ben allowed me to see the specific patterns a programmer utilizes to implement ActionCables with React and Redux. Slang offered a roadmap to rapidly build Plaque, a physical representation of all the theoretical knowledge I had just aquired. 

As I built Plaque, I referenced Slang whenever I encounted a bug. One such bug was not receiving new broadcasts from a channel (I needed to use `stream_for` instead of `stream_from`). 

#### 3. Data Structure Organization

When sending data between the backend and the frontend, semantic naming is essential to avoid silly mistakes and encourage intuitive programming. In my `MessageCard` component, in `mapDispatchToProps`, I call the following line of code `dispatch(receiveMessage(message.message))`. The dual naming (An object 'message' with key 'message') confuses me as a reader of my code. My naming conventions have room for improvement; I need practice. 

## c) How you would expand the software if you had more time

There are many additions to Plaque I foresee for the future. The following are my top three optimizations.

#### 1. Persistent Users and Authentication. 

I want to build `Authentication` into the backend along with a `User Model`. That way users can have their own account. This will allow me to build fun features like `extra channels` and `direct messaging` between users into the platform. 

#### 2. Re-Styling and Responsiveness

The CSS of Plaque needs work. I want to make an elegant barebones instant messaging component that I can plop into any future application of mine. The User Interface is far from gorgeous and I want the User Interface to be beautiful. I want  to think critically and design an attractive and appealing User Interface, one that looks good on all devices.

#### 3. Direct Messaging

As hinted earlier, I want to add `direct messaging` into Plaque. This allows two users to communicate in real time with added privacy. 

#### 5. Different colors for different users

I want each non-client user to have a random color assigned to it. This way everyone speaking can be identified by their color as well as their username.

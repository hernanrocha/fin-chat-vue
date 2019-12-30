# FinChat Vue 

This is the frontend for FinChat, a bot based chat.

It's a VueJS project with the following plugins configured:
- Vue Router
- Babel
- Prettier
- PWA

## Run with Docker

```
docker-compose up
```

## How to Use it

Once you run the container, you could open http://localhost:8080 in your browser. It's deployed in AWS CloudFront and can be accessed in http://d248lwd9khygi6.cloudfront.net/

Before enter the chat, you have to create and account and then login with the generated credentials.
In the chat page, you select a room from the left list or create your own room.

In order to send a message to the bot, your message should start with _/stock=_.
This is an example chat:

```
Hernan: /stock=FB
Bot: FB quote is $184.84 per share
```

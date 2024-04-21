module.exports = (client,message) => {
    if (message.author.bot || !message.content) return;

    console.log(`Received message: ${message.content}`);

    if (message.content.toLowerCase() === '!ping') {
        message.reply('Pong!');
    }
};
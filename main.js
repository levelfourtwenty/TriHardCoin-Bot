const { Discord, Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client();
const prefix = '$';

client.once('ready', () => {
        console.log('Ready');
});

client.on('message', async message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        const url = "https://trihardcoin-explorer.lightwarp.network/ext/getaddress/" + args[0]; 

        if (command == 'lookup') {
                const geturl = await fetch(url).then(response => response.json());
                if (geturl.error == "address not found.") {
                return message.channel.send("Please enter a valid address");
                }
                const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('TriHardCoin Lookup')
                .setURL(`https://trihardcoin-explorer.lightwarp.network/address/${args[0]}`)
                .setDescription('Information for address.')
                .addFields(
                        { name: 'Address', value: `${geturl.address}` },
                        { name: 'Sent', value: `${geturl.sent}` },
                        { name: 'Received', value: `${geturl.received}` },
                        { name: 'Balance', value: `${geturl.balance}` }
                )
                .setTimestamp()
                .setImage(`https://trihardcoin-explorer.lightwarp.network/qr/${args[0]}`);
                return message.channel.send(embed);
}
        else if (command == 'help') {
                helpembed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('TriHardCoin Help')
                .setDescription('Commands will be updated when level420 stops being a deadbeat.')
                .addFields(
                        { name: '$lookup', value: 'This command looks up an address on the TriHardCoin blockchain, just specify an address to lookup.' },
                        { name: '$transaction', value: 'To be created, will function as a transaction lookup, specify a transaction ID to view the information'},
                        { name: '$distribution', value: 'To be created, will show the distrubution of all coins among users.' },
                        { name: '$available', value: 'To be created, shows the number of available coins'}
                )
                .setTimestamp();
                message.channel.send(helpembed);

}
});

client.login('TOKEN HERE');

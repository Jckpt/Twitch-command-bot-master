const fs = require('fs');
var your_message = '/timeout'; // tutaj zmienic wiadomosc przed nickiem np. /ban /timeout itd.
var how_much = '1'; //  tutaj zmienic czas jezeli chcesz dac /timeout (zostawic puste jak nie chcesz dac timeout tylko inna komende)
var comment = 'follow u randombrucetv StinkyCheese'; // komentarz dla osoby ktora dostanie bana lub timeout'a
const tmi = require('tmi.js');
const client = new tmi.Client({
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    // token zdobyc na tej stronie -> https://chatterino.com/client_login (token w tym pliku to przyklad)
    username: 'krawcu_', // nick konta (konto musi miec moda minimum)
    password: 'oauth:tutajtokentwoj', // token z konta
  },
  channels: ['krawcu_'], // kanał na którym ma być użyta komenda
});
client.connect();

// zeby to zadzialalo to musi pojsc jakakolwiek wiadomosc na czacie od kogokolwiek
client.on('join', async (channel) => {
  let data = fs.readFileSync('paste_users.json');
  var parsed_json = await JSON.parse(data);
  for (var i = 0; i < parsed_json.length; i++) {
    client.timeout(channel, parsed_json[i].nick, how_much, comment).catch((err) => {
      console.log(err);
    });
  }
});

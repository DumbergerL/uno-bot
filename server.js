let configuration = {
    'expected_player': 3,
    'rounds_to_play': 6,
    'database_name' : 'mongo_test'
};

let AutoplayUnoGame = require('./src/autoplay');

var theUno = new AutoplayUnoGame(configuration.expected_player, configuration.rounds_to_play);

var hash1 = theUno.registerPlayer("john");
var hash2 = theUno.registerPlayer("mustafa");
var hash3 = theUno.registerPlayer("vincent");

var getStatus = theUno.getGameStatePerson(hash1);
console.log(getStatus);

console.log(theUno.getCardsPerson(hash1));
console.log(theUno.getCard(hash1, getStatus.hand[0]));

//theUno.autoplay2();


/*
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.send('Hello World!');
});
  
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});*/
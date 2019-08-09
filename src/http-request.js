const request = require('request');
const UnoBot = require('./uno-bot');

class HttpRequest{

    constructor(){
        this.gamestate = {};
        this.id = "";
        this.callIndex = 0;
        this.isActive = false;
        this.killAll = false;

        this.UnoBot = new UnoBot();

        this.TIMEOUT = 20;
        this.HOST = 'http://localhost:3000'

        try{
            this.registerPlayer();
        }catch(e){
            console.log("Error occourd!!!");
            console.log(e);
        }
    }
    
    registerPlayer(){
        request({ uri: (this.HOST+'/join'), method: 'POST', json: {name: 'Lukas_der_Destroyer!'}}, (err, res, body) => {
            if(err || body.player_id === undefined) throw "error oc";

            this.id = body.player_id;

            console.log(body.player_name + " ("+body.player_id+") has joined the Game!")

            this.loopGameState();
        });
    }

    loopGameState(){
        if(this.killAll)return;
        request(this.HOST+'/games?id='+this.id, { json: true }, (err, res, body) => {
            if (err) throw "error occ"; 
            
            if(body)this.gamestate = body;
            if(body.hasOwnProperty('my_turn')){
                if(body.my_turn && !this.isActive)this.playTurn();
            }

            setTimeout(function(){
                this.loopGameState();
            }.bind(this), this.TIMEOUT);

            this.callIndex++;
        
        });
    }

    playTurn(){
        this.isActive = true;

        var card = this.UnoBot.getTheBestFuckingCard(this.gamestate);
        if(card === null){
            console.log("Play Card: null");
        }else{
            console.log("Play Card: "+card.color+"-"+card.value);
        }
        this.playCard({play_card: card});

        this.isActive = false;
    }

    playCard(cardObj){
        request({ uri: (this.HOST+'/games?id='+this.id), method: 'POST', json: cardObj}, (err, res, body) => {
            if(err)throw "error occ";
        });
    }
}

module.exports = HttpRequest;


class UnoBot {

    constructor(){
        this.PANIC_LIMIT = 2; //when do i panicly throw my wild cards
        this.VALENCE = {ZERO: 0, ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, SIX: 6, SEVEN: 7, EIGHT: 8, NINE: 9, DRAW_TWO: 20, REVERSE: 20, SKIP: 20, WILD: 50, WILD_DRAW_FOUR: 50};
    }

    
    getTheBestFuckingCard(gamestate){
        var playableCards = this.getPlayableCards(gamestate);

        if(playableCards.length > 0){
            
            playableCards.sort(function(a,b){
                return this.VALENCE[a.value] - this.VALENCE[b.value];
            }.bind(this));

            var card = playableCards[0];

            if(card.value === "WILD" || card.value === "WILD_DRAW_FOUR")card.color = this.getWishColor(gamestate);
            return card;
        }else{
            return null;
        }
    }

    getPlayableCards(gamestate){
        let cardPile = [];
        gamestate.hand.forEach(card => {
            if(card.color === gamestate.discarded_card.color || card.value === gamestate.discarded_card.value || card.value === "WILD" || card.value === "WILD_DRAW_FOUR"){
                cardPile.push(card);
            }
        });

        return cardPile;
    }

    getWishColor(gamestate){
        var colorCount = {RED: 0, BLUE: 0, GREEN: 0, YELLOW: 0};
        
        gamestate.hand.forEach((card) => {
            colorCount[card.color]++;
        });

        var color = "RED";
        var amount = 0;

        for(var prop in colorCount){
            if(colorCount[prop] > amount){
                color = prop;
                amount = colorCount[prop];
            }
        }

        return color;
    }

}

module.exports = UnoBot;
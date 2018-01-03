import {observable, action} from 'mobx';

class GameStore {
    @observable highScore3: String = 'None';
    @observable highScore4: String = 'None';

    @action updateScore(type, score) {
        if(type == 3) {
            this.highScore3 = score;
        } else {
            this.highScore4 = score;
        }
    }
}

export default GameStore;

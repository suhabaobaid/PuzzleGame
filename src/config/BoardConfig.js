import { Dimensions } from 'react-native';

export const metrics = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
};
//
// export var SIZE = 3;
// export var CELL_SIZE = Math.floor(require('metrics').width * 0.2); //20% of the screen width
// export var CELL_PADDING = Math.floor(CELL_SIZE * 0.05); //5% of the cell size
// export var BORDER_RADIUS = CELL_PADDING * 2;
// export var TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
// export var LETTER_SIZE = Math.floor(TILE_SIZE * 0.75);
//
// export const setConfig = (size) => {
//     var width = Dimensions.get('window').width;
//
//     SIZE = size;
//     CELL_SIZE = Math.floor(width * 0.2); //20% of the screen width
//     CELL_PADDING = Math.floor(CELL_SIZE * 0.05); //5% of the cell size
//     BORDER_RADIUS = CELL_PADDING * 2;
//     TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
//     LETTER_SIZE = Math.floor(TILE_SIZE * 0.75);
// };

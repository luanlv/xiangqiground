// import * as util from './util'
import * as cg from './types'
import premove from './premove'
import { State } from './state'

export default function logic(state: State):  {
    check: string,
    whiteDests: {
        [key: string]: cg.Key[]
    },
    blackDests: {
        [key: string]: cg.Key[]
    }
} {
     const pieces = state.pieces
     let whiteDests:{
            [key: string]: cg.Key[]
        } = {}
     let blackDests:{
         [key: string]: cg.Key[]
     } = {}

     let whiteKingKey: cg.Key ;
     let blackKingKey: cg.Key ;

 Object.keys(pieces).map(key => {
     if(pieces[key].color === 'white'){
         if(pieces[key].role === 'king') whiteKingKey = key as cg.Key
         let moves = premove(pieces, key as cg.Key)
         whiteDests[key] = moves
     } else {
         if(pieces[key].role === 'king') blackKingKey = key as cg.Key
         let moves = premove(pieces, key as cg.Key)
         blackDests[key] = moves
     }
 })

 return {
     check: (whiteKingKey && inCheck(blackDests, whiteKingKey)) ? whiteKingKey : (blackKingKey && inCheck(whiteDests, blackKingKey)) ? blackKingKey : '',
     whiteDests: whiteDests,
     blackDests: blackDests
 }
};

function inCheck(opDests: {[key: string]: cg.Key[]}, kingKey: cg.Key): boolean {
    // console.log(kingKey)
    let keys = Object.keys(opDests)
    let result = false;
    for( let key of keys) {
        if(opDests[key].indexOf(kingKey) > -1){
            result = true;
            break;
        }
    }

    return result;
}
import * as util from './util'
import * as cg from './types'

export default function premove(pieces: cg.Pieces, key: cg.Key): cg.Key[] {
  const piece = pieces[key],
  pos = util.key2pos(key);
  let moves:cg.Key[] = [];
  switch (piece.role) {
    case 'pawn':
      if(piece.color === 'white'){
        let desKeyForward = util.pos2key([pos[0], pos[1] + 1])
        if(pos[1] <= 8 && (!pieces[desKeyForward] || pieces[desKeyForward].color !== piece.color)){
          moves.push(desKeyForward)
        }
        if(pos[0] >= 1 && pos[1] >=5 ) {
          let desKeyLeft = util.pos2key([pos[0] - 1, pos[1]])
          if(!pieces[desKeyLeft] || pieces[desKeyLeft].color !== piece.color){
              moves.push(desKeyLeft)
          }
        }
        if(pos[0] <= 7 && pos[1] >=5 ) {
          let desKeyRight = util.pos2key([pos[0] + 1, pos[1]])
          if(!pieces[desKeyRight] || pieces[desKeyRight].color !== piece.color){
              moves.push(desKeyRight)
          }
        }
      } else {
          let desKeyForward = util.pos2key([pos[0], pos[1] - 1])
          if(pos[1] >= 1 && (!pieces[desKeyForward] || pieces[desKeyForward].color !== piece.color)){
              moves.push(desKeyForward)
          }
          if(pos[0] >= 1 && pos[1] <= 4 ) {
              let desKeyLeft = util.pos2key([pos[0] - 1, pos[1]])
              if(!pieces[desKeyLeft] || pieces[desKeyLeft].color !== piece.color){
                  moves.push(desKeyLeft)
              }
          }
          if(pos[0] <= 7 && pos[1] <= 4 ) {
              let desKeyRight = util.pos2key([pos[0] + 1, pos[1]])
              if(!pieces[desKeyRight] || pieces[desKeyRight].color !== piece.color){
                  moves.push(desKeyRight)
              }
          }
      }
      break;
    case 'knight':

      if(pos[1] <= 7 && !pieces[util.pos2key([pos[0], pos[1] + 1])]){
          let desKeyTopLeft = util.pos2key([pos[0] - 1, pos[1] + 2]);
            if(pos[0] >=1 && (!pieces[desKeyTopLeft] || pieces[desKeyTopLeft].color !== piece.color)){
                moves.push(desKeyTopLeft)
            }

          let desKeyTopRight = util.pos2key([pos[0] + 1, pos[1] + 2]);
          if(pos[0] <= 7 && (!pieces[desKeyTopRight] || pieces[desKeyTopRight].color !== piece.color)){
            moves.push(desKeyTopRight)
          }
      }

      if(pos[1] >= 2 && !pieces[util.pos2key([pos[0], pos[1] - 1])]){
          let desKeyBotLeft = util.pos2key([pos[0] - 1, pos[1] - 2]);
          if(pos[0] >=1 && (!pieces[desKeyBotLeft] || pieces[desKeyBotLeft].color !== piece.color)){
              moves.push(desKeyBotLeft)
          }

          let desKeyBotRight = util.pos2key([pos[0] + 1, pos[1] - 2]);
          if(pos[0] <= 7 && (!pieces[desKeyBotRight] || pieces[desKeyBotRight].color !== piece.color)){
              moves.push(desKeyBotRight)
          }
      }

      if(pos[0] >= 2  && !pieces[util.pos2key([pos[0] - 1, pos[1]])]){
          let desKeyLeftBot = util.pos2key([pos[0] - 2, pos[1] - 1]);
          if(pos[1] >= 1 && (!pieces[desKeyLeftBot] || pieces[desKeyLeftBot].color !== piece.color)){
            moves.push(desKeyLeftBot)
          }
          let desKeyLeftTop = util.pos2key([pos[0] - 2, pos[1] + 1]);
          if(pos[1] >= 1 && (!pieces[desKeyLeftTop] || pieces[desKeyLeftTop].color !== piece.color)){
              moves.push(desKeyLeftTop)
          }
      }

        if(pos[0] <= 6  && !pieces[util.pos2key([pos[0] + 1, pos[1]])]){
            let desKeyRightBot = util.pos2key([pos[0] + 2, pos[1] - 1]);
            if(pos[1] >= 1 && (!pieces[desKeyRightBot] || pieces[desKeyRightBot].color !== piece.color)){
                moves.push(desKeyRightBot)
            }
            let desKeyRightTop = util.pos2key([pos[0] + 2, pos[1] + 1]);
            if(pos[1] >= 1 && (!pieces[desKeyRightTop] || pieces[desKeyRightTop].color !== piece.color)){
                moves.push(desKeyRightTop)
            }
        }

      break;
    case 'bishop':

        if(piece.color === 'black' || (piece.color === 'white' && pos[1] <= 2)) {
            let keyTopLeftBarrier = util.pos2key([pos[0] - 1, pos[1] + 1])
            if (keyTopLeftBarrier && !pieces[keyTopLeftBarrier]) {
                let desKeyTopLeft = util.pos2key([pos[0] - 2, pos[1] + 2])
                if (desKeyTopLeft && !pieces[desKeyTopLeft] || (pieces[desKeyTopLeft].color !== piece.color)) {
                    moves.push(desKeyTopLeft)
                }
            }


            let keyTopRightBarrier = util.pos2key([pos[0] + 1, pos[1] + 1])
            if (keyTopRightBarrier && !pieces[keyTopRightBarrier]) {
                let desKeyTopRight = util.pos2key([pos[0] + 2, pos[1] + 2])
                if (desKeyTopRight && !pieces[desKeyTopRight] || (pieces[desKeyTopRight].color !== piece.color)) {
                    moves.push(desKeyTopRight)
                }
            }
        }

        if(piece.color === 'white' || (piece.color === 'black' && pos[1] >= 7)) {

            let keyBotLeftBarrier = util.pos2key([pos[0] - 1, pos[1] - 1])
            if (keyBotLeftBarrier && !pieces[keyBotLeftBarrier]) {
                let desKeyBotLeft = util.pos2key([pos[0] - 2, pos[1] - 2])
                if (desKeyBotLeft && !pieces[desKeyBotLeft] || (pieces[desKeyBotLeft].color !== piece.color)) {
                    moves.push(desKeyBotLeft)
                }
            }


            let keyBotRightBarrier = util.pos2key([pos[0] + 1, pos[1] - 1])
            if (keyBotRightBarrier && !pieces[keyBotRightBarrier]) {
                let desKeyBotRight = util.pos2key([pos[0] + 2, pos[1] - 2])
                if (desKeyBotRight && !pieces[desKeyBotRight] || (pieces[desKeyBotRight].color !== piece.color)) {
                    moves.push(desKeyBotRight)
                }
            }
        }

      break;
    case 'rook':
      for (let x = pos[0]- 1; x >=0 ; x--) {
          let desKey = util.pos2key([x, pos[1]])
          if(!pieces[desKey]){
              moves.push(desKey);
              continue;
          } else if(pieces[desKey] && piece.color !== pieces[desKey].color) {
              moves.push(desKey);
          }
          break;
      }

      for (let x = pos[0] + 1; x <= 8 ; x++) {
          let desKey = util.pos2key([x, pos[1]])
          if(!pieces[desKey]){
              moves.push(desKey);
              continue;
          } else if(pieces[desKey] && piece.color !== pieces[desKey].color) {
              moves.push(desKey);
          }
          break;
      }

      for (let y = pos[1] + 1; y <= 9 ; y++) {
          let desKey = util.pos2key([pos[0], y])
          if(!pieces[desKey]){
              moves.push(desKey);
              continue;
          } else if(pieces[desKey] && piece.color !== pieces[desKey].color) {
              moves.push(desKey);
          }
          break;
      }

      for (let y = pos[1] - 1; y >= 0 ; y--) {
          let desKey = util.pos2key([pos[0], y])
          if(!pieces[desKey]){
              moves.push(desKey);
              continue;
          } else if(pieces[desKey] && piece.color !== pieces[desKey].color) {
              moves.push(desKey);
          }
          break;
      }

      break;
    case 'canon':
      let xTop, xBot, xLeft, xRight;
      for (let x = pos[0]- 1; x >=0 ; x--) {
        let desKey = util.pos2key([x, pos[1]])
        if(!pieces[desKey] && !xLeft){
            moves.push(desKey)
        } else if(pieces[desKey] && !xLeft) {
          xLeft = pieces[desKey]
        } else if(pieces[desKey] && xLeft && pieces[desKey].color !== piece.color) {
            moves.push(desKey);
            break;
        }
      }
      for (let x = pos[0] + 1; x <= 8 ; x++) {
          let desKey = util.pos2key([x, pos[1]])
          if(!pieces[desKey] && !xRight){
              moves.push(desKey)
          } else if(pieces[desKey] && !xRight) {
              xRight = pieces[desKey]
          } else if(pieces[desKey] && xRight && pieces[desKey].color !== piece.color) {
              moves.push(desKey);
              break;
          }
      }
      for (let y = pos[1] + 1; y <= 9 ; y++) {
          let desKey = util.pos2key([pos[0], y])
          if(!pieces[desKey] && !xTop){
              moves.push(desKey)
          } else if(pieces[desKey] && !xTop) {
              xTop = pieces[desKey]
          } else if(pieces[desKey] && xTop && pieces[desKey].color !== piece.color) {
              moves.push(desKey);
              break;
          }
      }

        for (let y = pos[1] - 1; y >= 0 ; y--) {
            let desKey = util.pos2key([pos[0], y])
            if(!pieces[desKey] && !xBot){
                moves.push(desKey)
            } else if(pieces[desKey] && !xBot) {
                xBot = pieces[desKey]
            } else if(pieces[desKey] && xBot && pieces[desKey].color !== piece.color) {
                moves.push(desKey);
                break;
            }
        }

      break;
    case 'queen':
        let desKeyTopLeft = util.pos2key([pos[0] - 1, pos[1] + 1]);
        if(desKeyTopLeft
            && (!pieces[desKeyTopLeft] || pieces[desKeyTopLeft].color !== piece.color)
            && (
                (piece.color === 'white' && ( pos[0] === 4 || (pos[0] === 5 && pos[1] === 0)))
                || (piece.color === 'black' && ( pos[0] === 4 || (pos[0] === 5 && pos[1] === 7)))
            )){
            moves.push(desKeyTopLeft)
        }

        let desKeyTopRight = util.pos2key([pos[0] + 1, pos[1] + 1]);
        if(desKeyTopRight
            && (!pieces[desKeyTopRight] || pieces[desKeyTopRight].color !== piece.color)
            && (
                (piece.color === 'white' && ( pos[0] === 4 || (pos[0] === 3 && pos[1] === 0)))
                || (piece.color === 'black' && ( pos[0] === 4 || (pos[0] === 3 && pos[1] === 7)))
            )){
            moves.push(desKeyTopRight)
        }

        let desKeyBotLeft = util.pos2key([pos[0] - 1, pos[1] - 1]);
        if(desKeyBotLeft
            && (!pieces[desKeyBotLeft] || pieces[desKeyBotLeft].color !== piece.color)
            && (
                (piece.color === 'white' && ( pos[0] === 4 || (pos[0] === 5 && pos[1] === 2)))
                || (piece.color === 'black' && ( pos[0] === 4 || (pos[0] === 5 && pos[1] === 9)))
            )){
            moves.push(desKeyBotLeft)
        }

        let desKeyBotRight = util.pos2key([pos[0] + 1, pos[1] - 1]);
        if(desKeyBotRight
            && (!pieces[desKeyBotRight] || pieces[desKeyBotRight].color !== piece.color)
            && (
                (piece.color === 'white' && ( pos[0] === 4 || (pos[0] === 3 && pos[1] === 2)))
                || (piece.color === 'black' && ( pos[0] === 4 || (pos[0] === 3 && pos[1] === 9)))
            )){
            moves.push(desKeyBotRight)
        }
      break;
    case 'king':
        let desKeyTop = util.pos2key([pos[0], pos[1] + 1]);
        if(desKeyTop
            && (!pieces[desKeyTop] || pieces[desKeyTop].color !== piece.color)
            && (
                (piece.color === 'white' && pos[1] <= 1)
                || (piece.color === 'black' && pos[1] <= 8)
            )){
            moves.push(desKeyTop)
        }
        let desKeyBot = util.pos2key([pos[0], pos[1] - 1]);
        if(desKeyBot
            && (!pieces[desKeyBot] || pieces[desKeyBot].color !== piece.color)
            && (
                (piece.color === 'white' && pos[1] >= 1)
                || (piece.color === 'black' && pos[1] >= 8)
            )){
            moves.push(desKeyBot)
        }
        let desKeyLeft = util.pos2key([pos[0] - 1, pos[1]]);
        if(desKeyLeft
            && (!pieces[desKeyLeft] || pieces[desKeyLeft].color !== piece.color)
            && (
                (piece.color === 'white' && pos[0] >= 4)
                || (piece.color === 'black' && pos[0] >= 4)
            )){
            moves.push(desKeyLeft)
        }

        let desKeyRight = util.pos2key([pos[0] + 1, pos[1]]);
        if(desKeyRight
            && (!pieces[desKeyRight] || pieces[desKeyRight].color !== piece.color)
            && (
                (piece.color === 'white' && pos[0] <= 4)
                || (piece.color === 'black' && pos[0] <= 4)
            )){
            moves.push(desKeyRight)
        }

        if(piece.color === 'white'){
            let keyPiece1 = util.pos2key([pos[0], 7]);
            let keyPiece2 = util.pos2key([pos[0], 8]);
            let keyPiece3 = util.pos2key([pos[0], 9]);
            if((pieces[keyPiece3] || {}).role === 'king' || (pieces[keyPiece2] || {}).role === 'king' || (pieces[keyPiece1] || {}).role === 'king'){
                for(let y = pos[1] + 1; y <= 9; y ++){
                    let tmpKey = util.pos2key([pos[0], y]);
                    if(!pieces[tmpKey]){
                        continue;
                    }
                    if(pieces[tmpKey] && pieces[tmpKey].role !== 'king'){
                        break;
                    } else {
                        moves.push(tmpKey);
                        break;
                    }
                }
            }
        } else {
            let keyPiece1 = util.pos2key([pos[0], 0]);
            let keyPiece2 = util.pos2key([pos[0], 1]);
            let keyPiece3 = util.pos2key([pos[0], 2]);
            if((pieces[keyPiece3] || {}).role === 'king' || (pieces[keyPiece2] || {}).role === 'king' || (pieces[keyPiece1] || {}).role === 'king'){
                for(let y = pos[1] - 1; y >=0 ; y--){
                    let tmpKey = util.pos2key([pos[0], y]);
                    if(!pieces[tmpKey]){
                        continue;
                    }
                    if(pieces[tmpKey] && pieces[tmpKey].role !== 'king'){
                        break;
                    } else {
                        moves.push(tmpKey);
                        break;
                    }
                }
            }
        }
      break;
  }
  return moves;
};


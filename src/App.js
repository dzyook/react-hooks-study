import React, { useState } from "react";
import "./App.css";

function App() {
  const arr = getArr();
  const [player, setPlayer] = useState("black");
  const [blackPlayer, setBlack] = useState(getPlayer());
  const [whitePlayer, setWhite] = useState(getPlayer());

  function getArr() {
    const arr = [];
    for (let i = 0; i <= 9; i++) {
      arr[i] = [];
      for (let j = 0; j <= 9; j++) {
        arr[i][j] = j + 1;
      }
    }
    return arr;
  }

  function getPlayer() {
    const arr = [];
    for (let i = 0; i <= 9; i++) {
      arr[i] = [];
      for (let j = 0; j <= 9; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
  }

  function getBlack() {
    return <div className="black"></div>;
  }

  function getWhite() {
    return <div className="white"></div>;
  }

  function handleClick(i, j) {
    if (player === "black") {
      blackPlayer[i][j - 1] = 1;
      setPlayer("white");

      setBlack(blackPlayer);
      if(isOver(blackPlayer, i, j-1)) alert('黑方WIN')
    } else {
      whitePlayer[i][j - 1] = 1;
      setPlayer("black");
      setWhite(whitePlayer);
      if(isOver(whitePlayer, i, j-1)) alert('白方WIN')
    }
  }

  function isOver(arr, x, y) {
		let count1 = 0;
		let count2 = 0;
		let count3 = 0;
    let count4 = 0;
    console.log(arr, x, y)
		for(let i=1;i<5;i++){
			//横向
			if((y-i>=0 && arr[x][y-i]===1)||(y+i<arr.length && arr[x][y+i]===1)){
				++count1;
			}
			//纵向
			if((x-i>=0 && arr[x-i][y]===1)||(x+i<arr.length && arr[x+i][y]===1)){
				++count2;
			}
			//左斜
			if((x-i>=0 && y-i>=0 && arr[x-i][y-i]===1)||(x+i<arr.length && y+i<arr.length && arr[x+i][y+i]===1)){
				++count3;
			}
			//右斜
			if((x-i>=0 && y+i<arr.length && arr[x-i][y+i]===1)||(x+i<arr.length && y-i>=0 && arr[x+i][y-i]===1)){
				++count4;
			}
    }
    console.log(count1, count2, count3, count4)
		if(count1===4 || count2===4 || count3===4 || count4===4){
			return true;
		}
		return false;
  }

  return (
    <table className="App">
      <tbody>
        {arr.length &&
          arr.map((item, index) => {
            return (
              <tr key={index + 1}>
                {item.map(i => {
                  return (
                    <td
                      className="box"
                      key={[index + 1, i]}
                      onClick={() => handleClick(index, i)}
                    >
                      {blackPlayer[index][i - 1] === 1 ? getBlack() : ""}
                      {whitePlayer[index][i - 1] === 1 ? getWhite() : ""}
                    </td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default App;

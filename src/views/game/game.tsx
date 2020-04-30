import React, { useState, useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { playerContext } from '../../App.js';

const Game: React.FC = (props: any) => {
	const arr = getArr();
	const [player, setPlayer] = useState({ blackName: '', whiteName: '' });
	const [nowPlayer, setNowPlayer] = useState("black");
	const [whitePlayer, setWhite] = useState(getPlayer());
	const [blackPlayer, setBlack] = useState(getPlayer());
	const history = useHistory();
	const user = useContext(playerContext)
	const [myself, setMyself] = useState('black');

	useEffect(() => {
		props.socket.emit("getUser");
		console.log('componentDidMount')
		return logout
	}, [])

	useEffect(() => {
		console.log('走起')
		props.socket.on("getUserInfo", (data: any) => {
			if (!user.name1) {
				history.push('/')
			}
			player.blackName = data.name1;
			player.whiteName = data.name2;
			console.log(data, user)
			if(data.name1 === user.name1) { setNowPlayer("black"); setMyself("black");}
			else if(data.name2 === user.name1) { setNowPlayer("white"); setMyself("white")}
			setPlayer({...player})
			console.log(player, myself, nowPlayer)
		})
	}, [player, myself, nowPlayer])

	useEffect(() => {
		console.log('落子')
		props.socket.on('next', (i: any, j: any, now: any) => {
			console.log(i, j, now, myself, nowPlayer)
			if (myself !== now) {
				if (now === 'black') {
					blackPlayer[i][j - 1] = 1;
					setNowPlayer("white")
					setBlack([...blackPlayer]);
				}
				else {
					whitePlayer[i][j - 1] = 1;
					setNowPlayer("black")
					setWhite([...whitePlayer]);
				}
			}
		})
	}, [blackPlayer, whitePlayer, myself])

	function logout() {
		console.log("销毁")
		props.socket.emit("logout", user.name1)
	}

	function getArr() {
		const arr: any = [];
		for (let i = 0; i <= 9; i++) {
			arr[i] = [];
			for (let j = 0; j <= 9; j++) {
				arr[i][j] = j + 1;
			}
		}
		return arr;
	}

	function getPlayer() {
		const arr: any = [];
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

	function handleClick(i: any, j: any) {
		if (blackPlayer[i][j - 1] || whitePlayer[i][j - 1]) return;
		console.log(myself, nowPlayer)
		if (nowPlayer !== myself) {
			alert('请等待对方落子');
			return;
		}
		props.socket.emit("go", i, j, nowPlayer);
		if (nowPlayer === "black") {
			blackPlayer[i][j - 1] = 1;
			setBlack([...blackPlayer]);
			setNowPlayer('white')
			if (isOver(blackPlayer, i, j - 1)) alert("黑方WIN");
		} else {
			whitePlayer[i][j - 1] = 1;
			setWhite([...whitePlayer]);
			setNowPlayer('black')
			if (isOver(whitePlayer, i, j - 1)) alert("白方WIN");
		}	
	}

	function isOver(arr: any, x: any, y: any) {
		let count1 = 0;
		let count2 = 0;
		let count3 = 0;
		let count4 = 0;
		for (let i = 1; i < 5; i++) {
			//横向
			if (
				(y - i >= 0 && arr[x][y - i] === 1) ||
				(y + i < arr.length && arr[x][y + i] === 1)
			) {
				++count1;
			}
			//纵向
			if (
				(x - i >= 0 && arr[x - i][y] === 1) ||
				(x + i < arr.length && arr[x + i][y] === 1)
			) {
				++count2;
			}
			//左斜
			if (
				(x - i >= 0 && y - i >= 0 && arr[x - i][y - i] === 1) ||
				(x + i < arr.length && y + i < arr.length && arr[x + i][y + i] === 1)
			) {
				++count3;
			}
			//右斜
			if (
				(x - i >= 0 && y + i < arr.length && arr[x - i][y + i] === 1) ||
				(x + i < arr.length && y - i >= 0 && arr[x + i][y - i] === 1)
			) {
				++count4;
			}
		}
		console.log(count1, count2, count3, count4);
		if (count1 === 4 || count2 === 4 || count3 === 4 || count4 === 4) {
			return true;
		}
		return false;
	}

	return (
		<GameBox>
			<span>黑棋：{player.blackName}</span>
			<span>白棋：{player.whiteName}</span>
			<table>
				<tbody>
					{arr.length &&
						arr.map((item: any, index: any) => {
							return (
								<tr key={index + 1}>
									{item.map((i: any) => {
										return (
											<td
												className="box"
												key={String(index + 1) + String(i)}
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
		</GameBox>
	);
}

const GameBox = styled.div`
	table {
		width: 500px;
		height: 500px;
		margin: auto;
		overflow: hidden;
		border-collapse: collapse;
		.box {
			text-align: center;
			width: 50px;
			height: 50px;
			cursor: pointer;
		}
		table,
		td,
		th {
			border: 1px solid black;
		}
		.black {
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			border: 1px solid black;
			background: black;
			border-radius: 50%;
		}
		.white {
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			border: 1px solid rgb(100, 96, 96);
			background: rgb(100, 96, 96);
			border-radius: 50%;
		}
	}
	
`;

export default Game;

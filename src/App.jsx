import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver';

const PLAYERS = {
	X: 'Player 1',
	O: 'Player 2',
};
const INITIAL_GAME_BOARD = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

const deriveActivePlayer = (gameTurns) => {
	let currentPlayer = 'X';
	if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
		currentPlayer = 'O';
	}
	return currentPlayer;
};

const deriveGameBoard = (gameTurns) => {
	let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])];
	for (let turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;

		gameBoard[row][col] = player;
	}

	return gameBoard;
};

const deriveWinner = (gameBoard, players) => {
	let winner;
	for (let combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol =
			gameBoard[combination[0].row][combination[0].column];
		const secondSquareSymbol =
			gameBoard[combination[1].row][combination[1].column];
		const thirdSquareSymbol =
			gameBoard[combination[2].row][combination[2].column];

		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = players[firstSquareSymbol];
		}
	}
	return winner;
};

const App = () => {
	// In cases like this that we have to specify which player is active for both GameBoard and Player components, since in some point they both need to change the state of the active player, we should add a useState hook in the closest parent of both.
	// const [activePlayer, setActivePlayer] = useState('X');
	const [gameTurns, setGameTurns] = useState([]);
	const [players, setPlayers] = useState(PLAYERS);

	const activePlayer = deriveActivePlayer(gameTurns);
	const gameBoard = deriveGameBoard(gameTurns);
	const winner = deriveWinner(gameBoard, players);
	const hasDraw = gameTurns.length === 9 && !winner;

	const handleSelectSquare = (rowIdx, colIdx) => {
		// setActivePlayer((currActivePlayer) =>
		// 	currActivePlayer === 'X' ? 'O' : 'X'
		// );
		setGameTurns((prevTurns) => {
			const currentPlayer = deriveActivePlayer(prevTurns);

			const updatedTurns = [
				{ square: { row: rowIdx, col: colIdx }, player: currentPlayer },
				...prevTurns,
			];

			return updatedTurns;
		});
	};

	const handleRestart = () => {
		setGameTurns([]);
	};

	const handlePlayerNameChange = (symbol, newName) => {
		setPlayers((prevPlayers) => {
			return {
				...prevPlayers,
				[symbol]: newName,
			};
		});
	};

	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					<Player
						initialName={PLAYERS.X}
						symbol="X"
						isActive={activePlayer === 'X'}
						onChangeName={handlePlayerNameChange}
					/>
					<Player
						initialName={PLAYERS.O}
						symbol="O"
						isActive={activePlayer === 'O'}
						onChangeName={handlePlayerNameChange}
					/>
				</ol>
				{(winner || hasDraw) && (
					<GameOver winner={winner} onRestart={handleRestart} />
				)}
				<GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
			</div>
			<Log turns={gameTurns} />
		</main>
	);
};

export default App;

import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/log';

const App = () => {
	// In cases like this that we have to specify which player is active for both GameBoard and Player components, since in some point they both need to change the state of the active player, we should add a useState hook in the closest parent of both.
	const [activePlayer, setActivePlayer] = useState('X');
	const [gameTurns, setGameTurns] = useState([]);

	const handleSelectSquare = (rowIdx, colIdx) => {
		setActivePlayer((currActivePlayer) =>
			currActivePlayer === 'X' ? 'O' : 'X'
		);
		setGameTurns((prevTurns) => {
			let currentPlayer = 'X';
			if (currentPlayer.length > 0 && prevTurns[0].player === 'X') {
				currentPlayer = 'O';
			}

			const updatedTurns = [
				{ square: { row: rowIdx, col: colIdx }, player: currentPlayer },
				...prevTurns,
			];

			return updatedTurns;
		});
	};
	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					<Player
						initialName="Player 1"
						symbol="X"
						isActive={activePlayer === 'X'}
					/>
					<Player
						initialName="Player 2"
						symbol="O"
						isActive={activePlayer === 'O'}
					/>
				</ol>
				<GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
			</div>
			<Log turns={gameTurns} />
		</main>
	);
};

export default App;

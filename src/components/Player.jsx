import { useState } from 'react';

const Player = ({ initialName, symbol, isActive }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [playerName, setPlayerName] = useState(initialName);

	const handleEditClick = () => {
		// The editing argument is the state that we were in, then we change it to the curren state.
		// Its a short way to say if the value of isEditing is true turn it to false and vise versa.
		// Then we can use it to change the button from edit to save and otherwise.
		// This kind of changing the state will guarantee that we will always get the latest state's update
		setIsEditing((editing) => !editing);
	};

	const handleChange = (event) => {
		setPlayerName(event.target.value);
	};

	let initialPlayerName = <span className="player-name">{playerName}</span>;
	// Implementing a two way binding
	let editingPlayerName = (
		<input type="text" value={playerName} required onChange={handleChange} />
	);

	return (
		<li className={isActive ? 'active' : undefined}>
			<span className="player">
				{!isEditing ? initialPlayerName : editingPlayerName}
				<span className="player-symbol">{symbol}</span>
			</span>
			<button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
		</li>
	);
};

export default Player;

import { useState } from 'react';

const Player = ({ name, symbol }) => {
	const [isEditing, setIsEditing] = useState(false);
	let playerName = <span className="player-name">{name}</span>;
	let editingPlayerName = (
		<input type="text" name="editing-player-name" required />
	);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	return (
		<li>
			<span className="player">
				{!isEditing ? playerName : editingPlayerName}
				<span className="player-symbol">{symbol}</span>
			</span>
			<button onClick={handleEditClick}>Edit</button>
		</li>
	);
};

export default Player;

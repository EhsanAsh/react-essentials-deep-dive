const Log = ({ turns }) => {
	return (
		<lo id="log">
			{turns.map((turn) => (
				<li key={`${turn.square.row}${turn.square.col}`}>
					{turn.player} Selected {turn.square.row}, {turn.square.col}
				</li>
			))}
		</lo>
	);
};

export default Log;

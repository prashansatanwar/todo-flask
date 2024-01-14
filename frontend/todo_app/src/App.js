import React, { useState, useEffect } from 'react';
import { getAllTodos } from './Api';

function App() {
	const [data, setData] = useState([]);

	useEffect(() => {
		getAllTodos()
			.then((res) => {
				console.log(res)
				setData(res);
			})
	}, []);

	return (
		<div>
			TABLE
			{
				data.map((row) => 
					<div key={row._id}>
						<span>{row.title} {row.description} </span>
					</div>
				)
			}
		</div>
	);
}

export default App;
import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io.connect("http://localhost:4000");
export default function App() {

	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");
	const [showChat, setShowChat] = useState(false);

	const joinRoom = () => {
		if(username !== "" && room !== "") {
			socket.emit("join_room", room);
			setShowChat(true);	
		}
	}

	return (
		<div className="container mt-5">
			{
				!showChat ? (
					<div className="card">
						<div className="card-header bg-info">
							<h3>Join a chat</h3>
						</div>
						<div className="card-body">
							<div className="mb-3">
								<label htmlFor="name" className="form-label">Name</label>
								<input type="text" className="form-control form-control-sm" onChange={e => setUsername(e.target.value)} />
							</div>
							<div className="mb-3">
								<label htmlFor="room" className="form-label">Room</label>
								<input type="text" className="form-control form-control-sm" onChange={e => setRoom(e.target.value)} />
							</div>
							<button className="btn btn-primary" onClick={joinRoom}>Join A Room</button>
						</div>
					</div>
				) : (
					<Chat socket={socket} username={username} room={room} />
				)
			}
		</div>
	);
}
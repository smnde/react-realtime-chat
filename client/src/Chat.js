import React, { useEffect, useState } from "react";

export default function Chat({socket, username, room}) {
	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);

	const sendMessage = async () => {
		if(currentMessage !== "") {
			const messageData = {
				room: room,
				author: username,
				message: currentMessage,
				time:
					new Date(Date.now()).getHours() +
					":" +
					new Date(Date.now()).getMinutes(),
			};
			
			await socket.emit("send_message",messageData);
			setMessageList(list => [...list, messageData]);
			setCurrentMessage("");
		}
	};

	useEffect(() => {
		socket.on("receive_message", data => {
			setMessageList(list => [...list, data]);
		});
	}, [socket]);

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-xl-6">
					<div className="card">
						<div className="card-header bg-info">
							<h5>Chat Box</h5>
						</div>
						<div className="card-body">
							<div className="mb-3">
								<label className="form-label">Message</label>
								<input type="text" className="form-control form-control-sm" onChange={e => setCurrentMessage(e.target.value)} onKeyPress={e => e.key === "Enter" && sendMessage()} />
							</div>
							<button className="btn btn-primary" onClick={sendMessage} >Send</button>
						</div>
					</div>
				</div>
				<div className="col-xl-6">
					<div className="card">
						<div className="card-header bg-info">
							<h4>Live chat</h4>
						</div>
						<div className="card-body">
							{
								messageList.map((messageContent, index) => {
									return (
										<div key={index}>
											<div>
												{username === messageContent.author ? "you" : "other"} : <span></span>
												<span>{messageContent.message}</span>
											</div>
										</div>
									);
								})
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
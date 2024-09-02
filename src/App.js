// // import Button from "@material-ui/core/Button";
// // import IconButton from "@material-ui/core/IconButton";
// // import TextField from "@material-ui/core/TextField";
// // import AssignmentIcon from "@material-ui/icons/Assignment";
// // import PhoneIcon from "@material-ui/icons/Phone";
// // import VideocamOffIcon from "@material-ui/icons/VideocamOff";
// // import VideocamIcon from "@material-ui/icons/Videocam";
// // import MicOffIcon from "@material-ui/icons/MicOff";
// // import MicIcon from "@material-ui/icons/Mic";
// // import React, { useEffect, useRef, useState } from "react";
// // import { CopyToClipboard } from "react-copy-to-clipboard";
// // import Peer from "simple-peer";
// // import io from "socket.io-client";
// // import "./App.css";

// // const socket = io.connect('http://localhost:5000');

// // function App() {
// //     const [me, setMe] = useState("");
// //     const [stream, setStream] = useState();
// //     const [receivingCall, setReceivingCall] = useState(false);
// //     const [caller, setCaller] = useState("");
// //     const [callerSignal, setCallerSignal] = useState();
// //     const [callAccepted, setCallAccepted] = useState(false);
// //     const [idToCall, setIdToCall] = useState("");
// //     const [callEnded, setCallEnded] = useState(false);
// //     const [name, setName] = useState("");
// //     const [micMuted, setMicMuted] = useState(false);
// //     const [videoOff, setVideoOff] = useState(false);
// //     const myVideo = useRef();
// //     const userVideo = useRef();
// //     const connectionRef = useRef();

// //     useEffect(() => {
// //         navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
// //             setStream(stream);
// //             myVideo.current.srcObject = stream;
// //         });

// //         socket.on("me", (id) => {
// //             setMe(id);
// //         });

// //         socket.on("callUser", (data) => {
// //             setReceivingCall(true);
// //             setCaller(data.from);
// //             setName(data.name);
// //             setCallerSignal(data.signal);
// //         });
// //     }, []);

// //     const callUser = (id) => {
// //         const peer = new Peer({
// //             initiator: true,
// //             trickle: false,
// //             stream: stream
// //         });
// //         peer.on("signal", (data) => {
// //             socket.emit("callUser", {
// //                 userToCall: id,
// //                 signalData: data,
// //                 from: me,
// //                 name: name
// //             });
// //         });
// //         peer.on("stream", (stream) => {
// //             userVideo.current.srcObject = stream;
// //         });
// //         socket.on("callAccepted", (signal) => {
// //             setCallAccepted(true);
// //             peer.signal(signal);
// //         });

// //         connectionRef.current = peer;
// //     };

// //     const answerCall = () => {
// //         setCallAccepted(true);
// //         const peer = new Peer({
// //             initiator: false,
// //             trickle: false,
// //             stream: stream
// //         });
// //         peer.on("signal", (data) => {
// //             socket.emit("answerCall", { signal: data, to: caller });
// //         });
// //         peer.on("stream", (stream) => {
// //             userVideo.current.srcObject = stream;
// //         });

// //         peer.signal(callerSignal);
// //         connectionRef.current = peer;
// //     };

// //     const leaveCall = () => {
// //         setCallEnded(true);
// //         connectionRef.current.destroy();
// //     };

// //     const toggleMic = () => {
// //         setMicMuted(!micMuted);
// //         stream.getAudioTracks()[0].enabled = !micMuted;
// //     };

// //     const toggleVideo = () => {
// //         setVideoOff(!videoOff);
// //         stream.getVideoTracks()[0].enabled = !videoOff;
// //     };

// //     return (
// //         <>
// //             <h1 style={{ textAlign: "center", color: '#fff' }}>Video Call App</h1>
// //             <div className="container">
// //                 <div className="video-container">
// //                     <div className="video">
// //                         {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
// //                     </div>
// //                     <div className="video">
// //                         {callAccepted && !callEnded ? (
// //                             <video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} />
// //                         ) : null}
// //                     </div>
// //                 </div>
// //                 <div className="controls">
// //                     <IconButton color={micMuted ? "secondary" : "primary"} aria-label="mute-mic" onClick={toggleMic}>
// //                         {micMuted ? <MicOffIcon fontSize="large" /> : <MicIcon fontSize="large" />}
// //                     </IconButton>
// //                     <IconButton color={videoOff ? "secondary" : "primary"} aria-label="stop-video" onClick={toggleVideo}>
// //                         {videoOff ? <VideocamOffIcon fontSize="large" /> : <VideocamIcon fontSize="large" />}
// //                     </IconButton>
// //                 </div>
// //                 <div className="myId">
// //                     <TextField
// //                         id="filled-basic"
// //                         label="Name"
// //                         variant="filled"
// //                         value={name}
// //                         onChange={(e) => setName(e.target.value)}
// //                         style={{ marginBottom: "20px" }}
// //                     />
// //                     <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
// //                         <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
// //                             Copy ID
// //                         </Button>
// //                     </CopyToClipboard>

// //                     <TextField
// //                         id="filled-basic"
// //                         label="ID to call"
// //                         variant="filled"
// //                         value={idToCall}
// //                         onChange={(e) => setIdToCall(e.target.value)}
// //                     />
// //                     <div className="call-button">
// //                         {callAccepted && !callEnded ? (
// //                             <Button variant="contained" color="secondary" onClick={leaveCall}>
// //                                 End Call
// //                             </Button>
// //                         ) : (
// //                             <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
// //                                 <PhoneIcon fontSize="large" />
// //                             </IconButton>
// //                         )}
// //                         {idToCall}
// //                     </div>
// //                 </div>
// //                 <div>
// //                     {receivingCall && !callAccepted ? (
// //                         <div className="caller">
// //                             <h1>{name} is calling...</h1>
// //                             <Button variant="contained" color="primary" onClick={answerCall}>
// //                                 Answer
// //                             </Button>
// //                         </div>
// //                     ) : null}
// //                 </div>
// //             </div>
// //         </>
// //     );
// // }

// // export default App;

import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { Button, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import {
	Phone as PhoneIcon,
	VideocamOff as VideocamOffIcon,
	Videocam as VideocamIcon,
	MicOff as MicOffIcon,
	Mic as MicIcon,
	ScreenShare as ScreenShareIcon,
	StopScreenShare as StopScreenShareIcon,
	FileCopy as FileCopyIcon,
    CallEnd as CallEndIcon,
} from "@material-ui/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import mp3 from "./ringtone.mp3";

const socket = io.connect("https://server-nodejs-videocall.onrender.com");

function App() {
	const [me, setMe] = useState("");
	const [stream, setStream] = useState(null);
	const [receivingCall, setReceivingCall] = useState(false);
	const [caller, setCaller] = useState("");
	const [callerName, setCallerName] = useState("");
	const [callerSignal, setCallerSignal] = useState(null);
	const [callAccepted, setCallAccepted] = useState(false);
	const [idToCall, setIdToCall] = useState("");
	const [callEnded, setCallEnded] = useState(false);
	const [name, setName] = useState("");
	const [micMuted, setMicMuted] = useState(false);
	const [videoOff, setVideoOff] = useState(false);
	const [screenSharing, setScreenSharing] = useState(false);
	const myVideo = useRef(null);
	const userVideo = useRef(null);
	const connectionRef = useRef(null);
	const [cameraStream, setCameraStream] = useState(null);
	const [remoteName, setRemoteName] = useState("");
	const [ringtone, setRingtone] = useState(null);

	useEffect(() => {
		setupMediaStream();

		socket.on("me", (id) => {
			setMe(id);
		});

		socket.on("callUser", (data) => {
			setReceivingCall(true);
			setCaller(data.from);
			setCallerName(data.name);
			setCallerSignal(data.signal);
			playRingtone(); // Play ringtone when a call is received
		});

		socket.on("callAccepted", (signal) => {
			setCallAccepted(true);
			if (connectionRef.current) {
				connectionRef.current.signal(signal);
			}
		});

		socket.on("call-ended", () => {
			handleCallEnd();
		});

		socket.on("user-disconnected", () => {
			handleCallEnd();
		});

		return () => {
			socket.disconnect();
			handleCallEnd(); // Cleanup on unmount
		};
	}, []);

	const setupMediaStream = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: { width: 1280, height: 720 }, // Request HD video
				audio: true,
			});
			setStream(stream);
			setCameraStream(stream);

			if (myVideo.current) {
				myVideo.current.srcObject = stream;
				myVideo.current.play();
			}

			setMicMuted(!stream.getAudioTracks()[0]?.enabled);
			setVideoOff(!stream.getVideoTracks()[0]?.enabled);
		} catch (err) {
			console.error("Error accessing media devices.", err);
		}
	};

	const playRingtone = () => {
		if (!ringtone) {
			const audio = new Audio(mp3); // Path to the ringtone file
			audio.loop = true; // Play ringtone in a loop
			audio.play();
			setRingtone(audio);
		}
	};

	const stopRingtone = () => {
		if (ringtone) {
			ringtone.pause();
			setRingtone(null);
		}
	};

	const callUser = (id) => {
		stopRingtone(); // Stop ringtone when call is initiated
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream,
		});

		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name,
			});
		});

		peer.on("stream", (stream) => {
			if (userVideo.current) {
				userVideo.current.srcObject = stream;
				userVideo.current.play();
				setRemoteName(id);
			}
		});

		peer.on("close", handleCallEnd);

		connectionRef.current = peer;
	};

	const answerCall = () => {
		stopRingtone(); // Stop ringtone when call is answered
		setCallAccepted(true);
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream,
		});

		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller });
		});

		peer.on("stream", (stream) => {
			if (userVideo.current) {
				userVideo.current.srcObject = stream;
				userVideo.current.play();
				setRemoteName(callerName);
			}
		});

		peer.signal(callerSignal);

		peer.on("close", handleCallEnd);

		connectionRef.current = peer;
	};

	const handleCallEnd = () => {
        if (callAccepted) {
          socket.emit("call-ended");
        }
    
        setCallEnded(true);
        setReceivingCall(false);
        setCaller("");
        setCallerName("");
        setCallerSignal(null);
        setCallAccepted(false);
        setIdToCall("");
        setMicMuted(false);
        setVideoOff(false);
        setRemoteName("");
        setName("");
    
        if (connectionRef.current) {
          connectionRef.current.destroy();
          connectionRef.current = null;
        }
    
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
    
          if (myVideo.current) {
            myVideo.current.srcObject = null;
          }
        }
    
        if (userVideo.current) {
          userVideo.current.srcObject = null;
        }
    
        stopRingtone();
        setupMediaStream(); // Reinitialize media stream for new calls
      };

	const toggleMic = () => {
		if (stream) {
			const audioTrack = stream.getAudioTracks()[0];
			audioTrack.enabled = !audioTrack.enabled;
			setMicMuted(!audioTrack.enabled);
		}
	};

	const toggleVideo = () => {
		if (stream) {
			const videoTrack = stream.getVideoTracks()[0];
			videoTrack.enabled = !videoTrack.enabled;
			setVideoOff(!videoTrack.enabled);
		}
	};

	const toggleScreenShare = async () => {
		if (!screenSharing) {
			try {
				const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
				const screenTrack = screenStream.getVideoTracks()[0];

				if (connectionRef.current) {
					const existingTracks = connectionRef.current.streams[0]?.getVideoTracks();

					if (existingTracks && existingTracks.length > 0) {
						const existingVideoTrack = existingTracks[0];
						connectionRef.current.replaceTrack(existingVideoTrack, screenTrack, stream);
					}
				}

				setStream(screenStream);
				myVideo.current.srcObject = screenStream;
				myVideo.current.play();

				screenTrack.onended = () => {
					toggleScreenShare();
				};

				setScreenSharing(true);
			} catch (err) {
				console.error("Error starting screen sharing: ", err);
			}
		} else {
			if (cameraStream) {
				const cameraTrack = cameraStream.getVideoTracks()[0];

				if (connectionRef.current) {
					const existingTracks = connectionRef.current.streams[0]?.getVideoTracks();

					if (existingTracks && existingTracks.length > 0) {
						const existingVideoTrack = existingTracks[0];
						connectionRef.current.replaceTrack(existingVideoTrack, cameraTrack, stream);
					}
				}

				setStream(new MediaStream([cameraTrack]));
				myVideo.current.srcObject = new MediaStream([cameraTrack]);
				myVideo.current.play();

				setScreenSharing(false);
			}
		}
	};

	const declineCall = ()=>{
		setReceivingCall(false);
		stopRingtone();
	}

	return (
		<>
			<h1>Video Call</h1>
			<div>
				<TextField
					label="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<TextField
					label="ID to Call"
					value={idToCall}
					onChange={(e) => setIdToCall(e.target.value)}
				/>
				<div>
					<span>Your ID: {me}</span>
					<CopyToClipboard text={me}>
						<IconButton color="primary">
							<FileCopyIcon />
						</IconButton>
					</CopyToClipboard>
				</div>
			</div>
			<div>
				<div className="video-container">
					{stream && <video ref={myVideo} autoPlay muted playsInline />}
					{callAccepted && !callEnded && (
						<div className="remote-video-container">
							<div className="remote-name">{remoteName}</div>
							<video ref={userVideo} autoPlay playsInline />
						</div>
					)}
				</div>
				<div className="controls">
                {receivingCall && !callAccepted && (
                        <Dialog
                            open={receivingCall}
                            onClose={declineCall}
                            className="incoming-call-dialog"
                        >
                            <DialogTitle className="incoming-call-title">
                                <PhoneIcon fontSize="large" />
                                <span>Incoming Call</span>
                            </DialogTitle>
                            <DialogContent className="incoming-call-content">
                                <p className="caller-info">{callerName} is calling...</p>
                            </DialogContent>
                            <DialogActions className="incoming-call-actions">
                                <Button
                                    onClick={answerCall}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<PhoneIcon />}
                                    className="answer-button"
                                >
                                    Answer
                                </Button>
                                <Button
                                    onClick={declineCall}
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<CallEndIcon />}
                                    className="decline-button"
                                >
                                    Decline
                                </Button>
                            </DialogActions>
                        </Dialog>
                    )}
					{callAccepted && !callEnded ? (
						<div className="controls">
							<IconButton onClick={toggleMic} color={micMuted ? "secondary" : "primary"}>
								{micMuted ? <MicOffIcon fontSize="large" /> : <MicIcon fontSize="large" />}
							</IconButton>
							<IconButton onClick={toggleVideo} color={videoOff ? "secondary" : "primary"}>
								{videoOff ? <VideocamOffIcon fontSize="large" /> : <VideocamIcon fontSize="large" />}
							</IconButton>
							<IconButton onClick={toggleScreenShare} color={screenSharing ? "secondary" : "primary"}>
								{screenSharing ? <StopScreenShareIcon fontSize="large" /> : <ScreenShareIcon fontSize="large" />}
							</IconButton>
							<Button
								variant="contained"
								color="secondary"
								onClick={handleCallEnd}
								startIcon={<PhoneIcon fontSize="large" />}
							>
								Hang Up
							</Button>
						</div>
					) : (
						<div>
							<Button
								variant="contained"
								color="primary"
								onClick={() => callUser(idToCall)}
							>
								<PhoneIcon /> Call
							</Button>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default App;
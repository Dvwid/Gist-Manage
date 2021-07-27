import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateGistsPopup from "./CreateGistsPopup";
import GitHubWrapper from "./githubWrapper";
import "./styles/CreateGists/createGists.scss";
import { ReactComponent as LeftArrow } from "../icons/left-arrow.svg";

const CreateGists = () => {
	const [fileName, setFileName] = useState("");
	const [description, setDescription] = useState("");
	const [isPublic, setIsPublic] = useState(true);
	const [content, setContent] = useState("");
	const [popupType, setPopupType] = useState("");
	const [popupIsActive, setPopupIsActive] = useState(false);
	const [popupText, setPopupText] = useState("");

	const strigifyToJSON = () => {
		const json = {
			description,
			public: isPublic,
			files: {
				[fileName]: { content },
			},
		};
		return JSON.stringify(json);
	};

	const handleSubmit = async () => {
		if (!fileName.includes(".")) {
			setPopupType("error");
			setPopupText("The filename does not contain extension.");
			setPopupIsActive(true);
		} else if (fileName.includes("/")) {
			setPopupType("error");
			setPopupText('Unexpected token. Remove "/" from filename');
			setPopupIsActive(true);
		} else if (fileName === ".") {
			setPopupType("error");
			setPopupText("Invalid filename. Please create a name with the extension");
			setPopupIsActive(true);
		} else if (content === "") {
			setPopupType("error");
			setPopupText("Content can't be empty.");
			setPopupIsActive(true);
		} else {
			const wrapper = new GitHubWrapper();
			wrapper
				.createGist(strigifyToJSON())
				.then((res) => {
					setPopupType("correct");
					setPopupText("Success! You have added a new file!");
					setPopupIsActive(true);
					setFileName("");
					setDescription("");
					setContent("");
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return popupIsActive ? (
		<CreateGistsPopup
			setPopupIsActive={setPopupIsActive}
			setPopupText={setPopupText}
			popupType={popupType}
			popupText={popupText}
		/>
	) : (
		<div className="createGists">
			<div className="createGists_header">
				<Link to="/">
					<LeftArrow className="createGists_header_leftArrow" />
				</Link>

				<div>
					Create <span className="createGists_header_title">new</span> file
				</div>
				<div></div>
			</div>
			<form
				className="createGists_form"
				onSubmit={(e) => {
					e.preventDefault();
					console.log(fileName, description, content, isPublic);
					handleSubmit();
				}}
			>
				<input
					type="text"
					name="description"
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
					}}
					placeholder="Gist description"
					className="createGists_form_input"
				/>

				<input
					type="text"
					name="fileName"
					value={fileName}
					onChange={(e) => {
						setFileName(e.target.value);
					}}
					placeholder="Filename including extension"
					className="createGists_form_input"
				/>

				<textarea
					type="text"
					name="Content"
					value={content}
					onChange={(e) => {
						setContent(e.target.value);
					}}
					className="createGists_form_textarea"
				/>
				<div className="createGists_form_buttons">
					<div className="createGists_form_buttons_checkbox">
						<input
							type="checkbox"
							name="isPublic"
							checked={isPublic}
							onChange={() => {
								setIsPublic(!isPublic);
							}}
						/>
						<label>Public?</label>
					</div>

					<button className="createGists_form_buttons_button" type="submit">
						Create
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateGists;

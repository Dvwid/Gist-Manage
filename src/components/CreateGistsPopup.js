import React from "react";
import { Link } from "react-router-dom";

const CreateGistsPopup = ({
	setPopupIsActive,
	setPopupText,
	popupType,
	popupText,
}) => {
	if (popupType === "error") {
		return (
			<div className="createGists_popup">
				<div className="createGists_popup_text">{popupText}</div>
				<button
					onClick={() => {
						setPopupIsActive(false);
						setPopupText("");
					}}
				>
					Correct data
				</button>
			</div>
		);
	} else if (popupType === "correct") {
		return (
			<div className="createGists_popup">
				<div className="createGists_popup_success_text">{popupText}</div>
				<div className="createGists_popup_success_buttons">
					<button
						onClick={() => {
							setPopupIsActive(false);
							setPopupText("");
						}}
					>
						Add new file
					</button>
					<Link
						to="/all"
						onClick={() => {
							setPopupIsActive(false);
							setPopupText("");
						}}
					>
						Show existing files
					</Link>
				</div>
			</div>
		);
	}
};

export default CreateGistsPopup;

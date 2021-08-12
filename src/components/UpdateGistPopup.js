import React from "react";
import { Link } from "react-router-dom";

const UpdateGistPopup = ({
	setPopupIsActive,
	setPopupText,
	popupType,
	popupText,
	setFileIsEditing,
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
					<Link
						to="/"
						onClick={() => {
							setFileIsEditing(false);
							setPopupIsActive(false);
							setPopupText("");
						}}
					>
						Back
					</Link>
				</div>
			</div>
		);
	}
};

export default UpdateGistPopup;

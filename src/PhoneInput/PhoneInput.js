import React from 'react';
import classes from './PhoneInput.module.css';

export default function PhoneInput({
	isChecked,
	handleCheckChange,
	phoneValue,
	onPhoneChangeHandler,
	onEnterPressedHandler,
	topMargin,
	paddingLeft,
}) {
	return (
		<div className={classes.Phone}>
			<div
				style={{
					top: topMargin,
				}}
				className={classes.Checkbox}
			>
				<input
					type='checkbox'
					checked={isChecked}
					onChange={handleCheckChange}
				/>
				<span className={classes.Checkmark}></span>
			</div>
			<input
				className={classes.PhoneInput}
				value={phoneValue}
				onChange={(event) => {
					onPhoneChangeHandler(event);
				}}
				onKeyDown={onEnterPressedHandler}
				placeholder='+7 (999) 999 99 99'
			/>
		</div>
	);
}

import React from 'react';
import './PhoneInput.css';

export default function PhoneInput({
	isChecked,
	handleCheckChange,
	phoneValue,
	onPhoneChangeHandler,
	onEnterPressedHandler,
}) {
	return (
		<div calss='PhoneInput'>
			<div className='Checkbox'>
				<input
					type='checkbox'
					checked={isChecked}
					onChange={handleCheckChange}
				/>
				<span className='Checkmark'></span>
			</div>
			<input
				className='PhoneInput'
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

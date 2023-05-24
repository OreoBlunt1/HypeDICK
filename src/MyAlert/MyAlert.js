import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import Backdrop from './BackDrop/BackDrop';

export default function MyAlert({ onClose }) {
	const [isFormValid, setIsFormValid] = useState(true);
	const [formControls, setFormControls] = useState({
		name: {
			value: '',
		},
		phone: {
			value: '',
		},
	});
	const [isChecked, setIsChecked] = useState(false);

	const IP = process.env.REACT_APP_IP_ADDRESS;

	function phoneValidation() {
		return /^(?:\+7|8)\d{10}$/.test(formControls.phone.value);
	}

	function nameValidation() {
		return formControls.name.value !== '';
	}

	function throwLead() {
		const leadData = {
			name: formControls.name.value,
			phone_number: formControls.phone.value,
		};
		if (isChecked && nameValidation()) {
			axios.post(`${IP}/lead`, leadData);
			alert('Заявка успешно отправлена! Ожидайте чего-то там');
			setIsFormValid(true);
		} else if (phoneValidation() && nameValidation()) {
			axios.post(`${IP}/lead`, leadData);
			alert('Заявка успешно отправлена! Ожидайте чего-то там');
			setIsFormValid(true);
		} else {
			setIsFormValid(false);
		}
	}

	function onNameChangeHandler(event) {
		const newFormControls = { ...formControls };
		newFormControls.name.value = event.target.value;

		setFormControls(newFormControls);
	}

	function onPhoneChangeHandler(event) {
		const newFormControls = { ...formControls };
		newFormControls.phone.value = event.target.value;

		if (!isChecked) {
			if (
				newFormControls.phone.value === '8' ||
				newFormControls.phone.value === '7'
			) {
				newFormControls.phone.value = '+7';
			} else if (newFormControls.phone.value === '9') {
				newFormControls.phone.value = '+79';
			}
		}

		setFormControls(newFormControls);
	}

	function handleCheckChange(event) {
		setIsChecked(event.target.checked);
	}

	function onEnterPressedHandler(event) {
		if (event.key === 'Enter') {
			throwLead();
		}
	}

	return (
		<>
			<div className='card MyAlert'>
				<h1>
					Оставьте ваши контакты
					<br />и мы вам перезвоним!
				</h1>
				<input
					value={formControls.name.value}
					onChange={(event) => {
						onNameChangeHandler(event);
					}}
					onKeyDown={onEnterPressedHandler}
					placeholder='Имя'
				/>
				<div className='Phone'>
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
						value={formControls.phone.value}
						onChange={(event) => {
							onPhoneChangeHandler(event);
						}}
						onKeyDown={onEnterPressedHandler}
						placeholder='+7 (999) 999 99 99'
					/>
				</div>
				{!isFormValid && !phoneValidation() && !isChecked ? (
					<p>*Проверьте правильность номера телефона</p>
				) : null}
				{!isFormValid && !nameValidation() ? (
					<p>*Имя не должно быть пустым</p>
				) : null}
				<button onClick={throwLead}>Отправить заявку</button>
				<span className='noneDisplayMobile'>
					Нажимая на кнопку, вы принимаете&nbsp;
					<a href='https://yandex.ru/'>
						условия
						<br />
						передачи информации и пользовательское
						<br />
						соглашение
					</a>
				</span>
				<span className='noneDisplayDesktop'>
					Нажимая на кнопку, вы принимаете&nbsp; условия передачи информации и
					пользовательское соглашение
				</span>
			</div>
			<Backdrop onClick={onClose} />
		</>
	);
}

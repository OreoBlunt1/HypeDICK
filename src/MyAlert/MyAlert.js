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

	const IP = process.env.REACT_APP_IP_ADDRESS;

	function phoneValidation() {
		return /^(?:\+7|8)\d{10}$/.test(formControls.phone.value);
	}

	function nameValidation() {
		return formControls.name.value !== '';
	}

	function throwLead() {
		if (phoneValidation() && nameValidation()) {
			const leadData = {
				name: formControls.name.value,
				phone_number: formControls.phone.value,
			};
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
		if (
			newFormControls.phone.value === '8' ||
			newFormControls.phone.value === '7'
		) {
			newFormControls.phone.value = '+7';
		} else if (newFormControls.phone.value === '9') {
			newFormControls.phone.value = '+79';
		}

		setFormControls(newFormControls);
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
					Стать
					<br />
					инвестором
				</h1>
				<input
					value={formControls.name.value}
					onChange={(event) => {
						onNameChangeHandler(event);
					}}
					onKeyDown={onEnterPressedHandler}
					placeholder='Имя'
				/>
				<input
					value={formControls.phone.value}
					onChange={(event) => {
						onPhoneChangeHandler(event);
					}}
					onKeyDown={onEnterPressedHandler}
					placeholder='+7 (999) 999 99 99'
				/>
				{!isFormValid && !phoneValidation() ? (
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

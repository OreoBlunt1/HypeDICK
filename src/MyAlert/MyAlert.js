import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import Backdrop from './BackDrop/BackDrop';
import PhoneInput from '../PhoneInput/PhoneInput';

export default function MyAlert({ onClose }) {
	const [isFormValid, setIsFormValid] = useState(true);
	const [isChecked, setIsChecked] = useState(true);
	const [formControls, setFormControls] = useState({
		name: {
			value: '',
		},
		phone: {
			value: isChecked ? '+7' : null,
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

	function handleCheckChange(event) {
		const newFormControls = formControls;
		if (!isChecked) {
			newFormControls.phone.value = '+7';
		} else {
			newFormControls.phone.value = '';
		}
		setFormControls(newFormControls);
		setIsChecked(event.target.checked);
	}

	function formatPhoneNumber(value) {
		const phoneNumber = value.replace(/\D/g, ''); // Удалить все нецифровые символы

		const phoneNumberLength = phoneNumber.length;
		let formattedPhoneNumber = '';

		if (phoneNumberLength > 0) {
			formattedPhoneNumber += '+7 ';
		}
		if (phoneNumberLength > 1) {
			formattedPhoneNumber += `(${phoneNumber.substring(1, 4)}) `;
		}
		if (phoneNumberLength > 4) {
			formattedPhoneNumber += phoneNumber.substring(4, 7);
		}
		if (phoneNumberLength > 7) {
			formattedPhoneNumber += ` ${phoneNumber.substring(7, 9)}`;
		}
		if (phoneNumberLength > 9) {
			formattedPhoneNumber += ` ${phoneNumber.substring(9, 11)}`;
		}

		return formattedPhoneNumber;
	}

	function onPhoneChangeHandler(event) {
		const newFormControls = { ...formControls };
		const inputValue = event.target.value;
		const formattedValue = formatPhoneNumber(inputValue);
		if (inputValue.length > newFormControls.phone.value.length) {
			newFormControls.phone.value = formattedValue;
		} else {
			newFormControls.phone.value = inputValue;
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
				<PhoneInput
					isChecked={isChecked}
					onEnterPressedHandler={onEnterPressedHandler}
					handleCheckChange={handleCheckChange}
					phoneValue={formControls.phone.value}
					onPhoneChangeHandler={onPhoneChangeHandler}
				/>
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

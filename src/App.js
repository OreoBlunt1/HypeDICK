import './App.css';
import plus from './img/plus.svg';
import car from './img/car.svg';
import arrow from './img/arrow.svg';
import max from './img/max.svg';
import polo from './img/polo.svg';
import rapid from './img/rapid.svg';
import rio from './img/rio.svg';
import solaris from './img/solaris.svg';
import dot from './img/dot.svg';
import activeDot from './img/active-dot.svg';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import MyAlert from './MyAlert/MyAlert';
import PhoneInput from './PhoneInput/PhoneInput';

function App() {
	const [isFirstAccordion, setIsFirstAccordion] = useState(false);
	const [isSecondAccordion, setIsSecondAccordion] = useState(false);
	const [isThirdAccordion, setIsThirdAccordion] = useState(false);
	const [isFourthAccordion, setIsFourthAccordion] = useState(false);
	const [isChecked, setIsChecked] = useState(true);

	const [isReplyMe, setIsReplyMe] = useState(false);

	const IP = process.env.REACT_APP_IP_ADDRESS;

	const [price, setPrice] = useState(null);
	const [isFormValid, setIsFormValid] = useState(true);
	const [formControls, setFormControls] = useState({
		name: {
			value: '',
		},
		phone: {
			value: isChecked ? '+7' : null,
		},
	});

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

	const sliderSettings = {
		slidesToShow: 1,
		dots: true,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		customPaging: function (slider, i) {
			// Return your custom dot HTML here
			return (
				<div>
					<img src={dot} alt='dot' />
					<img src={activeDot} alt='active-dot' />
				</div>
			);
		},
		arrows: false,
	};
	const firstAccordonImgStyle = {
		transform: isFirstAccordion ? 'rotate(180deg)' : null,
		transition: 'ease-in-out .3s',
	};
	const firstAccordionPanelStyle = {
		display: isFirstAccordion ? 'flex' : 'none',
	};

	const secondAccordonImgStyle = {
		transform: isSecondAccordion ? 'rotate(180deg)' : null,
		transition: 'ease-in-out .3s',
	};
	const secondAccordionPanelStyle = {
		display: isSecondAccordion ? 'flex' : 'none',
	};

	const thirdAccordonImgStyle = {
		transform: isThirdAccordion ? 'rotate(180deg)' : null,
		transition: 'ease-in-out .3s',
	};
	const thirdAccordionPanelStyle = {
		display: isThirdAccordion ? 'flex' : 'none',
	};

	const fourthAccordonImgStyle = {
		transform: isFourthAccordion ? 'rotate(180deg)' : null,
		transition: 'ease-in-out .3s',
	};
	const fourthAccordionPanelStyle = {
		display: isFourthAccordion ? 'flex' : 'none',
	};

	function onFirstAccordionClick() {
		setIsFirstAccordion((prev) => !prev);
	}

	function onSecondAccordionClick() {
		setIsSecondAccordion((prev) => !prev);
	}

	function onThirdAccordionClick() {
		setIsThirdAccordion((prev) => !prev);
	}

	function onFourthAccordionClick() {
		setIsFourthAccordion((prev) => !prev);
	}

	function nameValidation() {
		return (
			formControls.name.value !== '' && formControls.name.value.length <= 60
		);
	}

	function phoneValidation(phoneNumber) {
		const regex = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
		return regex.test(phoneNumber);
	}

	console.log('validation= ' + phoneValidation(formControls.phone.value));

	async function throwLead() {
		if (
			nameValidation() &&
			phoneValidation(formControls.phone.value) &&
			isChecked
		) {
			const leadData = {
				name: formControls.name.value,
				phone_number: formControls.phone.value,
			};
			axios.post('https://149.102.143.18/lead', leadData);

			alert('Ваша заявка успешно отправлена!');
			setIsFormValid(true);
			setIsReplyMe(false);
		} else {
			setIsFormValid(false);
		}
	}

	function onNameChangeHandler(event) {
		const newFormControls = { ...formControls };
		newFormControls.name.value = event.target.value;

		setFormControls(newFormControls);
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

	function onEscPressedHandler(event) {
		if (event.keyCode === 27) {
			onReplyClose();
		}
	}

	function onReplyMeClick() {
		setIsReplyMe(true);
	}

	function onReplyClose() {
		setIsReplyMe(false);
	}

	useEffect(() => {
		document.addEventListener('keydown', onEscPressedHandler);

		return () => {
			document.removeEventListener('keydown', onEscPressedHandler);
		};
	}, []);

	function formatPrice(number) {
		let numberString = number.toString().replace(' ', '');

		let formattedNumber = '';
		let count = 0;

		for (let i = numberString.length - 1; i >= 0; i--) {
			formattedNumber = numberString[i] + formattedNumber;
			count++;

			if (count % 3 === 0 && i !== 0) {
				formattedNumber = ' ' + formattedNumber;
			}
		}

		return formattedNumber;
	}

	useEffect(() => {
		async function fetchData() {
			try {
				const headers = {
					'User-Agent':
						'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
					Accept: 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Headers':
						'Origin, X-Requested-With, Content-Type, Accept',
				};

				const response = await axios.get('https://149.102.143.18/prices', {
					headers,
				});
				const newPrices = response.data.map((price) => {
					return {
						pos: price.pos,
						redemption: formatPrice(price.redemption),
						rent: formatPrice(price.rent),
					};
				});
				setPrice(newPrices);
			} catch (e) {
				console.log(e);
			}
		}

		fetchData();
	}, []);

	return (
		<>
			<YMaps
				style={{
					background: 'black',
				}}
			>
				<div className='wrapper'>
					<div className='container'>
						<div className='header'>
							<div className='leftHead'>
								<div className='logo'>
									<span>HypeTaxi</span>
									<span className='r'>®</span>
								</div>
								<p>
									Автомобили с лицензией такси
									<br />
									под выкуп и в аренду.
								</p>
							</div>
							<div className='rightHead'>
								<span>email@email.ru</span>
								<button onClick={onReplyMeClick}>Перезвоните мне</button>
							</div>
						</div>
					</div>
					<hr />
					<div className='container'>
						<div className='nav'>
							<a href='#invest'>Инвесторам</a>
							<a href='#income'>
								Аренда авто
								<br />
								для водителей
							</a>
							<a className='last' href='#footer'>
								Контакты
							</a>
						</div>
					</div>
					<div className='investWrapper' id='invest'>
						<div className='leftBack'></div>
						<div className='rightBack'></div>
						<div className='container'>
							<div className='invest'>
								<div className='leftInvest'>
									<h1>
										Сдадим ваш автомобиль
										<br />в аренду!
									</h1>
									<h2>Инвестиции в такси</h2>
									<div className='advantagesList'>
										<div className='advantage'>
											<img src={plus} alt='plus' />
											<span>
												Официально
												<br />
												по договору
											</span>
										</div>
										<div className='advantage'>
											<img src={plus} alt='plus' />
											<span>
												Заработок с одного
												<br />
												автомобиля до (???)
											</span>
										</div>
										<div className='advantage'>
											<img src={plus} alt='plus' />
											<span>
												Ежемесячные
												<br />
												выплаты{' '}
											</span>
										</div>
										<div className='advantage'>
											<img src={plus} alt='plus' />
											<span>Пассивный доход</span>
										</div>
										<div className='advantage'>
											<img src={plus} alt='plus' />
											<span>
												Подбор, запуск и<br />
												обслуживание автомобилей
												<br />
												под ключ
											</span>
										</div>
									</div>
								</div>
								<div className='rightInvest'>
									<div className='card'>
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
										<PhoneInput
											isChecked={isChecked}
											onEnterPressedHandler={onEnterPressedHandler}
											handleCheckChange={handleCheckChange}
											phoneValue={formControls.phone.value}
											onPhoneChangeHandler={onPhoneChangeHandler}
										/>
										{!isFormValid &&
										nameValidation() &&
										!phoneValidation(formControls.phone.value) &&
										isChecked ? (
											<p>*Проверьте правильность ввода телефона</p>
										) : null}
										{!isFormValid &&
										!nameValidation() &&
										formControls.name.value === '' ? (
											<p>*Имя не должно быть пустым</p>
										) : null}
										{!isFormValid &&
										!nameValidation() &&
										formControls.name.value.length > 60 ? (
											<p>*Длина имени не должна превышать 60 символов</p>
										) : null}
										<button onClick={throwLead}>Отправить заявку</button>
										<span className='noneDisplayMobile'>
											Нажимая на кнопку, вы принимаете&nbsp;
											<a href='./blank.pdf' download>
												условия
												<br />
												передачи информации и пользовательское
												<br />
												соглашение
											</a>
										</span>
										<span className='noneDisplayDesktop'>
											Нажимая на кнопку, вы принимаете&nbsp; условия
											<br />
											передачи информации и пользовательское
											<br />
											соглашение
										</span>
									</div>
									<img className='car' src={car} alt='car' />
								</div>
							</div>
						</div>
					</div>
					<div className='container'>
						<div className='income' id='income'>
							<h1>Ваш доход</h1>
							<Slider {...sliderSettings}>
								<div className='carouselItem'>
									<img src={rapid} alt='rapid' />
									<p>Skoda Rapid</p>
								</div>
								<div className='carouselItem'>
									<img src={rio} alt='rio' />
									<p>Kia Rio</p>
								</div>
								<div className='carouselItem'>
									<img src={solaris} alt='solaris' />
									<p>Hyundai Solaris</p>
								</div>
								<div className='carouselItem'>
									<img src={polo} alt='polo' />
									<p>VolksWagen Polo</p>
								</div>
							</Slider>
							<div className='price'>
								<div className='priceRow autoAmount noneDisplayMobile'>
									<h2></h2>
									<span>{price ? price[0].pos : null}</span>
									<span>{price ? price[1].pos : null}</span>
									<span>{price ? price[2].pos : null}</span>
								</div>
								<h2 className='noneDisplayDesktop'>Аренда</h2>
								<div className='priceRow rent'>
									<h2 className='noneDisplayMobile'>Аренда</h2>
									<div className='priceBlock noneDisplayDesktop'>
										<span>{price ? price[0].pos : null}</span>
										<span>{price ? price[1].pos : null}</span>
										<span>{price ? price[2].pos : null}</span>
									</div>
									<div className='priceBlock last'>
										<span>{price ? price[0].rent : null} ₽/мес</span>
										<span>{price ? price[1].rent : null} ₽/мес</span>
										<span>{price ? price[2].rent : null} ₽/мес</span>
									</div>
								</div>
								<h2 className='noneDisplayDesktop'>Выкуп</h2>
								<div className='priceRow buy'>
									<h2 className='noneDisplayMobile'>Выкуп</h2>
									<div className='priceBlock noneDisplayDesktop'>
										<span>{price ? price[0].pos : null}</span>
										<span>{price ? price[1].pos : null}</span>
										<span>{price ? price[2].pos : null}</span>
									</div>
									<div className='priceBlock'>
										<span>{price ? price[0].redemption : null} ₽/мес</span>
										<span>{price ? price[1].redemption : null} ₽/мес</span>
										<span>{price ? price[2].redemption : null} ₽/мес</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='benefitWrapper'>
						<div className='container'>
							<div className='benefit'>
								<h1>Наши преимущества</h1>
								<div className='staff'>
									<div className='person'>
										<img src={max} alt='max' />
										<h2>Макс Ланской</h2>
										<span>
											Представляет собой
											<br />
											прописную латинскую букву R
										</span>
									</div>
									<div className='person'>
										<img src={max} alt='max' />
										<h2>Макс Ланской</h2>
										<span>
											Представляет собой
											<br />
											прописную латинскую букву R
										</span>
									</div>
									<div className='person last'>
										<img src={max} alt='max' />
										<h2>Макс Ланской</h2>
										<span>
											Представляет собой
											<br />
											прописную латинскую букву R
										</span>
									</div>
									<div className='person'>
										<img src={max} alt='max' />
										<h2>Макс Ланской</h2>
										<span>
											Представляет собой
											<br />
											прописную латинскую букву R
										</span>
									</div>
									<div className='person'>
										<img src={max} alt='max' />
										<h2>Макс Ланской</h2>
										<span>
											Представляет собой
											<br />
											прописную латинскую букву R
										</span>
									</div>
									<div className='person last'>
										<img src={max} alt='max' />
										<h2>Макс Ланской</h2>
										<span>
											Представляет собой
											<br />
											прописную латинскую букву R
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='container stageVer'>
						<div className='stages'>
							<h1>Этапы запуска авто</h1>
							<div className='stagesGrid'>
								<div className='stage first'>
									<div className='way'>
										<div className='circle'>1</div>
										<div className='horizontalLine'></div>
									</div>
									<h2>Покупка авто</h2>
									<span>
										Если у вас нет подходящего авто, то мы поможем
										<br />с покупкой. У нас есть особые условия и скидки
										<br />
										на автомобили с пробегом в дилерах
									</span>
								</div>
								<div className='stage second'>
									<div className='way'>
										<div className='circle'>2</div>
										<div className='horizontalLine'></div>
									</div>
									<h2>Оклейка авто</h2>
									<span>
										Для получения лицензии такси авто должен быть
										<br />
										белым и оклеен спец полосами (серой и желтой),
										<br />а также иметь цветографическую схему - шашки
									</span>
								</div>
								<div className='stage third'>
									<div className='way'>
										<div className='circle'>3</div>
										<div className='horizontalLine'></div>
									</div>
									<h2>ОСАГО/КАСКО</h2>
									<span>
										ОСАГО и КАСКО нужны с пометкой “Такси” и без
										<br />
										ограничений по водителям. Подскажем, как и где
										<br />
										лучше оформить
									</span>
								</div>
								<div className='stage sixth noneDisplayMobile'>
									<div className='way'>
										<div className='circle'>6</div>
										<div className='horizontalLine'></div>
									</div>
									<h2>Брендинг агрегатора</h2>
									<span>
										Брендинг агрегатора дает приоритет в заказах,
										<br />
										поклеим бренд пока ожидаем лицензию
									</span>
								</div>
								<div className='stage fourth noneDisplayDesktop'>
									<div className='way'>
										<div className='circle'>4</div>
										<div className='horizontalLine'></div>
									</div>
									<h2>
										Постановка на
										<br />
										учёт в ГИБДД
									</h2>
									<span>
										Тут потребуется автомобиль, оклеенный под такси,
										<br />
										с ОСАГО и документы. Есть возможность пройти
										<br />
										процедуру день-в-день.
									</span>
								</div>
								<div className='stage fifth noneDisplayDesktop'>
									<div className='way'>
										<div className='circle'>5</div>
										<div className='horizontalLine'></div>
									</div>
									<h2>
										Подача заявки
										<br />
										на лицензию
									</h2>
									<span>
										Здесь потребуется: СТС с указанием цвета кузова
										<br />
										"белый-желтый-серый" и данные ИП. С открытием
										<br />
										ИП без хлопот мы поможем!
									</span>
								</div>
								<div className='stage sixth noneDisplayDesktop'>
									<div className='way'>
										<div className='circle'>6</div>
										<div className='horizontalLine'></div>
									</div>
									<h2>Брендинг агрегатора</h2>
									<span>
										Брендинг агрегатора дает приоритет в заказах,
										<br />
										поклеим бренд пока ожидаем лицензию
									</span>
								</div>
								<div className='stage fifth noneDisplayMobile'>
									<div className='way'>
										<div className='circle'>5</div>
										<div className='horizontalLine'></div>
									</div>
									<h2>
										Подача заявки
										<br />
										на лицензию
									</h2>
									<span>
										Здесь потребуется: СТС с указанием цвета кузова
										<br />
										"белый-желтый-серый" и данные ИП. С открытием
										<br />
										ИП без хлопот мы поможем!
									</span>
								</div>
								<div className='stage fourth noneDisplayMobile'>
									<div className='way'>
										<div className='circle'>4</div>
										<div className='horizontalLine'></div>
									</div>
									<h2>
										Постановка на
										<br />
										учёт в ГИБДД
									</h2>
									<span>
										Тут потребуется автомобиль, оклеенный под такси,
										<br />
										с ОСАГО и документы. Есть возможность пройти
										<br />
										процедуру день-в-день.
									</span>
								</div>
								<div className='stage seventh'>
									<div className='way'>
										<div className='circle'>7</div>
										<div className='horizontalLine'></div>
									</div>
									<h2>Установка GPS</h2>
									<span>
										Также пока ожидаем лицензию, наши техники
										<br />
										установят GPS маячки с возможностью отключения
										<br />
										зажигания
									</span>
								</div>
								<div className='stage eighth'>
									<div className='way'>
										<div className='circle'>8</div>
										<div className='horizontalLine'></div>
									</div>
									<h2>Получение лицензии</h2>
									<span>
										На данный момент лицензии выдются уже в<br />
										электронном виде, что очень удобно
									</span>
								</div>
								<div className='stage ninth'>
									<div className='way'>
										<div className='circle'>9</div>
										<div className='horizontalLine'></div>
									</div>
									<h2>Запуск авто</h2>
									<span>
										К этому моменту водитель уже будет ожидать
										<br />
										авто и сразу же приступит к работе по готовности.
										<br />
										Уже через неделю Вы получите первые деньги!
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className='container'>
						<div className='form'>
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
								topMargin={'50%'}
								paddingLeft={'3.5%'}
							/>
							<button onClick={throwLead}>Начать зарабатывать с такси</button>
						</div>
					</div>
					<div className='faqWrapper'>
						<div className='container'>
							<div className='faq'>
								<h1>Часто задаваемые вопросы</h1>
								<div className='accordionList'>
									<div className='accordion first'>
										<button
											className='accordionBtn'
											onClick={onFirstAccordionClick}
										>
											Общие вопросы
											<img
												src={arrow}
												alt='arrow'
												style={firstAccordonImgStyle}
											/>
										</button>
										<div className={'panel'} style={firstAccordionPanelStyle}>
											<p>
												<h2>
													Почему мы привлекаем инвесторов, а не работаем только
													со своим парком?
												</h2>
												Количество водителей, желающих взять у нас авто в аренду
												или под выкуп всегда превышает количество доступных в
												парке авто, поэтому нам выгодно задействовать заемный
												капитал для бурного развития компании и удовлетворения
												спроса.
											</p>
											<p>
												<h2>
													У меня нет опыта в бизнесе и инвестициях, станет ли
													это проблемой?
												</h2>
												Наша бизнес модель не требует от Вас никаких бизнес
												навыков или специальных знаний. Это полностью пассивный
												доход, все детали, нюансы и тонкости такси бизнеса мы
												берем на себя!
											</p>
											<p>
												<h2>
													Помогаете ли вы в подборе и покупке авто? Это платная
													услуга?
												</h2>
												Да, конечно, наши опытные специалисты всегда помогут
												оперативно подобрать нужные авто и обязательно
												поторгуются за Вас, чтобы сделать покупку максимально
												выгодной. Стоимость такой услуги индивидуальна и зависит
												от объема инвестиций.
											</p>
											<p>
												<h2>После запуска авто, что от меня потребуется?</h2>
												Абсолютно ничего делать Вам уже не нужно будет.
												Операционка полностью на нас. Стратегические решения
												принимаем совместно.
											</p>
											<p>
												<h2>По какой причине у вас всегда много водителей?</h2>
												Мы уже 7 лет работаем на рынке аренды автомобилей под
												такси. Десятки водителей уже выкупили свои автомобили.
												Мы очень внимательно следим за техническим состоянием
												парка. Поддерживаем хорошие отношения с водителями, а
												также максимально прозрачны и честны в выплатах.
											</p>
											<p>
												<h2>Бывают ли простои парка?</h2>
												Простои возможны только на время восстановления и
												ремонта авто после ДТП. Если авто в порядке они всегда в
												работе.
											</p>
											<p className='last'>
												<h2 className='last'>
													Могу ли я стать инвестором и зарабатывать на своих
													авто удаленно? Я проживаю не в Москве.
												</h2>
												Да, безусловно, в этом и есть смысл нашей модели работы.
												Все процессы от покупки до выхода на линию мы можем
												провести без вашего присутствия. Потребуется только
												доверенность для ГИБДД.
											</p>
										</div>
									</div>
									<div className='accordion second'>
										<button
											className='accordionBtn'
											onClick={onSecondAccordionClick}
										>
											Вопросы по договору
											<img
												src={arrow}
												alt='arrow'
												style={secondAccordonImgStyle}
											/>
										</button>
										<div className='panel' style={secondAccordionPanelStyle}>
											<p>
												Почему мы привлекаем инвесторов, а не работаем только со
												своим парком?
											</p>
										</div>
									</div>
									<div className='accordion third'>
										<button
											className='accordionBtn'
											onClick={onThirdAccordionClick}
										>
											Специфика работы и требования к авто
											<img
												src={arrow}
												alt='arrow'
												style={thirdAccordonImgStyle}
											/>
										</button>
										<div className='panel' style={thirdAccordionPanelStyle}>
											<p>
												Почему мы привлекаем инвесторов, а не работаем только со
												своим парком?
											</p>
										</div>
									</div>
									<div className='accordion fourth'>
										<button
											className='accordionBtn'
											onClick={onFourthAccordionClick}
										>
											Обслуживание и финансы
											<img
												src={arrow}
												alt='arrow'
												style={fourthAccordonImgStyle}
											/>
										</button>
										<div className='panel' style={fourthAccordionPanelStyle}>
											<p>
												Почему мы привлекаем инвесторов, а не работаем только со
												своим парком?
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						id='mapWrapper'
						style={{
							position: 'relative',
							width: '80%',
							left: '10%',
							background: 'black',
							borderRadius: '20px',
							overflow: 'hidden',
							marginTop: '50px',
							marginBottom: '50px',
						}}
					>
						<Map
							defaultState={{ center: [55.766131, 37.604205], zoom: 15 }}
							style={{
								position: 'relative',
								height: '500px',
								background: 'black',
							}}
						>
							<Placemark
								geometry={[55.766131, 37.604205]}
								options={{ iconColor: '#FF0000' }}
							/>
						</Map>
					</div>
					<div className='footerWrapper' id='footer'>
						<div className='container'>
							<div className='footerUp'>
								<div className='phone'>
									<span>По всем вопросам:</span>
									<h1>+7 925 080 52 58</h1>
									<h2>Отвечаем в WhatsApp</h2>
								</div>
								<div className='address'>
									<span>Адрес:</span>
									<p>
										Москва
										<br />
										Тверская ул. 18к1
									</p>
								</div>
								<div className='timetable'>
									<span>График работы:</span>
									<h1>10:00 - 20:00</h1>
								</div>
							</div>
						</div>
					</div>
					<div className='container downFooter'>
						<div className='footerDown'>
							<div className='logo'>
								<span>HypeTaxi</span>
								<span className='r'>®</span>
							</div>
							<a href='./blank.pdf' download>
								Политика конфеденциальности
							</a>
							<a href='./blank.pdf' download>
								Пользовательское соглашение
							</a>
						</div>
					</div>
				</div>
			</YMaps>

			{isReplyMe ? <MyAlert onClose={onReplyClose} /> : null}
		</>
	);
}

export default App;

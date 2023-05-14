import './App.css';
import rectangle from './img/rectangle.svg';
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
import { useState } from 'react';

function App() {
	const [isFirstAccordion, setIsFirstAccordion] = useState(false);
	const [isSecondAccordion, setIsSecondAccordion] = useState(false);
	const [isThirdAccordion, setIsThirdAccordion] = useState(false);
	const [isFourthAccordion, setIsFourthAccordion] = useState(false);
	const sliderSettings = {
		slidesToShow: 1,
		dots: true,
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

	return (
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
						<button>Перезвоните мне</button>
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
					<a href='#footer'>Контакты</a>
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
									<img src={rectangle} alt='rectangle' />
									<span>
										Официально
										<br />
										по договору
									</span>
								</div>
								<div className='advantage'>
									<img src={rectangle} alt='rectangle' />
									<span>
										Заработок с одного
										<br />
										автомобиля до (???)
									</span>
								</div>
								<div className='advantage'>
									<img src={rectangle} alt='rectangle' />
									<span>
										Ежемесячные
										<br />
										выплаты{' '}
									</span>
								</div>
								<div className='advantage'>
									<img src={rectangle} alt='rectangle' />
									<span>Пассивный доход</span>
								</div>
								<div className='advantage'>
									<img src={rectangle} alt='rectangle' />
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
								<input placeholder='Имя' />
								<input placeholder='+7 (999) 999 99 99' />
								<button>Отправить заявку</button>
								<span>
									Нажимая на кнопку, вы принимаете&nbsp;
									<a href='https://yandex.ru/'>
										условия
										<br />
										передачи информации и пользовательское
										<br />
										соглашение
									</a>
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
						<div className='priceRow autoAmount'>
							<h2></h2>
							<span>1 Авто</span>
							<span>5 Авто</span>
							<span>10 Авто</span>
						</div>
						<div className='priceRow rent'>
							<h2>Аренда</h2>
							<div className='priceBlock'>
								<span>36 000 ₽/мес</span>
								<span>180 000 ₽/мес</span>
								<span>360 000 ₽/мес</span>
							</div>
						</div>
						<div className='priceRow buy'>
							<h2>Выкуп</h2>
							<div className='priceBlock'>
								<span>36 000 ₽/мес</span>
								<span>180 000 ₽/мес</span>
								<span>360 000 ₽/мес</span>
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
						<div className='stage sixth'>
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
						<div className='stage fifth'>
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
						<div className='stage fourth'>
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
					<div className='form'>
						<input placeholder='Имя' />
						<input placeholder='+7 (999) 999-99-99' />
						<button>Начать зарабатывать с такси</button>
					</div>
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
									<img src={arrow} alt='arrow' style={firstAccordonImgStyle} />
								</button>
								<div className={'panel'} style={firstAccordionPanelStyle}>
									<p>
										Почему мы привлекаем инвесторов, а не работаем только со
										своим парком?
									</p>
								</div>
							</div>
							<div className='accordion second'>
								<button
									className='accordionBtn'
									onClick={onSecondAccordionClick}
								>
									Вопросы по договору
									<img src={arrow} alt='arrow' style={secondAccordonImgStyle} />
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
									<img src={arrow} alt='arrow' style={thirdAccordonImgStyle} />
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
									<img src={arrow} alt='arrow' style={fourthAccordonImgStyle} />
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
			<div className='malevich'></div>
			<div className='footerWrapper' id='footer'>
				<div className='container'>
					<div className='footerUp'>
						<div className='phone'>
							<span>По всем вопросам:</span>
							<h1>+7 585 585 58 58</h1>
							<h2>Отвечаем в WhatsApp</h2>
						</div>
						<div className='address'>
							<span>Адрес:</span>
							<p>
								Москва
								<br />
								Пушкина-Колотушкина, 58
							</p>
						</div>
						<div className='timetable'>
							<span>График работы:</span>
							<h1>58:58 - 58:58</h1>
						</div>
					</div>
				</div>
			</div>
			<div className='container'>
				<div className='footerDown'>
					<div className='logo'>
						<span>HypeTaxi</span>
						<span className='r'>®</span>
					</div>
					<a>Политика конфеденциальности</a>
					<a>Пользовательское соглашение</a>
				</div>
			</div>
		</div>
	);
}

export default App;
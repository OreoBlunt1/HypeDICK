export const firstAccordonImgStyle = {
	transform: isFirstAccordion ? 'rotate(180deg)' : null,
	transition: 'ease-in-out .3s',
};
export const firstAccordionPanelStyle = {
	display: isFirstAccordion ? 'flex' : 'none',
};

export const secondAccordonImgStyle = {
	transform: isSecondAccordion ? 'rotate(180deg)' : null,
	transition: 'ease-in-out .3s',
};
export const secondAccordionPanelStyle = {
	display: isSecondAccordion ? 'flex' : 'none',
};

export const thirdAccordonImgStyle = {
	transform: isThirdAccordion ? 'rotate(180deg)' : null,
	transition: 'ease-in-out .3s',
};
export const thirdAccordionPanelStyle = {
	display: isThirdAccordion ? 'flex' : 'none',
};

export const fourthAccordonImgStyle = {
	transform: isFourthAccordion ? 'rotate(180deg)' : null,
	transition: 'ease-in-out .3s',
};
export const fourthAccordionPanelStyle = {
	display: isFourthAccordion ? 'flex' : 'none',
};

export function onFirstAccordionClick() {
	setIsFirstAccordion((prev) => !prev);
}

export function onSecondAccordionClick() {
	setIsSecondAccordion((prev) => !prev);
}

export function onThirdAccordionClick() {
	setIsThirdAccordion((prev) => !prev);
}

export function onFourthAccordionClick() {
	setIsFourthAccordion((prev) => !prev);
}

import { trigger, state, animate, style, transition, keyframes } from '@angular/core';

const HOST_ELEMENT_STYLE = {
	position: 'fixed',
	'overflow-y': 'auto',
	width: 'calc(100% - 3.7812rem)',
	height: 'calc(100% - 69px)'
};

export function routerTransition() {
	return fadeInOut();
}

export function slideToLeft() {
	return trigger('slideToLeft', [
		// state('*', style(HOST_ELEMENT_STYLE)),
		transition(':enter', [
			style({ transform: 'translateX(100%)' }),
			animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
		]),
		transition(':leave', [
			style({ transform: 'translateX(0%)' }),
			animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
		])
	]);
}

export function fadeInOut() {
	return trigger('fadeInOut', [
		// state('*', style(HOST_ELEMENT_STYLE)),
		transition(':enter', [
			style({ opacity: 0 }),
			animate('0.6s ease-in-out', style({ opacity: 1 }))
		]),
		transition(':leave', [
			style({ opacity: 1 }),
			animate('0.4s ease-in-out', style({ opacity: 0 }))
		])
	]);
}

export function slideInUp() {
	return trigger('slideInUp', [
		transition(':enter', [
			style({ opacity: 0 }),
			animate('0.4s ease-in-out', keyframes([
				style({
					transform: 'translate3d(0, 20%, 0)',
					visibility: 'visible',
					offset: 0
				}),
				style({
					transform: 'translate3d(0, 0, 0)',
					opacity: 1,
					offset: 1
				}),
			]))
		])
	]);
}

export function zoomInUp() {
	return trigger('zoomInUp', [
		transition(':enter', [
			style({ opacity: 0 }),
			animate('0.9s', keyframes([
				style({
					transform: 'scale3d(.1, .1, .1) translate3d(0, 1000px, 0)',
					'animation-timing-function': 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
					offset: 0
				}),
				style({
					transform: 'scale3d(.475, .475, .475) translate3d(0, -60px, 0)',
					'animation-timing-function': 'cubic-bezier(0.175, 0.885, 0.320, 1)',
					opacity: 1,
					offset: 0.6
				}),
			]))
		])
	]);
}

export function zoomInDown() {
	return trigger('zoomInDown', [
		transition(':enter', [
			style({ opacity: 0 }),
			animate('0.9s', keyframes([
				style({
					transform: 'scale3d(.1, .1, .1) translate3d(0, -1000px, 0)',
					'animation-timing-function': 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
					offset: 0
				}),
				style({
					transform: 'scale3d(.475, .475, .475) translate3d(0, 60px, 0)',
					'animation-timing-function': 'cubic-bezier(0.175, 0.885, 0.320, 1)',
					opacity: 1,
					offset: 0.6
				}),
			]))
		])
	]);
}
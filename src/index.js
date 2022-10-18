import showPass from "./js/show-pass";
import fancybox from "./js/fancybox";
import rangeSlider from './js/range-slider';
import theme from './js/theme';
import inputmask from "./js/inputmask";
import scrollTo from "./js/scrollTo";
import started from "./js/started";
import lightening from "./js/lightening";
import tab from 'npm-kit-tab';
import toggle from 'npm-kit-toggle';
import ripple from 'npm-kit-ripple';
// import Swiper, { Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs, EffectFade, Lazy } from 'swiper';
import LocomotiveScroll from 'locomotive-scroll';



import './scss/index.scss';

// Swiper.use([Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs, EffectFade, Lazy]);
// Swiper.defaults.touchStartPreventDefault = false
// window.Swiper = Swiper
window.ripple = ripple
window.addEventListener('DOMContentLoaded', () => loadHandler())

let scroll;

window.addEventListener('load', () => {
	document.body.classList.add('loaded')

	scroll = new LocomotiveScroll({
		el: document.querySelector('[data-scroll-container]'),
		smooth: true,
		lerp: 0.05,
		touchMultiplier: 4,
		tablet: {
			smooth: true,
			breakpoint: 749.98
		}
		// offset: [-1200, -1200]
	});

	scroll.on('scroll', scrollHandler)
})


function loadHandler() {
	fancybox.init()
	showPass.init()
	scrollTo.init()
	rangeSlider.init()
	tab.init()
	toggle.init()
	ripple.init()
	theme.init()
	inputmask.init(document)
	lightening.init()
	started.init()

	ripple.attach('.btn')
	ripple.attach('.waved')
	ripple.deAttach('.btn--link')

	document.addEventListener('click', clickHandler)




	window.addEventListener('toggleopen', toggleopenHaandler)
	window.addEventListener('toggleclose', togglecloseHaandler)
}

function scrollHandler(event) {
	if (event.scroll.y <= 40) {
		document.body.classList.add('scroll-top')
	} else {
		document.body.classList.remove('scroll-top')
	}
}

function toggleopenHaandler(event) {
	if (event.detail.target.classList.contains('-menu-')) {
		document.body.classList.add('menu-open')
	}
}

function togglecloseHaandler(event) {
	if (event.detail.target.classList.contains('-menu-')) {
		document.body.classList.remove('menu-open')
	}
}

// functions for emulate brauser actions in plug page
function addFavorite() {
	const title = document.title;
	const url = document.location;
	try {
		window.external.AddFavorite(url, title);
	} catch (e) {
		try {
			window.sidebar.addPanel(title, url, "");
		} catch (e) {
			if (typeof (opera) == "object") {
				window.rel = "sidebar";
				window.title = title;
				window.url = url;
				return true;
			} else {
				alert('Нажмите Ctrl-D чтобы добавить страницу в закладки');
			}
		}
	}
	return false;
}

function share() {
	const shareData = {
		title: document.title,
		text: 'Разработка и реклама сайтов',
		url: window.location
	}

	navigator.share(shareData);
}

function openNewTab() {
	window.open(window.location)
}

function reload() {
	window.location.reload()
}

function clickHandler(event) {
	if (event.target.closest('[data-add-favorite]')) {
		addFavorite()
	}
	if (event.target.closest('[data-scroll-to]')) {
		const id = event.target.closest('[data-scroll-to]').getAttribute('data-scroll-to')
		scroll.scrollTo(id)
	}

	if (event.target.closest('[data-share]')) {
		share()
	}

	if (event.target.closest('[data-reload]')) {
		reload()
	}

	if (event.target.closest('[data-open-new-tab]')) {
		openNewTab()
	}
}


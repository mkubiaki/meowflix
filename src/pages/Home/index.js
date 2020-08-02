import React from 'react';
import Menu from '../../components/Menu';
//import dadosIniciais from 'http://localhost:3001/categorias';
import dadosIniciais from '../../data/dados_iniciais.json';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import FooterBase from '../../components/Footer';

function Home() {
	return (
		<div style={{ background: '#141414' }}>
			<Menu />

			<BannerMain
				videoTitle={dadosIniciais.categorias[0].videos[0].titulo}
				url={dadosIniciais.categorias[0].videos[0].url}
				videoDescription={'O que é Front-End? Trabalhando na área'}
			/>

			<Carousel
				ignoreFirstVideo
				category={dadosIniciais.categorias[0]}
			/>

			<Carousel
				category={dadosIniciais.categorias[1]}
			/>

			<FooterBase />
		</div>
	);
}

export default Home;

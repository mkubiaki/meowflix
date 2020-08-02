import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault';
import Button from '../../../components/Button';
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField';

function CadastroCategoria(){
	const valoresIniciais = {
		nome: '',
		descricao: '',
		cor: '',
	};
	const [categorias, setCategorias] = useState([]);
	const [values, setValues] = useState(valoresIniciais);

	function setValue(chave, valor) {
		setValues({
			...values,
			[chave]: valor,
		});
	}

	function handleChange(infosDoEvento){
		setValue(
			infosDoEvento.target.getAttribute('name'),
			infosDoEvento.target.value
		);
	}

	useEffect(() => {
		console.log('alo');
		const URL = 'http://localhost:3001/categorias';
		fetch(URL)
		.then(async (resposta) => {
			const objeto = await resposta.json();
			setCategorias([
				...objeto,
			]);
		});
	}, []);

	return (
		<PageDefault>
			<h1>Cadastro de Categoria: {values.nome}</h1>

			<form onSubmit={
				function handleSubmit(infosDoEvento){
					infosDoEvento.preventDefault();
					setCategorias([
						...categorias,
						values
					]);
        
					setValues(valoresIniciais);
				}
			}>
				<FormField
					type='text'
					label='Nome da categoria'
					name='nome'
					value={values.nome}
					onChange={handleChange}
				/>
				<FormField
					type='textarea'
					label='Descrição da categoria'
					name='descricao'
					value={values.descricao}
					onChange={handleChange}
				/>
				<FormField
					type='color'
					label='Cor'
					name='cor'
					value={values.cor}
					onChange={handleChange}
				/>

				<Button>
          Cadastrar
				</Button>
			</form>

			{categorias.length === 0 && (
				<div>
					Loading...
				</div>
			)}

			<ul>
				{categorias.map((categoria, indice) => {
					return (
						<li key={`${categoria}${indice}`}>
							{categoria.nome} - {categoria.descricao} - {categoria.cor}
						</li>
					);
				})}
			</ul>
			<Link to="/cadastro/video">
          Cadastrar Vídeo
			</Link>
		</PageDefault>
	);
}

export default CadastroCategoria;
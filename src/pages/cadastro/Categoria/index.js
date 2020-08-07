import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault';
import Button from '../../../components/Button';
import { useHistory, Link } from 'react-router-dom';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';
import Table from '../../../components/Table';

function CadastroCategoria(){

	function validate(values){
		const errors = {
			result: true,
		};

		if(values.titulo.length === 0) {
			errors.titulo = 'Insira um título para a categoria';
			errors.result = false;
		}

		if(values.descricao.length === 0) {
			errors.descricao = 'Insira a descrição da categoria';
			errors.result = false;
		}

		if(values.cor.length === 0) {
			errors.cor = 'Selecione uma cor para a categoria';
			errors.result = false;
		}

		return errors;
	}

	
	const valoresIniciais = {
		titulo: '',
		descricao: '',
		cor: '',
	};
	const history = useHistory();
	const { handleChange, values } = useForm(valoresIniciais);
	
	const [categorias, setCategorias] = useState([]);
	const errors = {};

	useEffect(() => {
		categoriasRepository
			.getAll()
			.then((categoriasDoServidor) => {
				setCategorias(categoriasDoServidor);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	return (
		<PageDefault>
			<Link to="/cadastro/video">
          		Cadastrar Vídeo
			</Link>
			<h1>Cadastro de Categoria: {values.titulo}</h1>

			<form onSubmit={(event) => {
				event.preventDefault();

				const errors = validate(values);
				console.log(errors);
				if(errors.result === true) {
					categoriasRepository.create({
						titulo: values.titulo,
						descricao: values.descricao,
						cor: values.cor,
					})
					.then(() => {
						alert('Categoria cadastrada com sucesso!');
						history.push('/');
					});
				} else {
					alert('Um ou mais itens não foram preenchidos!');
				}
			}}
			>
				<FormField
					type='text'
					label='Nome da categoria'
					name='titulo'
					value={values.titulo}
					onChange={handleChange}
					isRequired='true'
					errorText={errors.titulo}
				/>
				<FormField
					type='textarea'
					label='Descrição da categoria'
					name='descricao'
					value={values.descricao}
					onChange={handleChange}
					isRequired='false'
					errorText={errors.descricao}
				/>
				<FormField
					type='color'
					label='Cor'
					name='cor'
					value={values.cor}
					onChange={handleChange}
					isRequired='false'
					errorText={errors.cor}
				/>

				<Button type='submit'>
          			Cadastrar
				</Button>
			</form>

			{categorias.length === 0 && (
				<div>
					Loading...
				</div>
			)}

			<Table>
				<thead>
					<td>Título</td>
					<td>Descrição</td>
					<td>Cor</td>
				</thead>
				<tbody>
					{categorias.map((categoria, indice) => {
						return (
							<tr key={`${categoria}${indice}`}>
								<td>{categoria.titulo}</td>
								<td>{categoria.descricao}</td>
								<td>{categoria.cor}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			{/* 		
			<ul>
				{categorias.map((categoria, indice) => {
					return (
						<li key={`${categoria}${indice}`}>
							{categoria.titulo} - {categoria.descricao} - {categoria.cor}
						</li>
					);
				})}
			</ul>
			*/}

		</PageDefault>
	);
}

export default CadastroCategoria;
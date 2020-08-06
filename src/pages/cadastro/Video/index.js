import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo(){

	function validate(values){
		const errors = {
			result: true,
		};

		if(values.titulo.length === 0) {
			errors.titulo = 'Insira um título para o vídeo (obrigatório)';
			errors.result = false;
		}

		if(values.url.length === 0) {
			errors.url = 'Insira a URL do vídeo (obrigatório)';
			errors.result = false;
		}

		if(values.categoria.length === 0) {
			errors.categoria = 'Selecione uma categoria para o vídeo (obrigatório)';
			errors.result = false;
		}
		return errors;
	}
	
	const history = useHistory();
	const [categorias, setCategorias] = useState([]);
	const categoryTitles = categorias.map(({titulo}) => titulo);
	const { handleChange, values }  = useForm({
		titulo: 'Título padrão',
		url: 'youto.ba/teste',
		categoria: 'Gatos'
	});

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
			<Link to="/cadastro/categoria">
            Cadastrar Categoria
			</Link>
			<h1>Cadastro de Vídeo</h1>

			<form onSubmit={(event) => {
        		event.preventDefault();

				const categoriaEscolhida = categorias.find((categoria) => {
					return categoria.titulo === values.categoria;
				});
		
				const errors = validate(values);
				if(errors.result === true){
					videosRepository
					.create({
						titulo: values.titulo,
						url: values.url,
						categoriaId: categoriaEscolhida.id,
		        	})
					.then(() => {
						alert('Vídeo cadastrado com sucesso!');
						history.push('/');
					});
				} else {
					alert('Há um ou mais campos não preenchidos!');
				}
			}}
			>
			
				<FormField
					label='Título do Vídeo'
					name='titulo'
					value={values.titulo}
					onChange={handleChange}
					isRequired='true'
				/>

				<FormField
					label='URL do Vídeo'
					name='url'
					value={values.url}
					onChange={handleChange}
					isRequired='true'
				/>

				<FormField
					label='Categoria'
					name='categoria'
					value={values.categoria}
					onChange={handleChange}
					suggestions={categoryTitles}
					isRequired='true'
				/>

				<Button type='submit'>
            		Cadastrar
				</Button>
			</form>
		</PageDefault>
	);
}

export default CadastroVideo;
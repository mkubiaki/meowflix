import React from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link } from 'react-router-dom';

function CadastroCategoria(){
    return (
      <PageDefault>
        <h1>Cadastro de Categoria</h1>
        <Link to="/cadastro/video">
            Cadastrar Vídeo
        </Link>
      </PageDefault>
    )
}

export default CadastroCategoria;
import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCards';
import * as api from './services/api';

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      filtrar: '',
      produtosFiltrados: [],
      controlador: '', // Controlador criado para que possamos saber se foi feito o click em outra categoria ou nao.
    };

    this.getInput = this.getInput.bind(this);
    this.filterElements = this.filterElements.bind(this);
  }

  componentDidUpdate() { // esse componentDidUpdate é para que toda vez que for feito o click em alguma categoria seja rodado oupdate e assim possamos rodar a função de filterElements, caso o controlador (que garante que foi feito alteração) seja diferente da categoria nova selecionada (selectedCategory)
    const { selectedCategory } = this.props;
    const { controlador } = this.state;
    if (controlador !== selectedCategory) {
      this.filterElements();
    }
  }

  getInput({ target: { value } }) {
    this.setState({
      filtrar: value,
    });
  }

  async filterElements() {
    const { filtrar } = this.state;
    const { selectedCategory } = this.props;
    const list = await api.getProductsFromCategoryAndQuery(selectedCategory, filtrar);
    this.setState({
      produtosFiltrados: list.results,
      controlador: selectedCategory,
    });
  }

  render() {
    const { produtosFiltrados } = this.state;
    return (
      <div>
        <div className="product-list">
          {produtosFiltrados.map((product) => (
            <ProductCard
              produto={ product }
              key={ product.id }
              addProduct={ this.addProductToCart }
            />))}
        </div>
        <h4
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h4>
        <input
          data-testid="query-input"
          type="text"
          placeholder="Digite o produto aqui..."
          name="filtrar"
          onChange={ this.getInput }

        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.filterElements }
        >
          Filtrar
        </button>
      </div>);
  }
}

ProductList.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};

export default ProductList;

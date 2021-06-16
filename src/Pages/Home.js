import React from 'react';
import * as api from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      productCategories: [],
    };
    this.categoriesNames = this.categoriesNames.bind(this);
  }

  componentDidMount() {
    this.categoriesNames();
  }

  async categoriesNames() {
    const categories = await api.getCategories();
    this.setState({
      productCategories: categories,
    });
  }

  render() {
    const { productCategories } = this.state;
    return (
      <fragment>
        <h3
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
        <div>
          { productCategories.map((category) => (
            <div
              data-testid="category"
              key={ category.id }
            >
              { category.name }
            </div>))}
        </div>
      </fragment>
    );
  }
}

export default Home;
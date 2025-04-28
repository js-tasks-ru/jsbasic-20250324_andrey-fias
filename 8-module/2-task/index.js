import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);
    this.updateGrid();
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.updateGrid();
  }

  updateGrid() {
    const gridInner = this.elem.querySelector('.products-grid__inner');
    gridInner.innerHTML = '';
    const filteredProducts = this.products.filter(product => {
      if (this.filters.noNuts && product.nuts === true) {
        return false;
      }
      if (this.filters.vegeterianOnly && product.vegeterian !== true) {
        return false;
      }
      if (typeof this.filters.maxSpiciness === 'number' && (product.spiciness > this.filters.maxSpiciness || product.spiciness === undefined)) {
        return false;
      }
      if (this.filters.category && this.filters.category !== '' && product.category !== this.filters.category) {
        return false;
      }

      return true;
    });
    filteredProducts.forEach(product => {
      const card = new ProductCard(product);
      gridInner.append(card.elem);
    });
  }
}

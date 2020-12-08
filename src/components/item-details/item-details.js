import React, { Component } from 'react';

import ErrorButton from '../error-button/error-button';

import './item-details.css';


const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  )
};
//именованный экспорт
export { Record };

//дефолтный экспорт
export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null
  };

  componentDidMount() {
    this.updateItem();
  }

  //   /* 
  //   После получения itemId в props, чтобы обновить данные, с
  //   которыми связан этот props необх-мо исп-ть componentDidUpdate().
  //   Помогает отследить момент передачи ID для получения данных по нему
  //   */

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item)
        });
      });
  }

  //Случай рендера передавая options
  // renderItems(item, options) {
  //   if (options) {
  //     return options.map(option => {
  //       return (
  //         <li className="list-group-item"
  //           key={option.field}>
  //           <span className="term">{option.label}&nbsp;:</span>
  //           <span>{item[option.field]}</span>
  //         </li>
  //       )
  //     });
  //   }
  // }

  render() {

    const { item, image } = this.state;
    if (!item) {
      return <span>Select a item from a list</span>;
    }

    const { name } = item;

    return (
      <div className="item-details card">
        <img className="item-image"
          src={image}
          alt="item" />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {/* Клонируем React - элементы из коллекции, которую передали
            через this.props.children и добавляем каждому из них
            свойство item. */}
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}

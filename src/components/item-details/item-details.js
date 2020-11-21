import React, { Component } from 'react';

import ErrorButton from '../error-button/error-button';

import './item-details.css';


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

  renderItems(item, options) {
    if (options) {
      return options.map(option => {
        return (
          <li className="list-group-item"
            key={option.field}>
            <span className="term">{option.label}&nbsp;:</span>
            <span>{item[option.field]}</span>
          </li>
        )
      });
    }
  }

  render() {

    const { item, image } = this.state;
    if (!item) {
      return <span>Select a item from a list</span>;
    }

    const { name } = item;
    let { fields } = this.props;
    console.log(item);
    return (
      <div className="item-details card">
        <img className="item-image"
          src={image}
          alt="item" />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {/* <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li> */}

            {this.renderItems(item, fields)}

          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}

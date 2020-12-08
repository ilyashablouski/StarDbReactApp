import React from 'react';

import {withData} from '../hoc-helper';
import SwapiService from '../../services/swapi-service';
import './item-list.css';

const ItemList = (props) => {
    const { data, onItemSelected, children: renderLabel} = props;

    const items = data.map((item) => {
      const { id } = item;
      //Вызов через props ф-ции и передача в неё объекта с данными
      const label = renderLabel(item);
      return (
        <li
          className="list-group-item"
          key={id}
          onClick={() => onItemSelected(id)}
        >
          {label}
        </li>
      );
    });

    return (<ul className="item-list list-group">{items}</ul>);
};

// Вынесли state, всю логику работы с сетью и того, какой
// компонент необходимо сейчас отображать в отдельный компонент ф-цию
// сделав его НЕЗАВИСИМЫМ


const {getAllPeople} = new SwapiService();

// Первый вызов возвращает класс, второй экспортирует
export default withData(ItemList, getAllPeople);

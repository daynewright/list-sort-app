import styled from 'styled-components';
import { arrayOf, shape, string } from 'prop-types';

const OrderedList = ({ list }) => {

  return (
    <ul>
      {list.map(item => <li key={item.key} data-testid="item">{item.text}</li>)}
    </ul>
  );
};

export default OrderedList;

OrderedList.propTypes = {
  items: arrayOf(
    shape({
      text: string.isRequired,
      key: string.isRequired
    }).isRequired
  )
};

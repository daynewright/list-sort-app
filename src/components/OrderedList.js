import styled from 'styled-components';
import { arrayOf, shape, string } from 'prop-types';

const UnorderedList = styled.ul`
  padding-left: 0;

  li {
    list-style: none;
    position: relative;
    margin-bottom: 5px;
    padding: 3px 0 2px 0px;
    font-weight: 700;
    width: 100%;
  }
`;

const OrderedList = ({ list }) => {
  return (
    <UnorderedList>
      {list.map(item => 
        <li key={item.key} data-testid="item">
          {item.text}
        </li>
      )}
    </UnorderedList>
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

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import Emoji from './Emoji';

import { sortList } from '../utils/sortHelpers';
import { sort } from '../utils/constants';

const Input = styled.input`
  margin: 10px;
  max-width: 100%;
  flex: 1 0 auto;
  outline: 0;
  padding: .7em 1em;
  border: 1px solid rgba(34,36,38,.15);
  border-radius: .3rem;

  :focus {
    border-color: #85b7d9;
    background: #fff;
    color: rgba(0,0,0,.8);
  }
`;

const Button = styled.button`
  cursor: pointer;
  min-height: 1em;
  outline: 0;
  border: none;
  margin: 0 .25em 0 0;
  padding: .7em 1.5em .7em;
  line-height: 1em;
  text-decoration: none;
  border-radius: .28571429rem;

  :hover {
    background-color: #cacbcd;
  }
`;

const SortButton = ({ sortDirectionOnClick, sortDirection }) => {
  return (
    <Button onClick={sortDirectionOnClick}>
      {sortDirection === sort.ASCENDING 
        ? <Emoji symbol="👇" label="point-down" />
        : <Emoji symbol="👆" label="point-up" />
      }
    </Button>
  );
};

const ClearButton = ({ clearAll }) => {
  return (
    <Button onClick={clearAll}>
      Clear
    </Button>
  )
}

const ListForm = ({ list, setList }) => {
  const [value, setValue] = useState('');
  const [sortDirection, setSortDirection] = useState(sort.ASCENDING);

  useEffect(() => {
    const sortedList = sortList(list, sortDirection);
    setList([...sortedList]);
  }, [sortDirection]);

  const clearAll = () => {
    setList([]);
    setValue('');
    setSortDirection(sort.ASCENDING);
  }

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      const sortedList = sortList([...list, { text: e.target.value, key: uuidv4() }], sortDirection);
      setList(sortedList);
      setValue('');
    }
  };

  const handleChange = e => {
    setValue(e.target.value);
  }

  const sortDirectionOnClick = () => {
    setSortDirection(sortDirection === sort.ASCENDING ? sort.DESCENDING : sort.ASCENDING);  
  };

  return (
    <div>
      <Input
        type="text"
        aria-label="list-item-input"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={value}
      />
      <SortButton aria-label='sort' sortDirectionOnClick={sortDirectionOnClick} sortDirection={sortDirection} />
      <ClearButton aria-label='clear' clearAll={clearAll} />
      <hr />
    </div>
  );
};

export default ListForm;

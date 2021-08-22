import { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const sort = Object.freeze({
  ASCENDING: 'ASCENDING',
  DESCENDING: 'DESCENDING'
});


const SortButton = ({ sortList, sortDirection }) => {
  return (
    <button onClick={sortList}>
      {sortDirection === sort.ASCENDING ? "👆" : "👇" }
    </button>
  );
};

const ClearButton = ({ clearAll }) => {
  return (
    <button onClick={clearAll}>
      Clear
    </button>
  )
}

const ListForm = ({ list, setList }) => {
  const [value, setValue] = useState('');
  const [sortDirection, setSortDirection] = useState(sort.ASCENDING);

  const clearAll = () => {
    setList([]);
    setValue('');
  }

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      setList([...list, { text: e.target.value, key: uuidv4() }]);
      setValue('');
    }
  };

  const handleChange = e => {
    setValue(e.target.value);
  }

  const sortList = () => {
    const sortedList = list.sort((a, b) => {
      if (sortDirection === sort.ASCENDING) return a.text.localeCompare(b.text);
      if (sortDirection === sort.DESCENDING) return b.text.localeCompare(a.text);
      return 0;
    });

    setList([...sortedList]);
    setSortDirection(sortDirection === sort.ASCENDING ? sort.DESCENDING : sort.ASCENDING)
  };

  return (
    <div>
      <input
        type="text"
        aria-label="list-item-input"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={value}
      />
      <SortButton aria-label='sort' sortList={sortList} sortDirection={sortDirection} />
      <ClearButton aria-label='clear' clearAll={clearAll} />
    </div>
  );
};

export default ListForm;

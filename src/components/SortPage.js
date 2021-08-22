import { useState } from 'react';
import styled from 'styled-components';

import OrderedList from './OrderedList';
import ListForm from './ListForm';

const Wrapper = styled.main`
    padding: 0;
    margin: 50px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;


const Main = () => {
  const [list, setList] = useState([]);
  
  return (
    <Wrapper>
      <h1>Sorted List</h1>
      <div>
        <ListForm list={list} setList={setList} />
      </div>
      <div>
        <OrderedList list={list} />
      </div>
    </Wrapper>
  )
};

export default Main;

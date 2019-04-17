import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 300px;
    display: flex;
    flex-direction: column;

    input {
      height: 48px;
      padding: 0 20px;
      margin-top: 30px;
  
      border: 1px solid #ddd;
      border-radius: 3px;
  
      font-size: 16px;
    }

    button {
      height: 48px;
      padding: 0 20px;
      margin-top: 10px;
  
      background-color: #7159c1;
  
      border: none;
      border-radius: 3px;
  
      font-size: 16px;
      font-weight: bold;
      color: #fff;
  
      cursor: pointer;
  
      transition: opacity .4s;

      &:hover {
        opacity: .8;
      }
    }
  }
`;

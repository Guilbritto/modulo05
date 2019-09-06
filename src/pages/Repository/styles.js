import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
  a {
    text-decoration: none;
    color: #7159c1;
    font-size: 16px;
  }
`;

export const IssuesList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;
  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  & + li {
    margin-top: 10px;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 3px;
        font-size: 12px;
        font-weight: 6000;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;
export const Filter = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 12px;
  input {
    margin-left: 3px;
  }
  span {
    color: #7159c1;
    font-size: 14px;
    font-weight: bold;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-item: center;
  margin: 10px 5px;

  button {
    margin: 0px 5px;
    border-radius: 4px;
    width: 70px;
    height: 35px;
    background: #7159c1;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    border-style: none


    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;

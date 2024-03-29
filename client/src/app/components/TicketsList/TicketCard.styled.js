import styled from 'styled-components';

const StyledTicketCard = styled.div`
  border-radius: 5px;
  border: 1px solid #eceff1;
  color: #4a4a4a;
  background-color: #fff;
  box-shadow: 0 4px 12px 0 rgba(91, 137, 164, 0.2);
  margin-bottom: 15px;
  .time {
    color: #4a4a4a;
    font-size: 32px;
  }
  .airlines-logo {
    height: 80px;
    img {
      max-width: 100%;
      height: 80px;
    }
  }
`;
export default StyledTicketCard;

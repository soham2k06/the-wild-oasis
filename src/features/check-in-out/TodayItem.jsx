import styled from "styled-components";

import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import CheckoutButton from "./CheckoutButton";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const {
    id,
    status,
    guests: { nationality, countryFlag, fullName },
    numNights = {},
  } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" ? (
        <Tag type="green">arriving</Tag>
      ) : (
        <Tag type="blue">departing</Tag>
      )}

      <Flag src={countryFlag} alt={`${nationality} flag`} />
      <Guest>{fullName}</Guest>
      <div>{numNights} nights</div>
      {status === "unconfirmed" ? (
        <Button size="small" as={Link} to={`/checkin/${id}`}>
          Chech in
        </Button>
      ) : (
        <CheckoutButton bookingId={id} />
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;

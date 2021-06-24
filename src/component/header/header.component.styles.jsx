import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 60px;
  padding: 12px 0;
`;

export const OptionsContainer = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
  display: flex;
  justify-content: flex-end;
  background: #005dac !important;
  color: #fff !important;
  border: 1px solid #005dac;
  padding: 7px 6px;
  margin: 0 5px;
  line-height: 16px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  text-decoration: none;
`;

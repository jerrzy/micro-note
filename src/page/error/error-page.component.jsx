import { ErrorPageContainer } from "./error-page.component.styles";

const ErrorPage = ({ error }) => (
  <ErrorPageContainer>{error}</ErrorPageContainer>
);

export default ErrorPage;

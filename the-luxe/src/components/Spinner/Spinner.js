import { Container, Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
      fluid
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
};

export default Loader;

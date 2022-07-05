import './Loading.css';
import { Spinner } from 'react-bootstrap';

function Loading(props) {
  if (!props.show)
    return null;

  return (
    <div className="Loading">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loading;
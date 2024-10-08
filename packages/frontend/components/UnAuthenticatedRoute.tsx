import { cloneElement, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../src/lib/contextLib';

interface Props {
  children: ReactElement;
}
export default function UnauthenticatedRoute(props: Props): ReactElement {
  function querystring(name: string, url = window.location.href) {
    const parsedName = name.replace(/[[]]/g, '\\$&');
    const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`, 'i');

    const results = regex.exec(url);
    if (!results || !results[2]) {
      return false;
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  const { isAuthenticated } = useAppContext();
  const redirect = querystring('redirect');
  const { children } = props;
  if (isAuthenticated) {
    return <Navigate to={redirect || '/'} />;
  }
  return cloneElement(children, props);
}

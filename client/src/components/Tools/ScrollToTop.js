import React, { useEffect, Fragment } from 'react';
import { useLocation, withRouter } from 'react-router-dom';

function ScrollToTop({ history, children }) {
    const location = useLocation();
    const messagePage = !location.pathname.includes('/message');
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, [history, messagePage]);

  return <Fragment>{children}</Fragment>;
}

export default withRouter(ScrollToTop);
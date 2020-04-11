import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) =>
        window.sessionStorage.jwt ? (
          <Component {...componentProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: componentProps.location },
            }}
          />
        )
      }
    />
  );
}

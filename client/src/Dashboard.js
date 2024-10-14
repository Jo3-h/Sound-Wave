import React from "react";
import useAuth from "./useAuth";

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  return (
    <div>
      Dashboard
      <p>
        - code - <br />
        {code}
      </p>
      <p>
        - Access Token - <br />
        {accessToken}
      </p>
    </div>
  );
}

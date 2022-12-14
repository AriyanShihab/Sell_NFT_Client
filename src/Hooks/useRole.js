import { useEffect, useState } from "react";

const useRole = (email) => {
  const [userRole, setUserRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(` https://sel-nft.vercel.app/userRole/?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          setUserRole(data.role);
          setRoleLoading(false);
        });
    }
    // return () => setRoleLoading(false);
  }, [email]);

  return [userRole, roleLoading];
};

export default useRole;

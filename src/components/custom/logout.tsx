"use client";

import { logout } from "@/actions/logout";
import { Button } from "../ui/button";

const Logout = () => {
  return (
    <Button size="sm" onClick={logout}>
      Logout
    </Button>
  );
};

export default Logout;

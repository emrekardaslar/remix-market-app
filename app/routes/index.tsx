import { Outlet } from "@remix-run/react";
import Products from "./products";

export default function MainIndex() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Products/>
      <Outlet/> 
    </div>
  );
}

import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { TopNav } from "./topNav";
import { Footer } from "./footer";
import ProtectedRoute from "../../auth/protectedRoute";

const DefaultLayout = () => {
  const isLocalSemester = useLocation().pathname === "/localSemester";

  return (
    <ProtectedRoute>
      <div className="w-screen h-auto">
        <TopNav isLocalSemester={isLocalSemester} />
        <div
          className={
            isLocalSemester
              ? "pb-16 min-h-[calc(100vh-9rem)]"
              : "pt-16 pb-16 min-h-[calc(100vh-9rem)]"
          }
        >
          <Outlet />
          <ScrollRestoration />
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default DefaultLayout;

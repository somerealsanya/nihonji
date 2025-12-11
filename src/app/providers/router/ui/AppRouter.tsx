import { Routes, Route } from "react-router-dom"; // <- react-router-dom
import { routeConfig } from "../../../../shared/config/routeConfig/routeConfig";
import { Suspense } from "react";
import { Loader } from "../../../../shared/ui/Loader";
import ScrollToTop from "../../../../shared/ui/ScrollToTop/ScrollToTop";

const AppRouter = () => (
    <>
        <ScrollToTop />
        <Suspense fallback={<Loader />}>
            <Routes>
                {Object.values(routeConfig).map(({ element, path }) => (
                    <Route key={path} path={path} element={element} />
                ))}
            </Routes>
        </Suspense>
    </>
);

export default AppRouter;

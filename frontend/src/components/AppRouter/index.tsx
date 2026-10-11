import { Route, Routes } from 'react-router-dom';

import { ROUTES } from './config.tsx';

const AppRouter = () => {
    return (
        <Routes>
            {ROUTES.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Routes>
    );
};

export default AppRouter;

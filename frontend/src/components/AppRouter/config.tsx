import HomePage from '../../pages/HomePage';
import InterviewPage from '../../pages/InterviewPage';
import InterviewResultPage from '../../pages/InterviewResultPage';
import NotFoundPage from '../../pages/NotFoundPage';
import type { AppRoute } from './types.ts';

export const ROUTES: AppRoute[] = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/interview/:interviewId',
        element: <InterviewPage />,
    },
    {
        path: '/interview/:interviewId/result',
        element: <InterviewResultPage />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
];

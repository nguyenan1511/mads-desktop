import '@renderer/languages/index';
import 'rsuite/dist/rsuite.css';

import MenuLayout from '@renderer/components/MenuLayout';
import { Paths } from '@renderer/constants/paths';
import { STORAGE } from '@renderer/constants/storage';
import ProviderNotification from '@renderer/context/ProviderNotification';
import { initLanguage } from '@renderer/languages';
import Archive from '@renderer/pages/Archive';
import Course from '@renderer/pages/Course';
import CourseQuizz from '@renderer/pages/Course/CourseQuizz';
import CourseTypeImage from '@renderer/pages/Course/CourseTypeImage';
import ForgotPassword from '@renderer/pages/ForgotPassword';
import Home from '@renderer/pages/Home';
import Leaderboard from '@renderer/pages/Leaderboard';
import Login from '@renderer/pages/Login';
import Mission from '@renderer/pages/Mission';
import MyScore from '@renderer/pages/MyScore';
import Notification from '@renderer/pages/Notification';
import Profile from '@renderer/pages/Profile';
import Quizz from '@renderer/pages/Quizz';
import Register from '@renderer/pages/Register';
import Role from '@renderer/pages/Role';
import { handleGetProfile } from '@renderer/store/auth/AuthSlice';
import { courseActions } from '@renderer/store/course/CourseSlice';
import { routerActions } from '@renderer/store/routes/RouterSlice';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

dayjs.extend(relativeTime);
dayjs.extend(duration);

function App() {
    const { path } = useSelector((state: any) => state.router);
    const { user } = useSelector((state: any) => state.auth);
    const { typePage } = useSelector((state: any) => state.archive);
    const dispatch = useDispatch();

    useEffect(() => {
        initLanguage();
        const _path = localStorage.getItem('path');
        const token = localStorage.getItem(STORAGE.token);

        dispatch(courseActions.resetDataBreadcrumb());
        if (_path) {
            dispatch(routerActions.changePath(_path as any));
        }
        if (token) {
            dispatch(handleGetProfile());
        }
        const _lang = localStorage.getItem(STORAGE.language);
        if (_lang) {
            dispatch(routerActions.changeLang(_lang as any));
        }

        if (window.context?.updateMessage) {
          window.context.updateMessage((_event, message) => {
            console.log('updateMessage', message)
          });
        }

    }, []);

    useEffect(() => {
        if (path === Paths.HOME) {
            dispatch(courseActions.resetDataBreadcrumb());
        }
    }, [path]);

    const renderPage = useMemo(() => {
        switch (path) {
            case Paths.HOME:
                return <Home />;
            case Paths.MY_SCORE:
                return <MyScore />;
            case Paths.ARCHIVE:
                return <Archive />;
            case Paths.CONTACT:
                return <>CONTACT</>;
            case Paths.PROFILE:
                return <Profile />;
            case Paths.LEADERBOARD:
                return <Leaderboard />;
            case Paths.MISSION:
                return <Mission />;
            case Paths.NOTIFICATION:
                return <Notification />;
            case Paths.COURSE:
                return <Course />;
            case Paths.COURSE_TYPE_IMAGE:
                return <CourseTypeImage />;
            case Paths.COURSE_QUIZZ:
                return <CourseQuizz />;
            case Paths.QUIZZ:
                return <Quizz />;
            default:
                return <></>;
        }
    }, [path, user]);

    const renderPageNoLayout = useMemo(() => {
        switch (path) {
            case Paths.LOGIN:
                return <Login />;
            case Paths.REGISTER:
                return <Register />;
            case Paths.FORGOT_PASSWORD:
                return <ForgotPassword />;
            default:
                return <Role />;
        }
    }, [path, user]);

    const isRenderNoLayout = useMemo(() => {
        return path === Paths.QUIZZ || (path === Paths.ARCHIVE && typePage === 'test');
    }, [path, typePage]);

    return <ProviderNotification>{user ? isRenderNoLayout ? <>{renderPage}</> : <MenuLayout>{renderPage}</MenuLayout> : <>{renderPageNoLayout}</>}</ProviderNotification>;
}

export default App;

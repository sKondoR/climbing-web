import { lazy, Suspense } from 'react'
import './App.css'
import Layout from './components/Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import { PATHS } from './routes/paths';

const LandingPage = lazy(() => import('./routes/Landing/Landing'));
const AllClimbPage = lazy(() => import('./routes/Team/Team'));
const SchedulePage = lazy(() => import('./routes/Schedule/Schedule'));
const ContactsPage = lazy(() => import('./routes/Contacts/Contacts'));
const SignInPage = lazy(() => import('./routes/SignIn/SignIn'));
const NoMatch = lazy(() => import('./routes/NoMatch/NoMatch'));

const App = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route
            path={PATHS.allclimb.to}
            element={<AllClimbPage />}
          />
          <Route
            path={PATHS.schedule.to}
            element={<SchedulePage />}
          />
          <Route
            path={PATHS.contacts.to}
            element={<ContactsPage />}
          />
          <Route
            path='/signin'
            element={<SignInPage />}
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App

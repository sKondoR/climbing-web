import { lazy, Suspense } from 'react'
import './App.css'
import Layout from './components/Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import { PATHS } from './routes/paths';

const LandingPage = lazy(() => import('./routes/Landing/Landing'));
const ContactsPage = lazy(() => import('./routes/Contacts/Contacts'));
const NoMatch = lazy(() => import('./routes/NoMatch/NoMatch'));

const App = () => {
  return (
    <div>
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route
              path={PATHS.contacts}
              element={<ContactsPage />}
            />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App

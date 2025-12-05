import { lazy, Suspense } from 'react'
import './App.css'
import Layout from './components/Layout/Layout'
import { Routes, Route } from 'react-router-dom'
import { PATHS } from './routes/paths'

const LandingPage = lazy(() => import('./routes/Landing/Landing'))
const VitiaPage = lazy(() => import('./routes/Vitia/Vitia'))
const AllClimbPage = lazy(() => import('./routes/Allclimb/Allclimb'))
const SchedulePage = lazy(() => import('./features/vitia/ui/Schedule/Schedule'))
const LeadTrainingsPage = lazy(() => import('./routes/LeadTrainings/LeadTrainings'))
const CompetitionsList = lazy(() => import('./features/vitia/ui/CompetitionsList/CompetitionsList'))
const LeadsHistory = lazy(() => import('./features/vitia/ui/LeadsHistory/LeadsHistory'))
const ContactsPage = lazy(() => import('./routes/Contacts/Contacts'))
const SignInPage = lazy(() => import('./routes/SignIn/SignIn'))
const NoMatch = lazy(() => import('./routes/NoMatch/NoMatch'))

const App = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route
            path={PATHS.vitia.to}
            element={<VitiaPage />}
          >
            <Route
              path={PATHS.competitions.to}
              element={<CompetitionsList />}
            />
            <Route
              path={PATHS.leadsHistory.to}
              element={<LeadsHistory />}
            />
            <Route
              path={PATHS.schedule.to}
              element={<SchedulePage />}
            />
          </Route>
          <Route
            path={PATHS.allclimb.to}
            element={<AllClimbPage />}
          />
          <Route
            path={PATHS.leadTrainings.to}
            element={<LeadTrainingsPage />}
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

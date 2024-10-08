import { lazy, Suspense } from 'react'
import './App.css'
import Layout from './components/Layout/Layout'
import { Routes, Route } from 'react-router-dom'
import { PATHS } from './routes/paths'

const LandingPage = lazy(() => import('./routes/Landing/Landing'))
const AllClimbPage = lazy(() => import('./routes/Allclimb/Allclimb'))
const SchedulePage = lazy(() => import('./routes/Schedule/Schedule'))
const ProgressPage = lazy(() => import('./routes/Progress/Progress'))
const LeadTraining = lazy(() => import('./features/lead-training/ui/LeadTraining/LeadTraining'))
const CompetitionsList = lazy(() => import('./features/progress/ui/CompetitionsList/CompetitionsList'))
const LeadList = lazy(() => import('./features/progress/ui/RocksList/LeadList'))
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
            path={PATHS.allclimb.to}
            element={<AllClimbPage />}
          />
          <Route
            path={PATHS.schedule.to}
            element={<SchedulePage />}
          />
          <Route
            path={PATHS.progress.to}
            element={<ProgressPage />}
          >
            <Route
              path={PATHS.lead.to}
              element={<LeadTraining />}
              index
            />
            <Route
              path={PATHS.competitions.to}
              element={<CompetitionsList />}
            />
            <Route
              path={PATHS.rocks.to}
              element={<LeadList />}
            />
          </Route>
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

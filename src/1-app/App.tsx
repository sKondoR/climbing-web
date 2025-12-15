import { lazy, Suspense } from 'react'
import './App.css'
import Layout from '../4-widgets/ui/Layout/Layout'
import { Routes, Route } from 'react-router-dom'
import { PATHS } from '../7-shared/constants/paths.constants'
import CustomModal from '../7-shared/ui/CustomModal/CustomModal'
import { Spinner } from '@material-tailwind/react'
import Notifications from '../6-entities/notification/ui/Notifications/Notifications'

const LandingPage = lazy(() => import('../3-pages/Landing/Landing'))
const VitiaPage = lazy(() => import('../3-pages/Vitia/Vitia'))
const AllClimbPage = lazy(() => import('../3-pages/Allclimb/Allclimb'))
const SchedulePage = lazy(() => import('../6-entities/schedule/ui/Schedule/Schedule'))
const LeadTrainingsPage = lazy(() => import('../3-pages/LeadTrainings/LeadTrainings'))
const CompetitionsList = lazy(() => import('../3-pages/Vitia/ui/CompetitionsList/CompetitionsList'))
const LeadsHistory = lazy(() => import('../3-pages/Vitia/ui/LeadsHistory/LeadsHistory'))
const ContactsPage = lazy(() => import('../3-pages/Contacts/Contacts'))
const SignInPage = lazy(() => import('../3-pages/SignIn/SignIn'))
const NoMatch = lazy(() => import('../3-pages/NoMatch/NoMatch'))

const App = () => {
  return (
    <Suspense fallback={
      <CustomModal
        defaultOpen={true}
        title="test"
      >
        <div className="flex px-10 py-10 justify-center">
          <div className="flex align-items"><Spinner className="mr-5 text-lg"/> Идет загрузка...</div>
        </div>
      </CustomModal>
    }>
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
      <Notifications />
    </Suspense>
  )
}

export default App

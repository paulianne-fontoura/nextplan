import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ProgressProvider } from './context/ProgressContext'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BadgeToast from './components/BadgeToast'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import NextPlanLogo from './components/NextPlanLogo'
import GlobalBackground from './components/GlobalBackground'

import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import CoursePage from './pages/CoursePage'
import CourseFullPage from './pages/CourseFullPage'
import PricingPage from './pages/PricingPage'
import CheckoutPage from './pages/CheckoutPage'
import DashboardPage from './pages/DashboardPage'
import AboutPage from './pages/AboutPage'
import ResourcesPage from './pages/ResourcesPage'
import NotFoundPage from './pages/NotFoundPage'

import './App.css'


export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'NEXTPLAN — Planification et Contrôle'
    // Splash screen 0.8s
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <GlobalBackground />

      <AnimatePresence>
        {loading && (
          <motion.div
            key="splash"
            className="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <NextPlanLogo variant="hero" size="lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <HashRouter>
        <ProgressProvider>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <AnimatedRoutes />
          <Footer />
          <BadgeToast />
        </ProgressProvider>
      </HashRouter>
    </>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"                element={<PageWrap><HomePage /></PageWrap>} />
        <Route path="/formations"      element={<PageWrap><CoursesPage /></PageWrap>} />
        <Route path="/cours/:id"          element={<PageWrap><CoursePage /></PageWrap>} />
        <Route path="/cours/:id/complet"  element={<PageWrap><CourseFullPage /></PageWrap>} />
        <Route path="/pricing"         element={<PageWrap><PricingPage /></PageWrap>} />
        <Route path="/paiement"        element={<PageWrap><CheckoutPage /></PageWrap>} />
        <Route path="/espace-etudiant" element={<PageWrap><DashboardPage /></PageWrap>} />
        <Route path="/a-propos"        element={<PageWrap><AboutPage /></PageWrap>} />
        <Route path="/ressources"      element={<PageWrap><ResourcesPage /></PageWrap>} />
        <Route path="*"                element={<PageWrap><NotFoundPage /></PageWrap>} />
      </Routes>
    </AnimatePresence>
  )
}

function PageWrap({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
    >
      {children}
    </motion.div>
  )
}

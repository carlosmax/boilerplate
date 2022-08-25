import React from 'react'

import {
  Client,
  Contact,
  Counter,
  Cta,
  Faqs,
  Features,
  Footer,
  Home,
  Navbar,
  Plans,
  Reviews,
  Services,
  Team,
  WorkProcess
} from './components'

const Landing: React.FC = () => {
  document.title = ' Landing'
  return (
    <React.Fragment>
      <div className='layout-wrapper landing'>
        <Navbar />
        <Home />
        <Client />
        <Services />
        <Features />
        <Plans />
        <Faqs />
        <Reviews />
        <Counter />
        <WorkProcess />
        <Team />
        <Contact />
        <Cta />
        <Footer />
      </div>
    </React.Fragment>
  )
}

export default Landing

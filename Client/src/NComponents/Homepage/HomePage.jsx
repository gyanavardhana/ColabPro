import React from 'react'
import NavigationBar from './Navigationbar'
import { AllProjects } from './AllProjects'
import { AllProjectsIdeas } from './AllProjectIdeas'
import Functionalites from './Functionalities'
import MemberBenefits from './MemberBenefits'
import StaticContent from './CallToAction'
import HeroColabPro from './Hero'
import BelowHero from './BelowHero'
const HomePage = () => {
  return (
    <div className=' bg-gray-100' >
      <NavigationBar />
      <HeroColabPro />
      <BelowHero />
      <AllProjects />
      <AllProjectsIdeas />
      <Functionalites />
      <MemberBenefits />
      <StaticContent /> 
    </div> 
  )
}

export default HomePage
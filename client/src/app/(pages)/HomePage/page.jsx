"use client"
import React from 'react'
import { Hero } from "./Hero/Hero";
import { Services } from "./Services/Services";
import { NavBar } from '@/components/Navbar/NavBar'
import { Footer } from '@/components/Footer/Footer'
import { Work } from './Work/Work';
import { Partner } from './Partner/Partner';
import { Team } from './Team/Team';
import ScrollText from './ScrollText/ScrollText';
import Goals from './Goals/Goals';
import Banner from './Banner/Banner';
import ServicesOverview from './ServicesOverview/ServicesOverview';
import { Testimonials } from './Testimonials/Testimonials'

const Home = () => {
  return (
    <section>
      <div className="mx-auto max-w-[90%]">
        <NavBar/>
      </div>
      <Hero/>
      <Work/>
      <Services/>
      <Partner/>
      <Team/>
      <ScrollText/>
      <Goals/>    
      <Banner/>
      <ServicesOverview/>
      <Testimonials />
      <Footer/>
    </section>
  )
}

export default Home;

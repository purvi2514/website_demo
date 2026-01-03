import React from 'react'
import Banner from './Banner'
import BestSeller from './BestSeller';
import TopCategory from './TopCategory';
import WhyChooseUs from './WhyChooseUs';
import BookingRequest from './BookingRequest';
import OneStop from './OneStop';
import FollowUs from './FollowUs';

function Home() {
    console.log('Debug: Banner import ->', Banner);
    return (
        <div>
            <Banner />
            <BestSeller/>
            <TopCategory/>
            <WhyChooseUs/>
            <BookingRequest/>
            <OneStop/>
            <FollowUs/>
        </div>
    )
}

export default Home

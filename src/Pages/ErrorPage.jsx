import '../App.css';
import React from "react";
import Navigation from "../Component/Navigation";
import Footer from "../Component/Footer";
import TopHeader from '../Component/TopHeader';

function ErrorPage() {
    return (
        //  main container of body
        <>
            <TopHeader />
            <Navigation />
            <div id="errPage">
                <div id="errPageTxt">Error 404</div>
                <div>Page Not Found!!!</div>
            </div>
            <Footer />
        </>
    );
}

export default ErrorPage;
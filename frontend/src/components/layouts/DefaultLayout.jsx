import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="w-full flex justify-center bg-slate-500">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;

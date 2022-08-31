import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Footer from "../components/footer";
import LoginModal from "../components/loginModal";
import Nav from "../components/nav";
import PollForm from "../components/pollForm";
import RegisterModal from "../components/registerModal";



const Home: NextPage = () => {
    var [showRegisterModal, setShowRegisterModal] = useState(false);
    var [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <div className="bg-slate-900 flex flex-col min-h-screen">
            <Head>
                <title>Straw Poll Clone</title>
            </Head>
            <header className="sticky top-0 z-40 bg-slate-800 ring-1 ring-gray-700 shadow-sm">
              <Nav openRegisterModal={() => {setShowRegisterModal(true)}} openLoginModal={() => {setShowLoginModal(true)}}/>
            </header>
            <main className="bg-slate-900 flex-grow">
              <section className="container mx-auto max-w-7xl pt-16 pb-8 flex flex-col justify-center items-center">
                <PollForm />
              </section>
              <RegisterModal showModal={showRegisterModal} closeModal={()=>{setShowRegisterModal(false)}}></RegisterModal>
              <LoginModal showModal={showLoginModal} closeModal={()=>{setShowLoginModal(false)}}/>
            </main>
            <Footer />
        </div>
    );
};

export default Home;

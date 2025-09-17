import React from "react";
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();

  const handleLoginRegisterClick = () => {
    navigate('/login');
  };

  return (
    <div className="bg-[url('./assets/background2.jpg')] bg-center bg-no-repeat bg-cover bg-clip-border min-h-screen font-[Quicksand]">
      <nav className="h-[15vh] m-0 px-20 bg-[#c4c4c456] flex justify-between items-center shadow-2xl">
        <img
          className="h-[10rem] w-[10rem] m-5 p-0"
          src="./assets/logo 2.png"
          alt="Swaasthyam Logo"
        />
        <button 
          onClick={handleLoginRegisterClick}
          className="h-[3rem] w-[15rem] px-2 text-[.8rem] bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-4xl font-semibold hover:from-blue-500 hover:to-blue-700 hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          Login / Register new migrant
        </button>
      </nav>
      <article className="h-[85vh] grid grid-rows-3 px-30 text-white ">
        <p className="text-[3rem] flex items-end font-bold text-white" style={{
          textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.4), 2px 2px 4px rgba(0,0,0,0.8)',
          filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))'
        }}>
          Welcome to Swaasthyam..!
        </p>

        <div className="flex items-end">
          <button className="bg-gradient-to-b from-purple-700 to-black rounded-4xl h-[4rem] w-[20rem] font-bold relative bottom-[0rem">
            Language: English | हिन्दी | മലയാളം
          </button>
        </div>
        <div className="flex py-[2rem] items-start font-bold">
          <p>
            The world's most efficient management tool - voice-enabled health database <br />
            that streamlines worker monitoring, reporting, and emergency response <br />
            across languages and database system built for migrant workers.
          </p>
        </div>
      </article>
      <div className="fixed top-1/3 right-10 w-[20rem] h-[25rem] z-50 pointer-events-none bubble-rotate">
        {/* Top bubble */}
        <div className="bubble bubble1 w-36 h-36 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-center text-black text-sm font-semibold shadow-xl">
          Real-time
          <br />
          health monitoring
        </div>

        {/* Upper middle bubble */}
        <div className="bubble bubble2 w-36 h-36 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-center text-black text-sm font-semibold shadow-xl">
          QR Code
          <br />
          Health Access
        </div>

        {/* Lower middle bubble */}
        <div className="bubble bubble3 w-36 h-36 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-center text-black text-sm font-semibold shadow-xl">
          Multi-language
          <br />
          support
        </div>

        {/* Bottom bubble */}
        <div className="bubble bubble4 w-36 h-36 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-center text-black text-sm font-semibold shadow-xl">
          Voice input
          <br />
          health updates
        </div>
      </div>
    </div>
  );
};

export default Home;

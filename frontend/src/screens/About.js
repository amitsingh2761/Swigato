import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';


export default function About() {
  return (
    <div>
      <Navbar />
      <div className="about-section">
        <h1>Hi there!</h1>
        <p>I'm Amit Singh, an aspiring fresher excited to kickstart my career in the dynamic world of technology. Eager to learn and grow, I bring a fresh perspective and a passion for problem-solving to any problem. With a foundation in computer science fundamentals and a thirst for knowledge, I'm enthusiastic about contributing to innovative solutions that make a difference.</p>
      </div>

      <h2 style={{ textAlign: 'center', fontFamily:"cursive", fontWeight: "bolder" }}>My Work On</h2>
      <div className="about-row">
        <div className="about-column">
          <div className="about-card">
            <img src="https://freelogopng.com/images/all_img/1656958733linkedin-logo-png.png" alt="Jane" style={{ width: "90%" }} />
            <div className="about-container">
              <p className="about-title">amit-singh-950b80217</p>
              {/* Wrap the button with the Link component */}
              <Link to='https://www.linkedin.com/in/amit-singh-950b80217/'><button className="about-button">Connect</button></Link>
            </div>
          </div>
        </div>

        <div className="about-column">
          <div className="about-card">
            <img src="https://miro.medium.com/v2/resize:fit:1400/1*Edn_LpbSpLeNKfWkEdG2Jg.png" alt="Mike" style={{ width: "90%" }} />
            <div className="about-container">
              <p className="about-title">amitsingh2761</p>
              {/* Wrap the button with the Link component */}
              <Link to='https://github.com/amitsingh2761'><button className="about-button">Connect</button></Link>
            </div>
          </div>
        </div>

        <div className="about-column">
          <div className="about-card">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/LeetCode_Logo_black_with_text.svg/2560px-LeetCode_Logo_black_with_text.svg.png" alt="John" style={{ width: "90%" }} />
            <div className="about-container">
              <p className="about-title">singhamit2761</p>
              {/* Wrap the button with the Link component */}
              <Link to='https://leetcode.com/singhamit2761/'><button className="about-button">Connect</button></Link>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  )
}

import React from 'react'
import "./InfoCard.css"


function InfoCard() {
  return (
    <div className="info-container">
      <div>
        <h3>Recent</h3>
        <ul className="info-list">
          <li>
            <span>
            <i class="fa-solid fa-hashtag"></i>
            </span>
            <span>#javascript</span>
          </li>
          <li>
            <span>
            <i class="fa-solid fa-calendar-check"></i>
            </span>
            <span>Moblie Trends conference 2021</span>
          </li>
          <li>
            <span>
              <i class="fa-solid fa-user-group"></i>
            </span>
            <span>Freelance Developers</span>
          </li>
        </ul>
      </div>
      <div>
        <h3>Groups</h3>
        <ul className="info-list">
          <li>
            <span>
            <i class="fa-solid fa-hashtag"></i>
            </span>
            <span>#javascript</span>
          </li>
          <li>
            <span>
            <i class="fa-solid fa-calendar-check"></i>
            </span>
            <span>Moblie Trends conference 2021</span>
          </li>
          <li>
            <span>
            <i class="fa-solid fa-user-group"></i>
            </span>
            <span>Freelance Developers</span>
          </li>
        </ul>
      </div>
      <div>
        <h3>Subscriptions</h3>
        <ul className="info-list">
          <li>
            <span><i class="fa-solid fa-code"></i></span>
            <span>Programming with Mosh</span>
          </li>
          <li>
            <span><i class="fa-solid fa-laptop-code"></i></span>
            <span>E-learning Bridge</span>
          </li>
          <li>
            <span><i class="fa-solid fa-person"></i></span>
            <span>Clever Programmer</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default InfoCard

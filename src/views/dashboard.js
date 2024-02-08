import React from "react";

import NavBar from "../components/NavBar";
import "../css/dashboard.css";
import LineChart from "../components/lineChart";
import BarChart from "../components/barChart";
import PieChart from "../components/pieChart";
import {useAuth} from "../firebase";

const Dashboard = () => {
    const currentUser = useAuth();

  return (
    <div className="dashboard-card">
        <NavBar name="Admin" currentUser={currentUser}/>
        <div className="numbers">
        <div class="right_col">

        <div class="row kpi_tiles">
            <div class="col1  kpi">
                <span class="count_top"><i class="fa fa-users"></i> Total Active Users</span>
                    <div class="count green">1356</div>
                        <span class="count_bottom"><i class="green">4% </i> From last Week</span>
                </div>
                <div class="col1  kpi">
                    <span class="count_top"><i class="fa fa-clock-o"></i> Total Events </span>
                        <div class="count green">76</div>
                            <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>3% </i> From last Week</span>
                        </div>
                    <div class="col1  kpi">
                        <span class="count_top"><i class="fa fa-user"></i> Cumulative Outreach Hours </span>
                            <div class="count green">752</div>
                                <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>34% </i> From last Week</span>
                            </div>
                        <div class="col1  kpi">
                            <span class="count_top"><i class="fa fa-user"></i> Est People Impacted </span>
                                <div class="count green">4,567</div>
                            <span class="count_bottom"><i class="green"><i class="fa fa-sort-desc"></i>12% </i> From last Week</span>
                                </div>

                    <div class="col1  kpi">
                        <span class="count_top"><i class="fa fa-user"></i> Median Volunteer Age</span>
                            <div class="count green">24</div>
    
                            </div>
                            <div class="col1  kpi kpi_last">
                                <span class="count_top"><i class="fa fa-user"></i> Participation Rate</span>
                                    <div class="count red">71%</div>
                                        <span class="count_bottom"><i class="red"><i class="fa fa-sort-asc"></i>12% </i> From last day</span>
                                    </div>
                                </div>
                            </div>
        <div className="two-big-charts">
            <div className="line-chart">
                <LineChart/>
            </div>
            <div className="pie-chart">
                <PieChart/>
            </div>
        </div>
        <div className="last-containaaa">
                <div className="barchart">
                        <BarChart />
                </div>
                <div class="container">
    <div class="leaderboard">
      <div class="head">
        <i class="fas fa-crown"></i>
        <h1>Popular Regions </h1>
      </div>
      <div class="body">
        <ol>
          <li>
            <mark>North</mark>
            <small>650</small>

          </li>
          <li>
            <mark>West</mark>
            <small>431</small>
          </li>
          <li>
            <mark>East</mark>
            <small>210</small>
          </li>
          <li>
            <mark>South</mark>
            <small>56</small>
          </li>
        </ol>
      </div>
    </div>
  </div>
  <div class="content text-center">

                                            <div class="ratings">

                                                <span class="product-rating">4.6</span><span>/5</span>
                                                <div class="stars">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                </div>

                                                <div class="rating-text">
                                                    
                                                    <span>46 ratings & 15 reviews</span>

                                                </div>
                                                
                                            </div>
                                            
                                        </div>
</div>
</div>

    </div>

  );
};

export default Dashboard;

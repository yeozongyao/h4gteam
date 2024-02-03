import React from "react";
import NavBar from "../components/NavBar";
import "../css/admin-events.css";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import EventDataService from "../UtilEvents";
import { useEffect, useState } from "react";
import db from "../firebase";
import MyForm from "../components/Form";

const AdminAddEvents = () => {
  return (
    <div className="adminCert-main-div">
      <NavBar name="Admin View Events Page" />
      <div>
        <MyForm />
      </div>
    </div>
  );
};

export default AdminAddEvents;

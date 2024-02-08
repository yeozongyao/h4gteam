import React from "react";
import NavBar from "../components/NavBar";
import "../css/admin-events.css";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import EventDataService from "../UtilEvents";
import { useEffect, useState } from "react";
import db from "../firebase";
import MyForm from "../components/Form";
import { signup, useAuth, logout, login, } from "../firebase";
import Footer from "../components/footer";

const AdminAddEvents = () => {
  const currentUser = useAuth();
  return (
    <>
    <div className="admin-add-event-div">
      <NavBar name="Admin" currentUser={currentUser} />
      <div className="form-container">
        <MyForm />
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AdminAddEvents;

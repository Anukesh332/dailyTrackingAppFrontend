import React, { useState } from "react";
import { Card, Container, Image, Modal, Navbar, OverlayTrigger, Popover, Row, Tooltip } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import person from "../../assets/images/person.svg"
import { ReactSVG } from "react-svg";
import constants from "../../helpers/constants";
import ViewUserForm from "./ViewUser";
import xclose from "../../assets/images/x.svg";
import hamburgerIcon from "../../assets/images/hamburger.svg";
import { useNavigate } from 'react-router-dom'

export default function Header(props) {

  let location = useLocation();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [rowData, setRowData] = useState({});
  const [action, setAction] = useState(constants.VIEW);


  const logout = () => {
    sessionStorage.clear();
  }

  function handleLogout() {
    logout();
    navigate('/');
    window.location.reload(true);
  }


  const viewProfile = async () => {
    setAction(constants.VIEW)
    setShowForm(true);
  }


  return (
    <Navbar bsPrefix="header">
      <ReactSVG className="head-toggle" fill="#084CE8" src={hamburgerIcon} onClick={() => { props.setSidebar(props.sidebar === "closed" ? "open" : "closed") }} />
      <div className="app-name">DailyTrackingApp</div>
      <div className="user-section">
        <ReactSVG className="user-logo" src={person} />
        <OverlayTrigger trigger="click" placement="bottom" rootClose overlay={
          <Popover
            aria-labelledby="contained-modal-title-vcenter"
          >
            <Card className="header-card">
              <Card.Body>
                <Container>
                  <Row className="user-name" onClick={viewProfile}>My Details</Row>
                  <Row className="logout mt-2" onClick={(e) => handleLogout()}>Logout</Row>
                </Container>
              </Card.Body>
            </Card>
          </Popover>}>
          <div className="user-name">

            {sessionStorage.getItem('user_name') ? sessionStorage.getItem('user_name') : "My Account"}
          </div>
        </OverlayTrigger>

      </div>
      {showForm &&
        <Modal
          show={showForm}
          {...props}
          size="lg"
          backdrop="static"
        >

          <Modal.Header >
            <Image src={xclose} onClick={() => (setShowForm(false))} className="userFormHeaderName"></Image>
            <Modal.Title className="modal-title ">
              My Profile
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ViewUserForm show={showForm}
              action={action}
              rowdata={rowData}
              onHide={() => setShowForm(false)}></ViewUserForm>
          </Modal.Body></Modal>}
    </Navbar>
  );
}

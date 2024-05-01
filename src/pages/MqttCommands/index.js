import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { Container, Button } from "reactstrap";
import SimpleBar from "simplebar-react";
import moment from "moment/moment";
import { isEmpty, map } from "lodash";
import { api } from "../../config";
import avatar2 from "../../assets/images/users/avatar-2.jpg";

import "react-perfect-scrollbar/dist/css/styles.css";
import { createSelector } from "reselect";

const ServerCommands = () => {
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };
  const [Chat_Box_Username, setChat_Box_Username] = useState("Lisa Parker");
  const [Chat_Box_Image, setChat_Box_Image] = useState(avatar2);
  const [messageBox, setMessageBox] = useState(null);
  const [messages, updateMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(api.SSE_ENDPOINT_URL);

    eventSource.addEventListener("message", handleSSE);
    eventSource.addEventListener("open", () =>
      console.log("SSE connection opened")
    );
    eventSource.addEventListener("error", (error) =>
      console.error("SSE error:", error)
    );

    return () => {
      eventSource.close();
    };
  }, []);

  const handleSSE = useCallback((event) => {
    const data = JSON.parse(event.data);
    console.log("Received SSE event:", data);
    updateMessages((prevMessages) => [...prevMessages, data]);
    scrollToBottom();
  }, []);

  const scrollToBottom = useCallback(() => {
    if (messageBox) {
      messageBox.scrollToBottom = messageBox.scrollHeight + 1000;
    }
  }, [messageBox]);

  const publishData = () => {
    // Your publish data logic
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
            <div className="chat-leftsidebar border bg-transparent">
              {/* Your left sidebar content */}
            </div>

            <div className="user-chat w-100 overflow-hidden border">
              <div className="chat-content d-lg-flex">
                <div className="w-100 overflow-hidden position-relative">
                  <div className="position-relative">
                    <div className="position-relative" id="users-chat">
                      <SimpleBar
                        className="chat-conversation p-3 p-lg-12"
                        id="chat-conversation"
                      >
                        <ul
                          className="list-unstyled chat-conversation-list"
                          id="users-conversation"
                        >
                          {messages.map((message, index) => (
                            <li
                              className={
                                message.topic === "feedingdone" ||
                                message.topic === "ctrlHB"
                                  ? " chat-list left"
                                  : "chat-list right"
                              }
                              key={index}
                            >
                              <div className="conversation-list">
                                <div className="user-chat-content">
                                  <small className="text-muted time">
                                    Topic: <strong>{message.topic}</strong>
                                  </small>{" "}
                                  <div className="ctext-wrap">
                                    <div className="ctext-wrap-content">
                                      <p className="mb-0 ctext-content">
                                        {message.message?.key
                                          ? message.message.key
                                          : message.message}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="conversation-name">
                                    <small className="text-muted time">
                                      {moment(message.createdAt).format(
                                        "YYYY-MM-DD h:mm:ss a"
                                      )}
                                    </small>{" "}
                                    <span className="text-success check-message-icon">
                                      <i className="ri-check-double-line align-bottom"></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </SimpleBar>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ServerCommands;

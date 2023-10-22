"use client";
import { useState } from "react";
import "./contact.css";
import Swal from "sweetalert2";
import { contact } from "@/apis/user";
function Contact() {
  const [payload, setPayload] = useState<any>({
    name: "",
    email: "",
    messege: "",
  });
  const handle = async () => {
    if (payload.email === "" || payload.messege === "" || payload.name === "") {
      Swal.fire("Oops!", "Vui lòng nhập đầy đủ thông tin", "info");
    } else {
      const rs = await contact(payload);
      if (rs.data.err === 0) {
        Swal.fire(
          "Thành công",
          "Phản hồi của bạn đã được ghi nhận,chúng tôi sẽ sớm phản hồi qua email!",
          "success"
        ).then(() => {
          setPayload({
            email: "",
            messege: "",
            name: "",
          });
        });
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black bg-opacity-10">
      <div className="w-4/5 my-10 flex flex-col justify-center items-center">
        <h2 className=" text-3xl font-bold text-center">
          Liên Hệ Với Chúng Tôi{" "}
        </h2>
        <div className="form-container">
          <div className="form">
            <span className="heading">Get in touch</span>
            <input
              placeholder="Name"
              type="text"
              className="input"
              value={payload?.name}
              onChange={(e) =>
                setPayload((pre: any) => ({ ...pre, name: e.target.value }))
              }
            />
            <input
              placeholder="Email"
              id="mail"
              type="email"
              className="input"
              value={payload.email}
              onChange={(e) =>
                setPayload((pre: any) => ({ ...pre, email: e.target.value }))
              }
            />
            <textarea
              placeholder="Say Hello"
              id="message"
              name="message"
              className="textarea"
              value={payload.messege}
              onChange={(e) =>
                setPayload((pre: any) => ({ ...pre, messege: e.target.value }))
              }
            ></textarea>
            <div className="button-container">
              <div onClick={handle} className="send-button">
                Send
              </div>
              <div className="reset-button-container">
                <div
                  onClick={() =>
                    setPayload({ email: "", messege: "", name: "" })
                  }
                  id="reset-btn"
                  className="reset-button"
                >
                  Reset
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

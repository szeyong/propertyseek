import React from 'react'
import { Link } from "react-router-dom";
import "./stylepages.css";

const Contact = () => {
    return (
        <div className="container">

            <form className="text-center border border-light p-4" action="#!"></form>
                <p className="h4 mb-4">Contact us</p>

                <input type="text" id="defaultContactFormName" className="form-control mb-4" placeholder="Name" />
                <input type="email" id="defaultContactFormEmail" className="form-control mb-4" placeholder="E-mail"/>

                <label>Subject</label>
                <select className="browser-default custom-select mb-4 ms-4">
                    <option value="" disabled>Choose option</option>
                    <option value="1" selected>Schedule Viewing</option>
                    <option value="2">Request more informaiton</option>
                </select>

                <div className="form-group">
                    <textarea className="form-control rounded-0 wt-50" id="exampleFormControlTextarea2" rows="3" placeholder="Message"></textarea>
                </div>

                <button className="btn btn-info btn-block mt-4 link" type="submit">
                    <Link className="text-center text-muted mt-5 mb-0" to="/" style={{color: "#808080"}}>Send</Link>
                </button>
        </div>



                 

    )
}

export default Contact

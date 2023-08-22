import {React} from 'react'
import developerImage from '../assets/images/devImage.jpg'

export default function About() {

  // creating function to open Image in new tab
  let openInNewTab = () => {

    window.open(developerImage, '_blank', 'noreferrer');

}
  return (
    <div className="container my-3">
            <div className="container my-3" >
            <h1 >About-Us</h1>
            <div className="card"  >
                <img src={developerImage} onClick={openInNewTab} className="card-img-top" alt="Developer " style={{ width: '200px', cursor: 'pointer' }} />
                <div className="card-body" >
                    <h5 className="card-title">Sameer Abbas Mughal</h5>
                    <p className="card-text">I Develop this web-app just for fun and it is also usefull. Because it is use to Learn MERN-Basics your can save your notes online and all CRUD operations and authentication are being use in this Web-App</p>
                </div>
            </div>
        </div>
     
    </div>
  )
}

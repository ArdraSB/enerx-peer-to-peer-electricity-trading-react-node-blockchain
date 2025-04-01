import './Navbar.css'
import { Link,useMatch,useResolvedPath } from "react-router-dom";
import { Userdata } from './Profile';
import logo from "../assets/logo.png"
function Navbar(params)  {

    return(
    <nav className="navbar">
        <div className="logo1"><img src={logo} alt="Logo"  /></div>
        
        <ol>

            <Customlink to='/Profile' name='Profile'/>
            <Customlink to='/Offers' name='Bids list' />
            <Customlink to='/' name='Logout'/>

        </ol>
    </nav>
    )
}

function Customlink({to,name,...props}) {
    const resolvedPath= useResolvedPath(to)
    const isActive= useMatch({path :resolvedPath.pathname, end:true})
    return(
   <li className={isActive?"active1":""}> <Link to={to} >{name}</Link></li>
    )
}


export default Navbar
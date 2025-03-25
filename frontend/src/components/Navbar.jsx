import './Navbar.css'
import { Link,useMatch,useResolvedPath } from "react-router-dom";
import { Userdata } from './Profile';
function Navbar(params)  {

    return(
    <nav className="navbar">
        <h3 className="title">EnerX</h3>
        <ol>

            <Customlink to='/Profile' name='Profile'/>
            <Customlink to='/Offers' name='Bids list' />
            <Customlink to='/Transactions' name='Transactions'/>

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
import './Navbar.css'
import { Link,useMatch,useResolvedPath } from "react-router-dom";

function Navbar(params)  {

    return(
    <nav className="navbar">
        <Link to='/' className='title'>EnerX</Link>
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
import { useEffect, useState, useContext } from 'react';
import Loading from './Loading';
import { logout } from '../services/auth.service';
import { getLoans } from '../services/loan.service';
import DashBoard from '../components/Dashboard';
import { UserContext } from '../hooks/UserContext';

const Profile = (props) => {

    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(UserContext);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        getLoans().then((response) => {
            setLoans(response.loans);
            setLoading(false);
        });
    }, [])
    const handleLogout = async () => {
        await logout();
        window.location.reload();
    };
    return(
        <div>
            {
            !loading ? <>           
                <div>
                    <div className="logout-container">
                        <button onClick={() => setShowConfirmation(true)} className="button">Logout</button>
                    </div>
                    <DashBoard owner={user.username} loanlist={loans}/>
                    {showConfirmation && (
                        <div className="confirmation-box">
                            <p>Are you sure you want to logout?</p>
                            <div className="confirmation-buttons">
                                <button onClick={() => setShowConfirmation(false)} className="button cancel-button">
                                    Cancel
                                </button>
                                <button onClick={handleLogout} className="button confirm-button">
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </> :  <Loading/>}
        </div>
    )
}

export default Profile

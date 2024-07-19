import { useEffect, useState, useContext } from 'react';
import Loading from './Loading';
import { logout,getList } from '../services/auth.service';
import DashBoard from '../components/Dashboard';
import { UserContext } from '../hooks/UserContext';

const List = (props) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        getList().then((response) => {
            setList(response.data);
            setLoading(false);
        });
    }, []);
    const handleLogout = async () => {
        await logout();
        window.location.reload();
    };
    return (
        <div>
            {!loading ? (
                <>
                        <div className="logout-container">
                            <button onClick={() => setShowConfirmation(true)} className="button">Logout</button>
                        </div>
                        <DashBoard owner={user.username} />
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
                    <div className="users-table-container">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Created At</th>
                                    <th className="centered-header">Loans</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list
                                    .filter(user => user.username !== 'Admin') 
                                    .map(user => (
                                        <tr key={user._id}>
                                            <td>{user.username}</td>
                                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <table className="loans-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Start Date</th>
                                                            <th>Expiry Date</th>
                                                            <th>Amount</th>
                                                            <th>EMI Duration</th>
                                                            <th>Payable Amount</th>
                                                            <th>Interest</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {user?.loans.map(loan => (
                                                            <tr key={loan._id}>
                                                                <td>{new Date(loan.startDate).toLocaleDateString()}</td>
                                                                <td>{new Date(loan.expiryDate).toLocaleDateString()}</td>
                                                                <td>{loan.amount}</td>
                                                                <td>{loan.emiDuration}</td>
                                                                <td>{loan.payableAmount}</td>
                                                                <td>{loan.interest}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default List;

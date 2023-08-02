import { Link } from 'react-router-dom';

export default function CatalogItem({ workout }) {
    const currentUserName = JSON.parse(localStorage.getItem('auth')).username;
    
    const usernameCap = (u) => {
        return u.charAt(0).toUpperCase() + u.slice(1);
    };

    const isMyWorkout = currentUserName === workout.ownerName;


    return (
        <li className="item">
            <header className="pad-med">
                {isMyWorkout
                    ? <h2 style={{ color: 'lawngreen' }}>{'My workout'}</h2>
                    : <h2>{`${usernameCap(workout.ownerName)}'s workout`}</h2>
                }
            </header>
            <div className="align-center">
                <img className="img-thumb" src={`/images/${workout.type}.gif`} alt="" />
            </div>
            <footer className="align-center pad-med">
                {isMyWorkout
                    ? <span>My choise today: <div><strong>{workout.type?.toUpperCase()}</strong></div></span>
                    : <span>His choise today: <div><strong>{workout.type?.toUpperCase()}</strong></div></span>
                }
                {isMyWorkout 
                    ? <Link className="action" to={'/my-workout'}>
                        See details
                    </Link>
                    : <Link className="action" to={`/workouts/${workout._id}`}>
                        See details
                    </Link>
                }

            </footer>
        </li>
    );
};
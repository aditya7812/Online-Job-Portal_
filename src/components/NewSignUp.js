import './NewSignUp.css'
import { useState } from 'react'
export default function NewSignUp(p) {
    const [isActive, setIsActive] = useState(true)
    const handleSwipe = () => {
            setIsActive(!isActive)
    }
    return (
        <div className='main-container-new'>
        <div className={`container2 ${ isActive ? 'right-panel-active' : ''}`}>
	<div className="container__form container--signup">
		<form action="#" className="form" id="form1">
			<h2 className="form__title">Sign Up</h2>
			<input type="text" placeholder="User" className="input" />
			<input type="email" placeholder="Email" className="input" />
			<input type="password" placeholder="Password" className="input" />
			<button className="btn">Sign Up</button>
		</form>
	</div>

	<div className="container__form container--signin">
		<form action="#" className="form" id="form2">
			<h2 className="form__title">Sign In</h2>
			<input type="email" placeholder="Email" className="input" />
			<input type="password" placeholder="Password" className="input" />
			<a href="#" className="link">Forgot your password?</a>
			<button className="btn">Sign In</button>
		</form>
	</div>
	<div className="container__overlay">
		<div className="overlay">
			<div className="overlay__panel overlay--left">
				<button className="btn nicebtn" id="signIn" onClick={handleSwipe}>Sign In</button>
			</div>
			<div className="overlay__panel overlay--right">
				<button className="btn nicebtn" id="signUp" onClick={handleSwipe}>Sign Up</button>
			</div>
		</div>
	</div>
</div>
</div>
    )
};

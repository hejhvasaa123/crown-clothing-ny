import React from 'react';
import './App.css';

import { connect } from 'react-redux';

import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx";
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component.jsx';

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null
  //   }
  // }

  unsubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          // this.setState({
          //   currentUser: 
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
          }, () => {
            console.log(this.state) 
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route 
            exact 
            path='/signIn' 
            render={() => 
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const MapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps, 
  MapDispatchToProps
)(App);

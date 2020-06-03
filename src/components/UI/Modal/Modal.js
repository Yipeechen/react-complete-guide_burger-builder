import React from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {

  // the wrapping element(Modal) controls the updating of the wrapped element(OrderSummary).
  // shouldComponentUpdate (nextProps, nextState) {
  //   return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  // }

  return(
    <Aux>
      <Backdrop
        show={props.show}
        clicked={props.modalClosed}
      />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
}

// wrapping it with React.memo(component, function): allows us to optimize performance and only update this when the props of this component change.
// not to check all props you getting but as we did before only check a certain set because you know that other props will never change, so definitely don't need to check it, can do it with React.memo(): to pass a second argument where you can add your own comparison function
// need to return if they are equal
export default React.memo(modal, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children);


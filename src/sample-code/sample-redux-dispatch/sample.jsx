import { connect } from "react-redux";

import { setTestCount } from "../../redux/test/test.actions";

const Header = ({ count, updateCount }) => {
  console.log({ count });
  // const {updateCount} = this.props;
  return (
    <div>
      <div>{count}</div>
      <button onClick={updateCount}></button>
    </div>
  );
};

/**
 * map state variables to props for further use.
 *
 * @param {*} state
 * @param {*} ownProps
 * @returns
 */
const mapStateToProps = (state, ownProps) => {
  return {
    count: state.test_count.count,
  };
};

/**
 * map an action method to props so we can attach it to a component as event listener.
 * @param {*} dispatch
 * @returns
 */
const mapDispatchToProps = (dispatch) => ({
  updateCount: () => dispatch(setTestCount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
